import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Issue } from '../types/Issue';
// @ts-ignore
import { issueService } from '../utils/issueService';


const IssuesPage: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    loadIssues();
    const handleNewIssue = () => loadIssues();
    window.addEventListener('issueAdded', handleNewIssue);
    return () => window.removeEventListener('issueAdded', handleNewIssue);
  }, []);

  const loadIssues = () => {
    const allIssues = issueService.getAllIssues();
    allIssues.sort((a: Issue, b: Issue) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    });
    setIssues(allIssues);
  };

  const handleStatusChange = (id: string, status: 'open' | 'resolved') => {
    issueService.updateIssueStatus(id, status);
    loadIssues();
  };

  return (
    <div className="issues-container p-4">
      <h1 className="text-2xl font-bold mb-4">User Issues</h1>

      <div className="grid gap-4">
        {issues.map(issue => (
          <div key={issue.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">Request ID: {issue.id}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                issue.status === 'open' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {issue.status}
              </span>
            </div>

            <p className="text-gray-600 mb-2">{issue.description}</p>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                {new Date(issue.timestamp).toLocaleString()}
              </span>

              <select 
                value={issue.status}
                onChange={(e) => handleStatusChange(issue.id, e.target.value as 'open' | 'resolved')}
                className="border rounded px-2 py-1"
              >
                <option value="open">Open</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {issues.length === 0 && (
        <p className="text-gray-500 text-center mt-8">No issues reported yet.</p>
      )}
    </div>
  );
};

export default IssuesPage;
