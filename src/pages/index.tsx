import React from 'react';
import TodoList from '../components/TodoList';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, CheckCircle, Clock } from 'lucide-react';

const Homepage: React.FC = () => {
  const welcomeMessages = [
    "Welcome! Let's turn those 'I'll do it later' moments into 'Done!'",
    "Procrastination's greatest enemy: a good to-do list. Let's conquer it!",
    "Here's to ticking things off... one checkbox at a time!",
    "Welcome! Remember, even Rome didn't get built in one day (but they had a list).",
    "Every day's a fresh start... to get things done or at least attempt to!",
    "Welcome! Your to-dos called; they're ready for action!",
    "Productivity awaits! Or at least... an attempt at it."
  ];

  const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500 dark:text-green-200" />,
      title: "Stay Organized",
      description: "Keep your tasks organized and prioritized"
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-500 dark:text-blue-200" />,
      title: "Track Progress",
      description: "Monitor your progress and celebrate completions"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-500 dark:text-purple-200" />,
      title: "Never Miss a Task",
      description: "Stay on top of your important deadlines"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="text-center py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 rounded-full px-6 py-2 text-blue-600 dark:text-blue-400 mb-8 "
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          <span>Start organizing your day</span>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {randomMessage}
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Your personal task management assistant that helps you stay organized and productive
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Todo List Section */}
        <motion.div
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="p-6">
            <TodoList />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Homepage;