import React, { useState } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  onClose: () => void;
}

const mockResponses: { [key: string]: string } = {
  'where should i open a shop in mumbai': "Based on current market trends, Andheri is showing high growth potential with a score of 85. The area has good footfall, rising disposable income, and growing appreciation for handmade crafts. Consider opening a store there for maximum visibility.",
  'what products are trending in bandra': "In Bandra, eco-friendly home décor and pottery are currently trending. Handmade candles, bamboo products, and traditional Indian wall art are also performing well. The area attracts conscious consumers who value sustainability.",
  'what price should i set for pottery': "For pottery in South Mumbai, the optimal price range is ₹1200–₹1500 for medium-sized decorative pieces. In areas like Bandra and Andheri, you can command premium prices due to higher purchasing power. Consider starting at ₹1300 for artisanal pottery.",
  'help': "I can help you with:\n• Finding the best neighborhoods to sell your crafts\n• Product pricing recommendations\n• Market trends and popular products\n• Marketing content for your products\n\nJust ask me anything about your artisan business!"
};

export default function Chatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI assistant for artisan business. Ask me about neighborhoods, pricing, or trending products!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(key.split(' ').slice(0, 2).join(' ')) || 
          key.split(' ').some(word => lowerMessage.includes(word))) {
        return response;
      }
    }
    
    return "I understand you're asking about artisan business. I can help with neighborhood selection, pricing strategies, and market trends. Try asking 'Where should I open a shop in Mumbai?' or 'What products are trending in Bandra?'";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        text: getResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-96 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-800">ArtisanAI Assistant</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-orange-600' : 'bg-gray-300'}`}>
                  {message.sender === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-gray-600" />}
                </div>
                <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about neighborhoods, pricing, trends..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleSend}
              className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}