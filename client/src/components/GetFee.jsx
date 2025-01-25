import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios, { all } from "axios";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useParams, useNavigate, Link } from "react-router";
import Animation from "./Animation";
import { useForm } from "react-hook-form";

export default function GetFee() {
  let [loading, setLoading] = useState(true);
  const [allStudent, setAllStudent] = useState([]);
  const [btnDisable, setBtnDisable] = useState(false);

  let { id } = useParams();
  //   console.log("sid", id);
  const navigate = useNavigate();
  const [fid, setFid] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function getData() {
    try {
      setLoading(true);
      const res = await axios(`http://localhost:9000/fee/${id}`);
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
  }, [fid]);

  const onSubmit = (data) => {
    console.log("data", data.fee);
    console.log("id", fid);
    if (fid !== null) {
      // alert("if condition");
      axios
        .put(`http://localhost:9000/fee/${fid._id}`, {
          fee: data.fee,
        })
        .then((response) => {
          console.log("res:", response.data);
          reset();
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please select a valid month");
    }
    window.location.reload();
  };

  const setFee = (id) => {
    console.log("test1234", id);
    // console.log("test", id._id);
    setFid(id);
    // console.log("dt", dayjs(new Date()));
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 h-screen">
        <section className="text-center pt-9 mb-5">
          <h2 className="text-3xl text-center font-medium text-slate-800">
            Student Fee Records
          </h2>
        </section>

        <div className="flex justify-between text-slate-600 border w-4/5 mx-auto rounded-md font-semibold p-3">
          <h1>
            Student: {allStudent.length > 0 && allStudent[0].studentId.sname}
          </h1>
          <h2>
            Father: {allStudent.length > 0 && allStudent[0].studentId.fname}
          </h2>
          <h2>
            Roll # {allStudent.length > 0 && allStudent[0].studentId.rollno}
          </h2>
          <h2>{allStudent.length > 0 && allStudent[0].studentId.class_name}</h2>
        </div>

        {/*  */}

        <form
          className="flex justify-center mx-auto lg:col-span-2 mt-3 mb-10 w-2/5"
          onSubmit={handleSubmit(onSubmit)}
          // onClick={()=> onSubmit}
        >
          <div className="md:col-span-3 mt-4 mr-2">
            <input
              type="number"
              {...register("fee", { required: true })}
              className="h-10 border rounded px-4 bg-gray-50"
              placeholder="Enter monthly fee"
            />
            {errors.fee && (
              <p className="text-red-500">Fee amount is required.</p>
            )}
          </div>
          <button
            // disabled={!pImage}
            className={
              // !pImage
              //   ? "bg-gray-200 text-slate-400 font-bold py-2 px-6 rounded"
              `bg-slate-800 mt-4 hover:bg-slate-700 text-white font-medium py-2 px-2 text-sm rounded`
            }
          >
            Receive Fees
          </button>
        </form>
        {/*  */}
        <div className="flex justify-center items-center">
          {/* <FadeLoader
            color={"red"}
            loading={loading}
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> */}
        </div>
        {/*  */}
        <section>
          <div className="border rounded-lg mx-5 mt-5 overflow-hidden shadow-lg">
            <table
              id="my-table"
              className="w-full text-sm text-left rtl:text-right text-gray-500"
            >
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-slate-900 rounded-lg text-white">
                  <th scope="col" className="pl-5 w-10 py-3">
                    S #
                  </th>

                  {/* <th scope="col" className="pl-5 py-3">
                  IMAGE
                </th> */}

                  <th scope="col" className="pl-3 py-3">
                    MONTH NAME
                  </th>
                  <th scope="col" className="pl-3 py-3">
                    RECEIVE DATE
                  </th>

                  <th scope="col" className="pl-3 py-3">
                    CREATED AT{" "}
                  </th>

                  <th scope="col" className="pr-3 py-3">
                    AMOUNT
                  </th>

                  {/* <th scope="col" className="py-3 pr-10">
                      CREATED
                    </th> */}

                  <th scope="col" className="py-1 pr-2">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {allStudent &&
                  allStudent.map((student, ind) => {
                    return (
                      <tr
                        key={ind}
                        className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                      >
                        <td className="pl-3 text-center py-3">{ind + 1}</td>

                        {/* <td className="pl-3 text-center py-3">{"image"}</td> */}

                        <td className="pl-3 font-medium text-gray-900">
                          {/* {prod.productname.substring(0, 35)}... */}
                          {student.monthof}
                        </td>

                        <td className="pl-3 text-gray-900">
                          {/* {prod.productname.substring(0, 35)}... */}
                          {dayjs(student.rcvd_date).format("DD-MMM-YYYY")}
                        </td>

                        <td className="pl-3 text-gray-500">
                          {/* {prod.productname.substring(0, 35)}... */}
                          {dayjs(student.createdAt).format("DD-MMM-YYYY")}
                        </td>

                        <td className="mr-3 py-3">{student.amount}</td>

                        {/* <td className="py-3">
                            {dayjs(student.createdAt).format("DD-MMM-YYYY")}
                          </td> */}

                        <td className="py-1">
                          <p
                            className={
                              student.amount == 0
                                ? "text-red-500 font-medium"
                                : "text-green-600"
                            }
                          >
                            <button
                              disabled={
                                student.amount == 0 ? btnDisable : !btnDisable
                              }
                              className={""}
                              onClick={() => setFee(student)}
                            >
                              {student.amount == 0 ? "Get Fee" : "Received"}
                            </button>
                          </p>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
