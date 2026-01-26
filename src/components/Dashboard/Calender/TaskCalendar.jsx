'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function TaskCalendar({ tasks, onDateSelect }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Handle when user clicks a date
    const handleDateClick = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    // Show dots on dates that have tasks
    const tileContent = ({ date }) => {
        const dateStr = date.toISOString().split('T')[0];

        // Check if this date has any tasks
        const hasTasks = tasks.some(task => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            return taskDate === dateStr;
        });

        // Show a dot if there are tasks on this date
        if (hasTasks) {
            return (
                <div className="flex justify-center mt-1">
                    <div className="w-1 h-1 bg-primary rounded-full"></div>
                </div>
            );
        }

        return null;
    };

    // Add custom class to tiles with tasks
    const tileClassName = ({ date }) => {
        const dateStr = date.toISOString().split('T')[0];
        const hasTasks = tasks.some(task => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            return taskDate === dateStr;
        });

        return hasTasks ? 'has-tasks' : '';
    };

    return (
        <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="text-base font-medium mb-4 text-card-foreground">Calendar</h2>
            <div className="calendar-container">
                <Calendar
                    onChange={(value) => handleDateClick(value)}
                    value={selectedDate}
                    tileContent={tileContent}
                    tileClassName={tileClassName}
                    className="rounded-md border border-border"
                />
            </div>
        </div>
    );
}
