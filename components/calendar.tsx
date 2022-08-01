import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import React from 'react';

const CalendarComponent = () => {
    const calendarRef = React.createRef<Calendar>();
    const handleClickNextButton = () => {
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.next();
    };
    return (
        <div>
            <Calendar
                ref={calendarRef}
                height="600px"
                view='month'
                month={{
                    dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    visibleWeeksCount: 5,
                }}>
            </Calendar>
            <button onClick={handleClickNextButton}>Go next!</button>
        </div>
    )
}
export default CalendarComponent