import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const [events, setEvents] = useState([]); // State to store events

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([
        {
          title: events.length+1 ,
          start,
          end,
        },
      ]);
    }
  };

  return (
    <div className="h-[100vh] w-[70vw]">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        view="month"
        onSelectSlot={handleSelectSlot}
        selectable // Enable date selection
        events={events} // Pass the events state
        className="rbc-calendar"
          components={{
          toolbar: () => null, // Hide the toolbar
        }}
      />
    </div>
  );
};

export default MyCalendar;