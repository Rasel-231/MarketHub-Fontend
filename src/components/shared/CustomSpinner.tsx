const CustomSpinner = () => (
  <div className="flex justify-center items-center py-10 w-full">
    <svg 
      className="animate-spin h-8 w-8 text-orange-600" 
      viewBox="0 0 24 24"
    >
      <circle cx="4" cy="12" r="2" fill="currentColor"/>
      <circle cx="12" cy="4" r="2" fill="currentColor"/>
      <circle cx="20" cy="12" r="2" fill="currentColor"/>
      <circle cx="12" cy="20" r="2" fill="currentColor"/>
    </svg>
  </div>
);

export default CustomSpinner;