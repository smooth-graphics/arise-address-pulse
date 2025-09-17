import { Search, Bell, Send, CircleCheck, Flag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  sender: "user" | "agent";
  content: string;
  timestamp: string;
}

interface Issue {
  id: string;
  number: string;
  status: "resolved" | "pending" | "flagged";
}

export default function MemberEscalationCenter() {
  const [messageInput, setMessageInput] = useState("");
  const [messages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "agent",
      content: "Hi James, I just completed a verification for a loan applicant, John Adeyemi. The system flagged his address with a confidence score of 83%. It mapped to 40 Awolowo Road, VI instead of the 14 Awolowo Road, Ikoyi he provided.\nSince our policy requires 90% or above for auto-approval, I've escalated this case for your review.",
      timestamp: "9:17 AM"
    },
    {
      id: "2", 
      sender: "user",
      content: "Ok, mark the data as solved.",
      timestamp: "9:17 AM"
    }
  ]);

  const [issues] = useState<Issue[]>([
    { id: "1", number: "#2378", status: "resolved" },
    { id: "2", number: "#2378", status: "resolved" }
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 bg-white rounded-tl-3xl">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4.5 border-b border-black/5">
        <h1 className="text-2xl font-bold text-genital-gray-700 tracking-tight">Escalation Center</h1>
        <div className="flex items-center gap-4">
          <Button className="h-8 px-3 bg-genital-orange hover:bg-genital-orange/90 text-white text-sm font-medium shadow-[0_0_6px_1px_rgba(248,145,17,0.25)]">
            <span>Verify</span>
            <Search className="w-4 h-4 ml-1.5" strokeWidth={1.2} />
          </Button>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-genital-gray-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-genital-gray-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-68px)]">
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col border-r border-genital-stroke bg-genital-gray-50">
          {/* Chat Header */}
          <div className="flex items-center gap-2 p-4 bg-white border-b border-genital-stroke">
            <div className="w-10 h-10 bg-blue-400/60 rounded-lg flex items-center justify-center">
              <span className="text-white font-medium text-base">EA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-genital-gray-700">Steve Johnson</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-genital-gray-500">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex flex-col gap-1 ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-96 p-3 rounded-lg border border-black/5 ${
                  message.sender === 'user' 
                    ? 'bg-white text-genital-gray-700' 
                    : 'bg-orange-400 text-white'
                }`}>
                  <p className="text-xs leading-4.5 whitespace-pre-line">{message.content}</p>
                </div>
                <span className="text-xs text-genital-gray-400 font-medium">{message.timestamp}</span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-3 bg-white border-t border-genital-stroke">
            <div className="flex items-center gap-2 p-3 border border-genital-stroke rounded-lg">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 border-0 p-0 text-base placeholder:text-genital-gray-400 placeholder:italic focus-visible:ring-0 shadow-none"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="w-8 h-8 bg-genital-orange hover:bg-genital-orange/90 rounded-full p-0"
              >
                <Send className="w-4 h-4" strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 flex flex-col">
          {/* Issues Section */}
          <div className="flex-1 p-4">
            <h3 className="text-sm font-medium text-genital-gray-700 mb-2">Issues</h3>
            <div className="space-y-0">
              {issues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between py-3 border-b border-genital-stroke last:border-0">
                  <span className="text-sm font-medium text-black">{issue.number}</span>
                  <div className="px-2 py-0.5 bg-green-100 border border-green-500/50 rounded-full">
                    <span className="text-xs font-medium text-green-600">Resolved</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-genital-stroke">
            <h3 className="text-sm font-medium text-genital-gray-700 mb-2">Quick actions</h3>
            <div className="flex gap-3">
              <Button className="flex-1 h-9 bg-green-100 hover:bg-green-100/80 text-green-600 border-0">
                <CircleCheck className="w-4 h-4 mr-1.5 fill-green-600 text-white" strokeWidth={1.2} />
                Resolve
              </Button>
              <Button className="flex-1 h-9 bg-red-100 hover:bg-red-100/80 text-red-600 border-0">
                <Flag className="w-4 h-4 mr-1.5 fill-red-600 text-red-600" strokeWidth={1.2} />
                Flag
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}