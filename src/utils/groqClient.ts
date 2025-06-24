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

// Add this helper to get the best matching key from Groq
async function getBestMatchingKeyFromGroq(userQuery: string, descriptions: { key: string, description: string }[]): Promise<string | null> {
  const prompt = `You are an intelligent assistant. Given a user's query and a list of page descriptions, select the key of the page whose description best matches the user's query. Only return the key.\n\nUser query: "${userQuery}"\n\nDescriptions:\n${descriptions.map(d => `${d.key}: ${d.description}`).join('\n')}\n\nReturn only the key of the best matching page.`;
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
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 10
      })
    });
    const data: GroqResponse = await response.json();
    const key = data.choices[0]?.message?.content?.toLowerCase().replace(/\s/g, '').trim();
    return key || null;
  } catch (error) {
    console.error('Groq API error (description match):', error);
    return null;
  }
}

// Refactor getHardcodedResponse to use Groq for description matching
export const getHardcodedResponse = async (intent: string): Promise<{ steps: string[], url: string }> => {
  const responses = {
    smartwall: {
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'A collection of multimedia educational resources like images, documents, audio, video, and animations for various subjects.',
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
      description: 'Safety tips and resources for students in school and at home.',
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
  const descriptions = Object.entries(responses).map(([key, value]) => ({ key, description: value.description }));
  const bestKey = await getBestMatchingKeyFromGroq(intent, descriptions);
  if (bestKey && responses[bestKey as keyof typeof responses]) {
    const { steps, url } = responses[bestKey as keyof typeof responses];
    return { steps, url };
  }
  return {
    steps: ['Sorry, I could not recognize that section. Please try again.'],
    url: ''
  };
};