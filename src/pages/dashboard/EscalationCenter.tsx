import { useState } from "react";
import {
  Search,
  Send,
  CircleCheck,
  Flag,
} from "lucide-react";

interface ChatConversation {
  id: string;
  name: string;
  initials: string;
  message: string;
  status: "active" | "flagged" | "resolved";
  time: string;
  avatarColor: string;
  isSelected?: boolean;
}

interface Issue {
  id: string;
  ticketNumber: string;
  status: "resolved";
}

interface Message {
  id: string;
  content: string;
  time: string;
  isFromUser: boolean;
}

const conversations: ChatConversation[] = [
  {
    id: "1",
    name: "Steve Johnson",
    initials: "SJ",
    message: "I'm having trouble connect...",
    status: "active",
    time: "Just now",
    avatarColor: "bg-blue-400",
    isSelected: true,
  },
  {
    id: "2",
    name: "Olamide Coker",
    initials: "OC",
    message: "I'm having trouble connect...",
    status: "flagged",
    time: "4hr ago",
    avatarColor: "bg-red-400",
  },
  {
    id: "3",
    name: "Lisa Kay",
    initials: "LK",
    message: "I'm having trouble connect...",
    status: "resolved",
    time: "Just now",
    avatarColor: "bg-yellow-400",
  },
];

const issues: Issue[] = [
  { id: "1", ticketNumber: "#2378", status: "resolved" },
  { id: "2", ticketNumber: "#2378", status: "resolved" },
];

const messages: Message[] = [
  {
    id: "1",
    content: "Hi James, I just completed a verification for a loan applicant, John Adeyemi. The system flagged his address with a confidence score of 83%. It mapped to 40 Awolowo Road, VI instead of the 14 Awolowo Road, Ikoyi he provided.\n\nSince our policy requires 90% or above for auto-approval, I've escalated this case for your review.",
    time: "9:17 AM",
    isFromUser: false,
  },
  {
    id: "2",
    content: "Ok, mark the data as solved.",
    time: "9:17 AM",
    isFromUser: true,
  },
];

export default function EscalationCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "flagged" | "resolved">("all");
  const [messageInput, setMessageInput] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  const filters = [
    { key: "all" as const, label: "All" },
    { key: "active" as const, label: "Active" },
    { key: "flagged" as const, label: "Flagged" },
    { key: "resolved" as const, label: "Resolved" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-blue-500";
      case "flagged":
        return "text-red-500 bg-red-50 px-1 rounded";
      case "resolved":
        return "text-status-active bg-status-active-bg px-1 rounded";
      default:
        return "text-text-secondary";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="h-full flex">
      {/* Divider */}
      <div className="w-full h-px bg-black/5 absolute top-0 left-0 right-0"></div>

        {/* Left Sidebar - Chat List */}
        <div className="w-[340px] flex-shrink-0 border-r border-neutral-400 bg-white flex flex-col">
        {/* Search */}
        <div className="p-4">
          <div className="flex items-center gap-2 w-full h-9 px-3 bg-white border border-neutral-400 rounded-lg">
            <Search className="w-6 h-6 text-neutral-600" />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm text-text-tertiary placeholder:text-text-tertiary border-none outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`h-6 px-2 text-xs font-medium rounded transition-colors ${
                  activeFilter === filter.key
                    ? "bg-brand-orange/20 text-brand-orange"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

          {/* Chat List */}
          <div className="flex-1 px-4 space-y-3 overflow-y-auto">
            {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-2 rounded-xl cursor-pointer transition-colors ${
                selectedConversation.id === conversation.id
                  ? "bg-brand-orange/10"
                  : "hover:bg-neutral-100"
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-medium ${conversation.avatarColor}`}>
                    {conversation.initials}
                  </div>
                  <div className="w-40">
                    <div className="text-sm font-medium text-text-secondary truncate">
                      {conversation.name}
                    </div>
                    <div className="text-xs text-text-tertiary truncate">
                      {conversation.message}
                    </div>
                  </div>
                </div>
                <div className="w-13 text-right">
                  <div className={`text-sm font-medium mb-1 ${getStatusColor(conversation.status)}`}>
                    {getStatusText(conversation.status)}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {conversation.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Middle - Chat Interface */}
        <div className="flex-1 min-w-0 border-r border-neutral-400 bg-neutral-100 flex flex-col">
        {/* Chat Header */}
        <div className="h-18 px-4 py-4 bg-white border-b border-neutral-400 flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-blue-400 flex items-center justify-center text-white font-medium">
            EA
          </div>
          <div>
            <div className="text-sm font-medium text-text-secondary">
              Steve Johnson
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status-active"></div>
              <span className="text-xs text-text-tertiary">Online</span>
            </div>
          </div>
        </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-4 overflow-y-auto min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col gap-1 max-w-96 ${
                message.isFromUser ? "ml-auto items-end" : "items-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg text-xs leading-4.5 ${
                  message.isFromUser
                    ? "bg-white border border-black/5 text-text-secondary"
                    : "bg-yellow-600 text-white"
                }`}
              >
                {message.content}
              </div>
              <div className="text-xs text-neutral-600 font-medium">
                {message.time}
              </div>
            </div>
          ))}
        </div>

          {/* Message Input */}
          <div className="flex-shrink-0 p-3 bg-white border-t border-neutral-400">
          <div className="relative h-14 border border-neutral-400 rounded-lg">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full h-full px-4 pr-12 text-base italic text-neutral-600 placeholder:text-neutral-600 border-none outline-none bg-transparent rounded-lg"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

        {/* Right Sidebar - Issues & Actions */}
        <div className="w-[290px] flex-shrink-0 bg-white flex flex-col">
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            {/* Issues */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-secondary">Issues</h3>
              <div className="space-y-3">
                {issues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between py-3 border-b border-neutral-400">
                    <span className="text-sm font-medium text-black">
                      {issue.ticketNumber}
                    </span>
                    <div className="flex items-center justify-center gap-2 px-2 py-0.5 rounded-full border-0.5 border-status-active bg-status-active-bg">
                      <span className="text-xs font-medium text-status-active">
                        Resolved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex-shrink-0 p-4 border-t border-neutral-400 bg-white">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-text-secondary">Quick actions</h3>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-1.5 h-9 px-3 bg-status-active-bg rounded-lg">
                  <CircleCheck className="w-4 h-4 text-status-active fill-status-active" />
                  <span className="text-sm font-medium text-status-active">Resolve</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 h-9 px-3 bg-red-50 rounded-lg">
                  <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                  <span className="text-sm font-medium text-red-500">Flag</span>
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}