import AdminDashboard from "@/components/modules/components/Admin/AdminDashboard/AdminDashboard";
import SalesOverViewBarchart from "@/components/modules/components/Admin/AdminDashboard/Charts/SalesOverViewBarchart";
import SalesOverViewChart from "@/components/modules/components/Admin/AdminDashboard/Charts/SalesOverViewChart";


const DashboardPages = () => {
    return (
        <div>
            <AdminDashboard/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mx-4">
                <SalesOverViewChart/>
                <SalesOverViewBarchart/>
            </div>
        </div>
    );
};

export default DashboardPages;