import React from 'react';
import { Heart, Target, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About ArtisanAI</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine tradition with technology. By predicting urban trends and providing AI tools, 
            we empower artisans to thrive in both offline and online marketplaces.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              Preserving traditional craftsmanship while enabling artisans to reach modern markets through intelligent technology.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              Creating a world where every artisan has access to data-driven insights and AI-powered tools for business success.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Impact</h3>
            <p className="text-gray-600">
              Helping thousands of artisans make informed business decisions and increase their income through smart technology.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Choose ArtisanAI?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">For Traditional Artisans</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• No technical expertise required</li>
                  <li>• Simple, intuitive interface</li>
                  <li>• Available in local languages</li>
                  <li>• Affordable pricing plans</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Powerful AI Technology</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Real-time market analysis</li>
                  <li>• Predictive neighborhood scoring</li>
                  <li>• Automated content generation</li>
                  <li>• Personalized business insights</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}