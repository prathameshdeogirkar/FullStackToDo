import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Addtask from './Addtask';


const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ showcomponent, setShowcomponent}) => {

  const [events, setEvents] = useState([]); 
  const [startdate, setStartdate] = useState('');

  const handleSelectSlot = ({ start }) => {
    if (!start) return; 

    const formattedDate = dayjs(start).format('YYYY-MM-DD'); // Convert to readable format
    console.log('Selected Date:', formattedDate);
    setStartdate(formattedDate);

    setShowcomponent(true); 
  };

  return (
    <div className="h-[92vh] w-[60vw] text-2xl bg-amber-300 border-4 border-black myShadow mt-6 ">
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        view="month"
        selectable
        events={events}
        onSelectSlot={handleSelectSlot}
        
        
        className="rbc-calendar  "
        components={{
          toolbar: () => null, 
        }}
      />

      {showcomponent && (
        <Addtask
          setShowcompo={setShowcomponent}
          setEvents={setEvents}
          events={events}
          startdate={startdate}
        />
      )}
    </div>
  );
};

export default MyCalendar;
