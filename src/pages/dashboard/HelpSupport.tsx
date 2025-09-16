import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CircleHelp, 
  MessageCircle, 
  FileText, 
  Search, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'waiting-response' | 'resolved' | 'closed';
  createdAt: string;
  lastUpdated: string;
}

const mockTickets: SupportTicket[] = [
  {
    id: "TICKET-001",
    subject: "API Integration Issues",
    category: "technical",
    priority: "high",
    status: "in-progress",
    createdAt: "2024-01-15T10:00:00Z",
    lastUpdated: "2024-01-15T14:30:00Z"
  },
  {
    id: "TICKET-002", 
    subject: "Billing Question - Overage Charges",
    category: "billing",
    priority: "medium",
    status: "waiting-response",
    createdAt: "2024-01-14T16:20:00Z",
    lastUpdated: "2024-01-15T09:15:00Z"
  }
];

const faqs = [
  {
    question: "How do I integrate the address verification API?",
    answer: "You can integrate our API by following our comprehensive documentation. Start by obtaining your API key from the API Access page, then use our RESTful endpoints to verify addresses. We provide SDKs for popular programming languages including JavaScript, Python, PHP, and more."
  },
  {
    question: "What's the difference between verification confidence levels?",
    answer: "Our system provides confidence scores from 0-100%. Scores 80+ indicate high confidence, 60-79% medium confidence, and below 60% low confidence. High confidence means the address is very likely valid, while lower scores may require manual review or additional verification."
  },
  {
    question: "How are API calls billed?",
    answer: "API calls are billed based on your subscription plan. Each successful verification request counts as one API call. Failed requests due to system errors are not charged. You can monitor your usage in real-time from your dashboard."
  },
  {
    question: "Can I verify addresses in bulk?",
    answer: "Yes! Business plans include bulk verification features. You can upload CSV files with up to 50,000 addresses (depending on your plan) and receive results via email or download them directly from your dashboard."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "If you exceed your plan's monthly verification limit, you'll be charged for overage at the rate specified in your plan. You can set up usage alerts to be notified before reaching your limits."
  },
  {
    question: "How do I escalate a verification result?",
    answer: "Organization admins can escalate verification results that seem incorrect through the Escalation Center. Our team will manually review the case and provide a resolution within 24-48 hours for high-priority cases."
  }
];

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState(mockTickets);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    category: "",
    priority: "medium" as const,
    description: ""
  });
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'waiting-response': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitTicket = () => {
    if (!newTicket.subject || !newTicket.category || !newTicket.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const ticket: SupportTicket = {
      id: `TICKET-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: newTicket.subject,
      category: newTicket.category,
      priority: newTicket.priority,
      status: 'open',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ subject: "", category: "", priority: "medium", description: "" });

    toast({
      title: "Ticket Created",
      description: `Your support ticket ${ticket.id} has been created successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600">Get help with your account, find answers, and contact support</p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Phone className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <h3 className="font-medium text-gray-900">Phone Support</h3>
                <p className="text-sm text-gray-600">+1-800-GENITAL</p>
                <p className="text-xs text-gray-500">Business hours only</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Mail className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <h3 className="font-medium text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-600">support@genital.com</p>
                <p className="text-xs text-gray-500">24/7 response</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-600" />
              <div className="ml-3">
                <h3 className="font-medium text-gray-900">Response Time</h3>
                <p className="text-sm text-gray-600">&lt; 2 hours</p>
                <p className="text-xs text-gray-500">For urgent issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">
            <CircleHelp className="w-4 h-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="tickets">
            <MessageCircle className="w-4 h-4 mr-2" />
            Support Tickets
          </TabsTrigger>
          <TabsTrigger value="new-ticket">
            <Send className="w-4 h-4 mr-2" />
            New Ticket
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="w-4 h-4 mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {filteredFAQs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No FAQs found matching your search.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Support Tickets</CardTitle>
              <CardDescription>Track the status of your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm">{ticket.id}</span>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">{ticket.subject}</h3>
                        <p className="text-sm text-gray-600 mb-2">Category: {ticket.category}</p>
                        <div className="text-xs text-gray-500">
                          Created: {new Date(ticket.createdAt).toLocaleDateString()} • Last Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {tickets.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No support tickets found. Create a new ticket to get help.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-ticket" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
              <CardDescription>Describe your issue and we'll help you resolve it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <Input
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <Select 
                    value={newTicket.category} 
                    onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="api">API Integration</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <Select 
                    value={newTicket.priority} 
                    onValueChange={(value) => setNewTicket({ ...newTicket, priority: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <Textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Please provide a detailed description of your issue, including any error messages or steps to reproduce..."
                  rows={5}
                />
              </div>
              <Button onClick={handleSubmitTicket} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <FileText className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">API Documentation</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Complete guide to integrating our address verification API
                    </p>
                    <Button size="sm" variant="outline">View Docs</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Best Practices</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Learn how to get the most accurate verification results
                    </p>
                    <Button size="sm" variant="outline">Read Guide</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Troubleshooting</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Common issues and solutions for address verification
                    </p>
                    <Button size="sm" variant="outline">View Solutions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Community Forum</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Connect with other users and share experiences
                    </p>
                    <Button size="sm" variant="outline">Join Forum</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpSupport;