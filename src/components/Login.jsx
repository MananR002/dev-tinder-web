import { memo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { baseURL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/login`,
        {
          email: emailId,
          password,
        },
        { withCredentials: true } //to set the token in cookies of browser, if we don't write this it will not set it
      );
      dispatch(addUser(res?.data));
      navigate("/");
      return;
    } catch (error) {
      setErrorMessage(error?.response?.data || "Something went wrong!!!");
      console.error(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/signup`,
        {
          firstName,
          lastName,
          email: emailId,
          password,
        },
        { withCredentials: true } //to set the token in cookies of browser, if we don't write this it will not set it
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
      return;
    } catch (error) {
      setErrorMessage(error?.response?.data || "Something went wrong!!!");
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-center center mt-20">
      <div className="card card-dash bg-base-300 w-96 flex center justify-center">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <fieldset className="fieldset">
            {!isLogin && (
              <>
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{errorMessage}</p>

          <div className="card-actions  justify-center m-2">
            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className="btn btn-primary"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            onClick={() => setIsLogin((prev) => !prev)}
            className="cursor-pointer text-center my-4"
          >
            {isLogin ? "New User ? Sign Up here" : "Existing User ? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
