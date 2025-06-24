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
          '• Scroll down to "One Click Resources Centre Section"',
          '• Click the "Smart Wall" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/smart-wall'
      },
      visualworksheets: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Visual Worksheets" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/visual-worksheets'
      },
      pictorialstories: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Pictorial Stories" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/pictorial-stories'
      },
      projectcharts: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Project Charts" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/project-charts'
      },
      dictionary: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Dictionary" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/dictionary'
      },
      valueeducation: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Value Education" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/life-skills'
      },
      scienceprojects: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Science Projects" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/science-projects'
      },
      languagegames: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Language Games" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/language-games'
      },
      mappointing: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Map Pointing" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/map-pointing'
      },
      subjectposters: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Subject Posters" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/subject-posters'
      },
      craftlessons: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Craft Lessons" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/craft-lessons'
      },
      artlessons: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Art Lessons" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/art-lessons'
      },
      parentteacheractivities: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Parent Teacher Activities" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/parent-teacher-activities'
      },
      rhymes: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Rhymes" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/rhymes'
      },
      holidayhomefun: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Holiday Home Fun" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/holiday-home-fun'
      },
      computerlessons: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Computer Lessons" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/computer-lessons'
      },
      mcqbank: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "MCQ Bank" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/mcq-bank'
      },
      edumagazines: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Edu Magazines" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/edu-magazines'
      },
      gkscience: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "GK Science" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/gk-science'
      },
      teachermanuals: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Teacher Manuals" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/teacher-manuals'
      },
      earlycareer: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Early Career" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/early-career'
      },
      mindmapinfographics: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Mind Map Infographics" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/mind-map-infographics'
      },
      activity: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Activity" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/activity'
      },
      flashcards: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Flash Cards" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/flash-cards'
      },
      puzzlesriddles: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Puzzles Riddles" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/puzzles-riddles'
      },
      imagebank: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Image Bank" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/imagebank'
      },
      animatedcontent: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Animated Content" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/animated-content'
      },
      comics: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Comics" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/comics'
      },
      greatlives: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Great Lives" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/great-lives'
      },
      discovery: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Discovery" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/discovery'
      },
      learnhandwriting: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Learn Hand Writing" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/learn-hand-writing'
      },
      examtips: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Exam Tips" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/academic/exam-tips'
      },
      brainteasers: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Brain Teasers" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/brain-teasers'
      },
      lunchbox: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Lunch Box" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
        ],
        url: 'https://demo.myschool.in/views/sections/lunch-box'
      },
      safety: {
        steps: [
          '• Scroll down to the "One Click Resources Centre Section',
          '• Click the "Safety" option',
          '• In the current page, click on the image, document, audio, video or animations of your choice ',
          '• if your are interested to download or print the file, click on download icon or print icon respectively',
          '• Or if you want to download multiple files, click on "select image" and you can see the selected file in the right side of the page with a hand icon.'
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