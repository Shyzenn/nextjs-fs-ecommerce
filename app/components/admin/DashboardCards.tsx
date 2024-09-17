import { IconType } from "react-icons";

type DashboardCardsProps = {
  icon: IconType;
  title: string;
  count: string;
};

export function DashboardCards({
  icon: Icon,
  title,
  count,
}: DashboardCardsProps) {
  return (
    <div className=" py-4 pl-4 rounded-lg bg-white">
      <div className="justify-between mb-5">
        <div className="bg-blue-50 p-3 w-[40px] rounded-md mb-3">
          <div className="text-blue-500">
            <Icon />
          </div>
        </div>
        <h1 className="text-slate-500">{title}</h1>
      </div>
      <div className="text-2xl">{count}</div>
    </div>
  );
}
