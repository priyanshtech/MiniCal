'use client';

import { MdEdit, MdDelete } from "react-icons/md";

export default function TaskSection({
    dayRatings,
    onRateDay,
    tasks,
    selectedDate,
    onToggle,
    onDelete,
    onAddTask
    ,handleEdit
}) {
    const dateStr = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Get priority color - minimal, subtle badges
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900';
            case 'medium':
                return 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900';
            case 'low':
                return 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900';
            default:
                return 'bg-muted text-muted-foreground border-border';
        }
    };

    return (
        <div className="bg-card rounded-lg border border-border p-5 flex flex-col h-130">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-base font-medium">Tasks</h2>
                <button
                    onClick={onAddTask}
                    className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity text-sm font-medium "
                >
                    Add Task
                </button>
                <select
                    onChange={(e) => onRateDay(e.target.value)}
                    className="border border-border rounded-md px-2 py-1 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    defaultValue=""
                >
                    <option value="" disabled>Rate Day</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="bad">Bad</option>
                </select>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{dateStr}</p>

            {/* Task List Content */}
            <div className="flex-1 overflow-y-auto">
                {tasks.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <p className="text-sm">No tasks for this date</p>
                        <p className="text-xs mt-1 opacity-75">Click &quot;Add Task&quot; to create one</p>
                    </div>
                ) : (
                    <div className="space-y-2.5">
                        {tasks.map(task => (
                            <div
                                key={task.id}
                                className={`group border border-border rounded-lg p-3.5 transition-all hover:border-muted-foreground/20 ${task.completed ? 'bg-muted/50' : 'bg-card'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => onToggle(task.id, !task.completed)}
                                        className="mt-0.5 w-4 h-4 rounded border-border cursor-pointer accent-black"
                                    /><button onClick={() => handleEdit(task.id)}>
  <MdEdit />
</button>


                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className={`text-sm font-medium ${task.completed
                                                ? 'text-muted-foreground'
                                                : 'text-card-foreground'
                                                }`}
                                        >
                                            {task.title}
                                        </h3>

                                        {task.description && (
                                            <p className={`text-xs mt-1 ${task.completed ? 'text-muted-foreground/75' : 'text-muted-foreground'
                                                }`}>
                                                {task.description}
                                            </p>
                                        )}

                                        <span
                                            className={`inline-block mt-2 px-1.5 py-0.5 text-[10px] font-medium rounded border ${getPriorityColor(
                                                task.priority
                                            )}`}
                                        >
                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => onDelete(task.id)}
                                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded transition-all text-lg"
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
