import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BookingPage = () => {
  const [date, setDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);

  // Simulate fetching available times for a given date
  const fetchAvailableTimes = (selectedDate) => {
    // This is a mock function. In a real application, you'd fetch this data from a backend.
    const times = [
      '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
    ];
    setAvailableTimes(times);
  };

  const handleDateSelect = (newDate) => {
    setDate(newDate);
    fetchAvailableTimes(newDate);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Select a Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
      
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Available Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {availableTimes.map((time) => (
              <Button key={time} variant="outline">{time}</Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;

