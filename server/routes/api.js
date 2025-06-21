const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Idea = require('../models/Idea');

/**
 * GET /api/ideas
 * Get all engagement ideas
 */
router.get('/ideas', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/ideas/types
 * Get all engagement idea types
 */
router.get('/ideas/types', async (req, res) => {
  try {
    const types = await Idea.distinct('type');
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/ideas/suggest
 * Get personalized engagement ideas based on user requirements
 */
router.post('/ideas/suggest', async (req, res) => {
  try {
    const {
      industry,
      targetAudience,
      budgetRange,
      timeframe,
      channels,
      goals
    } = req.body;
    
    // Get all ideas from the database
    const allIdeas = await Idea.find();
    
    // Score and sort ideas based on user requirements
    const scoredIdeas = scoreAndSortIdeas(
      allIdeas,
      industry,
      targetAudience,
      budgetRange,
      timeframe,
      channels,
      goals
    );
    
    // Group ideas by type
    const groupedIdeas = groupIdeasByType(scoredIdeas);
    
    res.json(groupedIdeas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Helper function to score and sort ideas based on user requirements
 */
function scoreAndSortIdeas(ideas, industry, targetAudience, budgetRange, timeframe, channels, goals) {
  // Assign weights to different criteria
  const weights = {
    industry: 3,
    targetAudience: 5,
    budgetMatch: 4,
    timeframeMatch: 2,
    channelRelevance: 2,
    goalAlignment: 5
  };
  
  // Calculate score for each idea
  const scoredIdeas = ideas.map(idea => {
    let score = 0;
    
    // Industry relevance
    if (idea.tags.some(tag => industry.includes(tag))) {
      score += weights.industry;
    }
    
    // Target audience match
    const audienceMatchCount = idea.target_demographics.filter(demo => 
      targetAudience.includes(demo)
    ).length;
    score += (audienceMatchCount / idea.target_demographics.length) * weights.targetAudience;
    
    // Budget appropriateness
    const budgetRanges = ['Low', 'Medium', 'High'];
    const ideaBudgetIndex = budgetRanges.indexOf(idea.budget_range);
    const requestedBudgetIndex = budgetRanges.indexOf(budgetRange);
    if (ideaBudgetIndex <= requestedBudgetIndex) {
      score += weights.budgetMatch * (1 - (ideaBudgetIndex / requestedBudgetIndex || 1));
    }
    
    // Timeframe match
    if (idea.implementation_time === timeframe) {
      score += weights.timeframeMatch;
    }
    
    // Channel relevance
    const channelRelevance = idea.tags.filter(tag => 
      channels.some(channel => tag.includes(channel))
    ).length;
    score += channelRelevance * weights.channelRelevance;
    
    // Goal alignment
    const goalMatch = idea.success_metrics.filter(metric => 
      goals.some(goal => metric.includes(goal))
    ).length;
    score += (goalMatch / idea.success_metrics.length || 0) * weights.goalAlignment;
    
    return { ...idea.toObject(), score };
  });
  
  // Sort by score (descending)
  return scoredIdeas.sort((a, b) => b.score - a.score);
}

/**
 * Helper function to group ideas by type
 */
function groupIdeasByType(ideas) {
  // Take top 20 ideas
  const topIdeas = ideas.slice(0, 20);
  
  // Group by type
  const groupedIdeas = topIdeas.reduce((groups, idea) => {
    const type = idea.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(idea);
    return groups;
  }, {});
  
  // Ensure diversity by taking max 3 ideas per type
  Object.keys(groupedIdeas).forEach(type => {
    if (groupedIdeas[type].length > 3) {
      groupedIdeas[type] = groupedIdeas[type].slice(0, 3);
    }
  });
  
  return groupedIdeas;
}

module.exports = router;