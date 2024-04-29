import React, { useState } from 'react';
import axios from 'axios';
import DateRangePicker from './components/DatePicker';
import Dropdown from './components/DropDown';
import DataTable from './components/DataTable';
import './App.css'

const options = [
  { label: 'Release/24.03', value: 'Release/24.03' },
  { label: 'Release/24.06', value: 'release/WR-Studio-24.06' },
  { label: 'Staging', value: 'Staging' }
];

axios.defaults.baseURL = 'http://localhost:8080'; 
const App: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [branch, setbranch] = useState(options[0].value);
  const [responseData, setResponseData] = useState<any[]>([]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleOptionSelect = (value: string) => {
    setbranch(value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/merge-requests', {
        params: {
        startDate: startDate,
        endDate: endDate,
        branch
      }
      });
      setResponseData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <nav className='navbar-container'> 
      Target Branch: <Dropdown options={options} selectedValue={branch} onSelectChange={handleOptionSelect} />
      Date Range: <DateRangePicker 
             startDate={startDate}
             endDate={endDate}
             onStartDateChange={handleStartDateChange}
             onEndDateChange={handleEndDateChange}

      />
      <button onClick={fetchData}>Fetch Data</button>
      
      </nav>
      {/* <DateRangePicker onSelect={handleDateRangeSelect} />
       */}
      <DataTable data={responseData} />
    </div>
  );
};

export default App;