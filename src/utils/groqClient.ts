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
            content: 'You are a school portal assistant. Respond with only one of the following lowercase, no-space strings based on user intent: "smartwall", "visualworksheets", "pictorialstories", "projectcharts", "dictionary", "valueeducation", "scienceprojects", "languagegames", "mappointing", "subjectposters", "craftlessons", "artlessons", "parentteacheractivities", "rhymes", "holidayhomefun", "computerlessons", "mcqbank", "edumagazines", "gkscience", "teachermanuals", "earlycareer", "mindmapinfographics", "activity", "flashcards", "puzzlesriddles", "imagebank", "animatedcontent", "comics", "greatlives", "discovery", "learnhandwriting", "examtips", "brainteasers", "lunchbox", "theabcsong" or "safety" or "class3". Do not use spaces or uppercase letters.'
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
          '• Go to "One Click Resources"',
          '• Open Smart Wall',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/smart-wall'
      },
      visualworksheets: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Visual Worksheets',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/visual-worksheets'
      },
      pictorialstories: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Pictorial Stories',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/pictorial-stories'
      },
      projectcharts: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Project Charts',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/project-charts'
      },
      dictionary: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Dictionary',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/dictionary'
      },
      valueeducation: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Value Education',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/life-skills'
      },
      scienceprojects: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Science Projects',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/science-projects'
      },
      languagegames: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Language Games',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/language-games'
      },
      mappointing: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Map Pointing',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/map-pointing'
      },
      subjectposters: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Subject Posters',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/subject-posters'
      },
      craftlessons: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Craft Lessons',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/craft-lessons'
      },
      artlessons: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Art Lessons',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/art-lessons'
      },
      parentteacheractivities: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Parent Teacher Activities',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/parent-teacher-activities'
      },
      rhymes: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Rhymes',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/rhymes'
      },
      holidayhomefun: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Holiday Home Fun',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/holiday-home-fun'
      },
      computerlessons: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Computer Lessons',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/computer-lessons'
      },
      mcqbank: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open MCQ Bank',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/mcq-bank'
      },
      edumagazines: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Edu Magazines',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/edu-magazines'
      },
      gkscience: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open GK Science',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/gk-science'
      },
      teachermanuals: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Teacher Manuals',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/teacher-manuals'
      },
      earlycareer: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Early Career',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/early-career'
      },
      mindmapinfographics: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Mind Map Infographics',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/mind-map-infographics'
      },
      activity: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Activity',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/activity'
      },
      flashcards: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Flash Cards',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/flash-cards'
      },
      puzzlesriddles: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Puzzles Riddles',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/puzzles-riddles'
      },
      imagebank: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Image Bank',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/imagebank'
      },
      animatedcontent: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Animated Content',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/animated-content'
      },
      comics: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Comics',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/comics'
      },
      greatlives: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Great Lives',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/great-lives'
      },
      discovery: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Discovery',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/discovery'
      },
      learnhandwriting: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Learn Hand Writing',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/learn-hand-writing'
      },
      examtips: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Exam Tips',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/exam-tips'
      },
      brainteasers: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Brain Teasers',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/brain-teasers'
      },
      lunchbox: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Lunch Box',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/lunch-box'
      },
      safety: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Safety',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/sections/safety'
      },
      theabcsong: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Safety',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://myschool-v1.s3.ap-south-1.amazonaws.com/ACADEMIC/thumbnails/CLASS/UKG/ENGLISH/COURSE_BOOK/1.THE%20ABC%20SONG/UKGENI5401001JPC.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250624T121143Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAYRH5M27S4KBQYPPD%2F20250624%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=596dbd5afe0ca253db9929836f0ff9823b42a9e6af7c1398f8ca4f8ede30805a'
      },
      class3: {
        steps: [
          '• Go to "One Click Resources"',
          '• Open Class 3',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-3?main=0&mu=6'
      }
    };
    const normalizedIntent = intent.toLowerCase().replace(/\s/g, '').trim();
    return responses[normalizedIntent as keyof typeof responses] || {
      steps: ['Sorry, I could not recognize that section. Please try again.'],
      url: ''
    };
};