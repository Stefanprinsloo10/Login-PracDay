import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Login: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = (data: any) => {
    let params = {
      grant_type: 'password',//data.grant_type
      client_id: 'web-dashboard',//data.client_id,
      client_secret: 'SuperSecretPassword',//data.client_secret,
      scope: 'openid profile role email offline_access adminApi mobileApi',//data.scope,
      email: data.email,
      password: data.password
    };
    axios
      .post("https://edeaf-api-staging.azurewebsites.net/connect/token", params)
      .then(function (response) {
        if (response.data.success === false) {
          toast.error(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          localStorage.setItem("auth", response.data.token);
          setTimeout(() => {
            navigate("/"); // Redirect to the root route
          }, 3000);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3" style={{ maxWidth: "320px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3">
                  Login Form
                </h3>
                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                  <div className="mb-3 mt-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control shadow-none"
                      id="exampleFormControlInput1"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && typeof errors.email.message === 'string' && (
                    <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.email.message}
                    </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control shadow-none"
                      id="exampleFormControlInput2"
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                    {errors.password && typeof errors.password.message === 'string' && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                    >
                      Submit
                    </button>
                    <p className="card-text pb-2">
                      Have an Account?{" "}
                      <Link style={{ textDecoration: "none" }} to="/register">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default Login;