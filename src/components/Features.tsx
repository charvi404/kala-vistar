import React, { useState } from 'react';
import { BarChart3, MessageSquare, Sparkles } from 'lucide-react';
import Chart from './Chart';
import Chatbot from './Chatbot';

export default function Features() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [productInput, setProductInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState<{
    description: string;
    caption: string;
    translation: string;
  } | null>(null);

  const chartData = [
    { name: 'Mumbai - Andheri', score: 85, color: '#ea580c' },
    { name: 'Mumbai - Bandra', score: 78, color: '#fb923c' },
    { name: 'Mumbai - Dadar', score: 65, color: '#fbbf24' }
  ];

  const generateContent = () => {
    if (!productInput.trim()) return;

    // Mock AI-generated content based on input
    const mockContent = {
      'handmade bamboo lamps': {
        description: 'Elegant eco-friendly bamboo lamps, handcrafted with care.',
        caption: 'Light up your home with tradition 🌿✨ #Handmade #EcoFriendly',
        translation: 'हाथ से बने बांस के दीये – परंपरा और आधुनिकता का संगम'
      },
      'pottery': {
        description: 'Beautiful handcrafted pottery pieces, perfect for home décor.',
        caption: 'Bring earthen elegance to your space 🏺✨ #Pottery #Handcrafted',
        translation: 'मिट्टी के बर्तन – प्राकृतिक सुंदरता का प्रतीक'
      },
      'wooden furniture': {
        description: 'Premium handcrafted wooden furniture with traditional craftsmanship.',
        caption: 'Timeless wooden craftsmanship for your home 🪵🏠 #WoodFurniture #Artisan',
        translation: 'लकड़ी के फर्नीचर – पारंपरिक शिल्पकारी का नमूना'
      }
    };

    const key = productInput.toLowerCase();
    const content = mockContent[key as keyof typeof mockContent] || {
      description: `Premium handcrafted ${productInput}, made with traditional techniques and modern design sensibilities.`,
      caption: `Discover the beauty of handmade ${productInput} ✨ #Handcrafted #Artisan #Traditional`,
      translation: `हस्तनिर्मित ${productInput} – कुशल कारीगरों की देन`
    };

    setGeneratedContent(content);
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Powerful AI Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed in the artisan marketplace, powered by intelligent AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Gentrification Predictor */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-8 h-8 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-800">Neighborhood Predictor</h3>
            </div>
            <Chart data={chartData} title="Artisan Market Potential Score" />
            <p className="text-gray-600 mt-4">
              Discover the best neighborhoods for your artisan business with AI-powered market analysis.
            </p>
          </div>

          {/* AI Marketplace Assistant */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">AI Assistant</h3>
            </div>
            <div className="space-y-3 mb-6">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">"Where should I open a shop in Mumbai?"</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">"What products are trending in Bandra?"</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">"What price should I set for pottery?"</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Chat with AI Assistant
            </button>
          </div>

          {/* Auto Marketing Content */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-800">Content Generator</h3>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your product (e.g., Handmade bamboo lamps)"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={generateContent}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Generate Content
              </button>
              
              {generatedContent && (
                <div className="space-y-3 mt-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 font-semibold mb-1">DESCRIPTION</p>
                    <p className="text-sm text-gray-800">{generatedContent.description}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 font-semibold mb-1">SOCIAL CAPTION</p>
                    <p className="text-sm text-gray-800">{generatedContent.caption}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 font-semibold mb-1">HINDI TRANSLATION</p>
                    <p className="text-sm text-gray-800">{generatedContent.translation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </section>
  );
}