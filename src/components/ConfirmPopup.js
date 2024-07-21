import React, { useState } from "react";

const ConfirmPopup = ({ detail, func, cancelFunc }) => {
  let hidden = "hidden";
  let flex = "flex";
  let [display, setDisplay] = useState(flex);

  const toggle = (num) => {
    if (num) {
        func()
    }
    if (display === flex) {
      setDisplay(hidden);
    } else {
      setDisplay(flex);
    }

    if (!num && cancelFunc) {
      cancelFunc(); 
    }
  };

  return (
    <div
      className={`bg-[#F2ECFF] text-black 
    absolute left-[50%] translate-x-[-50%] rounded my-2
    lg:w-1/3 ${display} w-3/4 items-center justify-center p-5 flex-col border border-[#00C897]`}
    >
      <h1 className="my-3">{detail ? detail : "Title"}</h1>

      <div className="flex my-2 text-[#F2ECFF] justify-between lg:w-1/3 w-[60%]">
      <button
        className="bg-[#00C897] rounded p-1"
        onClick={() => toggle(1)}
      >
        Confirm
      </button>
      <button
        className="bg-[#00C897] rounded p-1"
        onClick={() => toggle(0)}
      >
        Cancel
      </button>
      </div>
    </div>
  );
};

export default ConfirmPopup;
