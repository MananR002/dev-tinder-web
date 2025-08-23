import { memo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { baseURL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("dhoni@gmail.com");
  const [password, setPassword] = useState("Dhoni@123");
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
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-center center mt-20">
      <div className="card card-dash bg-base-300 w-96 flex center justify-center">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
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

          <div className="card-actions  justify-center m-2">
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
