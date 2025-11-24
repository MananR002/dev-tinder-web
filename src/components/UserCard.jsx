import axios from "axios";
import { memo, useState } from "react";
import { baseURL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  console.log({ showToast, toastMessage });

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        baseURL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
      setToastMessage(res.data.message);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage(null);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm ">
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && (
            <h2 className="card-title">{age + ", " + gender}</h2>
          )}
          <p>{about}</p>
          <div className="card-actions justify-center my-4 ">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(UserCard);
