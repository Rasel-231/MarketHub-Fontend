"use client"

interface MinHeaderProps {
  title: string;
}
const MinHeader = ({title}:MinHeaderProps) => {
    return (
        <div className="text-md text-red-500 font-bold tracking-wider border-l-10 border-rose-500 pl-3">
           {title}
        </div>
    );
};

export default MinHeader;