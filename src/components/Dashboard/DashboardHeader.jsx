'use client';

export default function DashboardHeader({ userName }) {
    return (
        <header className="bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold text-card-foreground">MiniCal</h1>
                        <p className="text-xs text-muted-foreground mt-0.5">Welcome back, {userName}</p>
                    </div>
                    <a
                        href="/auth/logout"
                        className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all duration-200"
                    >
                        Logout
                    </a>
                </div>
            </div>
        </header>
    );
}
