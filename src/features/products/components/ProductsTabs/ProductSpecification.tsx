"use client";

const ProductSpecification = () => {
  // Chobir data gulo ekta array-te rekhechi jate dynamic kora jay
  const specs = [
    { label: "Brand", value: "Panasonic" },
    { label: "Mix-Power", value: "1200 W" },
    { label: "Number of Jars", value: "3 Jar" },
    {
      label: "Jar Capacity",
      value: "Blender Jar 1.5L / Mill Jar 1.0L / Chutney Jar 0.4L",
    },
    { label: "Speed", value: "20,000 RPM" },
    {
      label: "Speed Control",
      value: "NEW ROTARY SWITCH Move from Pulse, 1,2 &3 with Ease",
    },
    { label: "Blade Types", value: "Strong Hardened Samurai Blade" },
    { label: "Buttons", value: "New rotary swtich" },
  ];

  return (
    <div className="max-w-full mx-auto ">
    
      {specs.map((spec, index) => (
        <div key={index} className="flex justify-between p-2 items-center border-b">
          <div className="text-sm font-bold text-zinc-950 dark:text-zinc-400 uppercase tracking-wider w-1/2">
            {spec.label}
          </div>
          <div className=" text-starttext-base font-semibold text-zinc-400 dark:text-zinc-100  w-1/2">
            {spec.value}
          </div>
        </div>
      ))}
       </div>
    
  );
};

export default ProductSpecification;
