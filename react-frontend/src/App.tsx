import React, { useState } from 'react';
import axios from 'axios';
import DateRangePicker from './components/DateRangePicker';
import Dropdown from './components/DropDown';
import DataTable from './components/DataTable';

const options = [
  { label: 'Release/24.03', value: 'Release/24.03' },
  { label: 'Release/24.06', value: 'Release/24.06' },
  { label: 'Staging', value: 'Staging' }
];

axios.defaults.baseURL = 'http://localhost:8080'; 
const App: React.FC = () => {
  const [dateRange, setDateRange] = useState<any>(null);
  const [branch, setbranch] = useState(options[0].value);
  const [responseData, setResponseData] = useState<any[]>([]);

  const handleDateRangeSelect = (range: any) => {
    setDateRange(range);
  };

  const handleOptionSelect = (value: string) => {
    setbranch(value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/merge-requests', {
        params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
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
      <h1>Merge Release Tracker!</h1>
      <DateRangePicker onSelect={handleDateRangeSelect} />
      <Dropdown options={options} selectedValue={branch} onSelectChange={handleOptionSelect} />
      <button onClick={fetchData}>Fetch Data</button>
      <DataTable data={responseData} />
    </div>
  );
};

export default App;