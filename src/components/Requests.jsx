import axios from "axios";
import { memo, useEffect, useState } from "react";
import { baseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const connectionRequests = useSelector((store) => store.requests);
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        baseURL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeRequest(_id));
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

  const fetchRequests = async () => {
    try {
      const response = await axios.get(baseURL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.connectionRequests));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!connectionRequests) return;
  if (connectionRequests.length === 0)
    return <h1 className="text-center my-4">No Requests Found</h1>;

  console.log({ connectionRequests });

  return (
    <>
      <div className="text-center m-4 ">
        <h2 className="text-3xl text-white font-bold ">Connection Requests</h2>
        <div className="flex flex-col m-4">
          {connectionRequests?.map((request) => {
            const { firstName, lastName, age, about, gender, photoUrl } =
              request.fromUserId;
            return (
              <div>
                <div className="text-left flex items-center align-middle bg-base-200 mx-auto w-1/2 rounded-2xl ">
                  <div className="m-4 w-40 h-40 flex items-center ">
                    <img
                      className="rounded-full object-cover h-20 w-20"
                      alt=""
                      src={photoUrl}
                    />
                  </div>
                  <div className="m-4 ">
                    <h1 className="my-2">{firstName + " " + lastName}</h1>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions  my-4 ">
                      <button
                        className="btn btn-primary"
                        onClick={() => reviewRequest("rejected", request._id)}
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => reviewRequest("accepted", request._id)}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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

export default memo(Requests);
