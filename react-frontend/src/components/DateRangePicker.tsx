import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface DateRangePickerProps {
  onSelect: (dateRange: any) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = ({ onSelect }) => {
  const [selection, setSelection] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleSelect = (ranges: any) => {
    setSelection(ranges.selection);
    onSelect(ranges.selection);
  };

  return (
    <div>
      <DateRangePicker
        ranges={[selection]}
        onChange={handleSelect}
      />
    </div>
  );
};

export default DateRangePickerComponent;