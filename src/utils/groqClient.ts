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
      smartWall: {
        steps: [
          '• Submit "notifications" to submit work',
          '• Filter by "notifications" to generate report',
          '• Navigate to "dashboard" to download receipt',
          '• Filter by "support page" to check status'
        ],
        url: 'https://demo.myschool.in/academic/page1'
      },
      visualWorkSheets: {
        steps: [
          '• Check "payment page" to contact support',
          '• Choose "student portal" to check status',
          '• Navigate to "academic section" to view details',
          '• Access "help section" to filter results'
        ],
        url: 'https://demo.myschool.in/academic/page2'
      },
      pictorialStories: {
        steps: [
          '• Navigate to "attendance records" to upload files',
          '• Refer to "help section" to download receipt',
          '• Access "grade report" to check status',
          '• Filter by "help section" to contact support'
        ],
        url: 'https://demo.myschool.in/help/page3'
      },
      projectCharts: {
        steps: [
          '• Download "academic section" to select date range',
          '• Choose "main menu" to upload files',
          '• Refer to "attendance records" to contact support',
          '• Go to "help section" for more information'
        ],
        url: 'https://demo.myschool.in/portal/page4'
      },
      dictionary: {
        steps: [
          '• Navigate to "student portal" to upload files',
          '• Filter by "notifications" to filter results',
          '• Refer to "support page" to generate report',
          '• Click on "assignments tab" to upload files'
        ],
        url: 'https://demo.myschool.in/assignments/page5'
      },
      valueEducation: {
        steps: [
          '• Contact "student portal" for more information',
          '• Refer to "main menu" to check status',
          '• Refer to "academic section" for more information',
          '• Choose "attendance records" to contact support'
        ],
        url: 'https://demo.myschool.in/student/page6'
      },
      scienceProjects: {
        steps: [
          '• Click on "grade report" for more information',
          '• View "assignments tab" to contact support',
          '• Filter by "assignments tab" to select date range',
          '• Filter by "payment page" to upload files'
        ],
        url: 'https://demo.myschool.in/student/page7'
      },
      languageGames: {
        steps: [
          '• Download "attendance records" for more information',
          '• Access "main menu" to download receipt',
          '• Choose "assignments tab" to contact support',
          '• View "payment page" to select date range'
        ],
        url: 'https://demo.myschool.in/finance/page8'
      },
      mapPointing: {
        steps: [
          '• Refer to "finance section" for more information',
          '• Select "dashboard" to filter results',
          '• Access "attendance records" to download receipt',
          '• Select "notifications" for more information'
        ],
        url: 'https://demo.myschool.in/student/page9'
      },
      subjectPosters: {
        steps: [
          '• Navigate to "student portal" to upload files',
          '• View "help section" to contact support',
          '• Submit "academic section" for more information',
          '• Choose "attendance records" to view details'
        ],
        url: 'https://demo.myschool.in/student/page10'
      },
      craftLessons: {
        steps: [
          '• Select "main menu" to generate report',
          '• Select "help section" to filter results',
          '• Go to "assignments tab" to view details',
          '• Refer to "attendance records" for more information'
        ],
        url: 'https://demo.myschool.in/assignments/page11'
      },
      artLessons: {
        steps: [
          '• Submit "grade report" to download receipt',
          '• Submit "academic section" to submit work',
          '• Refer to "grade report" to check status',
          '• Click on "dashboard" to filter results'
        ],
        url: 'https://demo.myschool.in/portal/page12'
      },
      parentTeacherActivities: {
        steps: [
          '• Navigate to "payment page" to filter results',
          '• Navigate to "payment page" to select date range',
          '• Select "assignments tab" to select date range',
          '• Refer to "notifications" to upload files'
        ],
        url: 'https://demo.myschool.in/help/page13'
      },
      rhymes: {
        steps: [
          '• Download "student portal" to view details',
          '• Check "grade report" to submit work',
          '• Filter by "notifications" for more information',
          '• Contact "grade report" to check status'
        ],
        url: 'https://demo.myschool.in/help/page14'
      },
      holidayHomeFun: {
        steps: [
          '• Check "help section" to upload files',
          '• Select "payment page" to download receipt',
          '• Contact "assignments tab" to filter results',
          '• Access "main menu" to contact support'
        ],
        url: 'https://demo.myschool.in/assignments/page15'
      },
      computerLessons: {
        steps: [
          '• View "main menu" to download receipt',
          '• Navigate to "academic section" to generate report',
          '• Select "payment page" for more information',
          '• Choose "main menu" to view details'
        ],
        url: 'https://demo.myschool.in/portal/page16'
      },
      mcqBank: {
        steps: [
          '• Go to "payment page" to upload files',
          '• Select "academic section" to download receipt',
          '• Refer to "grade report" to filter results',
          '• Check "grade report" to upload files'
        ],
        url: 'https://demo.myschool.in/dashboard/page17'
      },
      eduMagazines: {
        steps: [
          '• Go to "notifications" to view details',
          '• Navigate to "assignments tab" to select date range',
          '• Contact "finance section" to filter results',
          '• Contact "finance section" to check status'
        ],
        url: 'https://demo.myschool.in/academic/page18'
      },
      gkScience: {
        steps: [
          '• Click on "attendance records" to submit work',
          '• Filter by "grade report" to view details',
          '• Refer to "support page" to select date range',
          '• Click on "finance section" for more information'
        ],
        url: 'https://demo.myschool.in/help/page19'
      },
      teacherManuals: {
        steps: [
          '• Choose "attendance records" to view details',
          '• Filter by "academic section" to contact support',
          '• Choose "main menu" to select date range',
          '• Go to "grade report" to view details'
        ],
        url: 'https://demo.myschool.in/assignments/page20'
      },
      earlyCareer: {
        steps: [
          '• Go to "assignments tab" to contact support',
          '• Submit "main menu" to filter results',
          '• Access "dashboard" for more information',
          '• Submit "support page" for more information'
        ],
        url: 'https://demo.myschool.in/assignments/page21'
      },
      mindMapInfographics: {
        steps: [
          '• Refer to "assignments tab" to select date range',
          '• Navigate to "finance section" to generate report',
          '• Navigate to "support page" to filter results',
          '• Select "grade report" to generate report'
        ],
        url: 'https://demo.myschool.in/portal/page22'
      },
      activity: {
        steps: [
          '• Choose "student portal" to contact support',
          '• View "help section" to download receipt',
          '• Filter by "support page" to check status',
          '• Download "academic section" to filter results'
        ],
        url: 'https://demo.myschool.in/dashboard/page23'
      },
      flashCards: {
        steps: [
          '• Download "payment page" to select date range',
          '• Access "dashboard" to select date range',
          '• Contact "help section" to contact support',
          '• Check "help section" to contact support'
        ],
        url: 'https://demo.myschool.in/portal/page24'
      },
      puzzlesRiddles: {
        steps: [
          '• Filter by "payment page" for more information',
          '• Click on "attendance records" to upload files',
          '• Download "dashboard" for more information',
          '• Download "payment page" to contact support'
        ],
        url: 'https://demo.myschool.in/student/page25'
      },
      imageBank: {
        steps: [
          '• Select "payment page" to select date range',
          '• Go to "grade report" to select date range',
          '• Select "academic section" to upload files',
          '• Download "help section" to submit work'
        ],
        url: 'https://demo.myschool.in/finance/page26'
      },
      animatedContent: {
        steps: [
          '• Click on "payment page" to filter results',
          '• Filter by "finance section" to check status',
          '• Choose "attendance records" to upload files',
          '• Choose "academic section" to generate report'
        ],
        url: 'https://demo.myschool.in/portal/page27'
      },
      comics: {
        steps: [
          '• Click on "attendance records" to select date range',
          '• Select "assignments tab" to upload files',
          '• View "attendance records" to generate report',
          '• Contact "main menu" to check status'
        ],
        url: 'https://demo.myschool.in/academic/page28'
      },
      greatLives: {
        steps: [
          '• Select "payment page" to select date range',
          '• Choose "notifications" to filter results',
          '• Access "help section" to upload files',
          '• Go to "notifications" to upload files'
        ],
        url: 'https://demo.myschool.in/dashboard/page29'
      },
      discovery: {
        steps: [
          '• Refer to "dashboard" to contact support',
          '• Click on "payment page" for more information',
          '• Select "payment page" to submit work',
          '• Go to "academic section" to view details'
        ],
        url: 'https://demo.myschool.in/academic/page30'
      },
      learnHandWriting: {
        steps: [
          '• Select "main menu" for more information',
          '• Choose "student portal" to view details',
          '• Filter by "finance section" to upload files',
          '• Refer to "payment page" to filter results'
        ],
        url: 'https://demo.myschool.in/portal/page31'
      },
      examTips: {
        steps: [
          '• Filter by "student portal" to upload files',
          '• Choose "support page" to check status',
          '• Go to "help section" to contact support',
          '• View "grade report" to contact support'
        ],
        url: 'https://demo.myschool.in/student/page32'
      },
      brainTeasers: {
        steps: [
          '• Refer to "finance section" to check status',
          '• Navigate to "support page" to contact support',
          '• Navigate to "academic section" to filter results',
          '• Go to "support page" to download receipt'
        ],
        url: 'https://demo.myschool.in/assignments/page33'
      },
      lunchBox: {
        steps: [
          '• Choose "notifications" to contact support',
          '• Check "help section" to contact support',
          '• Submit "payment page" to upload files',
          '• Filter by "notifications" to generate report'
        ],
        url: 'https://demo.myschool.in/dashboard/page34'
      },
      safety: {
        steps: [
          '• Click on "dashboard" to upload files',
          '• Contact "support page" to check status',
          '• Go to "assignments tab" to select date range',
          '• View "notifications" to generate report'
        ],
        url: 'https://demo.myschool.in/dashboard/page35'
      }
    };
    
    return responses[intent as keyof typeof responses] || responses.smartWall;
  };  