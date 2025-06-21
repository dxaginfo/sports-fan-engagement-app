const mongoose = require('mongoose');
const Idea = require('../server/models/Idea');
require('dotenv').config();

const sampleIdeas = [
  {
    title: 'Virtual Meet and Greet',
    description: 'Host a virtual meet and greet with team players/personalities where fans can ask questions and interact in real-time.',
    type: 'Digital Event',
    audience_size: 'Medium',
    budget_range: 'Medium',
    implementation_time: 'Quick',
    target_demographics: ['Gen Z', 'Millennials'],
    success_metrics: ['Attendance numbers', 'Social media mentions', 'Fan feedback'],
    example_cases: ['NBA teams during COVID lockdowns', 'NFL draft parties'],
    tags: ['sports', 'entertainment', 'digital', 'players', 'interactive']
  },
  {
    title: 'AR Stadium Scavenger Hunt',
    description: 'Create an augmented reality scavenger hunt throughout the venue that unlocks exclusive content and prizes.',
    type: 'AR Experience',
    audience_size: 'Large',
    budget_range: 'High',
    implementation_time: 'Extended',
    target_demographics: ['Families', 'Gen Z'],
    success_metrics: ['App downloads', 'Participation rate', 'Time spent in venue'],
    example_cases: ['MLB stadiums', 'NBA arenas'],
    tags: ['sports', 'venue', 'technology', 'gamification', 'prizes']
  },
  {
    title: 'User-Generated Content Contest',
    description: 'Run a competition where fans submit creative content (photos, videos, artwork) related to the brand, with prizes for winners.',
    type: 'Contest',
    audience_size: 'Large',
    budget_range: 'Low',
    implementation_time: 'Quick',
    target_demographics: ['Gen Z', 'Millennials'],
    success_metrics: ['Submission count', 'Social engagement', 'Reach'],
    example_cases: ['NFL touchdown celebrations', 'Soccer goal celebrations'],
    tags: ['sports', 'entertainment', 'social media', 'creative', 'prizes']
  },
  {
    title: 'Fan Council Program',
    description: 'Create an exclusive group of dedicated fans who provide feedback on initiatives and get special access to decision-makers.',
    type: 'Community Event',
    audience_size: 'Small',
    budget_range: 'Low',
    implementation_time: 'Medium',
    target_demographics: ['All demographics'],
    success_metrics: ['Application numbers', 'Quality of feedback', 'Member retention'],
    example_cases: ['Premier League clubs', 'MLB teams'],
    tags: ['sports', 'community', 'feedback', 'exclusivity', 'loyalty']
  },
  {
    title: 'Behind-the-Scenes Content Series',
    description: 'Create exclusive documentary-style content showing preparation, training, and the human side of teams/athletes.',
    type: 'Content Series',
    audience_size: 'Large',
    budget_range: 'Medium',
    implementation_time: 'Medium',
    target_demographics: ['Gen Z', 'Millennials', 'Gen X'],
    success_metrics: ['View count', 'Engagement time', 'Subscriber growth'],
    example_cases: ['Formula 1: Drive to Survive', 'Hard Knocks NFL series'],
    tags: ['sports', 'content', 'storytelling', 'exclusive', 'documentary']
  },
  {
    title: 'Interactive Live Stream Events',
    description: 'Host live-streamed events with interactive elements like polls, Q&A, and real-time influence on content direction.',
    type: 'Digital Event',
    audience_size: 'Large',
    budget_range: 'Low',
    implementation_time: 'Quick',
    target_demographics: ['Gen Z', 'Millennials'],
    success_metrics: ['Viewer count', 'Interaction rate', 'View duration'],
    example_cases: ['NBA 2K tournaments with players', 'Twitch streams with athletes'],
    tags: ['sports', 'digital', 'interactive', 'streaming', 'live']
  },
  {
    title: 'Community Service Initiative',
    description: 'Organize events where fans can participate in community service alongside team members/brand representatives.',
    type: 'Community Event',
    audience_size: 'Medium',
    budget_range: 'Medium',
    implementation_time: 'Medium',
    target_demographics: ['All demographics'],
    success_metrics: ['Participant numbers', 'Media coverage', 'Brand sentiment'],
    example_cases: ['NBA Cares', 'MLB community days'],
    tags: ['sports', 'community', 'social responsibility', 'charity', 'volunteering']
  },
  {
    title: 'Micro-Influence Campaign',
    description: 'Partner with smaller, niche influencers who have highly engaged audiences matching your target demographics.',
    type: 'Social Media Campaign',
    audience_size: 'Medium',
    budget_range: 'Medium',
    implementation_time: 'Quick',
    target_demographics: ['Gen Z', 'Millennials'],
    success_metrics: ['Engagement rate', 'Reach', 'Conversion rate'],
    example_cases: ['MLS partnerships with local social media personalities', 'NBA teams with TikTok creators'],
    tags: ['sports', 'social media', 'influencers', 'authentic', 'targeted']
  },
  {
    title: 'Loyalty Points Experiences',
    description: 'Create a tiered loyalty program where fans earn points for various engagement activities, redeemable for exclusive experiences.',
    type: 'Loyalty Program',
    audience_size: 'Large',
    budget_range: 'High',
    implementation_time: 'Extended',
    target_demographics: ['All demographics'],
    success_metrics: ['Program enrollment', 'Point redemption rate', 'Repeat engagement'],
    example_cases: ['EPL club programs', 'NHL fan rewards'],
    tags: ['sports', 'loyalty', 'rewards', 'exclusive', 'gamification']
  },
  {
    title: 'Mobile Mini-Games',
    description: 'Develop simple, branded mobile games that fans can play during downtime at events or from home.',
    type: 'Mobile Experience',
    audience_size: 'Large',
    budget_range: 'Medium',
    implementation_time: 'Extended',
    target_demographics: ['Gen Z', 'Millennials', 'Families'],
    success_metrics: ['Downloads', 'Time spent in app', 'Retention rate'],
    example_cases: ['NBA AR games', 'MLB Home Run Derby VR'],
    tags: ['sports', 'gaming', 'mobile', 'interactive', 'entertainment']
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fan-engagement-app');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Delete existing data
    await Idea.deleteMany({});
    console.log('Deleted existing ideas');
    
    // Insert sample data
    await Idea.insertMany(sampleIdeas);
    console.log('Sample ideas inserted successfully');
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

// Run the seeding
connectDB().then(() => {
  seedDatabase();
});