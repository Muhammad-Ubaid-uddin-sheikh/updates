import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Fonts } from '../../../style';

const App = ({ apiResponse }) => {
  const [selected, setSelected] = useState('');

  const markedDates = {};
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Initialize all dates of the current month with a red background
  for (let d = new Date(firstDayOfMonth); d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
    const dateString = d.toISOString().split('T')[0];
    markedDates[dateString] = {
      selected: true,
      marked: true,
      dotColor: '#408639',
      selectedColor: '#408639',
      textColor: 'black'
    };
  }

  // Update dates from the API response to have a green background
  apiResponse?.forEach(item => {
    const apiDate = new Date(item.date);
    const nextDay = new Date(apiDate);
    nextDay.setDate(nextDay.getDate() + 1); // Add one day to the date
    const nextDayString = nextDay.toISOString().split('T')[0];
    
    if (
      nextDay.getMonth() === currentDate.getMonth() &&
      nextDay.getFullYear() === currentDate.getFullYear()
    ) {
      markedDates[nextDayString] = {
        selected: true,
        selectedColor: '#FF7575',
        textColor: 'white',
        dotColor: '#00adf5'
      };
    }
  });

  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      theme={{
        backgroundColor: 'rgba(64, 134, 57, 0.05)',
        calendarBackground: 'rgba(64, 134, 57, 0.05)',
        textSectionTitleColor: 'black',
        selectedDayTextColor: 'black',
        selectedDayBackgroundColor: 'black',
        todayTextColor: 'green',
        dayTextColor: '#2d4150',
        textDisabledColor: '#8C8C8C',
        dotColor: '#00adf5',
        selectedDotColor: 'black',
        arrowColor: 'black',
        monthTextColor: 'black',
        textDayFontFamily: Fonts.MEDIUM,
        textMonthFontFamily: Fonts.MEDIUM,
        textDayHeaderFontFamily: Fonts.MEDIUM,
        textDayFontSize: 15,
        textMonthFontSize: 15,
        textDayHeaderFontSize: 14,
        borderWidth: 0,
        borderRadius: 12,
        width: 350
      }}
      style={{
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: 'black',
        selectedDayTextColor: 'black',
        width: 'auto',
        borderRadius: 15
      }}
      markedDates={markedDates}
    />
  );
};

export default App;
