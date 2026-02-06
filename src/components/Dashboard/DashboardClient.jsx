'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import DashboardHeader from '@/components/Header/DashboardHeader';
import TaskCalendar from '@/components/Dashboard/Calender/TaskCalendar';
import TaskSection from '@/components/Dashboard/tasks/TaskSection';
import TaskStatistics from '@/components/Dashboard/Statistics/TaskStatistics';
import TaskForm from '@/components/Dashboard/tasks/AddTask';
import TaskEditForm from './tasks/EditTask';

export default function DashboardClient({ user }) {
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [showEditTaskForm, setShowEditTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dayRatings, setDayRatings] = useState({});
    //fetch day ratings
    //fetch tasks
    //filter tasks
    //handle date selection
    // 2 use effect (fetch tasks, filter tasks)
    // handle date selection
    //handle task toggle
    //handle task deletion
    //handle task creation


    const fetchDayRatings = useCallback(async () => {
        const response = await fetch('/api/days');
        if (response.ok) {
            const data = await response.json();
            const ratingsMap = {};
            data.ratings.forEach(r => {
                const dateStr = new Date(r.date).toISOString().split('T')[0];
                ratingsMap[dateStr] = r.rating;
            });
            setDayRatings(ratingsMap);
        }
    }, []);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('/api/tasks');
            const data = await response.json();

            if (response.ok) {
                setTasks(data.tasks);
            } else {
                setError(data.error || 'Failed to fetch tasks');
                console.error('Failed to fetch tasks:', data.error);
            }
        } catch (error) {
            setError('Error fetching tasks');
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTaskById = useCallback(async (taskId) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/tasks/${taskId}`);
            const data = await response.json();

            if (response.ok) {
                return data; // single task object
            } else {
                setError(data.error || "Failed to fetch task");
                console.error("Failed to fetch task:", data.error);
                return null;
            }
        } catch (error) {
            setError("Error fetching task");
            console.error("Error fetching task:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleEdit = useCallback(async (taskId) => {
        const task = await fetchTaskById(taskId);
        setEditingTask(task);
        setShowEditTaskForm(true);
    }, [fetchTaskById]);

    const filteredTasks = useMemo(() => {
        const dateStr = selectedDate.toISOString().split('T')[0];
        return tasks.filter(task => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            return taskDate === dateStr;
        });
    }, [tasks, selectedDate]);

    // Fetch all tasks on mount
    useEffect(() => {
        fetchTasks();
        fetchDayRatings();
    }, [fetchTasks, fetchDayRatings]);

    const handleDateSelect = useCallback((date) => {
        setSelectedDate(date);
    }, []);

    const handleToggleTask = useCallback(async (id, completed) => {
        const originalTasks = [...tasks];

        // Optimistic update
        setTasks(prev => prev.map(task => task.id === id ? { ...task, completed } : task));

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            });

            if (!response.ok) {
                // Rollback on failure
                setTasks(originalTasks);
                const data = await response.json();
                alert(data.error || 'Failed to update task');
            }
        } catch (error) {
            // Rollback on network error
            setTasks(originalTasks);
            console.error('Error toggling task:', error);
            alert('Error updating task');
        }
    }, [tasks]);

    const handleUpdateTask = useCallback(async (updatedTask) => {
        const originalTasks = [...tasks];
        setTasks(prev => prev.map(task => task.id === updatedTask.id ? { ...task, ...updatedTask } : task));
        setShowEditTaskForm(false);

        try {
            const response = await fetch(`/api/tasks/${updatedTask.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                setEditingTask(null);
            } else {
                setTasks(originalTasks);
                const data = await response.json();
                alert(data.error || 'Failed to update task');
            }
        } catch (error) {
            setTasks(originalTasks);
            console.error('Error updating task:', error);
            alert('Error updating task');
        }
    }, [tasks]);

    const handleDeleteTask = useCallback(async (id) => {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        const originalTasks = [...tasks];

        // Optimistic update: filter OUT the deleted task
        setTasks(prev => prev.filter(task => task.id !== id));

        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                // Rollback on failure
                setTasks(originalTasks);
                const data = await response.json();
                alert(data.error || 'Failed to delete task');
            }
        } catch (error) {
            // Rollback on network error
            setTasks(originalTasks);
            console.error('Error deleting task:', error);
            alert('Error deleting task');
        }
    }, [tasks]);

    const handleRateDay = useCallback(async (rating) => {
        try {
            const dateStr = selectedDate.toISOString().split('T')[0];

            const response = await fetch('/api/days', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: dateStr,
                    rating: rating,
                    userId: user?.id || 'demo-user' // Fallback if user ID is missing
                })
            });

            if (response.ok) {
                await fetchDayRatings(); // Refresh ratings to update UI (calendar colors)
            } else {
                console.error('Failed to save day rating');
            }
        } catch (error) {
            console.error('Error saving day rating:', error);
        }
    }, [selectedDate, user?.id, fetchDayRatings]);

    const handleCreateTask = useCallback(async (taskData) => {
        try {
            // It's safer to wait for the ID from the server for Create operations
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });

            const data = await response.json();

            if (response.ok) {
                // Add the task with its database-generated ID
                setTasks(prev => [...prev, data.task]);
                setShowTaskForm(false);
            } else {
                alert(data.error || 'Failed to create task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Error creating task');
        }
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader userName={user?.name || user?.email} />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {error && (
                    <div className="mb-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-sm">Loading tasks...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <TaskCalendar
                                tasks={tasks}
                                dayRatings={dayRatings}
                                onDateSelect={handleDateSelect}
                            />

                            <TaskSection
                                dayRatings={dayRatings}
                                onRateDay={handleRateDay}
                                tasks={filteredTasks}
                                selectedDate={selectedDate}
                                onToggle={handleToggleTask}
                                onDelete={handleDeleteTask}
                                onAddTask={() => setShowTaskForm(true)}
                                handleEdit={handleEdit}

                            />
                        </div>

                        <TaskStatistics tasks={filteredTasks} />
                    </>
                )}
            </main>

            {/* Task Form Modal */}
            {showTaskForm && (
                <TaskForm
                    selectedDate={selectedDate}
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}
            {showEditTaskForm && (
                <TaskEditForm
                    selectedDate={selectedDate}
                    task={editingTask}
                    onSubmit={handleUpdateTask}
                    onCancel={() => setShowEditTaskForm(false)}
                />
            )}
        </div>
    );
}
