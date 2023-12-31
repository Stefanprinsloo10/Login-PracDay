import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const SignUp: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const submitData = (data: any) => {
    let params = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: data.role,
    };
    console.log(data);
    axios
      .post("https://edeaf-api-staging.azurewebsites.net/v1/admin/Users", params)
      .then(function (response) {
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
        reset();
        setTimeout(() => {
          navigate("/login"); // Redirect to the login route
        }, 3000);
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
          <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Sign Up Form
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Firstname</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("firstname", {
                          required: "Firstname is required!",
                        })}
                      />
                      {errors.firstname && typeof errors.firstname.message === 'string' && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.firstname.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Lastname</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput2"
                        {...register("lastname", {
                          required: "Lastname is required!",
                        })}
                      />
                      {errors.lastname && typeof errors.lastname.message === 'string' && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.lastname.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput3"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && typeof errors.email.message === 'string' && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Role</label>
                    <input
                      type="role"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput5"
                      {...register("role", {
                        required: "Role is required!",
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
                    <p className="card-text">
                      Already have an account?{" "}
                      <Link style={{ textDecoration: "none" }} to="/login">
                        Log In
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

export default SignUp;
