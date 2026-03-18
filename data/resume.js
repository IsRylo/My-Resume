const resume = {
  experience: [
    {
      company:     'Company Name',
      role:        'Job Title',
      period:      'Jan 2022 — Present',
      description: 'Describe your impact here.'
    },
    {
      company:     'Previous Company',
      role:        'Previous Job Title',
      period:      'Jun 2019 — Dec 2021',
      description: 'Describe your responsibilities here.'
    },
    {
      company:     'First Company',
      role:        'First Job Title',
      period:      'Jan 2017 — May 2019',
      description: 'Describe your first role here.'
    }
  ],

  education: [
    {
        institution: 'University Name',
        degree:      'Degree, Major',
        period:      '2015 — 2019',
        description: 'Any relevant honors, activities, or coursework.',
        logo:        'images/education/university-name.png', // ← path to logo
        unlocked:    true
    },
    {
        institution: 'Online Course / Bootcamp',
        degree:      'Certification Name',
        period:      '2020',
        description: 'What you learned or built during this course.',
        logo:        'images/education/bootcamp-name.png',
        unlocked:    true
    },
    {
        institution: 'In Progress',
        degree:      'Course or Degree Name',
        period:      '2024 — Present',
        description: 'Currently working towards this.',
        logo:        'images/education/in-progress.png',
        unlocked:    false
    }
    ],

  skills: [
    // level: 0-100 — represents fill of the stat bar
    { name: 'HTML & CSS',   level: 90, category: 'Frontend' },
    { name: 'JavaScript',   level: 80, category: 'Frontend' },
    { name: 'React',        level: 70, category: 'Frontend' },
    { name: 'Node.js',      level: 65, category: 'Backend'  },
    { name: 'Python',       level: 60, category: 'Backend'  },
    { name: 'Git & GitHub', level: 85, category: 'Tools'    },
    { name: 'Figma',        level: 75, category: 'Tools'    }
  ]
};