import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  Send, 
  MessageCircle, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'bot' | 'staff';
  content: string;
  timestamp: Date;
}

interface LiveChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveChatPopup: React.FC<LiveChatPopupProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      content: 'Hi there! 👋 I\'m your AI assistant. I can help you with:\n\n• Pricing and plans information\n• Address verification process\n• API integration questions\n• Account setup and features\n• Technical troubleshooting\n\nWhat can I help you with today? Or would you prefer to speak with a live agent?',
      timestamp: new Date()
    }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [chatMode, setChatMode] = useState<'bot' | 'staff' | null>('bot');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !chatMode) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: messageInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    // Simulate response after a delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: chatMode,
        content: chatMode === 'bot' 
          ? getBotResponse(messageInput)
          : 'Thank you for your message. A staff member will respond shortly.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('agent') || input.includes('human') || input.includes('staff') || input.includes('customer service') || input.includes('live support')) {
      // Transfer to staff mode
      setTimeout(() => {
        setChatMode('staff');
        const transferMessage: Message = {
          id: Date.now().toString() + '_transfer',
          sender: 'staff',
          content: 'Hello! I\'m a live support agent. I see you were transferred from our AI assistant. How can I help you today?',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, transferMessage]);
      }, 1500);
      return 'I understand you\'d like to speak with a live agent. Let me transfer you to our customer support team right away. Please hold on...';
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('plan')) {
      return 'Our pricing starts at ₦2,500/month for individuals and ₦15,000/month for businesses. We also offer a free trial with 50 verifications. Would you like to learn more about our plans or speak with an agent about custom pricing?';
    }
    
    if (input.includes('api') || input.includes('integration')) {
      return 'Yes! We provide REST APIs for seamless integration. Business and Enterprise users get full API access with comprehensive documentation. Would you like me to connect you with our technical team for detailed integration support?';
    }
    
    if (input.includes('verify') || input.includes('address')) {
      return 'Our platform can verify Nigerian addresses with up to 98% accuracy using advanced algorithms. We support single lookups and bulk uploads. What type of verification are you interested in?';
    }
    
    if (input.includes('support') || input.includes('help')) {
      return 'I\'m here to help! You can also reach our support team via email or phone. For complex technical issues, would you prefer to speak with a live agent?';
    }
    
    if (input.includes('transfer') || input.includes('connect')) {
      return 'Would you like me to transfer you to a live agent? Just say "yes" or "connect me to an agent" and I\'ll get you connected right away!';
    }
    
    return 'That\'s a great question! I can help with information about our platform, pricing, features, and more. If you need personalized assistance, I can connect you with our support team. What would you like to know?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectChatMode = (mode: 'bot' | 'staff') => {
    setChatMode(mode);
    
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      sender: mode,
      content: mode === 'bot' 
        ? 'Great! I\'m your AI assistant. I can help answer questions about our platform, pricing, features, and more. What would you like to know?'
        : 'Connecting you with our support team... A live agent will be with you shortly. Please describe your question or issue.',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, welcomeMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <div 
        className={cn(
          "pointer-events-auto transition-all duration-300 ease-in-out animate-slide-in-right",
          isOpen 
            ? "translate-x-0 opacity-100" 
            : "translate-x-full opacity-0",
          isMinimized ? "w-80 h-16" : "w-80 h-[500px]"
        )}
      >
        <Card className="w-full h-full flex flex-col shadow-2xl border-2">
          {/* Header */}
          <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <CardTitle className="text-lg">
                  {chatMode === 'bot' ? 'AI Assistant' : chatMode === 'staff' ? 'Live Support' : 'Live Chat'}
                </CardTitle>
                {chatMode && (
                  <Badge variant="secondary" className="text-xs">
                    {chatMode === 'bot' ? 'Bot' : 'Staff'}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.sender !== 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {message.sender === 'bot' ? (
                          <Bot className="w-4 h-4 text-primary" />
                        ) : (
                          <User className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    )}
                    
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.sender === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-text-primary"
                      )}
                    >
                      <p className="break-words">{message.content}</p>
                      <p className={cn(
                        "text-xs mt-1 opacity-70",
                        message.sender === 'user' ? "text-primary-foreground" : "text-text-tertiary"
                      )}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </CardContent>

              <Separator />

              {/* Input */}
              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    size="sm"
                    className="px-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {chatMode === 'staff' && (
                  <p className="text-xs text-text-secondary mt-2 text-center">
                    Average response time: 2-3 minutes
                  </p>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LiveChatPopup;