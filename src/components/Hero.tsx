import React, { useState } from 'react';
import { MessageSquare, Play } from 'lucide-react';
import Chatbot from './Chatbot';

export default function Hero() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <section id="home" className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            AI-Powered Marketplace Assistant for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              Local Artisans
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Helping artisans discover the best neighborhoods, set the right prices, and sell smarter using AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '#demo'}
              className="bg-orange-600 text-white px-8 py-4 rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <Play className="w-5 h-5" />
              <span>Try Demo</span>
            </button>
            <button 
              onClick={() => setShowChatbot(true)}
              className="bg-transparent border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Talk to AI Assistant</span>
            </button>
          </div>
        </div>
      </div>
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </section>
  );
}