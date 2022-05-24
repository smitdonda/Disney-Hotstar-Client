import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  let handleSubmit = async (values) => {
    let res = await axios.post("https://disneyhotstar0.herokuapp.com/users/login", values);
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("email", res.data.email);
      navigate("/");
    }
  };
  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
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
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div
      className="container d-flex flex-row justify-content-center align-items-center back-ground-img"
      style={{ height: "100vh" }}
    >
      <form
        className="text-white border border-primary border-3 p-4 description"
        style={{ borderRadius: "2%", width: "400px" }}
        onSubmit={login.handleSubmit}
      >
        <h4 className="mt-3 mb-5 text-center title">Log In </h4>
        <div className="form-group input-group m-0">
          <div className="input-group-prepend ">
            <span className="input-group-text login-form-color">
              <EmailIcon />
            </span>
          </div>
          <input
            className="form-control login-form-color"
            placeholder="Email address"
            type="email"
            name="email"
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            value={login.values.email}
          />
        </div>
        {login.touched.email && login.errors.email ? (
          <div className="text-danger">{login.errors.email}</div>
        ) : null}
        <div className="form-group input-group m-0 mt-4">
          <div className="input-group-prepend">
            <span className="input-group-text login-form-color">
              <LockIcon />
            </span>
          </div>
          <input
            className="form-control login-form-color"
            placeholder="Password"
            type="password"
            name="password"
            onBlur={login.handleBlur}
            onChange={login.handleChange}
            value={login.values.password}
          />
        </div>
        {login.touched.password && login.errors.password ? (
          <div className="text-danger">{login.errors.password}</div>
        ) : null}

        <div className="form-group mt-4">
          <Button type="submit" className="shadow-none">
            Login
          </Button>
        </div>
        <p className="text-center">
          <Link
            to="/sign-up"
            onClick={() => navigate("/signup")}
            className="text-decoration-none text-white"
          >
            <span className="text-muted">Have an account&nbsp;?&nbsp;</span>
            Signup
          </Link>
        </p>
        <h4>Demo Credentials </h4>
        <p>Email&nbsp;:&nbsp;user@gmail.com Password&nbsp;:&nbsp;User@123</p>
      </form>
    </div>
  );
}

export default Login;
