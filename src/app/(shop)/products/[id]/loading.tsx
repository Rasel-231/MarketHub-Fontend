
import CustomSpinner from "@/components/shared/CustomSpinner"; 

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <CustomSpinner />
    </div>
  );
}