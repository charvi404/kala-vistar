import React, { useState } from 'react';
import FootfallChart from './FootfallChart';

const API_BASE_URL = 'http://localhost:3000'; // Match your backend port

interface Message {
  sender: 'user' | 'bot';
  text?: string;
  type?: 'footfall';
  data?: any;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleUserMessage(userInput: string) {
    if (!userInput.trim()) return;

    try {
      setIsLoading(true);
      setMessages((prev) => [...prev, { sender: 'user', text: userInput }]);
      
      // Call the chat endpoint
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chat endpoint');
      }

      const data = await response.json();
      
      // Handle the response
      if (data.footfallData) {
        // If we have footfall data, show it with the chart
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: data.reply },
          { sender: 'bot', type: 'footfall', data: data.footfallData }
        ]);
      } else {
        // Just show the text response
        setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { 
          sender: 'bot', 
          text: 'Sorry, I encountered an error. Please try again.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4">
      <div className="h-96 overflow-y-auto border rounded-lg p-2 mb-2">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            {msg.type === 'footfall' ? (
              <div className="inline-block w-full max-w-2xl">
                <FootfallChart data={msg.data} />
              </div>
            ) : (
              <div 
                className={`inline-block p-2 rounded-lg max-w-xs ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block bg-gray-100 p-2 rounded-lg">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form 
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleUserMessage(input);
          setInput('');
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Ask me about markets..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`px-4 rounded-r-lg ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white`}
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
