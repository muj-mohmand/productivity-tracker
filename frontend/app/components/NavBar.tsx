"use client";
import { isLoggedIn } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const NavBar = () => {
  const loggedIn = useAppSelector(state => state.user.loggedIn);
  const isGuest = useAppSelector(state => state.user.isGuest);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loggedIn ? setShowMenu(true) : setShowMenu(false);
  }, [loggedIn]);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a
          onClick={() => (loggedIn ? router.push("/tasks") : router.push("/"))}
          className="btn btn-ghost text-xl"
        >
          Productivity Tracker
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          ></div>
        </div>
        {loggedIn && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="images/profile_nav_bar_logged_in.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/tasks">Tasks</Link>
              </li>
              <li>
                <Link href="/task">Add Task</Link>
              </li>
              <li>
                <Link
                  onClick={() => localStorage.clear()}
                  href={!isGuest ? "/auth/logout" : "/"}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
