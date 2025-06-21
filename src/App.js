import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Validation schema
const FormSchema = Yup.object().shape({
  industry: Yup.string().required('Please select your industry'),
  targetAudience: Yup.array().min(1, 'Select at least one target audience'),
  budgetRange: Yup.string().required('Please select your budget range'),
  timeframe: Yup.string().required('Please select your implementation timeframe'),
  channels: Yup.array().min(1, 'Select at least one current channel'),
  goals: Yup.array().min(1, 'Select at least one engagement goal')
});

// Results display component
const ResultsDisplay = ({ results, setResults }) => {
  const handleReset = () => {
    setResults(null);
  };
  
  const handleExport = () => {
    // Create a formatted text representation of the ideas
    let exportText = "FAN ENGAGEMENT IDEAS\n\n";
    
    Object.entries(results).forEach(([type, ideas]) => {
      exportText += `== ${type.toUpperCase()} ==\n\n`;
      
      ideas.forEach((idea, index) => {
        exportText += `${index + 1}. ${idea.title}\n`;
        exportText += `   ${idea.description}\n`;
        exportText += `   Budget: ${idea.budget_range} | Timeframe: ${idea.implementation_time}\n\n`;
      });
      
      exportText += '\n';
    });
    
    // Create a download link
    const element = document.createElement('a');
    const file = new Blob([exportText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'fan_engagement_ideas.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Fan Engagement Ideas</h2>
        <div>
          <Button variant="outline-primary" onClick={handleExport} className="me-2">
            Export Ideas
          </Button>
          <Button variant="outline-secondary" onClick={handleReset}>
            Start Over
          </Button>
        </div>
      </div>
      
      {Object.entries(results).map(([type, ideas]) => (
        <div key={type} className="mb-5">
          <h3 className="mb-3">{type}</h3>
          <Row>
            {ideas.map((idea) => (
              <Col md={4} key={idea._id} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{idea.title}</Card.Title>
                    <Card.Text>{idea.description}</Card.Text>
                    <div className="mt-3">
                      <span className="badge bg-info me-2">Budget: {idea.budget_range}</span>
                      <span className="badge bg-secondary">Timeframe: {idea.implementation_time}</span>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white">
                    <small className="text-muted">
                      Success metrics: {idea.success_metrics.join(', ')}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Form submission handler
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // In a real app, this would call an API endpoint
      // For demo purposes, we'll simulate a response
      const mockResults = {
        'Digital Event': [
          {
            _id: '1',
            title: 'Virtual Meet and Greet',
            description: 'Host a virtual meet and greet with team players/personalities where fans can ask questions and interact in real-time.',
            budget_range: 'Medium',
            implementation_time: 'Quick',
            target_demographics: ['Gen Z', 'Millennials'],
            success_metrics: ['Attendance numbers', 'Social media mentions', 'Fan feedback']
          },
          {
            _id: '2',
            title: 'Interactive Live Stream Events',
            description: 'Host live-streamed events with interactive elements like polls, Q&A, and real-time influence on content direction.',
            budget_range: 'Low',
            implementation_time: 'Quick',
            target_demographics: ['Gen Z', 'Millennials'],
            success_metrics: ['Viewer count', 'Interaction rate', 'View duration']
          }
        ],
        'AR Experience': [
          {
            _id: '3',
            title: 'AR Stadium Scavenger Hunt',
            description: 'Create an augmented reality scavenger hunt throughout the venue that unlocks exclusive content and prizes.',
            budget_range: 'High',
            implementation_time: 'Extended',
            target_demographics: ['Families', 'Gen Z'],
            success_metrics: ['App downloads', 'Participation rate', 'Time spent in venue']
          }
        ],
        'Contest': [
          {
            _id: '4',
            title: 'User-Generated Content Contest',
            description: 'Run a competition where fans submit creative content (photos, videos, artwork) related to the brand, with prizes for winners.',
            budget_range: 'Low',
            implementation_time: 'Quick',
            target_demographics: ['Gen Z', 'Millennials'],
            success_metrics: ['Submission count', 'Social engagement', 'Reach']
          }
        ],
        'Community Event': [
          {
            _id: '5',
            title: 'Fan Council Program',
            description: 'Create an exclusive group of dedicated fans who provide feedback on initiatives and get special access to decision-makers.',
            budget_range: 'Low',
            implementation_time: 'Medium',
            target_demographics: ['All demographics'],
            success_metrics: ['Application numbers', 'Quality of feedback', 'Member retention']
          },
          {
            _id: '6',
            title: 'Community Service Initiative',
            description: 'Organize events where fans can participate in community service alongside team members/brand representatives.',
            budget_range: 'Medium',
            implementation_time: 'Medium',
            target_demographics: ['All demographics'],
            success_metrics: ['Participant numbers', 'Media coverage', 'Brand sentiment']
          }
        ]
      };
      
      // Simulate API delay
      setTimeout(() => {
        setResults(mockResults);
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
    }
  };
  
  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Fan Engagement Idea Generator</h1>
      
      {!results ? (
        <Formik
          initialValues={{
            industry: '',
            targetAudience: [],
            budgetRange: 'Medium',
            timeframe: 'Medium',
            channels: [],
            goals: []
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="p-4 bg-light rounded shadow">
              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-group mb-3">
                    <label htmlFor="industry">Industry/Product Type</label>
                    <Field as="select" name="industry" className="form-control">
                      <option value="">Select Industry</option>
                      <option value="sports">Sports Team</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="retail">Retail</option>
                      <option value="gaming">Gaming</option>
                      <option value="media">Media</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="industry" component="div" className="text-danger" />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>Target Audience</label>
                    <div className="checkbox-group">
                      <div>
                        <Field type="checkbox" name="targetAudience" value="Gen Z" id="gen-z" />
                        <label htmlFor="gen-z" className="ms-2">Gen Z</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="targetAudience" value="Millennials" id="millennials" />
                        <label htmlFor="millennials" className="ms-2">Millennials</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="targetAudience" value="Gen X" id="gen-x" />
                        <label htmlFor="gen-x" className="ms-2">Gen X</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="targetAudience" value="Boomers" id="boomers" />
                        <label htmlFor="boomers" className="ms-2">Boomers</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="targetAudience" value="Families" id="families" />
                        <label htmlFor="families" className="ms-2">Families</label>
                      </div>
                    </div>
                    <ErrorMessage name="targetAudience" component="div" className="text-danger" />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label htmlFor="budgetRange">Budget Range</label>
                    <Field as="select" name="budgetRange" className="form-control">
                      <option value="Low">Low (Under $5,000)</option>
                      <option value="Medium">Medium ($5,000 - $25,000)</option>
                      <option value="High">High (Over $25,000)</option>
                    </Field>
                    <ErrorMessage name="budgetRange" component="div" className="text-danger" />
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="form-group mb-3">
                    <label htmlFor="timeframe">Implementation Timeframe</label>
                    <Field as="select" name="timeframe" className="form-control">
                      <option value="Quick">Quick (Days/Weeks)</option>
                      <option value="Medium">Medium (1-3 Months)</option>
                      <option value="Extended">Extended (3+ Months)</option>
                    </Field>
                    <ErrorMessage name="timeframe" component="div" className="text-danger" />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>Current Engagement Channels</label>
                    <div className="checkbox-group">
                      <div>
                        <Field type="checkbox" name="channels" value="Social Media" id="social" />
                        <label htmlFor="social" className="ms-2">Social Media</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="channels" value="Email" id="email" />
                        <label htmlFor="email" className="ms-2">Email</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="channels" value="In-person" id="in-person" />
                        <label htmlFor="in-person" className="ms-2">In-person Events</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="channels" value="Mobile App" id="app" />
                        <label htmlFor="app" className="ms-2">Mobile App</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="channels" value="Website" id="website" />
                        <label htmlFor="website" className="ms-2">Website</label>
                      </div>
                    </div>
                    <ErrorMessage name="channels" component="div" className="text-danger" />
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>Engagement Goals</label>
                    <div className="checkbox-group">
                      <div>
                        <Field type="checkbox" name="goals" value="Increase attendance" id="attendance" />
                        <label htmlFor="attendance" className="ms-2">Increase Attendance/Participation</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="goals" value="Build community" id="community" />
                        <label htmlFor="community" className="ms-2">Build Community</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="goals" value="Boost revenue" id="revenue" />
                        <label htmlFor="revenue" className="ms-2">Boost Revenue</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="goals" value="Increase social engagement" id="social-engagement" />
                        <label htmlFor="social-engagement" className="ms-2">Increase Social Engagement</label>
                      </div>
                      <div>
                        <Field type="checkbox" name="goals" value="Grow database" id="database" />
                        <label htmlFor="database" className="ms-2">Grow Fan/Customer Database</label>
                      </div>
                    </div>
                    <ErrorMessage name="goals" component="div" className="text-danger" />
                  </div>
                </Col>
              </Row>
              
              <div className="text-center mt-4">
                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting || loading}>
                  {loading ? 'Generating Ideas...' : 'Generate Engagement Ideas'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <ResultsDisplay results={results} setResults={setResults} />
      )}
    </Container>
  );
}

export default App;