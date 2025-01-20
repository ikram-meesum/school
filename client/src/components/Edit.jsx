import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Animation from "./Animation";
import { useParams, useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

export default function Edit() {
  const [allStudent, setAllStudent] = useState([]);
  let { id } = useParams();
  //   console.log("sid", id);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("loaded.");
  }, []);

  // window.location.reload();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(`http://localhost:9000/student/${id}`);
      const data = await response.json();
      console.log("before update: ", data);
      //   SETDEPARTID(data.depart_id);

      return {
        sname: data.sname,
        fname: data.fname,
        mobile: data.mobile,
        address: data.address,
        dob: dayjs(data.dob).format("YYYY-MM-DD"),
        doj: dayjs(data.doj).format("YYYY-MM-DD"),
        dor: dayjs(data.dor).format("YYYY-MM-DD"),
        rollno: data.rollno,
        classes: data.class_name,
        present: data.present,
      };
    },
  });

  const onSubmit = (data) => {
    // console.log("before: ", data);

    axios
      .put(`http://localhost:9000/student/${id}`, {
        sname: data.sname,
        fname: data.fname,
        mobile: data.mobile,
        address: data.address,
        dob: data.dob,
        doj: data.doj,
        dor: data.dor,
        rollno: data.rollno,
        class_name: data.classes,
        present: data.present,
      })
      .then((response) => {
        console.log("res:", response.data);
        // reset();
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <Animation>
        <section className="bg-gray-50 h-screen">
          <h1 className="text-3xl text-center text-slate-800 font-semibold pt-10 pb-6">
            Edit Student Record
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
              update the student record carefully.
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
                  {...register("rollno", { required: true, minLength: 2 })}
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

              <div className="md:col-span-3 mt-4">
                <label>Present</label>

                <select
                  {...register("present")}
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>

              <div className="md:col-span-4 mt-4">
                <button
                  className={`bg-slate-800 mt-6 hover:bg-slate-700 text-white font-medium py-2 px-3 text-sm rounded`}
                >
                  Update Record
                </button>
                &nbsp;&nbsp;
                <Link
                  to={"/home"}
                  className="bg-blue-600 mt-6 hover:bg-blue-700 text-white font-medium py-2 px-3 text-sm rounded"
                >
                  Go Back
                </Link>
              </div>
            </div>
          </form>
        </section>
      </Animation>
    </>
  );
}
