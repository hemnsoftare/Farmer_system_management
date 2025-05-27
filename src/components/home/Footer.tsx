"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  Zap,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [email, setEmail] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const socialVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "backInOut",
      },
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };
  const pathName = usePathname();
  const lang = pathName.startsWith("/ar") || pathName.startsWith("/ku");
  useEffect(() => {}, [pathName]);
  if (
    pathName.startsWith("/si") ||
    pathName.includes("dashboard") ||
    pathName === "/user-profile"
  ) {
    return;
  }
  return (
    <motion.footer
      className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex  items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="to-secondary from-secondary-600 bg-gradient-to-tl p-2 px-3 rounded-lg"
              >
                <span className="text-white text-lg font-bold">FC</span>
              </motion.div>

              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                FarmarCity
              </h3>
            </div>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="group cursor-pointer"
              >
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                  About Us
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="group cursor-pointer"
              >
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                  Contact Us
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="group cursor-pointer"
              >
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                  Careers
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="group cursor-pointer"
              >
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                  Order Status
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Services</h3>
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="group cursor-pointer"
              >
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                  How it Works?
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="group cursor-pointer"
              >
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                  Our Solutions
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="group cursor-pointer"
              >
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                  Support Center
                </span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="group cursor-pointer"
              >
                <span className="text-slate-300 group-hover:text-cyan-400 transition-colors duration-300">
                  FAQ
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Contact Info</h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-start space-x-3 group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                  456 Innovation Drive, Silicon Valley, CA 94043
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                  +1 (888) 555-0123
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                  hello@gmail.com
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Stay Connected</h3>
            <p className="text-slate-300 text-sm">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              {[
                { Icon: Facebook, color: "hover:text-blue-400" },
                { Icon: Twitter, color: "hover:text-sky-400" },
                { Icon: Instagram, color: "hover:text-pink-400" },
                { Icon: Youtube, color: "hover:text-red-400" },
              ].map(({ Icon, color }, index) => (
                <motion.div
                  key={index}
                  variants={socialVariants}
                  whileHover="hover"
                  className={`p-2 bg-white/10 rounded-lg cursor-pointer transition-colors duration-300 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-white/20 mt-2 pt-2"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 text-sm"
            >
              © 2024 FarmarC. All rights reserved.
            </motion.div>

            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
              {[
                "Cookie Settings",
                "Privacy Policy",
                "Terms of Service",
                "Legal Notice",
              ].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
