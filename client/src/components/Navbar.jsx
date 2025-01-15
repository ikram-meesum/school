import React from "react";
import { Link } from "react-router";

export default function Navbar() {
  // let location = useLocation();

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to={"/home"}
                    className={"px-3 py-2 text-sm font-medium text-green-400"}
                    aria-current="page"
                  >
                    NUH SCHOOL
                  </Link>

                  <Link
                    to={"/home"}
                    className={
                      location.pathname == `/home`
                        ? "bg-slate-600 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    All Student
                  </Link>

                  <Link
                    to={"/student"}
                    className={
                      location.pathname == `/student`
                        ? "bg-slate-600 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    Student Registration
                  </Link>

                  <Link
                    to={"/fee"}
                    className={
                      location.pathname == `/fee`
                        ? "bg-slate-600 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    Fees
                  </Link>
                  {/* <Link
                    to={"/fee2"}
                    className={
                      location.pathname == `/fee2`
                        ? "bg-slate-600 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    Student Feedback
                  </Link> */}

                  {/* <Link
                    to={"/dashboard/rank"}
                    className={
                      location.pathname == `/dashboard/rank`
                        ? "bg-slate-600 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    Teacher Rank
                  </Link> */}

                  {/* <Link
                    to={"/dashboard/batch"}
                    className={
                      location.pathname == `/dashboard/batch`
                        ? "bg-slate-600 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
                        : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                  >
                    Batch Wise
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
