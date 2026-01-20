'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import CalendarSection from '@/components/CalendarSection';
import TaskSection from '@/components/tasks/TaskSection';
import TaskStatistics from '@/components/TaskStatistics';
import TaskForm from '@/components/tasks/AddTask';

type Task = {
    id: string;
    title: string;
    description?: string | null;
    date: string;
    completed: boolean;
    priority: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

type DashboardClientProps = {
    user: any;
};

export default function DashboardClient({ user }: DashboardClientProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all tasks on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Filter tasks when selected date or tasks change
    useEffect(() => {
        filterTasksByDate(selectedDate);
    }, [selectedDate, tasks]);

    // Fetch tasks from API
    const fetchTasks = async () => {
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
    };

    // Filter tasks by selected date
    const filterTasksByDate = (date: Date) => {
        const dateStr = date.toISOString().split('T')[0];
        const filtered = tasks.filter(task => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            return taskDate === dateStr;
        });
        setFilteredTasks(filtered);
    };

    // Handle date selection from calendar
    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    // Handle task toggle (mark complete/incomplete)
    const handleToggleTask = async (id: string, completed: boolean) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed })
            });

            if (response.ok) {
                await fetchTasks(); // Refresh tasks
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to update task');
            }
        } catch (error) {
            console.error('Error toggling task:', error);
            alert('Error updating task');
        }
    };

    // Handle task deletion
    const handleDeleteTask = async (id: string) => {
        console.log('Delete button clicked for task:', id);

        if (!confirm('Are you sure you want to delete this task?')) {
            console.log('Delete cancelled by user');
            return;
        }

        console.log('Deleting task:', id);
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('Task deleted successfully');
                await fetchTasks(); // Refresh tasks
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Error deleting task');
        }
    };

    // Handle new task creation
    const handleCreateTask = async (taskData: {
        title: string;
        description: string;
        date: string;
        priority: string;
    }) => {
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                await fetchTasks(); // Refresh tasks
                setShowTaskForm(false); // Close form
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to create task');
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Error creating task');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader userName={user?.name || user?.email} />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {error && (
                    <div className="mb-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading tasks...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <CalendarSection
                            tasks={tasks}
                            onDateSelect={handleDateSelect}
                        />

                        <TaskSection
                            tasks={filteredTasks}
                            selectedDate={selectedDate}
                            onToggle={handleToggleTask}
                            onDelete={handleDeleteTask}
                            onAddTask={() => setShowTaskForm(true)}
                        />
                    </div>
                )}

                <TaskStatistics tasks={tasks} />
            </main>

            {/* Task Form Modal */}
            {showTaskForm && (
                <TaskForm
                    selectedDate={selectedDate}
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowTaskForm(false)}
                />
            )}
        </div>
    );
}
