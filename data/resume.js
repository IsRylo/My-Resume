const resume = {
  experience: [
    {
      company:     'Starbucks Australia',
      role:        'Shift Supervisor',
      period:      'Aug 2023 — Present',
      description: 'Managing day to day operation during a shift. Reduced wastage by 5%. '
    },
    {
      company:     'Universitas Multimedia Nusantara',
      role:        'Teaching Assistant',
      period:      'Jan 2021 — Jun 2021',
      description: 'Facilitated the learning process of OOP to a class of 20. Create the practical mid-term examination for the unit. Conducted a seminar on basic programming strategies.'
    },
  ],

  education: [
    {
        institution: 'Swinburne University of Technology',
        degree:      'Bachelor of Information Communication Technology, Software Development',
        period:      '2023 — 2024',
        description: 'Capstone Project: Mobililty Driving School (driving lesson booking platform)',
        logo:        'data/images/education/swinburne.png',
        unlocked:    true
    },
    {
        institution: 'Universitas Multimedia Nusantara',
        degree:      'Sarjana Komputer Teknik Informatika',
        period:      '2020-2024',
        description: 'Teaching Assistant (1 sem). Fundamentals of Programming',
        logo:        'data/images/education/umn.png',
        unlocked:    true
    },
    {
        institution: 'Certiport',
        degree:      'IT Specialist - Software Development',
        period:      'Jul 2024',
        description: 'Credential ID dUab-DkTw',
        logo:        'data/images/education/it_specialist.png',
        unlocked:    true
    },
    {
        institution: 'In-Progress',
        degree:      'Network Engineer Certificate',
        period:      'Present',
        description: 'Learning for a Certificate',
        logo:        '',
        unlocked:    false
    }
    ],

  skills: [
    // level: 0-100 — represents fill of the stat bar
    { name: 'HTML & CSS',   level: 90, category: 'Frontend' },
    { name: 'JavaScript',   level: 80, category: 'Frontend' },
    { name: 'React',        level: 70, category: 'Frontend' },
    { name: 'PHP',          level: 80, category: 'Backend' },
    { name: 'Node.js',      level: 65, category: 'Backend'  },
    { name: 'Python',       level: 60, category: 'Backend'  },
    { name: 'Git & GitHub', level: 85, category: 'Tools'    },
    { name: 'Figma',        level: 75, category: 'Tools'    },
  ]
};