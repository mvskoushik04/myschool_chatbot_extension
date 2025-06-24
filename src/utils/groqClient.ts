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
            content: 'You are a school portal assistant. Respond with only one of the following lowercase, no-space strings based on user intent: "smartwall", "visualworksheets", "pictorialstories", "projectcharts", "dictionary", "valueeducation", "scienceprojects", "languagegames", "mappointing", "subjectposters", "craftlessons", "artlessons", "parentteacheractivities", "rhymes", "holidayhomefun", "computerlessons", "mcqbank", "edumagazines", "gkscience", "teachermanuals", "earlycareer", "mindmapinfographics", "activity", "flashcards", "puzzlesriddles", "imagebank", "animatedcontent", "comics", "greatlives", "discovery", "learnhandwriting", "examtips", "brainteasers", "lunchbox", "safety", "kindergarten", "nursery", "lkg", "ukg", "class1", "class2", "class3", "class4", "class5", "class6", "class7", "class8", "class9", "class10", "homeschooling", "learningcentre", "theabcsong", "grade1", "grade2", "grade3", "grade4", "grade5", "grade6", "grade7", "grade8", "grade9", "grade10". Do not use spaces or uppercase letters.'
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
      kindergarten: {
        steps: [
          '• Go to "Academic"',
          '• Select "Class"',
          '• Select "Kindergarten"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/kindergarten?main=0&mu=0'
      },
      nursery: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Nursery"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/nursery?main=0&mu=1'
      },
      lkg: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "LKG"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/lkg?main=0&mu=2'
      },
      ukg: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "UKG"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/ukg?main=0&mu=3'
      },
      class1: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Class 1"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-1?main=0&mu=4'
      },
      class2: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Class 2"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-2?main=0&mu=5'
      },
      class3: {
        steps: [
          '• Go to "Academic"',
          '• Select "Class"',
          '• Select "Class 3"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-3?main=0&mu=6'
      },
      class4: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Class 4"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-4?main=0&mu=7'
      },
      class5: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Class 5"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-5?main=0&mu=8'
      },
      class6: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Class 6"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-6?main=0&mu=9'
      },
      class7: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Class 7"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-7?main=0&mu=10'
      },
      class8: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Class 8"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-8?main=0&mu=11'
      },
      class9: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Class 9"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-9?main=0&mu=12'
      },
      class10: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Class 10"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/class-10?main=0&mu=13'
      },
      grade1: {
        steps: [
            '• Go to "Academic"',
            '• Select "GRADE"',
            '• Select "GRADE 1"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-1?main=1&mu=0'
      },
      grade2: {
        steps: [
            '• Go to "Academic"',
            '• Select "GRADE"',
            '• Select "GRADE 2"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-2?main=1&mu=1'
      },
      grade3: {
        steps: [
          '• Go to "Academic"',
          '• Select "GRADE"',
          '• Select "GRADE 3"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-3?main=1&mu=2'
      },
      grade4: {
        steps: [
            '• Go to "Academic"',
            '• Select "GRADE"',
            '• Select "GRADE 4"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-4?main=1&mu=3'
      },
      grade5: {
        steps: [
            '• Go to "Academic"',
            '• Select "GRADE"',
            '• Select "GRADE 5"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-5?main=1&mu=4'
      },
      grade6: {
        steps: [
            '• Go to "Academic"',
            '• Select "GRADE"',
            '• Select "GRADE 6"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-6?main=1&mu=5'
      },
      grade7: {
        steps: [
            '• Go to "Academic"',
            '• Select "GRADE"',
            '• Select "GRADE 7"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-7?main=1&mu=6'
      },
      grade8: {
        steps: [
            '• Go to "Academic"',
            '• Select "GRADE"',
            '• Select "GRADE 8"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-8?main=1&mu=7'
      },
      grade9: {
        steps: [
            '• Go to "Academic"',
            '• Select "GRADE"',
            '• Select "GRADE 9"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-9?main=1&mu=8'
      },
      grade10: {
        steps: [
            '• Go to "Academic"',
            '• Select "GRADE"',
            '• Select "GRADE 10"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/grade/grade-10?main=1&mu=9'
      },
      homeschooling: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Homeschooling"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/homeschooling?main=0&mu=14'
      },
      learningcentre: {
        steps: [
            '• Go to "Academic"',
            '• Select "Class"',
            '• Select "Learning Centre"',
            '• Select a file',
            '• Download or print',
            '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/class/learning-centre?main=0&mu=15'
      },

    };
    const normalizedIntent = intent.toLowerCase().replace(/\s/g, '').trim();
    return responses[normalizedIntent as keyof typeof responses] || {
      steps: ['Sorry, I could not recognize that section. Please try again.'],
      url: ''
    };
};