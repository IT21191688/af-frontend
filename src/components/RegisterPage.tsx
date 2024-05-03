import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "./services/AlertService";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const user = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        telephone: telephone,
        address: address,
        password: password,
        role: "user",
      };

      const response = await axios.post(
        "https://af-backend-t3kh.onrender.com/api/v1/users/register",
        {
          user: user,
        }
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setTelephone("");
      setAddress("");
      setPassword("");

      if (response.status === 201) {
        showSuccessToast("User added successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showErrorToast("User registration failed. Please try again.");
      }
    } catch (error) {
      showErrorToast("Error occurred while adding User.");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full lg:w-1/2">
          <div className="ugf-container-wrap flex items-center justify-center min-h-screen">
            <div className="ugf-container border-2 border-gray-200 rounded-lg bg-white">
              <div className="ugf-content ugf-content-reg p-8">
                {/* <div className="logo mb-6">
                  <img src={LoginPageImg} alt="Logo" />
                </div> */}
                <p className="text-lg text-gray-500">
                  Welcome to our app, where you can embark on an interstellar
                  journey through the vast universe with the power of NASA's
                  cutting-edge APIs.
                </p>
              </div>
              <div className="ugf-form p-8">
                <h3 className="text-2xl font-bold mb-8">Sign up Now</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control py-3 px-4 border border-gray-300 rounded-md w-full"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control py-3 px-4 border border-gray-300 rounded-md w-full"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control py-3 px-4 border border-gray-300 rounded-md w-full"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="telephone"
                        className="form-control py-3 px-4 border border-gray-300 rounded-md w-full"
                        placeholder="Telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="address"
                        className="form-control py-3 px-4 border border-gray-300 rounded-md w-full"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control py-3 px-4 border border-gray-300 rounded-md w-full"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <span className="terms text-gray-500 text-sm mb-4 block">
                    By clicking here and continuing,{" "}
                    <span>
                      I agree to the{" "}
                      <a href="#" className="text-blue-500">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-500">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </span>
                  <button
                    type="submit"
                    className="btn bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 w-full h-12 font-medium"
                  >
                    Register Account
                  </button>
                </form>
                <div className="alternet-access mt-4">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500">
                      &nbsp; Log in now!
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

export default RegisterPage;
