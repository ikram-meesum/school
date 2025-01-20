import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Animation from "./Animation";

export default function Login() {
  let navigate = useNavigate();

  const {
    register,
    //watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (data.email === "ikram@gmail.com" && data.password === "12345") {
      // alert("yes");
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Animation>
      <div className="bg-sky-100 flex justify-center items-center h-screen">
        {/* <!-- Left: Image --> */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
            alt="Placeholder Image"
            className="object-cover w-full h-full"
          />
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">User Credential</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <!-- Username Input --> */}
            <div className="mb-4 bg-sky-100">
              <label className="block text-gray-600">Username</label>
              <input
                type="email"
                {...register("email", { required: true })}
                id="username"
                // name="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              {errors.email && (
                <p className="text-red-500">Username is required.</p>
              )}
            </div>
            {/* <!-- Password Input --> */}
            <div className="mb-4">
              <label className="block text-gray-800">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              {errors.password && (
                <p className="text-red-500">Password is required.</p>
              )}
            </div>

            {/* <!-- Login Button --> */}
            <button
              type="submit"
              className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Please Login
            </button>
          </form>
          {/* <!-- Sign up  Link --> */}
        </div>
      </div>
    </Animation>
  );
}
