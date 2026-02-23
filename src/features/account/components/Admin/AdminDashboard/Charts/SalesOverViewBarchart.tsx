"use client"

import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";


const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#ec4899", "#f59e0b"];

const SalesOverViewBarchart = () => {
    interface FormattedDataItem {
        name: string;
        value: number;
    }

    const [salesData, setSalesData] = useState<FormattedDataItem[]>([]);
    
    useEffect(() => {
        fetch("products.json")
            .then(res => res.json())
            .then(data => {
                interface Product {
                    name: string;
                    stock: number;
                }

                const formattedData: FormattedDataItem[] = data.map((item: Product) => ({
                    name: item.name,
                    value: item.stock 
                }));
                setSalesData(formattedData);
            })
            .catch(err => console.error("Error loading data:", err));
    }, []);

    return (
       <motion.div 
            className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-[#1f1f1f] mx-2 md:mx-0" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
                Inventory Stock Distribution
            </h2>
            <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie 
                        data={salesData} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        innerRadius={60}
                        paddingAngle={5}
                        dataKey="value" 
                        label={({percent}) => `${((percent ?? 0) * 100).toFixed(0)}%`} 
                        labelLine={{ stroke: "#9ca3af" }}
                    >
                        {salesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: 'rgba(31, 41, 55, 0.9)',
                            borderColor: "#4b5563",
                            borderRadius: "8px",
                            padding: '8px',
                            fontSize: "12px",
                        }}
                        itemStyle={{ color: "#e5e7eb" }}
                    />
                    <Legend 
                        iconType="circle" 
                        layout="horizontal" 
                        align="center" 
                        verticalAlign="bottom"
                        wrapperStyle={{ fontSize: 10, paddingTop: "20px" }}
                    />
                 </PieChart>
                </ResponsiveContainer>
            </div>
       </motion.div>
    );
};

export default SalesOverViewBarchart;