import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Animation from "./Animation";
import { Link, useParams } from "react-router";
import dayjs from "dayjs";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

export default function StudentDetail() {
  let { id } = useParams();
  let [loading, setLoading] = useState(true);
  const [allStudent, setAllStudent] = useState([]);

  async function getData() {
    try {
      setLoading(true);
      const res = await axios(`http://localhost:9000/student/${id}`);
      const data = await res.data;
      console.log(data);
      setAllStudent(data);
      setLoading(false);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl text-slate-900 text-center font-semibold my-8">
        Student Detail
      </h1>

      <section className="mb-2 border p-4 rounded-lg w-1/2 mx-auto bg-neutral-100">
        <div className="mx-auto">
          <div className="card md:flex max-w-lg">
            <div className="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
              <img
                className="object-cover rounded-full"
                src="https://tailwindflex.com/public/images/user.png"
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <p className="font-bold">{allStudent.sname} </p>
              <h3 className="text-sm text-slate-700 heading">
                {allStudent.fname}
              </h3>
              <div className="flex text-sm text-slate-600 heading">
                {/* <p className="mt-1">
                  <FaPhoneAlt size={"12px"} />
                </p> */}
                <p className="">{allStudent.mobile}</p>
              </div>
              <div className="flex mt-2 mb-3 text-sm text-slate-600">
                {/* <p className="mt-1">
                  <FaHome />
                </p> */}
                <p className="">{allStudent.address}.</p>
              </div>
              <div>
                <span className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm">
                  Join {dayjs(allStudent.doj).format("DD-MM-YYYY")}
                </span>

                <Link
                  to={"/home"}
                  className="bg-red-500 text-white ml-2 px-3 py-1.5 rounded-lg text-sm"
                >
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
