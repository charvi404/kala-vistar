import React from 'react';

interface ChartProps {
  data: { name: string; score: number; color: string }[];
  title: string;
}

export default function Chart({ data, title }: ChartProps) {
  const maxScore = Math.max(...data.map(item => item.score));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-24 text-sm font-medium text-gray-600 truncate">
              {item.name}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${(item.score / maxScore) * 100}%`,
                  backgroundColor: item.color 
                }}
              />
            </div>
            <div className="text-sm font-bold text-gray-800 w-12 text-right">
              {item.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}