import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Addtask from './Addtask';


const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const [events, setEvents] = useState([]); 
  const [showcompo, setShowcompo] = useState(false);
  const [startdate, setStartdate] = useState('');

  const handleSelectSlot = ({ start }) => {
    if (!start) return; 

    const formattedDate = dayjs(start).format('YYYY-MM-DD'); // Convert to readable format
    console.log('Selected Date:', formattedDate);
    setStartdate(formattedDate);

    setShowcompo(true); 
  };

  return (
    <div className="h-[100vh] w-[60vw] text-2xl bg-amber-300 border-4 border-black">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        view="month"
        selectable
        events={events}
        onSelectSlot={handleSelectSlot}
        
        
        className="rbc-calendar"
        components={{
          toolbar: () => null, 
        }}
      />

      {showcompo && (
        <Addtask
          setShowcompo={setShowcompo}
          setEvents={setEvents}
          events={events}
          startdate={startdate}
        />
      )}
    </div>
  );
};

export default MyCalendar;
