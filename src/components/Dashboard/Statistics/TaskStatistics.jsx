'use client';

export default function TaskStatistics({ tasks }) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = tasks.filter(t => !t.completed).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <section className="mt-8">
            {/* Section Header */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-card-foreground">Daily Analysis</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                    Your progress for the selected day
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-lg p-5 hover:border-muted-foreground/20 transition-colors">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Total Tasks</p>
                    <p className="text-4xl font-semibold text-card-foreground">{totalTasks}</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-5 hover:border-emerald-200 dark:hover:border-emerald-900 transition-colors">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Completed</p>
                    <p className="text-4xl font-semibold text-emerald-600 dark:text-emerald-400">
                        {completedTasks}
                    </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-5 hover:border-amber-200 dark:hover:border-amber-900 transition-colors">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Pending</p>
                    <p className="text-4xl font-semibold text-amber-600 dark:text-amber-400">
                        {pendingTasks}
                    </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-colors">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Completion</p>
                    <p className="text-4xl font-semibold text-primary">
                        {completionRate}%
                    </p>
                </div>
            </div>
        </section>
    );
}
