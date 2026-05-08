import AdminDashboard from "@/features/account/components/Admin/AdminDashboard/AdminDashboard";
import SalesOverViewBarchart from "@/features/account/components/Admin/AdminDashboard/Charts/SalesOverViewBarchart";
import SalesOverViewChart from "@/features/account/components/Admin/AdminDashboard/Charts/SalesOverViewChart";
import OrderAnalyticsChart from "@/features/account/components/Admin/AdminDashboard/Charts/SalesOverViewLineChart";
import SalesPieChart from "@/features/account/components/Admin/AdminDashboard/Charts/SalesPieChart";
import PendingOrder from "@/features/orders/Order/PendingOrder";


const DashboardPages = () => {
    return (
        <div>
            <AdminDashboard/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mx-4">
                <SalesOverViewChart/>
                <SalesOverViewBarchart/>
                <OrderAnalyticsChart/>
                <SalesPieChart/>             
            </div>
            <hr />
               <PendingOrder/>
        </div>
    );
};

export default DashboardPages;