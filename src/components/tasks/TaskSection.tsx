'use client';

import { MdDelete } from "react-icons/md";

type Task = {
    id: string;
    title: string;
    description?: string | null;
    date: string;
    completed: boolean;
    priority: string;
};

type TaskSectionProps = {
    tasks: Task[];
    selectedDate: Date;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onAddTask: () => void;
};

export default function TaskSection({
    tasks,
    selectedDate,
    onToggle,
    onDelete,
    onAddTask
}: TaskSectionProps) {
    const dateStr = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Get priority color
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="bg-card rounded-lg shadow p-6 flex flex-col h-120">
            <div className="flex  justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Tasks</h2>
                <button
                    onClick={onAddTask}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    + Add Task
                </button>
                
            </div>
            <h2 className="text-xl font-bold mb-4">{dateStr}</h2>

            {/* Task List Content */}
            <div className="flex1 overflow-y-auto">
                

                {tasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No tasks for this date</p>
                        <p className="text-sm mt-2">Click "Add Task" to create one</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {tasks.map(task => (
                            <div
                                key={task.id}
                                className={`task-item border border-border rounded-lg p-4 transition-all ${task.completed ? 'bg-muted opacity-75' : 'bg-card'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => onToggle(task.id, !task.completed)}
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />

                                    <div className="flex-1">
                                        <h3
                                            className={`font-semibold ${task.completed ? 'text-muted-foreground' : 'text-card-foreground'
                                                }`}
                                        >
                                            {task.title}
                                        </h3>

                                        {task.description && (
                                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                                        )}

                                        <span
                                            className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(
                                                task.priority
                                            )}`}
                                        >
                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => onDelete(task.id)}
                                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors text-xl"
                                        title="Delete task"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
