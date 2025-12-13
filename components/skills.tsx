'use client';

import { motion } from 'framer-motion';

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'AI/ML & Data Science',
    skills: [
      'TensorFlow',
      'PyTorch',
      'scikit-learn',
      'NLP',
      'Deep Learning',
      'Machine Learning',
      'Data Analysis',
      'Feature Engineering',
    ],
  },
  {
    category: 'Backend Development',
    skills: ['Python', 'Node.js', 'Django', 'FastAPI', 'REST APIs', 'SQL', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'Frontend Development',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'Framer Motion'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Linux', 'CI/CD', 'GitHub Actions', 'Database Design'],
  },
];

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ y: -3, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-semibold text-sm hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all cursor-default shadow-md"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-xl border border-indigo-200 dark:border-indigo-800"
        >
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
            With <span className="font-bold text-indigo-600 dark:text-indigo-400">2 years</span> of
            development experience, I continuously stay updated with the latest technologies and best
            practices in AI/ML, cloud computing, and modern web development.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
