export const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div className="group flex flex-col items-center justify-center p-8 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent hover:bg-[#DB4444] hover:border-[#DB4444] transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-red-500/20">
      {/* Outer Circle */}
      <div className="w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center group-hover:bg-red-400 transition-colors duration-300">
        {/* Inner Icon Circle */}
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
          {icon}
        </div>
      </div>

      <h3 className="text-3xl font-extrabold mb-1 tracking-tight text-black dark:text-white group-hover:text-white">
        {value}
      </h3>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 group-hover:text-white leading-tight">
        {label}
      </p>
    </div>
  );
};