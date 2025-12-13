'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Zap } from 'lucide-react';

export function About() {
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

  const highlights = [
    {
      icon: Brain,
      title: 'AI/ML Expertise',
      description: 'Building intelligent systems with machine learning and deep learning technologies',
    },
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'End-to-end development from backend systems to modern frontend applications',
    },
    {
      icon: Zap,
      title: 'Problem Solving',
      description: 'Tackling complex challenges with innovative and scalable solutions',
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              With over 2 years of development experience, I've honed my expertise in building
              scalable solutions that solve real-world problems. My passion lies at the intersection
              of artificial intelligence and practical software engineering.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I specialize in creating intelligent systems, from plagiarism detection platforms to
              AI-driven mental health support systems. Every project is an opportunity to push
              boundaries and deliver exceptional value.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Currently focused on developing innovative AI/ML applications and mentoring the next
              generation of developers. Let's build something extraordinary together.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-600 rounded-lg mt-1">
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{highlight.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
