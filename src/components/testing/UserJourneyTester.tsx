
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  MapPin,
  FileText,
  CreditCard,
  Bell
} from 'lucide-react';

interface TestStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration?: number;
  error?: string;
}

interface UserJourney {
  id: string;
  name: string;
  description: string;
  steps: TestStep[];
  status: 'pending' | 'running' | 'completed' | 'failed';
}

const UserJourneyTester: React.FC = () => {
  const [journeys, setJourneys] = useState<UserJourney[]>([
    {
      id: 'new-user',
      name: 'New User Onboarding',
      description: 'Complete user registration and first verification',
      status: 'pending',
      steps: [
        {
          id: 'signup',
          name: 'User Registration',
          description: 'Create new account with email verification',
          status: 'pending'
        },
        {
          id: 'profile',
          name: 'Profile Setup',
          description: 'Complete user profile information',
          status: 'pending'
        },
        {
          id: 'first-verification',
          name: 'First Address Verification',
          description: 'Submit and process first address verification',
          status: 'pending'
        },
        {
          id: 'payment',
          name: 'Payment Setup',
          description: 'Add payment method and top up wallet',
          status: 'pending'
        }
      ]
    },
    {
      id: 'bulk-verification',
      name: 'Bulk Verification Flow',
      description: 'Upload and process multiple addresses',
      status: 'pending',
      steps: [
        {
          id: 'login',
          name: 'User Login',
          description: 'Authenticate existing user',
          status: 'pending'
        },
        {
          id: 'bulk-upload',
          name: 'Bulk File Upload',
          description: 'Upload CSV file with multiple addresses',
          status: 'pending'
        },
        {
          id: 'processing',
          name: 'Batch Processing',
          description: 'Process all addresses in the batch',
          status: 'pending'
        },
        {
          id: 'results',
          name: 'View Results',
          description: 'Review verification results and export',
          status: 'pending'
        }
      ]
    },
    {
      id: 'escalation',
      name: 'Support Escalation',
      description: 'Test support ticket creation and resolution',
      status: 'pending',
      steps: [
        {
          id: 'failed-verification',
          name: 'Failed Verification',
          description: 'Simulate a verification that requires manual review',
          status: 'pending'
        },
        {
          id: 'create-ticket',
          name: 'Create Support Ticket',
          description: 'User creates escalation ticket',
          status: 'pending'
        },
        {
          id: 'agent-response',
          name: 'Agent Response',
          description: 'Support agent reviews and responds',
          status: 'pending'
        },
        {
          id: 'resolution',
          name: 'Ticket Resolution',
          description: 'Issue resolved and user notified',
          status: 'pending'
        }
      ]
    }
  ]);

  const [runningJourney, setRunningJourney] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);

  const runJourney = async (journeyId: string) => {
    setRunningJourney(journeyId);
    
    setJourneys(prev => prev.map(journey => 
      journey.id === journeyId 
        ? { ...journey, status: 'running' }
        : journey
    ));

    const journey = journeys.find(j => j.id === journeyId);
    if (!journey) return;

    for (let i = 0; i < journey.steps.length; i++) {
      const step = journey.steps[i];
      
      // Mark step as running
      setJourneys(prev => prev.map(journey => 
        journey.id === journeyId 
          ? {
              ...journey,
              steps: journey.steps.map(s => 
                s.id === step.id ? { ...s, status: 'running' } : s
              )
            }
          : journey
      ));

      // Simulate step execution
      const startTime = Date.now();
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      const duration = Date.now() - startTime;

      // Randomly pass or fail (90% pass rate)
      const passed = Math.random() > 0.1;

      setJourneys(prev => prev.map(journey => 
        journey.id === journeyId 
          ? {
              ...journey,
              steps: journey.steps.map(s => 
                s.id === step.id 
                  ? { 
                      ...s, 
                      status: passed ? 'passed' : 'failed',
                      duration,
                      error: passed ? undefined : 'Simulated test failure'
                    }
                  : s
              )
            }
          : journey
      ));

      if (!passed) {
        setJourneys(prev => prev.map(journey => 
          journey.id === journeyId 
            ? { ...journey, status: 'failed' }
            : journey
        ));
        setRunningJourney(null);
        return;
      }

      setOverallProgress(((i + 1) / journey.steps.length) * 100);
    }

    setJourneys(prev => prev.map(journey => 
      journey.id === journeyId 
        ? { ...journey, status: 'completed' }
        : journey
    ));
    
    setRunningJourney(null);
    setOverallProgress(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getJourneyIcon = (journeyId: string) => {
    switch (journeyId) {
      case 'new-user':
        return <User className="h-5 w-5" />;
      case 'bulk-verification':
        return <FileText className="h-5 w-5" />;
      case 'escalation':
        return <Bell className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Journey Testing</h2>
        <Button 
          onClick={() => {
            journeys.forEach(journey => {
              if (journey.status === 'pending') {
                setTimeout(() => runJourney(journey.id), Math.random() * 2000);
              }
            });
          }}
          disabled={runningJourney !== null}
        >
          Run All Tests
        </Button>
      </div>

      {runningJourney && (
        <Card>
          <CardHeader>
            <CardTitle>Running Test Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="w-full" />
            <p className="text-sm text-gray-600 mt-2">
              {Math.round(overallProgress)}% complete
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {journeys.map((journey) => (
          <Card key={journey.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getJourneyIcon(journey.id)}
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {journey.name}
                      <Badge 
                        className={
                          journey.status === 'completed' ? 'bg-green-100 text-green-800' :
                          journey.status === 'failed' ? 'bg-red-100 text-red-800' :
                          journey.status === 'running' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }
                      >
                        {journey.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-gray-600">{journey.description}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => runJourney(journey.id)}
                  disabled={runningJourney !== null || journey.status === 'running'}
                  size="sm"
                >
                  {journey.status === 'running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {journey.status === 'running' ? 'Running' : 'Run Test'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {journey.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{step.name}</h4>
                        {getStatusIcon(step.status)}
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      {step.duration && (
                        <p className="text-xs text-gray-400">
                          Completed in {step.duration}ms
                        </p>
                      )}
                      {step.error && (
                        <p className="text-xs text-red-600 mt-1">{step.error}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserJourneyTester;
