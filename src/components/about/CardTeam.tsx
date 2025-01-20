import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const CardTeam = ({
  name,
  role,
  description,
  imageUrl,
  onEdit,
  onDelete,
  isDashboard,
}: {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  isDashboard: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}) => {
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      id={name}
      className="flex flex-col items-center justify-center gap-4 w-full md:w-[300px] h-auto border rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Profile Picture */}
      <motion.div
        className="relative w-44 h-44"
        whileHover={{ rotate: 5, transition: { duration: 0.3 } }}
      >
        <Image
          src={imageUrl || "/default-profile.png"}
          alt={name || "Team Member"}
          width={176}
          height={176}
          className="rounded-full min-h-[175px] max-h-[176px] min-w-[176px] max-w-[176px] border-4"
        />
      </motion.div>

      <motion.h2
        className="text-lg font-semibold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {name || "Name"}
      </motion.h2>

      {/* Role */}
      <motion.h3
        className="text-md font-medium text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {role || "Role not specified"}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-sm text-gray-600 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {description || "No description provided."}
        perferendis laboriosam eos numquam natus consectetur saepe
        necessitatibus consequatur veniam voluptatem ab veritatis, tenetur
        aliquam a.
      </motion.p>

      {/* Dashboard Buttons */}
      {isDashboard && (
        <motion.div
          className="flex gap-2 mt-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Delete
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CardTeam;
