"use client";

import { motion } from "framer-motion";
// import { Card } from '@/components/ui/card';
import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const sampleData = [
    { name: "Jan", sales: 4000, profit: 2400 },
    { name: "Feb", sales: 3000, profit: 1398 },
    { name: "Mar", sales: 2000, profit: 9800 },
    { name: "Apr", sales: 2780, profit: 3908 },
    { name: "May", sales: 1890, profit: 4800 },
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br  p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-cyan-800">Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-500 rounded-lg text-white"
          >
            Refresh Data
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Total Sales", "Active Users", "Revenue"].map((title, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6 bg-gray-800/50 backdrop-blur-sm border-gray-700">
                <h3 className="text-lg font-medium text-gray-200">{title}</h3>
                <p className="text-3xl font-bold text-white mt-2">
                  {isLoading ? "..." : `${Math.floor(Math.random() * 10000)}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              Sales Overview
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 p-6 rounded-xl"
          >
            <h3 className="text-xl font-bold text-white mb-4">Profit Trends</h3>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
