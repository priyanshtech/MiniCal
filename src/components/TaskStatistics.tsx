'use client';

type Task = {
    id: string;
    completed: boolean;
};

type TaskStatisticsProps = {
    tasks: Task[];
};

export default function TaskStatistics({ tasks }: TaskStatisticsProps) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = tasks.filter(t => !t.completed).length;

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg shadow p-4">
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-card-foreground">{totalTasks}</p>
            </div>
            <div className="bg-card rounded-lg shadow p-4">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {completedTasks}
                </p>
            </div>
            <div className="bg-card rounded-lg shadow p-4">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {pendingTasks}
                </p>
            </div>
        </div>
    );
}
