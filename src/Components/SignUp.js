import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";

function Signup() {
  let navigate = useNavigate();

  let handleSubmit = async (values) => {
    let res = await axios.post("https://disneyhotstar0.herokuapp.com/users/sign-up", values);
    if (res.data.statusCode === 200) {
      navigate("/login");
    }
  };

  const signUp = useFormik({
    initialValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid Email").required("Required"),
      password: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      cpassword: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div
      className="container d-flex flex-row justify-content-center align-items-center  "
      style={{ height: "100vh" }}
    >
      <form
        className="text-white border border-primary border-3 p-5"
        style={{ borderRadius: "2%", width: "400px" }}
        onSubmit={signUp.handleSubmit}
      >
        <div className="">
          <h4 className="text-center text-white">Sign Up</h4>
        </div>
        {/* email */}
        <div className="form-group input-group m-0 mt-3">
          <div className="input-group-prepend ">
            <span className="input-group-text login-form-color">
              <EmailIcon />
            </span>
          </div>
          <input
            className="form-control login-form-color"
            placeholder="Email address"
            type="email"
            id="email"
            name="email"
            onBlur={signUp.handleBlur}
            onChange={signUp.handleChange}
            vlaue={signUp.values.email}
          />
        </div>
        {signUp.touched.email && signUp.errors.email ? (
          <div className="text-danger">{signUp.errors.email}</div>
        ) : null}
        {/* password */}
        <div className="form-group input-group m-0 mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text login-form-color">
              <LockIcon />
            </span>
          </div>
          <input
            className="form-control login-form-color"
            placeholder="Create password"
            type="password"
            id="password"
            name="password"
            onBlur={signUp.handleBlur}
            onChange={signUp.handleChange}
            value={signUp.values.password}
          />
        </div>
        {signUp.touched.password && signUp.errors.password ? (
          <div className="text-danger">{signUp.errors.password}</div>
        ) : null}
        {/* cpassword */}
        <div className="form-group input-group m-0 mt-3">
          <div className="input-group-prepend">
            <span className="input-group-text login-form-color">
              <LockIcon />
            </span>
          </div>
          <input
            className="form-control login-form-color"
            placeholder="Repeat password"
            type="password"
            id="cpassword"
            name="cpassword"
            onBlur={signUp.handleBlur}
            onChange={signUp.handleChange}
            value={signUp.values.cpassword}
          />
        </div>
        {signUp.touched.cpassword && signUp.errors.cpassword ? (
          <div className="text-danger">{signUp.errors.cpassword}</div>
        ) : null}
        <div className="form-group mt-3">
          <Button type="submit" className="shadow-none">
            Create Account
          </Button>
        </div>
        <hr className="mt-4" />
        <div className="text-center">
          Have an account?
          <Link to="/login" className="text-decoration-none text-white">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
