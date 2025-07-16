import { PrismaClient } from "../generated/prisma";
import {parseArgs} from 'node:util';
const prisma = new PrismaClient();
import { PostStatus } from "../generated/prisma";

const options = {
  'clear-data': { type: 'boolean' as const },
  'posts-only': { type: 'boolean' as const },
  'users-only': { type: 'boolean' as const }
};

const { values: argValues } = parseArgs({ options });

const demoUsers = [
  {
    id: '66b1a1234567890123456789',
    name: 'John Doe',
    email: 'johndoe@example.com',
    username: 'johndoe',
    password: 'hashedpassword123'
  },
  {
    id: '66b1a1234567890123456790',
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    username: 'janedoe',
    password: 'hashedpassword456'
  },
  {
    id: '66b1a1234567890123456791',
    name: 'Jake Smith',
    email: 'jake@example.com',
    username: 'jake',
    password: 'hashedpassword789'
  },
  {
    id: '66b1a1234567890123456792',
    name: 'Jane Smith',
    email: 'jane@example.com',
    username: 'jane',
    password: 'hashedpassword012'
  },
  {
    id: '66b1a1234567890123456793',
    name: 'John Smith',
    email: 'john@example.com',
    username: 'john',
    password: 'hashedpassword345'
  },
  {
    id: '66b1a1234567890123456794',
    name: 'Anonymous Duck',
    email: 'duck@example.com',
    username: 'anonymous_duck',
    password: 'hashedpassword678'
  },
  {
    id: '66b1a1234567890123456795',
    name: 'Anonymous Cat',
    email: 'cat@example.com',
    username: 'anonymous_cat',
    password: 'hashedpassword901'
  },
  {
    id: '66b1a1234567890123456796',
    name: 'Anonymous Horse',
    email: 'horse@example.com',
    username: 'anonymous_horse',
    password: 'hashedpassword234'
  },
  {
    id: '66b1a1234567890123456797',
    name: 'Anonymous Dog',
    email: 'dog@example.com',
    username: 'anonymous_dog',
    password: 'hashedpassword567'
  },
  {
    id: '66b1a1234567890123456798',
    name: 'Anonymous Monkey',
    email: 'monkey@example.com',
    username: 'anonymous_monkey',
    password: 'hashedpassword890'
  }
];

const demoPosts = [
  {
    id: '66b1b1234567890123456001',
    slug: 'first-post',
    title: 'First Post Title',
    status: PostStatus.APPROVED,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec auctor, diam in congue efficitur, nisi nisi tincidunt nisi, quis tincidunt ligula nisi nec nisi. Donec et lacus euismod, efficitur nisi vitae, tincidunt nisi.',
    authorId: '66b1a1234567890123456789',
    isMainPost: true,
    createdAt: new Date('2025-07-09T09:00:00Z'),
    updatedAt: new Date('2025-07-12T12:00:00Z')
  },
  {
    id: '66b1b1234567890123456002',
    slug: 'first-post',
    title: 'Second Post Title',
    status: PostStatus.APPROVED,
    body: 'This is the body of the second post. It contains some interesting discussion points and valuable insights.',
    authorId: '66b1a1234567890123456790',
    isMainPost: false,
    createdAt: new Date('2025-07-09T10:00:00Z'),
    updatedAt: new Date('2025-07-12T13:00:00Z')
  },
  {
    id: '66b1b1234567890123456003',
    slug: 'first-post',
    title: 'Third Post Title',
    status: PostStatus.APPROVED,
    body: 'This is the body of the third post. This post has been archived for various reasons.',
    authorId: '66b1a1234567890123456791',
    isMainPost: false,
    createdAt: new Date('2025-07-09T11:00:00Z'),
    updatedAt: new Date('2025-07-12T14:00:00Z')
  },
  {
    id: '66b1b1234567890123456004',
    slug: 'first-post',
    title: 'Fourth Post Title',
    status: PostStatus.APPROVED,
    body: 'This is the body of the fourth post. This post has been deleted.',
    authorId: '66b1a1234567890123456792',
    isMainPost: false,
    createdAt: new Date('2025-07-09T12:00:00Z'),
    updatedAt: new Date('2025-07-12T15:00:00Z')
  },
  {
    id: '66b1b1234567890123456005',
    slug: 'second-post',
    title: 'Fifth Post Title',
    status: PostStatus.APPROVED,
    body: 'This is the body of the fifth post. It belongs to a different discussion thread.',
    authorId: '66b1a1234567890123456793',
    isMainPost: true,
    createdAt: new Date('2025-07-09T13:00:00Z'),
    updatedAt: new Date('2025-07-12T16:00:00Z')
  },
  {
    id: '66b1b1234567890123456006',
    slug: 'javascript-fundamentals',
    title: 'Understanding JavaScript Closures',
    status: PostStatus.APPROVED,
    body: 'Closures are one of the most important concepts in JavaScript. They allow functions to access variables from their outer scope even after the outer function has returned. This creates powerful patterns for data privacy and function factories.',
    authorId: '66b1a1234567890123456789',
    isMainPost: true,
    createdAt: new Date('2025-07-10T09:00:00Z'),
    updatedAt: new Date('2025-07-13T10:00:00Z')
  },
  {
    id: '66b1b1234567890123456007',
    slug: 'javascript-fundamentals',
    title: 'Great explanation!',
    status: PostStatus.APPROVED,
    body: 'Thanks for the clear explanation about closures. I finally understand how they work!',
    authorId: '66b1a1234567890123456794',
    isMainPost: false,
    createdAt: new Date('2025-07-10T10:30:00Z'),
    updatedAt: new Date('2025-07-10T10:30:00Z')
  },
  {
    id: '66b1b1234567890123456008',
    slug: 'react-hooks-guide',
    title: 'Complete Guide to React Hooks',
    status: PostStatus.APPROVED,
    body: 'React Hooks revolutionized how we write React components. useState and useEffect are the most commonly used hooks, but there are many others like useContext, useReducer, and custom hooks that can make your code more reusable and cleaner.',
    authorId: '66b1a1234567890123456790',
    isMainPost: true,
    createdAt: new Date('2025-07-11T14:00:00Z'),
    updatedAt: new Date('2025-07-14T15:00:00Z')
  },
  {
    id: '66b1b1234567890123456009',
    slug: 'react-hooks-guide',
    title: 'Custom hooks are amazing',
    status: PostStatus.APPROVED,
    body: 'I love how custom hooks allow you to extract component logic into reusable functions. They make testing so much easier too.',
    authorId: '66b1a1234567890123456796',
    isMainPost: false,
    createdAt: new Date('2025-07-11T15:30:00Z'),
    updatedAt: new Date('2025-07-11T15:30:00Z')
  },
  {
    id: '66b1b1234567890123456010',
    slug: 'database-design-tips',
    title: 'Database Design Best Practices',
    status: PostStatus.APPROVED,
    body: 'Good database design is crucial for application performance. Always normalize your data, use proper indexes, and think about query patterns when designing your schema. Consider using UUIDs for distributed systems.',
    authorId: '66b1a1234567890123456791',
    isMainPost: true,
    createdAt: new Date('2025-07-12T16:00:00Z'),
    updatedAt: new Date('2025-07-15T17:00:00Z')
  }
];

const demoComments = [
  {
    id: '66b1c1234567890123456001',
    comment: 'This is the first comment on the first post. It is approved and contains valuable feedback.',
    date: new Date('2025-07-10T10:00:00Z'),
    postId: '66b1b1234567890123456001',
    authorId: '66b1a1234567890123456794'
  },
  {
    id: '66b1c1234567890123456002',
    comment: 'This is the second comment on the first post. Great discussion!',
    date: new Date('2025-07-11T11:00:00Z'),
    postId: '66b1b1234567890123456001',
    authorId: '66b1a1234567890123456795'
  },
  {
    id: '66b1c1234567890123456003',
    comment: 'This is the first comment on the second post. Thanks for sharing!',
    date: new Date('2025-07-10T12:00:00Z'),
    postId: '66b1b1234567890123456002',
    authorId: '66b1a1234567890123456796'
  },
  {
    id: '66b1c1234567890123456004',
    comment: 'This comment was deleted due to policy violation.',
    date: new Date('2025-07-10T14:00:00Z'),
    postId: '66b1b1234567890123456003',
    authorId: '66b1a1234567890123456797'
  },
  {
    id: '66b1c1234567890123456005',
    comment: 'This is a comment on the third post. Very insightful!',
    date: new Date('2025-07-11T15:00:00Z'),
    postId: '66b1b1234567890123456003',
    authorId: '66b1a1234567890123456798'
  },
  {
    id: '66b1c1234567890123456006',
    comment: 'Could you provide more examples of closure usage?',
    date: new Date('2025-07-10T11:00:00Z'),
    postId: '66b1b1234567890123456006',
    authorId: '66b1a1234567890123456795'
  },
  {
    id: '66b1c1234567890123456007',
    comment: 'I struggled with hooks at first, but this guide really helped!',
    date: new Date('2025-07-11T16:00:00Z'),
    postId: '66b1b1234567890123456008',
    authorId: '66b1a1234567890123456797'
  },
  {
    id: '66b1c1234567890123456008',
    comment: 'What about NoSQL vs SQL for different use cases?',
    date: new Date('2025-07-12T17:00:00Z'),
    postId: '66b1b1234567890123456010',
    authorId: '66b1a1234567890123456793'
  }
];

async function clearData() {
  console.log('Clearing existing data...');
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Data cleared successfully!');
}

async function seedUsers() {
  console.log('Seeding users...');
  for (const user of demoUsers) {
    await prisma.user.create({
      data: user
    });
  }
  console.log('Users seeded successfully!');
}

async function seedPosts() {
  console.log('Seeding posts...');
  for (const post of demoPosts) {
    await prisma.post.create({
      data: post
    });
  }
  console.log('Posts seeded successfully!');
}

async function seedComments() {
  console.log('Seeding comments...');
  for (const comment of demoComments) {
    await prisma.comment.create({
      data: comment
    });
  }
  console.log('Comments seeded successfully!');
}

async function handleError(error: any) {
  console.error('Error seeding database:', error);
  await prisma.$disconnect();
  process.exit(1);
}

async function run() {
  try {
    console.log('Starting database seeding...');
    
    if (argValues['clear-data']) {
      await clearData();
    }
    
    if (argValues['users-only']) {
      await seedUsers();
    } else if (argValues['posts-only']) {
      await seedPosts();
      await seedComments();
    } else {
      // Default: seed everything
      await clearData();
      await seedUsers();
      await seedPosts();
      await seedComments();
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    await handleError(error);
  } finally {
    await prisma.$disconnect();
  }
}

run();

export default prisma;