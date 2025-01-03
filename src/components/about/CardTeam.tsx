import Image from "next/image";
import React from "react";

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
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full md:w-[300px] h-auto border rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all">
      {/* Profile Picture */}
      <div className="relative w-44 h-44">
        <Image
          src={imageUrl || "/default-profile.png"}
          alt={name || "Team Member"}
          width={176}
          height={176}
          className="rounded-full min-h-[175px] max-h-[176px] min-w-[176px] max-w-[176px] border-4"
        />
      </div>
      {/* Name */}
      <h2 className="text-lg font-semibold text-gray-800">{name || "Name"}</h2>
      {/* Role */}
      <h3 className="text-md font-medium text-gray-600">
        {role || "Role not specified"}
      </h3>
      {/* Role/Description */}
      <p className="text-sm text-gray-600 text-center">
        {description || "No description provided."}
        perferendis laboriosam eos numquam natus consectetur saepe
        necessitatibus consequatur veniam voluptatem ab veritatis, tenetur
        aliquam a.
      </p>

      {/* Dashboard Buttons */}
      {isDashboard && (
        <div className="flex gap-2 mt-4">
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
        </div>
      )}
    </div>
  );
};

export default CardTeam;
