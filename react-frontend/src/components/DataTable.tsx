import React from 'react';

interface DataTableProps {
  data: {
    MergedAt: string;
    TargetRelease: string;
    JiraTicket: string;
    IssueType: string;
    MergeTitle: string;
    Description: string;
    State: string;
    Source: string;
    Target: string;
    CreatedAt: string;
  }[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  console.log(data)
  return (
    <table>
      <thead>
        <tr>
          <th>Merged At</th>
          <th>Target Release</th>
          <th>Jira Ticket</th>
          <th>Issue Type</th>
          <th>Merge Title</th>
          <th>Description</th>
          <th>State</th>
          <th>Source</th>
          <th>Target</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.MergedAt}</td>
            <td>{item.TargetRelease}</td>
            <td>{item.JiraTicket}</td>
            <td>{item.IssueType}</td>
            <td>{item.MergeTitle}</td>
            <td>{item.Description}</td>
            <td>{item.State}</td>
            <td>{item.Source}</td>
            <td>{item.Target}</td>
            <td>{item.CreatedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;