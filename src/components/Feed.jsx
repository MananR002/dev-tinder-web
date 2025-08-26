import axios from "axios";
import { memo, useEffect } from "react";
import { baseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const response = await axios.get(`${baseURL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response.data));
    } catch (error) {
      console.error("Error" + error.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex justify-center my-10">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default memo(Feed);
