'use client';

import { useState } from 'react';

export default function TaskForm({ selectedDate, onSubmit, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a task title');
            return;
        }

        // Create ISO date string for the selected date
        const dateStr = selectedDate.toISOString();

        onSubmit({
            title: title.trim(),
            description: description.trim(),
            date: dateStr,
            priority
        });

        // Reset form
        setTitle('');
        setDescription('');
        setPriority('medium');
    };

    return (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center p-4 ">
            <div className="border border-border rounded-lg shadow-lg max-w-md w-full p-6 bg-white">
                <h2 className="text-lg font-semibold mb-4 text-card-foreground">Add New Task</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-xs font-medium text-foreground mb-1.5">
                            Task Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                            placeholder="e.g., Buy groceries"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label htmlFor="description" className="block text-xs font-medium text-foreground mb-1.5">
                            Description (Optional)
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground resize-none"
                            placeholder="Add more details..."
                            rows={3}
                        />
                    </div>

                    {/* Priority Select */}
                    <div>
                        <label htmlFor="priority" className="block text-xs font-medium text-foreground mb-1.5">
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-foreground"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Date Display */}
                    <div className="bg-muted/50 p-3 rounded-md border border-border">
                        <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Date:</span>{' '}
                            {selectedDate.toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    {/* Buttons */}
                    <div className="flex gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-muted text-foreground py-2 px-4 rounded-md hover:bg-muted/80 transition-colors font-medium text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:opacity-90 transition-opacity font-medium text-sm"
                        >
                            Add Task
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}
