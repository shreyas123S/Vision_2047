// src/pages/BabyKickHistory.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, Clock, Activity } from 'lucide-react';
import { sampleBabyKickLogs, BabyKickLog } from '../data/motherData';

export const BabyKickHistory = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<BabyKickLog[]>(sampleBabyKickLogs);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLog, setNewLog] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    count: '',
    duration: '',
    notes: ''
  });

  const handleAddLog = () => {
    if (newLog.count && newLog.duration) {
      const log: BabyKickLog = {
        id: Date.now().toString(),
        date: newLog.date,
        time: newLog.time,
        count: parseInt(newLog.count),
        duration: parseInt(newLog.duration),
        notes: newLog.notes || undefined
      };
      setLogs([log, ...logs]);
      setNewLog({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        count: '',
        duration: '',
        notes: ''
      });
      setShowAddModal(false);
    }
  };

  const handleBack = () => {
    // Go back in history, or fallback to dashboard if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/mother/dashboard');
    }
  };

  // Group logs by date
  const groupedLogs = logs.reduce((acc, log) => {
    if (!acc[log.date]) {
      acc[log.date] = [];
    }
    acc[log.date].push(log);
    return acc;
  }, {} as Record<string, BabyKickLog[]>);

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
          <h1 className="text-xl font-bold text-gray-800">Baby Kick History</h1>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 max-w-lg mx-auto space-y-4">
        {/* Add Log Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full bg-pink-500 text-white p-5 rounded-xl shadow-sm flex items-center justify-center gap-2 font-semibold hover:bg-pink-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Log Baby Kicks</span>
        </button>

        {/* Stats Summary */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">This Week Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-pink-50 rounded-lg">
              <p className="text-2xl font-bold text-pink-600">{logs.length}</p>
              <p className="text-xs text-gray-600">Total Logs</p>
            </div>
            <div className="text-center p-3 bg-pink-50 rounded-lg">
              <p className="text-2xl font-bold text-pink-600">
                {Math.round(logs.reduce((sum, log) => sum + log.count, 0) / logs.length) || 0}
              </p>
              <p className="text-xs text-gray-600">Avg Kicks</p>
            </div>
          </div>
        </div>

        {/* Logs List */}
        {Object.entries(groupedLogs).map(([date, dateLogs]) => (
          <div key={date} className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 px-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            {dateLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-pink-50 p-3 rounded-full">
                    <Activity className="w-6 h-6 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">{log.time}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Kick Count</p>
                        <p className="text-lg font-bold text-pink-600">{log.count}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-lg font-bold text-pink-600">{log.duration} min</p>
                      </div>
                    </div>
                    {log.notes && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">{log.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>

      {/* Add Log Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Log Baby Kicks</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="text-gray-500 text-xl">×</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newLog.date}
                    onChange={(e) => setNewLog({ ...newLog, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newLog.time}
                    onChange={(e) => setNewLog({ ...newLog, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kick Count
                  </label>
                  <input
                    type="number"
                    value={newLog.count}
                    onChange={(e) => setNewLog({ ...newLog, count: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    value={newLog.duration}
                    onChange={(e) => setNewLog({ ...newLog, duration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={newLog.notes}
                  onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows={3}
                  placeholder="Any observations..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddLog}
                  className="flex-1 px-4 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-colors"
                >
                  Save Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

