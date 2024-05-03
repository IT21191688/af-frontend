import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LoginPageImg from "../assets/login-page-img.jpg";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  // const [rememberMe, setRememberMe] = useState<boolean>(false); // State to track "Remember Me" checkbox

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "https://af-backend-t3kh.onrender.com/api/v1/users/login",
        {
          email: email,
          password: password,
        }
      );

      const { data } = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      if (data.user.role === "admin") {
        showSuccessToast("Login successful!");
        setTimeout(() => {
          navigate("/userManagement");
          window.location.reload();
        }, 2000);
      } else {
        showSuccessToast("Login successful!");
        setTimeout(() => {
          navigate("/userHome");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      navigate("/login");
      showErrorToast("Login Unsuccessful!" + error);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="container mx-auto">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="ugf-container-wrap flex items-center justify-center min-h-screen">
            <div className="ugf-container flex border-2 border-gray-300 rounded-lg bg-neutral-100">
              <div className="ugf-content bg-cover bg-no-repeat bg-center flex-1 p-10">
                <div className="logo mb-6">
                  <img src={LoginPageImg} alt="" />
                </div>
                <p className="text-gray-700 text-lg">
                  Welcome to our app. LOGIN HERE
                </p>
              </div>
              <div className="ugf-form flex-1 bg-white p-10">
                <h3 className="text-3xl mb-8 font-extrabold">Sign In</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <input
                      type="email"
                      name="email"
                      className="form-control w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="input-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="input-mail" className="text-gray-600">
                      Email Address
                    </label>
                    {emailError && (
                      <p className="text-red-500 mt-2">{emailError}</p>
                    )}
                  </div>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      name="inputPass"
                      className="form-control w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="input-pass"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="input-pass" className="text-gray-600">
                      Password
                    </label>
                    {passwordError && (
                      <p className="text-red-500 mt-2">{passwordError}</p>
                    )}
                  </div>
                  <div className="form-group flex items-center justify-between mb-4">
                    <div className="custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlValidation1"
                        // onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label
                        className="custom-control-label ml-2 cursor-pointer"
                        htmlFor="customControlValidation1"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="forget-pass">
                      <Link
                        to="/forget"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Forget password?
                      </Link>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full h-16 font-medium"
                  >
                    Login Account
                  </button>
                </form>
                <div className="alternet-access mt-4">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      &nbsp; Sign up Now!
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
