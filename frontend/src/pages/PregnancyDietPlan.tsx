// src/pages/PregnancyDietPlan.tsx

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Utensils } from 'lucide-react';
import { sampleDietPlan } from '../data/motherData';

export const PregnancyDietPlan = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Pregnancy Diet Plan</h1>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 max-w-lg mx-auto space-y-4">
        <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl p-6 text-white shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-2">Week 24 Diet Guide</h2>
          <p className="text-pink-100 text-sm">
            Balanced nutrition for you and your baby's healthy development
          </p>
        </div>

        {sampleDietPlan.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="bg-pink-50 p-3 rounded-full">
                <Utensils className="w-6 h-6 text-pink-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-bold text-gray-800 text-lg">{meal.meal}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{meal.time}</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-3">
                  {meal.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-pink-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {meal.notes && (
                  <div className="bg-pink-50 border-l-4 border-pink-500 p-3 rounded-r-lg">
                    <p className="text-xs text-pink-800 font-medium">{meal.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Additional Tips */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-6">
          <h3 className="font-bold text-amber-800 mb-2">💡 Important Tips</h3>
          <ul className="space-y-1 text-sm text-amber-700">
            <li>• Drink at least 8-10 glasses of water daily</li>
            <li>• Avoid raw or undercooked foods</li>
            <li>• Limit caffeine intake</li>
            <li>• Take prescribed supplements with meals</li>
            <li>• Consult your doctor before making major diet changes</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

