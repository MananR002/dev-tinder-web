import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { baseURL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async () => {
    try {
      await axios.post(`${baseURL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      navigate("/login");
      return;
    } catch (err) {
      console.log("Error loggin:" + err.message);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-5 flex items-center justify-center">
            <div>Welcome, {user.firstName}</div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-2"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-10 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Connection Requests</Link>
              </li>
              <li>
                <Link onClick={handlelogout}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Navbar);
