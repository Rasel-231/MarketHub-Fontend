const AdminDashboard = () => {
  const stats = [
    { id: 1, label: "Sales" },
    { id: 2, label: "Stock" },
    { id: 3, label: "Orders" },
    { id: 4, label: "Refund" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 ">
      {stats.map((item) => (
        <div
          key={item.id}
          className="flex justify-center items-center h-32 rounded-lg shadow-lg bg-gray-800 text-white font-extrabold font-nunito text-2xl transition-transform hover:scale-105 cursor-pointer border border-gray-700"
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;