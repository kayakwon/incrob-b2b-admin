import React from 'react';
import { subDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';

// Generate last 10 days of data
const generateData = () => {
  const today = new Date();
  return Array.from({ length: 10 }, (_, i) => {
    const date = subDays(today, 9 - i);
    const isToday = i === 9;
    return {
      date,
      value: Math.floor(Math.random() * 50) + 20, // Random value between 20 and 70
      label: isToday ? '오늘' : format(date, 'EEE', { locale: ko }),
      isToday
    };
  });
};

const data = generateData();

export function BarChart() {
  const chartHeight = 300;
  const maxDataValue = Math.max(...data.map(d => d.value));
  // Calculate the effective height that represents 90% of the chart height
  const effectiveHeight = chartHeight * 0.9;
  // Scale factor to make the highest bar 90% of the chart height
  const scaleFactor = effectiveHeight / maxDataValue;

  return (
    <div className="w-full space-y-4">
      <div className="relative h-[300px]">
        <div className="absolute inset-0 flex items-end justify-between">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-sm mb-2 text-gray-500">{item.value}</span>
              <div
                className={`w-8 ${item.isToday ? 'bg-black' : 'bg-gray-400'}`}
                style={{
                  height: `${item.value * scaleFactor}px`,
                  opacity: item.isToday ? 1 : 0.7,
                }}
              />
              <span className={`text-sm mt-2 ${item.isToday ? 'text-black' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}