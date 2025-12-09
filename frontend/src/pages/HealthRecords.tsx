// src/pages/HealthRecords.tsx

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, User, Download } from 'lucide-react';
import { sampleHealthRecords } from '../data/motherData';

export const HealthRecords = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Go back in history, or fallback to dashboard if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/mother/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">My Health Records</h1>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 max-w-lg mx-auto space-y-4">
        {sampleHealthRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="bg-pink-50 p-3 rounded-full">
                <FileText className="w-6 h-6 text-pink-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-800">{record.type}</h3>
                  <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs font-semibold rounded-full">
                    {record.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <User className="w-4 h-4" />
                  <span>{record.doctor}</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{record.notes}</p>
                {record.attachments && record.attachments.length > 0 && (
                  <div className="flex gap-2">
                    {record.attachments.map((attachment, idx) => (
                      <button
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>{attachment}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

