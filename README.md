# Fan Engagement Idea Generator

A web application to help sports teams and brands generate personalized fan engagement ideas based on their specific requirements.

## Overview

The Fan Engagement Idea Generator helps organizations discover and implement new fan engagement strategies. By leveraging a database of proven ideas and a matching algorithm, it removes the barrier of "not knowing where to start" and helps create more meaningful connections with audiences.

## Features

- **Input Form**: Collects essential information about the user's brand, audience, and constraints
- **Idea Generation Engine**: Leverages a database of pre-populated engagement strategies
- **Results Display**: Presents categorized engagement ideas with descriptions
- **Filtering System**: Allows users to refine results based on additional criteria
- **Export Functionality**: Enables saving or sharing generated ideas

## Technology Stack

- **Frontend**: React.js, Bootstrap, Formik
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Docker, Heroku

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dxaginfo/sports-fan-engagement-app.git
cd sports-fan-engagement-app
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string
```

4. Seed the database:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

## Usage

1. Fill out the form with your organization's details
2. View the generated engagement ideas categorized by type
3. Filter results based on additional criteria
4. Export your favorite ideas for implementation

## Database Structure

The application uses a MongoDB collection with the following schema:

```javascript
{
  title: String,
  description: String,
  type: String (e.g., "AR experience", "Contest", "Community event"),
  audience_size: String (e.g., "Small", "Medium", "Large"),
  budget_range: String (e.g., "Low", "Medium", "High"),
  implementation_time: String (e.g., "Quick", "Medium", "Extended"),
  target_demographics: Array[String],
  success_metrics: Array[String],
  example_cases: Array[String],
  tags: Array[String]
}
```

## Sample Ideas

The database is pre-populated with engagement ideas across different categories, including:

1. **Virtual Meet and Greet** (Digital Event)
   - Budget: Medium
   - Timeframe: Quick
   - Demographics: Gen Z, Millennials

2. **AR Stadium Scavenger Hunt** (AR Experience) 
   - Budget: High
   - Timeframe: Extended
   - Demographics: Families, Gen Z

3. **User-Generated Content Contest** (Contest)
   - Budget: Low
   - Timeframe: Quick
   - Demographics: Gen Z, Millennials

## Future Enhancements

- User accounts to save favorite ideas
- Idea rating system to improve recommendations
- Resource links to implementation guides
- Integration with project management tools
- Mobile app for on-the-go idea generation

## License

MIT License