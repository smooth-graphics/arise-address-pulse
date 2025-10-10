import { Search, Bell, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HelpSupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(1); // Second FAQ is expanded by default
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    requestType: "",
    message: ""
  });

  const faqItems = [
    {
      question: "Why is some result data redacted, and how do I view full details?",
      answer: ""
    },
    {
      question: "I believe a result is incorrect — what do I do?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "How do bulk verifications work and what CSV format should I use?",
      answer: ""
    },
    {
      question: "How does billing, wallet and token usage work?",
      answer: ""
    },
    {
      question: "How do I escalate a problematic verification?",
      answer: ""
    },
    {
      question: "What does the confidence score mean and how should I use it?",
      answer: ""
    }
  ];

  const handleFaqToggle = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4.5 border-b border-black/5">
        <h1 className="text-2xl font-bold text-genital-gray-700 tracking-tight">Help & Support</h1>
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

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Search Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-black mb-4">Looking for something?</h2>
            <div className="flex items-center gap-3">
              <Input 
                placeholder=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-9 px-3 border-genital-stroke rounded-lg bg-white"
              />
              <Button className="h-9 px-4 bg-genital-orange hover:bg-genital-orange/90 text-white text-sm font-semibold shadow-[0_0_6px_1px_rgba(248,145,17,0.25)]">
                Search
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl">
            <h2 className="text-lg font-medium text-black mb-4">Frequently Asked Questions (FAQs)</h2>
            <div className="space-y-0">
              {faqItems.map((faq, index) => (
                <div key={index} className="border-b border-genital-stroke/50">
                  <button
                    onClick={() => handleFaqToggle(index)}
                    className="w-full flex items-center justify-between py-4.25 px-3 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <span className="text-base font-medium text-genital-gray-700 leading-6 flex-1 pr-4">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-6 h-6 text-genital-gray-400 flex-shrink-0" strokeWidth={1.5} />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-genital-gray-400 flex-shrink-0" strokeWidth={1.5} />
                    )}
                  </button>
                  {expandedFaq === index && faq.answer && (
                    <div className="px-3 pb-5 border-t border-genital-stroke/50">
                      <p className="text-sm text-genital-gray-500 leading-5 mt-2">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 p-4 border-l border-black/5">
          {/* Call Us Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-black mb-2">Call Us</h3>
            <p className="text-sm text-genital-gray-500 mb-4">Mon - Fri. 9:00AM - 5:00PM</p>
            <div className="space-y-2">
              <a href="tel:081634503433" className="block text-sm text-genital-gray-700 underline hover:text-genital-orange">
                081634503433
              </a>
              <a href="tel:+234909999988" className="block text-sm text-genital-gray-700 underline hover:text-genital-orange">
                +(234)-909-999-9988
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-genital-stroke rounded-2xl">
            <div className="px-3 py-4 border-b border-black/10">
              <h3 className="text-lg font-medium text-black">Send us a message</h3>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-3 space-y-4">
              {/* Name Fields */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-genital-gray-500 mb-1.5">First name</label>
                  <Input 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="h-9 px-3 border-genital-stroke rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-genital-gray-500 mb-1.5">Last name</label>
                  <Input 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="h-9 px-3 border-genital-stroke rounded-lg"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs text-genital-gray-500 mb-1.5">Email</label>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-9 px-3 border-genital-stroke rounded-lg"
                />
              </div>

              {/* Request Type */}
              <div>
                <label className="block text-xs text-genital-gray-500 mb-1.5">Request Type</label>
                <Select value={formData.requestType} onValueChange={(value) => handleInputChange("requestType", value)}>
                  <SelectTrigger className="h-9 px-3 border-genital-stroke rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing Issue</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs text-genital-gray-500 mb-1.5">Message</label>
                <Textarea 
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="h-24 px-3 py-2 border-genital-stroke rounded-lg resize-none"
                  placeholder=""
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <Button 
                  type="submit"
                  className="h-9 px-4 bg-genital-orange hover:bg-genital-orange/90 text-white text-sm font-semibold shadow-[0_0_6px_1px_rgba(248,145,17,0.25)]"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}