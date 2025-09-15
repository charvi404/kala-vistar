import React, { useState } from 'react';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Sparkles } from 'lucide-react';

export default function Footer() {
  const [formData, setFormData] = useState({ email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({ email: '', phone: '', message: '' });
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold">Kala Vistar</span>
            </div>
            
            <p className="text-gray-400 mb-6">
              Empowering local crafts with AI-driven insights and tools for the modern marketplace.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-600" />
                <span>contact@kalavistar.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-600" />
                <span>+91 98765 43210</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mb-8">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-6">
              <a href="#about" className="text-gray-400 hover:text-orange-600 transition-colors">About</a>
              <a href="#features" className="text-gray-400 hover:text-orange-600 transition-colors">Features</a>
              <a href="#demo" className="text-gray-400 hover:text-orange-600 transition-colors">Demo</a>
              <a href="#contact" className="text-gray-400 hover:text-orange-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Kala Vistar. All rights reserved. Empowering artisans with intelligent technology.
          </p>
        </div>
      </div>
    </footer>
  );
}