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
            content: 'You are a school portal assistant. Strictly understand what the user wants and then respond with only one of the following lowercase, no-space strings based on user intent: "smartwall", "visualworksheets", "pictorialstories", "projectcharts", "dictionary", "valueeducation", "scienceprojects", "languagegames", "mappointing", "subjectposters", "craftlessons", "artlessons", "parentteacheractivities", "rhymes", "holidayhomefun", "computerlessons", "mcqbank", "edumagazines", "gkscience", "teachermanuals", "earlycareer", "mindmapinfographics", "activity", "flashcards", "puzzlesriddles", "imagebank", "animatedcontent", "comics", "greatlives", "discovery", "learnhandwriting", "examtips", "brainteasers", "lunchbox", "safety", "kindergarten", "nursery", "lkg", "ukg", "class1", "class2", "class3", "class4", "class5", "class6", "class7", "class8", "class9", "class10", "homeschooling", "learningcentre", "theabcsong", "grade1", "grade2", "grade3", "grade4", "grade5", "grade6", "grade7", "grade8", "grade9", "grade10", "animals", "areasorlocaties", "birds", "childrens", "flowers", "fruits", "greatpersonalities", "householdthings", "humans", "insects", "mammals", "objects", "plants", "professions", "surroundings", "things", "vegetables", "donermembership", "elearningmajor", "free", "giftmembership", "government", "homeschoolingoffers", "learningcenter", "library", "memberships", "ngo", "parent", "publication", "resourceperson", "school", "student", "teacher", "teachertrainer", "chartmaker", "worksheetmaker", "storymaker", "microscheduler", "grammarworksheetmakers", "mathsworksheetmakers", "artmaker", "craftmaker", "crosswordmaker", "flashcardmaker", "fontmaker", "idcardmaker", "lessonplanmaker", "schooldiarymaker", "stationarymaker", "sudokumaker", "careerpathmaps", "computerlessonsbudding", "earlycareerprogramme", "educationmagazines", "foundationcourses", "iitresources", "jeeresources", "learnaskill", "mindmappinginfographics", "neetresources", "parentteacheractivitiesbudding", "personalitydevelopment", "selfpublishingservices", "skillresources". If user asks any subject relating to a class, just return the class or grade that matches the other portion of the query. Try not to let the model go to fall back method. Try giving the closest output. Do not use spaces or uppercase letters.'
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
    const intent =
        Array.isArray(data.choices) && data.choices[0]?.message?.content
            ? data.choices[0].message.content.toLowerCase().replace(/\s/g, '').trim()
            : 'general';
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
      animals: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Animals"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/animals?main=2&mu=0'
      },
      areasorlocaties: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Areas or Locations"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/areas-or%20locaties?main=2&mu=1'
      },
      birds: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Birds"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/birds?main=2&mu=2'
      },
      childrens: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Childrens"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/childrens?main=2&mu=3'
      },
      flowers: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Flowers"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/flowers?main=2&mu=4'
      },
      fruits: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Fruits"', 
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/fruits?main=2&mu=5'
      },
      greatpersonalities: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Great Personalities"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/great-personalities?main=2&mu=6'
      },
      householdthings: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Household Things"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/house-hold%20things?main=2&mu=7'
      },  
      humans: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Humans"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/humans?main=2&mu=8'
      },
      insects: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Insects"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/insects?main=2&mu=9'
      },
      mammals: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Mammals"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/mammals?main=2&mu=10'
      },
      objects: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Objects"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/objects?main=2&mu=11'
      },
      plants: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Plants"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/plants?main=2&mu=12'
      },
      professions: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Professions"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/professions?main=2&mu=13'
      },
      surroundings: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Surroundings"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/surrondings?main=2&mu=14'
      },
      things: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Things"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/things?main=2&mu=15'
      },
      vegetables: {
        steps: [
            '• Go to "Academic"',
            '• Select "ImageBank"',
            '• Select "Vegetables"',
        ],
        url: 'https://demo.myschool.in/views/academic/imagebank/vegetables?main=2&mu=16'
      },
      donermembership: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Doner Membership"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/doner-membership?main=3&mu=0'
      },
      elearningmajor: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "E-Learning Major"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/e-learning-major?main=3&mu=1'
      },
      free: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Free"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/free?main=3&mu=2'
      },
      giftmembership: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Gift Membership"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/gift-membership?main=3&mu=3'
      },
      government: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Government"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/government?main=3&mu=4'
      },
      homeschoolingoffers: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Home Schooling"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/home-schooling?main=3&mu=5'
      },
      learningcenter: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Learning Center"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/learning-center?main=3&mu=6'
      },
      library: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Library"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/library?main=3&mu=7'
      },
      memberships: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Memberships"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/memberships?main=3&mu=8'
      },
      ngo: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "NGO"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/ngo?main=3&mu=9'
      },
      parent: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Parent"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/parent?main=3&mu=10'
      },
      publication: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Publication"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/publication?main=3&mu=11'
      },
      resourceperson: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Resource Person"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/resource-person?main=3&mu=12'
      },
      school: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "School"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/school?main=3&mu=13'
      },
      student: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Student"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/student?main=3&mu=14'
      },
      teacher: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Teacher"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/teacher?main=3&mu=15'
      },
      teachertrainer: {
        steps: [
          '• Go to "Academic"',
          '• Select "OFFERS"',
          '• Select "Teacher Trainer"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/offers/teacher-trainer?main=3&mu=16'
      },
      chartmaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Chart Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/chart-maker?main=4&mu=0'
      },
      worksheetmaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Worksheet Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/worksheet-maker?main=4&mu=1'
      },
      storymaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Story Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/story-maker?main=4&mu=2'
      },
      microscheduler: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Micro Scheduler"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/micro-scheduler?main=4&mu=3'
      },
      grammarworksheetmakers: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "20+Types of Grammar Worksheet Makers"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/grammar-worksheet-makers?main=4&mu=4'
      },
      mathsworksheetmakers: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "50+Types of Maths Worksheet Makers"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/maths-worksheet-makers?main=4&mu=5'
      },
      artmaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Art Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/art-maker?main=4&mu=6'
      },
      craftmaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Craft Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/craft-maker?main=4&mu=7'
      },
      crosswordmaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Crossword Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/crossword-maker?main=4&mu=8'
      },
      flashcardmaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Flash Card Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/flash-card-maker?main=4&mu=9'
      },
      fontmaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Font Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/font-maker?main=4&mu=10'
      },
      idcardmaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "ID Card Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/id-card-maker?main=4&mu=11'
      },
      lessonplanmaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Lesson Plan Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/lesson-plan-maker?main=4&mu=12'
      },
      schooldiarymaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "School Diary Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/school-diary-maker?main=4&mu=13'
      },
      stationarymaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Stationary Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/stationary-maker?main=4&mu=14'
      },
      sudokumaker: {
        steps: [
          '• Go to "Academic"',
          '• Select "Makers"',
          '• Select "Sudoku Maker"',
          '• Select a file',
          '• Download or print',
          '• Select multiple files if needed'
        ],
        url: 'https://demo.myschool.in/views/academic/makers/sudoku-maker?main=4&mu=15'
      },
      careerpathmaps: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Career Path Maps"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/career-path%20maps?main=0&mu=0'
      },
      computerlessonsbudding: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Computer Lessons"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/computer-lessons?main=0&mu=1'
      },
      earlycareerprogramme: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Early Career Programme"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/early-career-programme?main=0&mu=2'
      },
      educationmagazines: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Education Magazines"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/education-magazines?main=0&mu=3'
      },
      foundationcourses: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Foundation Courses"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/foundation-courses?main=0&mu=4'
      },
      iitresources: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "IIT Resources"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/iti-resources?main=0&mu=5'
      },
      jeeresources: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "JEE Resources"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/jee-resources?main=0&mu=6'
      },
      learnaskill: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Learn A Skill"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/learn-a-skill?main=0&mu=7'
      },
      mindmappinginfographics: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Mind Mapping Infographics"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/mind-mapping-infographics?main=0&mu=8'
      },
      neetresources: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "NEET Resources"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/neet-resources?main=0&mu=9'
      },
      parentteacheractivitiesbudding: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Parent Teacher Activities"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/parent-teacher-activities?main=0&mu=10'
      },
      personalitydevelopment: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Personality Development"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/personality-development?main=0&mu=11'
      },
      selfpublishingservices: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Self Publishing Services"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/self-publishing-services?main=0&mu=12'
      },
      skillresources: {
        steps: [
          '• Go to "Early Career"',
          '• Select "Budding Career"',
          '• Select "Skill Resources"'
        ],
        url: 'https://demo.myschool.in/views/early-career/budding%20career/skill-resources?main=0&mu=13'
      },
    };
    const normalizedIntent = intent.toLowerCase().replace(/\s/g, '').trim();
    return responses[normalizedIntent as keyof typeof responses] || {
      steps: ['Sorry, I could not recognize that section. Please try again.'],
      url: ''
    };
};