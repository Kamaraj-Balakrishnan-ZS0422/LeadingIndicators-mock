import React from "react";
import Header from '../common/Header';
import Container from 'react-bootstrap/Container';
import Footer from "../common/Footer";
import {Outlet} from  'react-router-dom';
const AdminDashboard = () => {
   
  return (
    <>
      <Header />
      <Container className="content-wrapper">
      <div className="container mt-5">
      <Outlet />
      </div>     
      </Container>
      <Footer />
    </>
  );
};

export default AdminDashboard;
