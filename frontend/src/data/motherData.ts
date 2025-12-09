// Dummy data for mother dashboard features

export interface HealthRecord {
  id: string;
  date: string;
  type: string;
  doctor: string;
  notes: string;
  attachments?: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export interface DietPlanItem {
  id: string;
  meal: string;
  time: string;
  items: string[];
  notes?: string;
}

export interface BabyKickLog {
  id: string;
  date: string;
  time: string;
  count: number;
  duration: number; // in minutes
  notes?: string;
}

// Sample Health Records
export const sampleHealthRecords: HealthRecord[] = [
  {
    id: '1',
    date: '2025-11-20',
    type: 'ANC Checkup',
    doctor: 'Dr. Sharma',
    notes: 'Blood pressure normal. Baby heartbeat strong. Weight: 65kg. Prescribed iron tablets.',
    attachments: ['report_2025_11_20.pdf']
  },
  {
    id: '2',
    date: '2025-10-15',
    type: 'Ultrasound',
    doctor: 'Dr. Sharma',
    notes: '20-week scan completed. Baby growth on track. All measurements normal.',
    attachments: ['ultrasound_20weeks.pdf']
  },
  {
    id: '3',
    date: '2025-09-10',
    type: 'Blood Test',
    doctor: 'Dr. Sharma',
    notes: 'Hemoglobin: 12.5 g/dL (Normal). Blood sugar: 95 mg/dL (Normal).',
    attachments: ['blood_test_2025_09_10.pdf']
  },
  {
    id: '4',
    date: '2025-08-05',
    type: 'First ANC Visit',
    doctor: 'Dr. Sharma',
    notes: 'Initial consultation. LMP confirmed. EDD calculated. Prescribed folic acid.',
  }
];

// Sample Emergency Contacts
export const sampleEmergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    relationship: 'Husband',
    phone: '+91 99999 88888',
    isPrimary: true
  },
  {
    id: '2',
    name: 'Dr. Sharma',
    relationship: 'Doctor',
    phone: '+91 88888 77777',
    isPrimary: false
  }
];

// Sample Diet Plan
export const sampleDietPlan: DietPlanItem[] = [
  {
    id: '1',
    meal: 'Breakfast',
    time: '8:00 AM',
    items: ['Oats porridge with fruits', '1 glass milk', '1 boiled egg'],
    notes: 'Rich in protein and fiber'
  },
  {
    id: '2',
    meal: 'Mid-morning Snack',
    time: '11:00 AM',
    items: ['Fresh fruits (apple/banana)', 'Nuts (almonds/walnuts)'],
    notes: 'Keep hydrated with water'
  },
  {
    id: '3',
    meal: 'Lunch',
    time: '1:00 PM',
    items: ['Brown rice', 'Dal (lentils)', 'Green vegetables', 'Curd'],
    notes: 'Include leafy greens daily'
  },
  {
    id: '4',
    meal: 'Evening Snack',
    time: '4:00 PM',
    items: ['Sprouts salad', '1 glass fresh juice'],
    notes: 'Avoid packaged snacks'
  },
  {
    id: '5',
    meal: 'Dinner',
    time: '7:00 PM',
    items: ['Roti (whole wheat)', 'Vegetable curry', 'Salad', 'Milk before bed'],
    notes: 'Light dinner, early timing'
  }
];

// Sample Baby Kick History
export const sampleBabyKickLogs: BabyKickLog[] = [
  {
    id: '1',
    date: '2025-12-09',
    time: '9:30 AM',
    count: 12,
    duration: 10,
    notes: 'Active movement after breakfast'
  },
  {
    id: '2',
    date: '2025-12-08',
    time: '2:15 PM',
    count: 15,
    duration: 12,
    notes: 'Strong kicks during afternoon'
  },
  {
    id: '3',
    date: '2025-12-08',
    time: '8:45 PM',
    count: 10,
    duration: 8,
    notes: 'Evening activity'
  },
  {
    id: '4',
    date: '2025-12-07',
    time: '10:00 AM',
    count: 14,
    duration: 10,
  },
  {
    id: '5',
    date: '2025-12-07',
    time: '6:30 PM',
    count: 11,
    duration: 9,
    notes: 'After dinner'
  },
  {
    id: '6',
    date: '2025-12-06',
    time: '11:20 AM',
    count: 13,
    duration: 11,
  }
];

