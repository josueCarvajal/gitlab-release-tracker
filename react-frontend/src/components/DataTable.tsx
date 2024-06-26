import React from 'react';
import './DataTable.css';

interface DataTableProps {
  data: {
    merged_at: string;
    target_release: string;
    jira_ticket: string;
    jira_link: string;
    issue_type: string;
    merge_title: string;
    source_branch: string;
    target_branch: string;
    created_at: string;
    web_url: string;
    merge_number: string;
  }[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="datatable-container">
    <table className="datatable">
      <thead>
        <tr>
          <th>Merged At</th>
          <th>Target Release</th>
          <th>Target Branch</th>
          <th>Jira Ticket</th>
          <th>Issue Type</th>
          <th>Merge Title</th>
          <th>Merge Link</th>
          <th>Source branch</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.merged_at}</td>
            <td>{item.target_release}</td>
            <td>{item.target_branch}</td>
            <td><a href={item.jira_link}>{item.jira_ticket}</a></td>
            <td>{item.issue_type}</td>
            <td>{item.merge_title}</td>
            <td><a href={item.web_url} target='_blank'>{item.merge_number}</a></td>
            <td>{item.source_branch}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default DataTable;
