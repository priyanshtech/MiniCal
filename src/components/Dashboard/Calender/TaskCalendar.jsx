import { useState, memo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskCalendar = memo(function TaskCalendar({ tasks, dayRatings, onDateSelect }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Handle when user clicks a date
    const handleDateClick = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    // Add custom class to tiles with tasks and ratings
    const tileClassName = ({ date }) => {
        const dateStr = date.toISOString().split('T')[0];
        const classes = [];

        // Check for tasks
        const hasTasks = tasks.some(task => {
            const taskDate = new Date(task.date).toISOString().split('T')[0];
            return taskDate === dateStr;
        });
        if (hasTasks) classes.push('has-tasks');

        // Check for ratings
        if (dayRatings && dayRatings[dateStr]) {
            const rating = dayRatings[dateStr];
            if (rating === 'good') classes.push('rating-good');
            if (rating === 'average') classes.push('rating-average');
            if (rating === 'bad') classes.push('rating-bad');
        }

        return classes.join(' ');
    };

    return (
        <div className="bg-card rounded-lg border border-border p-5">
            <h2 className="text-base font-medium mb-4 text-card-foreground">Calendar</h2>
            <div className="calendar-container">
                <Calendar
                    onChange={(value) => handleDateClick(value)}
                    value={selectedDate}
                    tileClassName={tileClassName}
                    className="rounded-md border border-border"
                />
            </div>
        </div>
    );
});

export default TaskCalendar;
