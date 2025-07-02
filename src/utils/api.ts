export async function raiseIssue(description: string): Promise<{ issueId: string }> {
    const res = await fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    if (!res.ok) throw new Error('Failed to raise issue');
    return res.json();
  }