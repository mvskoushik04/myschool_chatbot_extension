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
          'Go to Resources Centre',
          'Click Smart Wall',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/smart-wall'
      },
      visualworksheets: {
        steps: [
          'Go to Resources Centre',
          'Click Visual Worksheets',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/visual-worksheets'
      },
      pictorialstories: {
        steps: [
          'Go to Resources Centre',
          'Click Pictorial Stories',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/pictorial-stories'
      },
      projectcharts: {
        steps: [
          'Go to Resources Centre',
          'Click Project Charts',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/project-charts'
      },
      dictionary: {
        steps: [
          'Go to Resources Centre',
          'Click Dictionary',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/dictionary'
      },
      valueeducation: {
        steps: [
          'Go to Resources Centre',
          'Click Value Education',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/life-skills'
      },
      scienceprojects: {
        steps: [
          'Go to Resources Centre',
          'Click Science Projects',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/science-projects'
      },
      languagegames: {
        steps: [
          'Go to Resources Centre',
          'Click Language Games',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/language-games'
      },
      mappointing: {
        steps: [
          'Go to Resources Centre',
          'Click Map Pointing',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/map-pointing'
      },
      subjectposters: {
        steps: [
          'Go to Resources Centre',
          'Click Subject Posters',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/subject-posters'
      },
      craftlessons: {
        steps: [
          'Go to Resources Centre',
          'Click Craft Lessons',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/craft-lessons'
      },
      artlessons: {
        steps: [
          'Go to Resources Centre',
          'Click Art Lessons',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/art-lessons'
      },
      parentteacheractivities: {
        steps: [
          'Go to Resources Centre',
          'Click Parent Teacher Activities',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/parent-teacher-activities'
      },
      rhymes: {
        steps: [
          'Go to Resources Centre',
          'Click Rhymes',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/rhymes'
      },
      holidayhomefun: {
        steps: [
          'Go to Resources Centre',
          'Click Holiday Home Fun',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/holiday-home-fun'
      },
      computerlessons: {
        steps: [
          'Go to Resources Centre',
          'Click Computer Lessons',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/computer-lessons'
      },
      mcqbank: {
        steps: [
          'Go to Resources Centre',
          'Click MCQ Bank',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/mcq-bank'
      },
      edumagazines: {
        steps: [
          'Go to Resources Centre',
          'Click Edu Magazines',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/edu-magazines'
      },
      gkscience: {
        steps: [
          'Go to Resources Centre',
          'Click GK Science',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/gk-science'
      },
      teachermanuals: {
        steps: [
          'Go to Resources Centre',
          'Click Teacher Manuals',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/teacher-manuals'
      },
      earlycareer: {
        steps: [
          'Go to Resources Centre',
          'Click Early Career',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/early-career'
      },
      mindmapinfographics: {
        steps: [
          'Go to Resources Centre',
          'Click Mind Map Infographics',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/mind-map-infographics'
      },
      activity: {
        steps: [
          'Go to Resources Centre',
          'Click Activity',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/activity'
      },
      flashcards: {
        steps: [
          'Go to Resources Centre',
          'Click Flash Cards',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/flash-cards'
      },
      puzzlesriddles: {
        steps: [
          'Go to Resources Centre',
          'Click Puzzles Riddles',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/puzzles-riddles'
      },
      imagebank: {
        steps: [
          'Go to Resources Centre',
          'Click Image Bank',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/imagebank'
      },
      animatedcontent: {
        steps: [
          'Go to Resources Centre',
          'Click Animated Content',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/animated-content'
      },
      comics: {
        steps: [
          'Go to Resources Centre',
          'Click Comics',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/comics'
      },
      greatlives: {
        steps: [
          'Go to Resources Centre',
          'Click Great Lives',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/great-lives'
      },
      discovery: {
        steps: [
          'Go to Resources Centre',
          'Click Discovery',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/discovery'
      },
      learnhandwriting: {
        steps: [
          'Go to Resources Centre',
          'Click Learn Hand Writing',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/learn-hand-writing'
      },
      examtips: {
        steps: [
          'Go to Resources Centre',
          'Click Exam Tips',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/academic/exam-tips'
      },
      brainteasers: {
        steps: [
          'Go to Resources Centre',
          'Click Brain Teasers',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/brain-teasers'
      },
      lunchbox: {
        steps: [
          'Go to Resources Centre',
          'Click Lunch Box',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/lunch-box'
      },
      safety: {
        steps: [
          'Go to Resources Centre',
          'Click Safety',
          'Select any resource',
          'Click download or print',
          'Use select image for batch'
        ],
        url: 'https://demo.myschool.in/views/sections/safety'
      }
    };
    const normalizedIntent = intent.toLowerCase().replace(/\s/g, '').trim();
    return responses[normalizedIntent as keyof typeof responses] || {
      steps: ['Sorry, I could not recognize that section. Please try again.'],
      url: ''
    };
};