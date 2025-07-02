import { Issue } from '../types/Issue';

// Store issues in localStorage
const ISSUES_KEY = 'chat_issues';

export const issueService = {
  getAllIssues: (): Issue[] => {
    const issues = localStorage.getItem(ISSUES_KEY);
    return issues ? JSON.parse(issues) : [];
  },

  addIssue: (description: string): Issue => {
    const issues = issueService.getAllIssues();
    const newIssue: Issue = {
      id: `ISSUE-${Date.now()}`,
      description,
      timestamp: new Date().toISOString(),
      status: 'open'
    };
    
    issues.push(newIssue);
    localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
    // Dispatch event
    window.dispatchEvent(new Event('issueAdded'));
    return newIssue;
  },

  updateIssueStatus: (id: string, status: 'open' | 'resolved') => {
    const issues = issueService.getAllIssues();
    const updatedIssues = issues.map(issue => 
      issue.id === id ? { ...issue, status } : issue
    );
    localStorage.setItem(ISSUES_KEY, JSON.stringify(updatedIssues));
  }
};