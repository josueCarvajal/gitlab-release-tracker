// DateRangePicker.tsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangePicker.css';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="date-range-picker">
      <DatePicker
        selected={startDate}
        onChange={date => onStartDateChange(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="date-picker"
        dateFormat="dd/MM/yyyy"
      />
      <DatePicker
        selected={endDate}
        onChange={date => onEndDateChange(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        className="date-picker"
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default DateRangePicker;