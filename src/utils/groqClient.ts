const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const analyzeUserIntent = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a school portal assistant. Respond with only: "grades", "attendance", "assignments", "fees", or "general" based on user intent.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.1,
        max_tokens: 10
      })
    });

    const data: GroqResponse = await response.json();
    return data.choices[0]?.message?.content?.toLowerCase().trim() || 'general';
  } catch (error) {
    console.error('Groq API error:', error);
    return 'general';
  }
};

export const getHardcodedResponse = (intent: string): { steps: string[], url: string } => {
  const responses = {
    grades: {
      steps: [
        '• Click on "Academic" in the main menu',
        '• Select "View Grades" from the dropdown',
        '• Choose the semester you want to view',
        '• Click "Generate Report" to see detailed grades'
      ],
      url: 'https://demo.myschool.in/academic/grades'
    },
    attendance: {
      steps: [
        '• Navigate to "Student Portal" section',
        '• Click on "Attendance Records"',
        '• Select the date range you want to check',
        '• View your attendance percentage and details'
      ],
      url: 'https://demo.myschool.in/student/attendance'  
    },
    assignments: {
      steps: [
        '• Go to "Assignments" tab in the dashboard',
        '• Filter by subject or due date',
        '• Click on any assignment to view details',
        '• Submit your work using the upload button'
      ],
      url: 'https://demo.myschool.in/assignments'
    },
    fees: {
      steps: [
        '• Access "Finance" section from main menu',
        '• Click on "Fee Status" to view pending dues',
        '• Select payment method if making payment',
        '• Download receipt after successful payment'
      ],
      url: 'https://demo.myschool.in/finance/fees'
    },
    general: {
      steps: [
        '• Use the main navigation menu to explore features',
        '• Check your dashboard for important notifications', 
        '• Contact support if you need additional help',
        '• Refer to the help section for detailed guides'
      ],
      url: 'https://demo.myschool.in/help'
    }
  };
  
  return responses[intent as keyof typeof responses] || responses.general;
};