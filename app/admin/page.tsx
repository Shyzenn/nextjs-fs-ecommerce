import { DashboardCards } from "../components/admin/DashboardCards";
import { IoBagHandle } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import LatestOrders from "../components/admin/LatestOrders";
import TopProducts from "../components/admin/TopProducts";
import NewProducts from "../components/admin/NewProducts";
import Header from "../components/admin/Header";

const Page = () => {
  return (
    <div>
      <Header />
      <div className="xl:grid xl:grid-cols-4 gap-6 mx-4 xl:h-[calc(100vh-6.5rem)] grid-cols-1 bg-[#f5f5f5]">
        <div className="col-span-3">
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <DashboardCards
                icon={FaSackDollar}
                title="Revenue"
                count="$30.21"
              />
              <DashboardCards icon={IoBagHandle} title="Orders" count="22" />
              <DashboardCards icon={FaUser} title="Customers" count="30" />
              <DashboardCards icon={IoMdCart} title="Products" count="100" />
            </div>
          </div>

          <div className="bg-white p-4 mt-10 rounded-md">
            <LatestOrders />
          </div>
        </div>

        <div className="col-span-1 mt-8 lg:grid grid-cols-2 gap-2 mb-8 xl:flex xl:flex-col xl:mt-0 xl:gap-2 ">
          <div className="bg-white p-4 rounded-md mb-2">
            <TopProducts />
          </div>
          <div className="bg-white p-4 rounded-md ">
            <NewProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
