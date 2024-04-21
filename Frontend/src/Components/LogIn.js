import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Components/Sign_Up.css";
import images from "../images/logo.jpg";

const LogIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setValues({
      email: "",
      password: "",
    });
  }, []);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!values.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    }

    if (!values.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handle_submit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post("http://localhost:8081/login", values);
      if (res.data.status === "Success") {
        // Redirect to the home page or another appropriate page
        navigate("/home");
      } else {
        alert(res.data.Error || "Login Failed");
      }
    } catch (err) {
      alert("An error occurred. Please try again later.");
      console.log(err);
    }
  };


  return (
    <>
      <div className="flex justify-center py-10 bg-[#edebf5] h-[1000px] ">
        <div className="w-[40%]">
           <div className="w-[100%]">
            <img src={images} alt="" className="h-[600px] w-[100%]"/>
           </div>
        </div>

        <form className="Section-B bg-white w-[40%] h-[600px]" onSubmit={handle_submit}>
          <div className="">
            <div className="mt-5 ">
              <h1 className="text-3xl font-bold text-gray-700 px-14 text-center">
                Login Page
              </h1>
              
              <div className="mb-10 px-10 mt-10">
              <h1
                htmlFor="email "
                className="text-[25px] font-bold text-gray-700"
              >
                Email
              </h1>
              <input
                type="email"
                className="border w-full py-2"
                name="email"
                placeholder="   Enter Email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              {errors.email && <p className="text-[20px]" style={{ color: 'red' }}>{errors.email}</p>}
              </div>
               
             <div className="px-10">
              <h1
                htmlFor="password"
                className="text-[25px] font-bold text-gray-700"
              >
                Password
              </h1>
              <input
                className="border py-2 w-full"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              {errors.password && <p className="text-[20px]" style={{ color: 'red' }}>{errors.password}</p>}
              </div> 
              <br />

              <button
                type="submit"
                className="bg-[#0000ff] mb-5 mt-20 font-bold text-xl w-[80%] ml-14 py-2"
              >
                LogIn
              </button>

              <br />
              <span className="ml-14 ">If you have not account </span>

              <Link to="/signup" className="text-[#3c74e3]">
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
