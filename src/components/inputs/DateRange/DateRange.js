import React, { useState } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

import '../Calendar/CalendarModal.scss';

const DateRange = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Calendar
      onChange={(date) => setSelectedDate(date)}
      value={selectedDate}
      calendarType="US"
    />
  );

};

export default DateRange;