import React, { useRef, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import CustomModal from "./CustomModal";
import { Alert } from "react-bootstrap";
import CustButton from "./CustButton";
import axios from 'axios'
import api from "../../services/apiServices";

const SessionTimeoutAlert = ({ handleLoginRedirect }) => {
  const modalRef = useRef(null);

  const handleRefereshToken = async () => {
    window.location.href = 'http://localhost:3001/api/v1/auth/google';
    // Need to work on the referesh token
    // try {
    //     axios.defaults.withCredentials = true;
    //   const response = await api.post("/auth/refresh",{
    //     withCredentials: true,
    //   });
    //   const newToken = response.data.token;
    //   localStorage.setItem("jwtToken", newToken);
    //   console.log("Token refreshed successfully");
    //   if (modalRef.current) {
    //     modalRef.current.closeModal(); // Close the modal if refresh is successful
    //   }
    // } catch (error) {
    //   console.error("Error refreshing token:", error.message);
    //   handleLoginRedirect();
    // }
  };

  const openSessionTimeoutModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
      modalRef.current.updateContent(
        <>
          <Alert variant="danger" className="d-flex align-items-center">
            <i
              className="fa-solid fa-triangle-exclamation me-2"
              style={{ fontSize: "1.5rem" }}
            ></i>
            <span>Your session has expired. Please log in again.</span>
          </Alert>
          <div style={{ textAlign: "center",padding:"15px" }}>
            <CustButton
              variant="primary"
              className="login-with-google-btn"
              style={{margin:"15px"}}
              onClkFn={handleLoginRedirect}
            >
              Login
            </CustButton>
            <CustButton
              variant="primary"
              className="login-with-google-btn"
              style={{margin:"15px"}}
              onClkFn={handleRefereshToken}
            >
              Extend Session
            </CustButton>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      handleLoginRedirect();
      return;
    }

    try {
      const { exp } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const timeLeft = (exp - currentTime) * 1000;

      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          openSessionTimeoutModal();
        }, timeLeft);

        return () => clearTimeout(timer);
      } else {
        openSessionTimeoutModal();
      }
    } catch (error) {
      console.error("Error decoding token:", error.message);
      handleLoginRedirect();
    }
  }, []);

  return (
    <div>
      <CustomModal
        ref={modalRef}
        title="Session Expired"
        disableClose={true}
      ></CustomModal>
    </div>
  );
};

export default SessionTimeoutAlert;
