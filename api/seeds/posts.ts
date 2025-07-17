// import { PostStatus } from "../src/generated/prisma";

// export const demoPosts = [
//   {
//     id: '66b1b1234567890123456001',
//     slug: 'first-post',
//     title: 'First Post Title',
//     status: PostStatus.APPROVED,
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec auctor, diam in congue efficitur, nisi nisi tincidunt nisi, quis tincidunt ligula nisi nec nisi. Donec et lacus euismod, efficitur nisi vitae, tincidunt nisi.',
//     authorId: '66b1a1234567890123456789',
//     isMainPost: true,
//     createdAt: new Date('2025-07-09T09:00:00Z'),
//     updatedAt: new Date('2025-07-12T12:00:00Z')
//   },
//   {
//     id: '66b1b1234567890123456002',
//     slug: 'first-post',
//     title: 'Second Post Title',
//     status: PostStatus.APPROVED,
//     body: 'This is the body of the second post. It contains some interesting discussion points and valuable insights.',
//     authorId: '66b1a1234567890123456790',
//     isMainPost: false,
//     createdAt: new Date('2025-07-09T10:00:00Z'),
//     updatedAt: new Date('2025-07-12T13:00:00Z')
//   },
//   {
//     id: '66b1b1234567890123456003',
//     slug: 'first-post',
//     title: 'Third Post Title',
//     status: PostStatus.APPROVED,
//     body: 'This is the body of the third post. This post has been archived for various reasons.',
//     authorId: '66b1a1234567890123456791',
//     isMainPost: false,
//     createdAt: new Date('2025-07-09T11:00:00Z'),
//     updatedAt: new Date('2025-07-12T14:00:00Z')
//   },
//   {
//     id: '66b1b1234567890123456004',
//     slug: 'first-post',
//     title: 'Fourth Post Title',
//     status: PostStatus.APPROVED,
//     body: 'This is the body of the fourth post. This post has been deleted.',
//     authorId: '66b1a1234567890123456792',
//     isMainPost: false,
//     createdAt: new Date('2025-07-09T12:00:00Z'),
//     updatedAt: new Date('2025-07-12T15:00:00Z')
//   },
//   {
//     id: '66b1b1234567890123456005',
//     slug: 'second-post',
//     title: 'Fifth Post Title',
//     status: PostStatus.APPROVED,
//     body: 'This is the body of the fifth post. It belongs to a different discussion thread.',
//     authorId: '66b1a1234567890123456793',
//     isMainPost: true,
//     createdAt: new Date('2025-07-09T13:00:00Z'),
//     updatedAt: new Date('2025-07-12T16:00:00Z')
//   },
//   {
//     id: '66b1b1234567890123456006',
//     slug: 'javascript-fundamentals',
//     title: 'Understanding JavaScript Closures',
//     status: PostStatus.APPROVED,
//     body: 'Closures are one of the most important concepts in JavaScript. They allow functions to access variables from their outer scope even after the outer function has returned. This creates powerful patterns for data privacy and function factories.',
//     authorId: '66b1a1234567890123456789',
//     isMainPost: true,
//     createdAt: new Date('2025-07-10T09:00:00Z'),
//     updatedAt: new Date('2025-07-13T10:00:00Z')
//   },
//   {
//     id: '66b1b1234567890123456007',
//     slug: 'javascript-fundamentals',
//     title: 'Great explanation!',
//     status: PostStatus.APPROVED,
//     body: 'Thanks for the clear explanation about closures. I finally understand how they work!',
//     authorId: '66b1a1234567890123456794',
//     isMainPost: false,
//     createdAt: new Date('2025-07-10T10:30:00Z'),
//     updatedAt: new Date('2025-07-10T10:30:00Z')
//   },
//   {
//     id: '66b1b1234567890123456008',
//     slug: 'react-hooks-guide',
//     title: 'Complete Guide to React Hooks',
//     status: PostStatus.APPROVED,
//     body: 'React Hooks revolutionized how we write React components. useState and useEffect are the most commonly used hooks, but there are many others like useContext, useReducer, and custom hooks that can make your code more reusable and cleaner.',
//     authorId: '66b1a1234567890123456790',
//     isMainPost: true,
//     createdAt: new Date('2025-07-11T14:00:00Z'),
//     updatedAt: new Date('2025-07-14T15:00:00Z')
//   },
//   {
//     id: '66b1b1234567890123456009',
//     slug: 'react-hooks-guide',
//     title: 'Custom hooks are amazing',
//     status: PostStatus.APPROVED,
//     body: 'I love how custom hooks allow you to extract component logic into reusable functions. They make testing so much easier too.',
//     authorId: '66b1a1234567890123456796',
//     isMainPost: false,
//     createdAt: new Date('2025-07-11T15:30:00Z'),
//     updatedAt: new Date('2025-07-11T15:30:00Z')
//   },
//   {
//     id: '66b1b1234567890123456010',
//     slug: 'database-design-tips',
//     title: 'Database Design Best Practices',
//     status: PostStatus.APPROVED,
//     body: 'Good database design is crucial for application performance. Always normalize your data, use proper indexes, and think about query patterns when designing your schema. Consider using UUIDs for distributed systems.',
//     authorId: '66b1a1234567890123456791',
//     isMainPost: true,
//     createdAt: new Date('2025-07-12T16:00:00Z'),
//     updatedAt: new Date('2025-07-15T17:00:00Z')
//   }
// ];

import { PostStatus } from "../src/generated/prisma";

export const demoPosts = [
  {
    id: '66b1b1234567890123456001',
    slug: 'spanish-pronunciation-struggle',
    title: 'Struggling with Spanish RR sound - any tips?',
    status: PostStatus.APPROVED,
    body: 'I\'ve been learning Spanish for 6 months now and I still can\'t roll my Rs properly. Every time I try to say "perro" or "carro" it comes out sounding like "pedo" or "cado". It\'s getting embarrassing in conversation practice. Has anyone overcome this? I\'ve tried the tongue exercises but they don\'t seem to help much.',
    authorId: '66b1a1234567890123456789',
    isMainPost: true,
    createdAt: new Date('2025-07-09T09:00:00Z'),
    updatedAt: new Date('2025-07-12T12:00:00Z')
  },
  {
    id: '66b1b1234567890123456002',
    slug: 'spanish-pronunciation-struggle',
    title: 'The motorcycle technique worked for me!',
    status: PostStatus.APPROVED,
    body: 'I had the same exact problem! What finally worked was making motorcycle sounds - "br-r-r-r-r" - while relaxing my tongue completely. After doing this for a week, the RR just clicked. Also, try saying "pot-a-to" really fast - the T sound is similar to the tongue position for RR.',
    authorId: '66b1a1234567890123456790',
    isMainPost: false,
    createdAt: new Date('2025-07-09T10:00:00Z'),
    updatedAt: new Date('2025-07-12T13:00:00Z')
  },
  {
    id: '66b1b1234567890123456003',
    slug: 'spanish-pronunciation-struggle',
    title: 'Regional variations matter too',
    status: PostStatus.APPROVED,
    body: 'Don\'t stress too much about it! I lived in Argentina for a year and many locals there don\'t roll their Rs either - they use a softer sound. Focus on being understood rather than perfect pronunciation. Some native speakers struggle with RR too, especially children.',
    authorId: '66b1a1234567890123456791',
    isMainPost: false,
    createdAt: new Date('2025-07-09T11:00:00Z'),
    updatedAt: new Date('2025-07-12T14:00:00Z')
  },
  {
    id: '66b1b1234567890123456004',
    slug: 'spanish-pronunciation-struggle',
    title: 'Practice with minimal pairs',
    status: PostStatus.APPROVED,
    body: 'Try practicing minimal pairs like "caro" vs "carro" and "pero" vs "perro". Record yourself saying them and compare with native speakers. I use the app\'s voice comparison feature for this - it really helps identify the subtle differences.',
    authorId: '66b1a1234567890123456792',
    isMainPost: false,
    createdAt: new Date('2025-07-09T12:00:00Z'),
    updatedAt: new Date('2025-07-12T15:00:00Z')
  },
  {
    id: '66b1b1234567890123456005',
    slug: 'korean-honorifics-confusion',
    title: 'Korean honorifics are overwhelming - how to prioritize?',
    status: PostStatus.APPROVED,
    body: 'I\'ve been studying Korean for 3 months and the honorific system is making my head spin. There are so many levels and they change based on age, social status, formality... I\'m afraid to speak because I might offend someone. Which honorifics should I master first? Any Korean natives here who can share what mistakes are actually offensive vs just awkward?',
    authorId: '66b1a1234567890123456793',
    isMainPost: true,
    createdAt: new Date('2025-07-09T13:00:00Z'),
    updatedAt: new Date('2025-07-12T16:00:00Z')
  },
  {
    id: '66b1b1234567890123456006',
    slug: 'immersion-techniques-home',
    title: 'Creating language immersion at home without traveling',
    status: PostStatus.APPROVED,
    body: 'I\'ve been trying to create a French immersion environment at home since I can\'t travel to France right now. So far I\'ve changed my phone to French, watch French Netflix with French subtitles, and listen to French podcasts during commutes. Looking for more creative ideas to surround myself with the language. What immersion techniques have worked for you?',
    authorId: '66b1a1234567890123456789',
    isMainPost: true,
    createdAt: new Date('2025-07-10T09:00:00Z'),
    updatedAt: new Date('2025-07-13T10:00:00Z')
  },
  {
    id: '66b1b1234567890123456007',
    slug: 'immersion-techniques-home',
    title: 'Talking to yourself is underrated',
    status: PostStatus.APPROVED,
    body: 'I narrate my daily activities in German out loud. "Jetzt mache ich Kaffee. Ich brauche Milch..." It feels weird at first but really helps with thinking in the target language. I also set up imaginary conversations - like practicing ordering food or asking for directions.',
    authorId: '66b1a1234567890123456794',
    isMainPost: false,
    createdAt: new Date('2025-07-10T10:30:00Z'),
    updatedAt: new Date('2025-07-10T10:30:00Z')
  },
  {
    id: '66b1b1234567890123456008',
    slug: 'spaced-repetition-alternatives',
    title: 'Alternatives to traditional spaced repetition?',
    status: PostStatus.APPROVED,
    body: 'I know spaced repetition is the gold standard for vocabulary retention, but I find Anki and similar apps incredibly boring. After 2 weeks I always stop using them. Has anyone found engaging alternatives that still use spaced repetition principles? I need something that doesn\'t feel like homework.',
    authorId: '66b1a1234567890123456790',
    isMainPost: true,
    createdAt: new Date('2025-07-11T14:00:00Z'),
    updatedAt: new Date('2025-07-14T15:00:00Z')
  },
  {
    id: '66b1b1234567890123456009',
    slug: 'spaced-repetition-alternatives',
    title: 'Story-based vocabulary learning',
    status: PostStatus.APPROVED,
    body: 'I create ongoing stories using new vocabulary words. Each day I add a new chapter incorporating words I need to review. It\'s like writing a soap opera in Italian! The context helps me remember better than isolated flashcards, plus I get writing practice.',
    authorId: '66b1a1234567890123456796',
    isMainPost: false,
    createdAt: new Date('2025-07-11T15:30:00Z'),
    updatedAt: new Date('2025-07-11T15:30:00Z')
  },
  {
    id: '66b1b1234567890123456010',
    slug: 'motivation-plateau-breakthrough',
    title: 'Breaking through intermediate plateau - feeling stuck',
    status: PostStatus.APPROVED,
    body: 'I\'ve been learning Portuguese for 2 years and feel completely stuck at intermediate level. I can have basic conversations but struggle with complex topics, movies without subtitles, or native-speed speech. The progress feels so slow compared to beginner gains. Anyone else experienced this plateau? How did you push through to advanced level?',
    authorId: '66b1a1234567890123456791',
    isMainPost: true,
    createdAt: new Date('2025-07-12T16:00:00Z'),
    updatedAt: new Date('2025-07-15T17:00:00Z')
  }
];