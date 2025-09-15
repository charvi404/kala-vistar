import React, { useState } from 'react';
import { MapPin, MessageSquare } from 'lucide-react';
import Chart from './Chart';
import Chatbot from './Chatbot';

export default function Demo() {
  const [selectedCity, setSelectedCity] = useState('mumbai');
  const [showChatbot, setShowChatbot] = useState(false);

  const cityData = {
    mumbai: [
      { name: 'Andheri', score: 85, color: '#ea580c' },
      { name: 'Bandra', score: 78, color: '#fb923c' },
      { name: 'Dadar', score: 65, color: '#fbbf24' }
    ],
    delhi: [
      { name: 'Karol Bagh', score: 82, color: '#ea580c' },
      { name: 'Lajpat Nagar', score: 75, color: '#fb923c' },
      { name: 'Khan Market', score: 68, color: '#fbbf24' }
    ],
    bangalore: [
      { name: 'Koramangala', score: 88, color: '#ea580c' },
      { name: 'Indiranagar', score: 81, color: '#fb923c' },
      { name: 'Jayanagar', score: 72, color: '#fbbf24' }
    ]
  };

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Try Our Demo</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how ArtisanAI can help you find the perfect location for your craft business
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-8">
              <MapPin className="w-8 h-8 text-orange-600" />
              <h3 className="text-2xl font-bold text-gray-800">Select Your City</h3>
            </div>

            <div className="mb-8">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full md:w-auto px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg font-medium"
              >
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Chart 
                  data={cityData[selectedCity as keyof typeof cityData]} 
                  title={`Top 3 Neighborhoods in ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}`}
                />
              </div>
              
              <div className="flex flex-col justify-center space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl">
                  <h4 className="font-bold text-lg text-gray-800 mb-3">Why This Location?</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• High foot traffic and visibility</li>
                    <li>• Growing appreciation for handmade crafts</li>
                    <li>• Rising disposable income in the area</li>
                    <li>• Strong community support for local artisans</li>
                  </ul>
                </div>
                
                <button
                  onClick={() => setShowChatbot(true)}
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Chat with AI Assistant</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </section>
  );
}