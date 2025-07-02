import React, { useState } from 'react';
import { raiseIssue } from '../utils/api';

type Message = { from: 'user' | 'bot', text: string };

export default function Chatbot() {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [issueText, setIssueText] = useState('');

  const handleIssueSubmit = async () => {
    if (!issueText.trim()) return;
    setChatMessages([...chatMessages, { from: 'user', text: issueText }]);
    try {
      const { issueId } = await raiseIssue(issueText);
      setChatMessages(prev => [
        ...prev,
        { from: 'bot', text: `Your issue has been raised to the support team with a token id ${issueId}. We will get back to you in short while.` }
      ]);
    } catch {
      setChatMessages(prev => [
        ...prev,
        { from: 'bot', text: 'Sorry, failed to raise issue. Please try again.' }
      ]);
    }
    setIssueText('');
  };

  return (
    <div>
      <div>
        {chatMessages.map((msg, i) => (
          <div key={i} style={{ color: msg.from === 'bot' ? 'blue' : 'black' }}>
            <b>{msg.from}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={issueText}
        onChange={e => setIssueText(e.target.value)}
        placeholder="Describe your issue"
      />
      <button onClick={handleIssueSubmit}>Send Issue</button>
    </div>
  );
}