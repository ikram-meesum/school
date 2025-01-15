import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Animation from "./Animation";
import dayjs from "dayjs";

let dt = dayjs(new Date()).format("MMM-YYYY");
console.log("dt", dt);

export default function Fee() {
  // const navigate = useNavigate();
  const [checkFee, setCheckFee] = useState([]);

  const [feeData, setFeeData] = useState([]);

  async function getData() {
    try {
      const res = await axios("http://localhost:9000/fee");
      const data = await res.data;
      console.log(data);
      setFeeData(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function generateFee() {
    try {
      const res = await axios.post("http://localhost:9000/fee");
      console.log("response", res.data);
      if (res.data === "ALREADY EXIST") {
        alert("ALREADY EXIST");
      } else {
        console.log(res);
        setCheckFee(res);
        // alert("NOT EXIST");
      }
      // const data = await res.data;
      // console.log(res);
      // if (checkFee.length == 0) {
      //   console.log("not exist");
      // } else {
      //   console.log("already exist");
      //   alert("ALREADY EXIST");
      //   // const response = await axios.post("http://localhost:9000/fee");
      //   // console.log("response", response.data);
      // }
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  return (
    <>
      <Navbar />

      <Animation>
        <div className="flex justify-center mt-7">
          <h2 className="text-3xl text-center mr-5 font-semibold">
            All Fee Records
          </h2>
          <button
            onClick={generateFee}
            className="bg-slate-800 text-sm font-normal text-white hover:bg-slate-900 border border-slate-800 rounded-md ml-3 py-2 px-3"
          >
            Generate Fee
          </button>
        </div>

        <section>
          {/* <!--Tabs navigation--> */}
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
                    STUDENT NAME
                  </th>
                  <th scope="col" className="pl-3 py-3">
                    FATHER NAME
                  </th>

                  <th scope="col" className="pl-3 py-3">
                    ROLL #
                  </th>

                  <th scope="col" className="pr-5 py-3">
                    CLASS NAME
                  </th>

                  <th scope="col" className="pr-5 py-3">
                    MONTH
                  </th>

                  <th scope="col" className="py-3 pr-10">
                    CREATED
                  </th>

                  <th scope="col" className="py-1 pr-2">
                    AMOUNT
                  </th>

                  <th scope="col" className="py-1 pr-2">
                    RECEIVED
                  </th>
                </tr>
              </thead>
              <tbody>
                {feeData &&
                  feeData.map((student, ind) => {
                    return (
                      <tr
                        key={ind}
                        className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                      >
                        <td className="pl-3 text-center py-3">{ind + 1}</td>

                        {/* <td className="pl-3 text-center py-3">{"image"}</td> */}

                        <td className="pl-3 font-medium text-gray-900">
                          {/* {prod.productname.substring(0, 35)}... */}
                          {student.studentId.sname}
                        </td>

                        <td className="pl-3 text-gray-900">
                          {/* {prod.productname.substring(0, 35)}... */}
                          {student.studentId.fname}
                        </td>

                        <td className="pl-3 text-gray-500">
                          {/* {prod.productname.substring(0, 35)}... */}
                          {student.studentId.rollno}
                        </td>

                        <td className="mr-3 py-3">
                          {student.studentId.class_name}
                        </td>

                        <td className="mr-3 py-3">{student.monthof}</td>

                        <td className="py-3">
                          {dayjs(student.createdAt).format("DD-MMM-YYYY")}
                        </td>

                        <td className="mr-1 py-1">{student.amount}</td>
                        <td className="mr-1 py-1">{student.rcvd_date}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </Animation>
    </>
  );
}
