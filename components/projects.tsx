'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  tags: string[];
  github: string;
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 'textguard',
    title: 'TextGuard',
    shortDescription: 'Advanced Plagiarism Detection System',
    description:
      'An intelligent plagiarism detection platform that uses NLP and machine learning to identify plagiarized content. Features include document analysis, similarity matching, and detailed reports.',
    tags: ['Python', 'NLP', 'Machine Learning', 'Web Development'],
    github: 'https://github.com/Umar-fr/TextGuard-Plagiarism',
    image: '/projects/textguard.svg',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'sales-forecasting',
    title: 'Sales Forecasting System',
    shortDescription: 'AI-Powered Sales Prediction',
    description:
      'Predictive analytics system for accurate sales forecasting using time-series analysis and machine learning models. Helps businesses make data-driven decisions for inventory and resource planning.',
    tags: ['Python', 'TensorFlow', 'Time Series', 'Data Analysis'],
    github: 'https://github.com/Umar-fr/Sales-Forcasting',
    image: '/projects/sales.svg',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'mental-health',
    title: 'Mental Health Support System',
    shortDescription: 'AI Chatbot for Mental Wellness',
    description:
      'Compassionate AI-powered support system providing mental health resources and guidance. Uses natural language processing to understand user concerns and provide appropriate recommendations.',
    tags: ['Python', 'NLP', 'AI', 'Healthcare Tech'],
    github: 'https://github.com/Umar-fr/mental_health_support_system',
    image: '/projects/mental-health.svg',
    color: 'from-purple-500 to-pink-500',
  },
];

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all shadow-lg hover:shadow-2xl"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className="relative p-6 h-full flex flex-col">
                {/* Icon/Image Placeholder */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                  {project.title[0]}
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {project.shortDescription}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-indigo-600 hover:text-white transition-colors font-semibold"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" /> View
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
