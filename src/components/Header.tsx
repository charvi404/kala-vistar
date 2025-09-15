import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-800">ArtisanAI</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-600 hover:text-orange-600 transition-colors">Home</a>
            <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">Features</a>
            <a href="#demo" className="text-gray-600 hover:text-orange-600 transition-colors">Demo</a>
            <a href="#about" className="text-gray-600 hover:text-orange-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-orange-600 transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}