import React from "react";

const Notification = ({ type, title, message, buttonText, onButtonClick }) => {
  const isSuccess = type === "success";

  return (
    <div className="d-flex justify-content-center align-items-center vh-70">
      <div
        className={`notification-container ${
          isSuccess ? "success" : "error"
        } text-center shadow`}
      >
        <h3 style={{padding:"30px"}}>
          <i
            className={`fa-solid ${
              isSuccess ? "fa-circle-check" : "fa-circle-exclamation"
            } fa-2xl`}
          ></i>
        </h3>
        <h4 className="text-uppercase">{title}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
