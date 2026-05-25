import React from "react";
import { HashLoader, RingLoader, PropagateLoader } from "react-spinners";

function Loader() {
  return (
    <div className="spinner-container">
      <HashLoader size={70} color="#2c687b" />
      {/* <PropagateLoader size={20} color="#2c687b" /> */}
      {/* <RingLoader size={70} color="#2c687b" /> */}
    </div>
  );
}

export default Loader;
