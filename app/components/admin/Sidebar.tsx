"use client";

import Link from "next/link";
import { BsBoxes } from "react-icons/bs";
import { BsBag } from "react-icons/bs";
import { PiUsers } from "react-icons/pi";
import { PiStorefrontBold } from "react-icons/pi";
import { BsCash } from "react-icons/bs";
import { Settings } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { useSidebar } from "@/app/admin/SidebarContext";

const links = [
  { name: "Dashboard", href: "/admin", icon: <RiDashboardHorizontalLine /> },
  {
    name: "Products",
    hrefs: ["/admin/products", "/admin/products/addProduct"],
    icon: <BsBoxes />,
  },
  { name: "Customers", href: "/admin/customers", icon: <PiUsers /> },
  { name: "Orders", href: "/admin/orders", icon: <BsBag /> },
  { name: "Payment", href: "/admin/payments", icon: <BsCash /> },
];

const bottomLinks = [
  {
    name: "Settings",
    href: "/admin/settings",
    icon: <Settings className="size-4" />,
  },
  {
    name: "Home",
    href: "/",
    icon: <PiStorefrontBold className="size-4" />,
  },
];

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const isActive = (hrefs?: string | string[]) => {
    if (Array.isArray(hrefs)) {
      return hrefs.some((href) => pathname.startsWith(href));
    }
    return pathname === hrefs;
  };

  return (
    <div
      className={clsx(
        "bg-white px-10 py-8 border-r h-svh fixed top-0 left-0 w-64 xl:relative xl:transform-none 2xl:w-64 transform transition-transform duration-500 ease-in-out xl:translate-x-0 z-30 2xl:px-8",
        {
          "translate-x-0": isOpen, // Open sidebar
          "-translate-x-full": !isOpen, // Close sidebar
          "xl:w-64 xl:fixed": isHovered,
          "xl:w-20 xl:px-0": !isHovered,
        }
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: " 0.3s ease",
      }}
    >
      <div className=" h-[15%] flex flex-col items-center">
        <h1
          className={clsx(
            "hidden xl:block text-2xl xl:text-center 2xl:hidden",
            {
              "xl:block": !isHovered,
              "xl:hidden": isHovered,
            }
          )}
        >
          S
        </h1>
        <h1
          className={clsx("text-2xl 2xl:block ", {
            "xl:block": isHovered,
            "xl:hidden": !isHovered,
          })}
        >
          Sneakerizz
        </h1>
        <div
          className={clsx("gap-2 items-center flex 2xl:items-center 2xl:flex", {
            "xl:flex": isHovered,
            "xl:hidden": !isHovered,
          })}
        >
          <div className="text-sm">Admin</div>
          <div className="w-[4.6rem] bg-blue-500 h-[2px]"></div>
        </div>
      </div>

      <div
        className={clsx("flex flex-col gap-6 h-[60%] 2xl:items-baseline ", {
          "xl:items-center": !isHovered,
          "xl:items-baseline": isHovered,
        })}
      >
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.hrefs ? link.hrefs[0] : link.href}
              className={clsx(
                "flex items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 2xl:w-full",
                {
                  "bg-blue-500 text-white hover:bg-blue-500 hover:text-white":
                    isActive(link.hrefs || link.href),
                  "xl:w-full": isHovered,
                }
              )}
            >
              {link.icon}
              <p
                className={clsx("2xl:block", {
                  "xl:block": isHovered,
                  "xl:hidden": !isHovered,
                })}
              >
                {link.name}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-2 h-[25%] 2xl:items-baseline xl:items-center">
        {bottomLinks.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 2xl:w-full",
                {
                  "bg-blue-500 text-white": pathname === link.href,
                  "xl:w-full": isHovered,
                }
              )}
            >
              {link.icon}
              <p
                className={clsx(" 2xl:block", {
                  "xl:block": isHovered,
                  "xl:hidden": !isHovered,
                })}
              >
                {link.name}{" "}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
