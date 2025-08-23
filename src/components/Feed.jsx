import { memo } from "react";

const Feed = () => {
  console.log("inside feed");
  return (
    <div className="Feed">
      <h2>Feed</h2>
    </div>
  );
};

export default memo(Feed);
