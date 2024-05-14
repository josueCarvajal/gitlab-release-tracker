import React, { useState } from 'react';
import axios from 'axios';
import DateRangePicker from './components/DatePicker';
import Dropdown from './components/DropDown';
import DataTable from './components/DataTable';
import './App.css'

const options = [
  { label: 'main', value: 'main' },
  { label: 'Release/24.03', value: 'release/WR-Studio-24.03-1.0.0' },
  { label: 'Release/24.06', value: 'release/WR-Studio-24.06' },
  { label: 'Staging/AuditTool', value: 'staging/audit-tool-integration' }
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
      <header>
        <nav className='navbar-container'> 
        <h1>Merge Release Tracker</h1>
          <div> Target Branch: <Dropdown options={options} selectedValue={branch} onSelectChange={handleOptionSelect} /> </div>
          <div>
            Date Range: <DateRangePicker 
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={handleStartDateChange}
                  onEndDateChange={handleEndDateChange}
                  
                  />
          </div>
        <button onClick={fetchData}>Fetch Data</button>
      </nav>
      </header>
      <body >
      <DataTable data={responseData} />
      </body>
      {/* <DateRangePicker onSelect={handleDateRangeSelect} />*/}
    </div>
  );
};

export default App;