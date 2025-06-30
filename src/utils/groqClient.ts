const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const SCHOOL_PORTAL_KNOWLEDGE = `You are a school portal assistant. Below is the complete information about all available modules and how to access them:

ONE CLICK RESOURCES MODULES:
Smart Wall: Go to "One Click Resources" → Open Smart Wall → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/smart-wall
Visual Worksheets: Go to "One Click Resources" → Open Visual Worksheets → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/visual-worksheets
Pictorial Stories: Go to "One Click Resources" → Open Pictorial Stories → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/pictorial-stories
Project Charts: Go to "One Click Resources" → Open Project Charts → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/project-charts
Dictionary: Go to "One Click Resources" → Open Dictionary → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/dictionary
Value Education: Go to "One Click Resources" → Open Value Education → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/life-skills
Science Projects: Go to "One Click Resources" → Open Science Projects → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/science-projects
Language Games: Go to "One Click Resources" → Open Language Games → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/language-games
Map Pointing: Go to "One Click Resources" → Open Map Pointing → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/map-pointing
Subject Posters: Go to "One Click Resources" → Open Subject Posters → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/subject-posters
Craft Lessons: Go to "One Click Resources" → Open Craft Lessons → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/craft-lessons
Art Lessons: Go to "One Click Resources" → Open Art Lessons → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/art-lessons
Parent Teacher Activities: Go to "One Click Resources" → Open Parent Teacher Activities → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/parent-teacher-activities
Rhymes: Go to "One Click Resources" → Open Rhymes → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/rhymes
Holiday Home Fun: Go to "One Click Resources" → Open Holiday Home Fun → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/holiday-home-fun
Computer Lessons: Go to "One Click Resources" → Open Computer Lessons → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/computer-lessons
MCQ Bank: Go to "One Click Resources" → Open MCQ Bank → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/mcq-bank
Edu Magazines: Go to "One Click Resources" → Open Edu Magazines → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/edu-magazines
Learn Hand Writing: Go to "One Click Resources" → Open Learn Hand Writing → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/learn-hand-writing
Exam Tips: Go to "One Click Resources" → Open Exam Tips → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/exam-tips

SECTIONS MODULES:
GK Science: Go to "One Click Resources" → Open GK Science → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/gk-science
Teacher Manuals: Go to "One Click Resources" → Open Teacher Manuals → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/teacher-manuals
Early Career: Go to "One Click Resources" → Open Early Career → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/early-career
Mind Map Infographics: Go to "One Click Resources" → Open Mind Map Infographics → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/mind-map-infographics
Activity: Go to "One Click Resources" → Open Activity → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/activity
Flash Cards: Go to "One Click Resources" → Open Flash Cards → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/flash-cards
Puzzles Riddles: Go to "One Click Resources" → Open Puzzles Riddles → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/puzzles-riddles
Image Bank: Go to "One Click Resources" → Open Image Bank → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/imagebank
Animated Content: Go to "One Click Resources" → Open Animated Content → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/animated-content
Comics: Go to "One Click Resources" → Open Comics → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/comics
Great Lives: Go to "One Click Resources" → Open Great Lives → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/great-lives
Discovery: Go to "One Click Resources" → Open Discovery → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/discovery
Brain Teasers: Go to "One Click Resources" → Open Brain Teasers → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/brain-teasers
Lunch Box: Go to "One Click Resources" → Open Lunch Box → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/lunch-box
Safety: Go to "One Click Resources" → Open Safety → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/sections/safety

CLASS MODULES:
Kindergarten: Go to "Academic" → Select "Class" → Select "Kindergarten" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/kindergarten?main=0&mu=0
Nursery: Go to "Academic" → Select "Class" → Select "Nursery" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/nursery?main=0&mu=1
LKG: Go to "Academic" → Select "Class" → Select "LKG" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/lkg?main=0&mu=2
UKG: Go to "Academic" → Select "Class" → Select "UKG" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/ukg?main=0&mu=3
Class 1: Go to "Academic" → Select "Class" → Select "Class 1" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-1?main=0&mu=4
Class 2: Go to "Academic" → Select "Class" → Select "Class 2" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-2?main=0&mu=5
Class 3: Go to "Academic" → Select "Class" → Select "Class 3" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-3?main=0&mu=6
Class 4: Go to "Academic" → Select "Class" → Select "Class 4" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-4?main=0&mu=7
Class 5: Go to "Academic" → Select "Class" → Select "Class 5" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-5?main=0&mu=8
Class 6: Go to "Academic" → Select "Class" → Select "Class 6" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-6?main=0&mu=9
Class 7: Go to "Academic" → Select "Class" → Select "Class 7" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-7?main=0&mu=10
Class 8: Go to "Academic" → Select "Class" → Select "Class 8" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-8?main=0&mu=11
Class 9: Go to "Academic" → Select "Class" → Select "Class 9" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-9?main=0&mu=12
Class 10: Go to "Academic" → Select "Class" → Select "Class 10" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/class-10?main=0&mu=13
Homeschooling: Go to "Academic" → Select "Class" → Select "Homeschooling" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/homeschooling?main=0&mu=14
Learning Centre: Go to "Academic" → Select "Class" → Select "Learning Centre" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/class/learning-centre?main=0&mu=15

GRADE MODULES:
Grade 1: Go to "Academic" → Select "GRADE" → Select "GRADE 1" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-1?main=1&mu=0
Grade 2: Go to "Academic" → Select "GRADE" → Select "GRADE 2" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-2?main=1&mu=1
Grade 3: Go to "Academic" → Select "GRADE" → Select "GRADE 3" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-3?main=1&mu=2
Grade 4: Go to "Academic" → Select "GRADE" → Select "GRADE 4" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-4?main=1&mu=3
Grade 5: Go to "Academic" → Select "GRADE" → Select "GRADE 5" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-5?main=1&mu=4
Grade 6: Go to "Academic" → Select "GRADE" → Select "GRADE 6" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-6?main=1&mu=5
Grade 7: Go to "Academic" → Select "GRADE" → Select "GRADE 7" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-7?main=1&mu=6
Grade 8: Go to "Academic" → Select "GRADE" → Select "GRADE 8" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-8?main=1&mu=7
Grade 9: Go to "Academic" → Select "GRADE" → Select "GRADE 9" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-9?main=1&mu=8
Grade 10: Go to "Academic" → Select "GRADE" → Select "GRADE 10" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/grade/grade-10?main=1&mu=9

IMAGEBANK MODULES:
Animals: Go to "Academic" → Select "ImageBank" → Select "Animals". URL: https://demo.myschool.in/views/academic/imagebank/animals?main=2&mu=0
Areas or Locations: Go to "Academic" → Select "ImageBank" → Select "Areas or Locations". URL: https://demo.myschool.in/views/academic/imagebank/areas-or%20locaties?main=2&mu=1
Birds: Go to "Academic" → Select "ImageBank" → Select "Birds". URL: https://demo.myschool.in/views/academic/imagebank/birds?main=2&mu=2
Childrens: Go to "Academic" → Select "ImageBank" → Select "Childrens". URL: https://demo.myschool.in/views/academic/imagebank/childrens?main=2&mu=3
Flowers: Go to "Academic" → Select "ImageBank" → Select "Flowers". URL: https://demo.myschool.in/views/academic/imagebank/flowers?main=2&mu=4
Fruits: Go to "Academic" → Select "ImageBank" → Select "Fruits". URL: https://demo.myschool.in/views/academic/imagebank/fruits?main=2&mu=5
Great Personalities: Go to "Academic" → Select "ImageBank" → Select "Great Personalities". URL: https://demo.myschool.in/views/academic/imagebank/great-personalities?main=2&mu=6
Household Things: Go to "Academic" → Select "ImageBank" → Select "Household Things". URL: https://demo.myschool.in/views/academic/imagebank/house-hold%20things?main=2&mu=7
Humans: Go to "Academic" → Select "ImageBank" → Select "Humans". URL: https://demo.myschool.in/views/academic/imagebank/humans?main=2&mu=8
Insects: Go to "Academic" → Select "ImageBank" → Select "Insects". URL: https://demo.myschool.in/views/academic/imagebank/insects?main=2&mu=9
Mammals: Go to "Academic" → Select "ImageBank" → Select "Mammals". URL: https://demo.myschool.in/views/academic/imagebank/mammals?main=2&mu=10
Objects: Go to "Academic" → Select "ImageBank" → Select "Objects". URL: https://demo.myschool.in/views/academic/imagebank/objects?main=2&mu=11
Plants: Go to "Academic" → Select "ImageBank" → Select "Plants". URL: https://demo.myschool.in/views/academic/imagebank/plants?main=2&mu=12

OFFERS MODULES:
Doner Membership: Go to "Academic" → Select "OFFERS" → Select "Doner Membership" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/doner-membership?main=3&mu=0
E-Learning Major: Go to "Academic" → Select "OFFERS" → Select "E-Learning Major" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/e-learning-major?main=3&mu=1
Free: Go to "Academic" → Select "OFFERS" → Select "Free" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/free?main=3&mu=2
Gift Membership: Go to "Academic" → Select "OFFERS" → Select "Gift Membership" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/gift-membership?main=3&mu=3
Government: Go to "Academic" → Select "OFFERS" → Select "Government" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/government?main=3&mu=4
Home Schooling: Go to "Academic" → Select "OFFERS" → Select "Home Schooling" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/home-schooling?main=3&mu=5
Learning Center: Go to "Academic" → Select "OFFERS" → Select "Learning Center" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/learning-center?main=3&mu=6
Library: Go to "Academic" → Select "OFFERS" → Select "Library" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/library?main=3&mu=7
Memberships: Go to "Academic" → Select "OFFERS" → Select "Memberships" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/memberships?main=3&mu=8
NGO: Go to "Academic" → Select "OFFERS" → Select "NGO" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/ngo?main=3&mu=9
Parent: Go to "Academic" → Select "OFFERS" → Select "Parent" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/parent?main=3&mu=10
Publication: Go to "Academic" → Select "OFFERS" → Select "Publication" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/publication?main=3&mu=11
Resource Person: Go to "Academic" → Select "OFFERS" → Select "Resource Person" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/resource-person?main=3&mu=12
School: Go to "Academic" → Select "OFFERS" → Select "School" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/school?main=3&mu=13
Student: Go to "Academic" → Select "OFFERS" → Select "Student" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/student?main=3&mu=14
Teacher: Go to "Academic" → Select "OFFERS" → Select "Teacher" → Select a file → Download or print → Select multiple files if needed. URL: https://demo.myschool.in/views/academic/offers/teacher?main=3&mu=15`;

export const getResponseFromGroq = async (userMessage: string): Promise<{ response: string; url: string }> => {
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
            content: `${SCHOOL_PORTAL_KNOWLEDGE}

Based on the above information, answer user queries about accessing different modules in the school portal. Provide clear step-by-step instructions (maximum 5 lines) and include the URL at the end of your response formatted as "URL: [url]". If the user asks about something not covered above, provide a helpful general response without a URL.`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      })
    });

    const data: GroqResponse = await response.json();
    const content = data.choices?.[0]?.message?.content || 'I apologize, but I encountered an error. Please try again.';
    
    // Extract URL if present
    const urlMatch = content.match(/URL:\s*(https?:\/\/[^\s]+)/);
    const url = urlMatch ? urlMatch[1] : '';
    const responseText = content.replace(/URL:\s*https?:\/\/[^\s]+/, '').trim();
    
    return { response: responseText, url };
  } catch (error) {
    console.error('Groq API error:', error);
    return { response: 'I apologize, but I encountered an error. Please try again.', url: '' };
  }
};