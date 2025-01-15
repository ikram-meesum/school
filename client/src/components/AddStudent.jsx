import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
// import dayjs from "dayjs";
import Animation from "./Animation";

import { useForm } from "react-hook-form";
// import Navbar from "../components/Navbar";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  // const navigate = useNavigate();
  const [allClass, setAllClass] = useState([]);
  //   const [filter, setFilter] = useState("");

  // async function getData() {
  //   try {
  //     const res = await axios("http://localhost:9000/classes");
  //     const data = await res.data;
  //     console.log(data);
  //     setAllStudent(data);
  //   } catch (err) {
  //     console.log("Error occured from getdata method: ", err);
  //   }
  // }

  useEffect(() => {
    // getData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post("http://localhost:9000/student", {
        sname: data.sname,
        fname: data.fname,
        mobile: data.mobile,
        address: data.address,
        dob: data.dob,
        doj: data.doj,
        dor: data.dor,
        rollno: data.roll,
        class_name: data.classes,
      })
      .then(
        (response) => {
          console.log(response);
          // alert("Signup Successfully!");
          reset();
          // toast.success("Student inserted successfully!");
          navigate("/home");
        },
        (error) => {
          console.log(error.message);
        }
      );
  };

  return (
    <div>
      <Navbar />
      <Animation>
        <section className="bg-gray-50 h-screen">
          <h1 className="text-3xl text-center text-slate-800 font-semibold pt-10 pb-6">
            Student Registration
          </h1>
          {/* start alert */}
          <div
            className="flex items-center p-4 mt-6 mb-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-3/4 mx-auto"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Important Message!</span> Please
              fill the student form carefully for registration.
            </div>
          </div>
          {/* end alert */}

          <form
            className="lg:col-span-2 mt-3 mb-10"
            onSubmit={handleSubmit(onSubmit)}
            // onClick={()=> onSubmit}
          >
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 mx-32 md:grid-cols-9">
              <div className="md:col-span-3">
                <label>Student Name</label>
                <input
                  type="text"
                  {...register("sname", { required: true })}
                  // name="address"
                  // id="address"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  // value=""
                  placeholder="Enter Student name"
                />
                {errors.sname && (
                  <p className="text-red-500">Full name is required.</p>
                )}
              </div>

              <div className="md:col-span-3">
                <label>Father Name </label>
                <input
                  type="text"
                  {...register("fname", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Father Name"
                />
                {errors.fname && (
                  <p className="text-red-500">Father name is required.</p>
                )}
              </div>

              <div className="md:col-span-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  {...register("dob", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                />
                {errors.dob && (
                  <p className="text-red-500">Date of Birth is required.</p>
                )}
              </div>

              <div className="md:col-span-3 mt-4">
                <label>Date of Admission</label>
                <input
                  type="date"
                  {...register("doj", { required: true })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  // placeholder="Enter Password"
                />
                {errors.doj && (
                  <p className="text-red-500">Date of admission is required.</p>
                )}
              </div>

              <div className="md:col-span-3 mt-4">
                <label>Date of Relieving</label>
                <input
                  type="date"
                  {...register("dor")}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  // placeholder="Enter CNIC No"
                />
                {errors.dor && (
                  <p className="text-red-500">
                    Date of relieving is requidred.
                  </p>
                )}
              </div>

              <div className="md:col-span-3 mt-4">
                <label>Mobile No</label>
                <input
                  type="text"
                  {...register("mobile", { required: true, minLength: 12 })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Enter Mobile No"
                />
                {errors.mobile && (
                  <p className="text-red-500">
                    Valid mobile number is required.
                  </p>
                )}
              </div>

              <div className="md:col-span-3 mt-4">
                <label>Class</label>

                <select
                  {...register("classes")}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                >
                  <option value="NURSERY">NURSERY</option>
                  <option value="KG-01">KG-01</option>
                  <option value="KG-02">KG-02</option>
                  <option value="CLASS-01">CLASS-01</option>
                  <option value="CLASS-02">CLASS-02</option>
                  <option value="CLASS-03">CLASS-03</option>
                  <option value="CLASS-04">CLASS-04</option>
                  <option value="CLASS-05">CLASS-05</option>
                  <option value="CLASS-06">CLASS-06</option>
                  <option value="CLASS-07">CLASS-07</option>
                  <option value="CLASS-08">CLASS-08</option>
                  <option value="CLASS-09">CLASS-09</option>
                  <option value="CLASS-10">CLASS-10</option>
                </select>

                {errors.classes && (
                  <p className="text-red-500">Enter the Batch Number.</p>
                )}
              </div>

              <div className="md:col-span-3 mt-4">
                <label>Roll No</label>
                <input
                  type="text"
                  {...register("roll", { required: true, minLength: 2 })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Enter Roll No"
                />
                {errors.roll && (
                  <p className="text-red-500">Roll No Required.</p>
                )}
              </div>

              <div className="md:col-span-3 mt-4">
                <label>Address</label>
                <input
                  type="text"
                  {...register("address", { required: true, minLength: 6 })}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Enter Address"
                />
                {errors.address && (
                  <p className="text-red-500">Enter the permenant address.</p>
                )}
              </div>

              <div className="md:col-span-3">
                <button
                  // disabled={!pImage}
                  className={
                    // !pImage
                    //   ? "bg-gray-200 text-slate-400 font-bold py-2 px-6 rounded"
                    `bg-slate-800 mt-6 hover:bg-slate-700 text-white font-medium py-2 px-2 text-sm rounded`
                  }
                >
                  ADD STUDENT
                </button>
              </div>
            </div>
          </form>
        </section>
      </Animation>
    </div>
  );
}
