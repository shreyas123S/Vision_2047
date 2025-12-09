// src/pages/EmergencyContacts.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Plus, Star, X } from 'lucide-react';
import { sampleEmergencyContacts, EmergencyContact } from '../data/motherData';

export const EmergencyContacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<EmergencyContact[]>(sampleEmergencyContacts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: ''
  });

  const handleBack = () => {
    // Go back in history, or fallback to dashboard if no history
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/mother/dashboard');
    }
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.relationship && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContact.name,
        relationship: newContact.relationship,
        phone: newContact.phone,
        isPrimary: false
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', relationship: '', phone: '' });
      setShowAddModal(false);
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
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
          <h1 className="text-xl font-bold text-gray-800">Emergency Contacts</h1>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 max-w-lg mx-auto space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="bg-pink-50 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-pink-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800">{contact.name}</h3>
                    {contact.isPrimary && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{contact.relationship}</p>
                  <p className="text-pink-600 font-semibold">{contact.phone}</p>
                </div>
              </div>
              <button
                onClick={() => handleCall(contact.phone)}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                Call
              </button>
            </div>
          </div>
        ))}

        {/* Add Contact Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full bg-pink-500 text-white p-5 rounded-xl shadow-sm flex items-center justify-center gap-2 font-semibold hover:bg-pink-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Emergency Contact</span>
        </button>
      </main>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Contact</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., Husband, Doctor, Friend"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="+91 12345 67890"
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
                  onClick={handleAddContact}
                  className="flex-1 px-4 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-colors"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

