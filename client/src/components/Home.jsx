import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Animation from "./Animation";
import { MdModeEditOutline } from "react-icons/md";
import { MdFeed } from "react-icons/md";
import { Link } from "react-router";

export default function Home() {
  const [allStudent, setAllStudent] = useState([]);
  const [filter, setFilter] = useState("");

  async function getData() {
    try {
      const res = await axios("http://localhost:9000/student");
      const data = await res.data;
      console.log(data);
      setAllStudent(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  // =============== SEARCH CODE ===============
  const lowercasedFilter = filter.toLowerCase();

  const filteredData = allStudent.filter((item) => {
    if (
      (item["sname"] &&
        item["sname"].toLowerCase().includes(lowercasedFilter)) ||
      (item["fname"] &&
        item["fname"].toLowerCase().includes(lowercasedFilter)) ||
      (item["class_name"] &&
        item["class_name"].toLowerCase().includes(lowercasedFilter)) ||
      (item["rollno"] &&
        item["rollno"].toLowerCase().includes(lowercasedFilter))

      // (item["supervisor_id"] &&
      //   item["supervisor_id"].super_name &&
      //   item["supervisor_id"].super_name
      //     .toLowerCase()
      //     .includes(lowercasedFilter))
    ) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    getData();
  }, []);

  const getPDF = () => {
    console.log("pdf");

    const doc = new jsPDF({
      orientation: "landscape",
    });
    var totalPagesExp = "{total_pages_count_string}";

    doc.autoTable({
      html: "#my-table",
      styles: { fontSize: 8 },
      margin: { top: 22, left: 10, right: 10 },
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text(10, 10, "Noor Ul Huda Islamic School");
        doc.setFontSize(15);
        doc.text(10, 18, "All Current Students Reports");

        doc.setFontSize(9);
        let dt = new Date();
        doc.text(
          260,
          18,
          "Print: " +
            dt.getDate() +
            "-" +
            (dt.getMonth() + 1) +
            "-" +
            dt.getFullYear()
        );

        // Footer
        var str = "Page " + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save("all_student_report.pdf");

    // ----------------- End PDF -------------------
  };

  return (
    <>
      <Navbar />
      <Animation>
        <main className="bg-gray-50 h-screen">
          <section className="flex justify-center pt-9 mb-5">
            <h2 className="text-3xl text-center font-medium text-slate-800">
              All Current Students Record
            </h2>
            {/*  */}
            <div className="w-32"></div>
            {/*  */}
            <div className="flex justify-between">
              <div>
                <input
                  type="text"
                  value={filter}
                  placeholder="Search any..."
                  onChange={(e) => {
                    setFilter(e.target.value);
                  }}
                  className="border w-72 border-gray-400 h-9 mt-1 rounded px-3 bg-gray-50"
                />
              </div>

              <button
                type="button"
                onClick={getPDF}
                className="bg-white text-sm font-normal duration-300 text-slate-800 hover:text-white hover:bg-slate-700 border border-slate-800 rounded-md ml-3 py-0 px-3"
              >
                Get Print
              </button>
            </div>
          </section>

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

                    <th scope="col" className="pl-5 py-3">
                      STUDENT NAME
                    </th>
                    <th scope="col" className="pl-5 py-3">
                      FATHER NAME
                    </th>

                    <th scope="col" className="pl-5 py-3">
                      ROLL #
                    </th>

                    <th scope="col" className="pr-5 py-3">
                      CLASS NAME
                    </th>

                    <th scope="col" className="pr-5 py-3">
                      MOBILE
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
                  {filteredData &&
                    filteredData.map((student, ind) => {
                      return (
                        <tr
                          key={ind}
                          className="bg-white border-b hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                        >
                          <td className="pl-3 text-center py-3">{ind + 1}</td>

                          {/* <td className="pl-3 text-center py-3">{"image"}</td> */}

                          <td className="pl-3 font-medium text-gray-900">
                            {/* {prod.productname.substring(0, 35)}... */}
                            {student.sname}
                          </td>

                          <td className="pl-3 text-gray-900">
                            {/* {prod.productname.substring(0, 35)}... */}
                            {student.fname}
                          </td>

                          <td className="pl-3 text-gray-500">
                            {/* {prod.productname.substring(0, 35)}... */}
                            {student.rollno}
                          </td>

                          <td className="mr-3 py-3">{student.class_name}</td>

                          <td className="mr-3 py-3">{student.mobile}</td>

                          {/* <td className="py-3">
                            {dayjs(student.createdAt).format("DD-MMM-YYYY")}
                          </td> */}

                          <td className="py-1">
                            <p className="flex">
                              <MdModeEditOutline
                                color="#3498db"
                                size={"20px"}
                              />
                              &nbsp;&nbsp;&nbsp;
                              <Link to={`/getfee/${student._id}`}>
                                <MdFeed color="#e74c3c" size={"20px"} />
                              </Link>
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
      </Animation>
    </>
  );
}
