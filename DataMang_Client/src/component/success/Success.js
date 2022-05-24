import React from "react";
import "./Success.css";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";

function Success({ cancel }) {

  const handleBackHome=()=>{
    
    cancel()
  }
  
  return (
    <div className="">
     
      
      <button className="btn btn-info text-white  " id="back"  onClick={handleBackHome}>
          <ArrowBackIosOutlinedIcon /> Back To Home
        </button>

      <div id="bodySvg">
      <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" id="des">
        <g
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            class="circle"
            d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
          />
          <path class="tick" d="M6.5 13.5L10 17 l8.808621-8.308621" />
        </g>
      </svg>
      </div>

    </div>
  );
}

export default Success;
