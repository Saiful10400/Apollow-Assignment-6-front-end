"use client";

import Image from "next/image";
import logo from "../../../assets/nav/logo.png";
import Link from "next/link";
import Tocenter from "@/components/Helper/Tocenter";
import { usePathname } from "next/navigation";
import { Bell, CircleUser } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Redux/hoocks/Convaying";
import "./style.css";
import { setUser } from "@/Redux/featcher/AuthSlice";
const NavBar = () => {
  const path = usePathname();

  const { loggedInUser } = useAppSelector((e) => e.authStore);

  const routes = (
    <>
      <Link
        className={`flex py-2 pl-3 items-center gap-3 text-lg font-bold ${
          path === "/" && "active"
        }`}
        href={"/"}
      >
        News-feed
      </Link>

      {loggedInUser?._id && (
        <Link
          className={`flex py-2 pl-3 items-center gap-3 text-lg font-bold ${
            path === "/profile" && "active"
          }`}
          href={`/profile?id=${loggedInUser?._id}`}
        >
          My-profile
        </Link>
      )}

      <Link
        className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${
          path === "/galary" && "active"
        }`}
        href={"/galary"}
      >
        Galary
      </Link>


      <Link
        className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${
          path === "/about-us" && "active"
        }`}
        href={"/about-us"}
      >
        About Us
      </Link>

      <Link
        className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${
          path === "/contact-us" && "active"
        }`}
        href={"/contact-us"}
      >
        Contact Us
      </Link>
    </>
  );

  console.log(loggedInUser);

  const dispatch = useAppDispatch();
  const logoutHandle = () => {
    // clear local storage.
    localStorage.removeItem("token");
    // clear state.
    dispatch(setUser(null));
  };

  const dropDeownLinks = (
    <>
      <li>
        {loggedInUser ? (
          <button onClick={logoutHandle}>Logout</button>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
        {loggedInUser && <Link href={"/user-dashboard/posts"}>Dashboard</Link>}
        {loggedInUser?.role === "admin" && (
          <Link href={"/admin-dashboard"}>Admin-Dashboard</Link>
        )}
      </li>
    </>
  );

  return (
    <>
      {/* fro desktop view. */}
      <div className="bg-transparent text-black py-4">
        <Tocenter>
          <div className="flex justify-between items-center">
            <Link href={"/"}>
              <Image alt="Logo" width={50} height={400} src={logo}></Image>
            </Link>
            <ul className="flex gap-4 text-lg font-semibold">{routes}</ul>

            <div className=" flex items-center gap-3">
              <button>
                <Bell size={30} />
              </button>
              <details className="dropdown">
                <summary className="btn bg-transparent shadow-none border-none hover:bg-transparent m-1">
                  {loggedInUser ? (
                    <Image
                      height={50}
                      className="rounded-full w-[40px] h-[40px] object-cover"
                      width={50}
                      src={loggedInUser?.img}
                      alt="profileimg"
                    />
                  ) : (
                    <CircleUser size={35} />
                  )}
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 font-semibold shadow">
                  {dropDeownLinks}
                </ul>
              </details>
            </div>
          </div>
        </Tocenter>
      </div>
    </>
  );
};

export default NavBar;
