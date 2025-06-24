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
            content: 'You are a school portal assistant. Respond with only one of the following lowercase, no-space strings based on user intent: "smartwall", "visualworksheets", "pictorialstories", "projectcharts", "dictionary", "valueeducation", "scienceprojects", "languagegames", "mappointing", "subjectposters", "craftlessons", "artlessons", "parentteacheractivities", "rhymes", "holidayhomefun", "computerlessons", "mcqbank", "edumagazines", "gkscience", "teachermanuals", "earlycareer", "mindmapinfographics", "activity", "flashcards", "puzzlesriddles", "imagebank", "animatedcontent", "comics", "greatlives", "discovery", "learnhandwriting", "examtips", "brainteasers", "lunchbox", or "safety". Do not use spaces or uppercase letters.'
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
    const intent = data.choices[0]?.message?.content?.toLowerCase().replace(/\s/g, '').trim() || 'general';
    console.log('Intent from API:', intent);
    return intent;
  } catch (error) {
    console.error('Groq API error:', error);
    return 'general';
  }
};

export const getHardcodedResponse = (intent: string): { steps: string[], url: string } => {
    const responses = {
      smartwall: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Smart Wall"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/smart-wall" target="_blank">Open Smart Wall</a>'
      },
      visualworksheets: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Visual Worksheets"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/visual-worksheets" target="_blank">Open Visual Worksheets</a>'
      },
      pictorialstories: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Pictorial Stories"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/pictorial-stories" target="_blank">Open Pictorial Stories</a>'
      },
      projectcharts: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Project Charts"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/project-charts" target="_blank">Open Project Charts</a>'
      },
      dictionary: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Dictionary"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/dictionary" target="_blank">Open Dictionary</a>'
      },
      valueeducation: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Value Education"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/life-skills" target="_blank">Open Value Education</a>'
      },
      scienceprojects: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Science Projects"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/science-projects" target="_blank">Open Science Projects</a>'
      },
      languagegames: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Language Games"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/language-games" target="_blank">Open Language Games</a>'
      },
      mappointing: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Map Pointing"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/map-pointing" target="_blank">Open Map Pointing</a>'
      },
      subjectposters: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Subject Posters"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/subject-posters" target="_blank">Open Subject Posters</a>'
      },
      craftlessons: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Craft Lessons"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/craft-lessons" target="_blank">Open Craft Lessons</a>'
      },
      artlessons: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Art Lessons"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/art-lessons" target="_blank">Open Art Lessons</a>'
      },
      parentteacheractivities: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Parent Teacher Activities"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/parent-teacher-activities" target="_blank">Open Parent Teacher Activities</a>'
      },
      rhymes: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Rhymes"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/rhymes" target="_blank">Open Rhymes</a>'
      },
      holidayhomefun: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Holiday Home Fun"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/holiday-home-fun" target="_blank">Open Holiday Home Fun</a>'
      },
      computerlessons: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Computer Lessons"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/computer-lessons" target="_blank">Open Computer Lessons</a>'
      },
      mcqbank: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "MCQ Bank"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/mcq-bank" target="_blank">Open MCQ Bank</a>'
      },
      edumagazines: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Edu Magazines"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/edu-magazines" target="_blank">Open Edu Magazines</a>'
      },
      gkscience: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "GK Science"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/gk-science" target="_blank">Open GK Science</a>'
      },
      teachermanuals: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Teacher Manuals"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/teacher-manuals" target="_blank">Open Teacher Manuals</a>'
      },
      earlycareer: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Early Career"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/early-career" target="_blank">Open Early Career</a>'
      },
      mindmapinfographics: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Mind Map Infographics"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/mind-map-infographics" target="_blank">Open Mind Map Infographics</a>'
      },
      activity: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Activity"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/activity" target="_blank">Open Activity</a>'
      },
      flashcards: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Flash Cards"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/flash-cards" target="_blank">Open Flash Cards</a>'
      },
      puzzlesriddles: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Puzzles Riddles"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/puzzles-riddles" target="_blank">Open Puzzles Riddles</a>'
      },
      imagebank: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Image Bank"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/imagebank" target="_blank">Open Image Bank</a>'
      },
      animatedcontent: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Animated Content"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/animated-content" target="_blank">Open Animated Content</a>'
      },
      comics: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Comics"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/comics" target="_blank">Open Comics</a>'
      },
      greatlives: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Great Lives"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/great-lives" target="_blank">Open Great Lives</a>'
      },
      discovery: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Discovery"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/discovery" target="_blank">Open Discovery</a>'
      },
      learnhandwriting: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Learn Hand Writing"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/learn-hand-writing" target="_blank">Open Learn Hand Writing</a>'
      },
      examtips: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Exam Tips"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/academic/exam-tips" target="_blank">Open Exam Tips</a>'
      },
      brainteasers: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Brain Teasers"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/brain-teasers" target="_blank">Open Brain Teasers</a>'
      },
      lunchbox: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Lunch Box"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/lunch-box" target="_blank">Open Lunch Box</a>'
      },
      safety: {
        steps: [
          '• Go to "One Click Resources Centre"',
          '• Click "Safety"',
          '• Browse and select content',
          '• Download or print using icons',
          '• Use "select image" for multiple files'
        ],
        url: '<a href="https://demo.myschool.in/views/sections/safety" target="_blank">Open Safety</a>'
      }
    };
    const normalizedIntent = intent.toLowerCase().replace(/\s/g, '').trim();
    return responses[normalizedIntent as keyof typeof responses] || {
      steps: ['Sorry, I could not recognize that section. Please try again.'],
      url: ''
    };
};