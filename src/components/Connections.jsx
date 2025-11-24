import axios from "axios";
import { memo, useEffect, useState } from "react";
import { baseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(baseURL + "/user/connections", {
        withCredentials: true,
      });
      console.log("res", res);
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;

  console.log("con", connections);

  return (
    <>
      <div className="text-center m-4 ">
        <h2 className="text-3xl text-white font-bold ">Connections</h2>
        <div className="flex flex-col m-4">
          {connections?.map((connection) => {
            const { firstName, lastName, age, about, gender, photoUrl } =
              connection;
            return (
              <div className="text-left flex items-center  bg-base-200 mx-auto w-1/2 rounded-2xl my-2 ">
                <div className="mx-4 w-40 h-40 flex items-center">
                  <img
                    className="h-20 w-20 rounded-full"
                    alt=""
                    src={photoUrl}
                  />
                </div>
                <div className="m-4">
                  <h1 className="mt-2 text-2xl">
                    {firstName + " " + lastName}
                  </h1>
                  {age && gender && (
                    <p className="mt-2">{age + ", " + gender}</p>
                  )}
                  <p className="mt-2">{about}</p>
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

export default memo(Connections);
