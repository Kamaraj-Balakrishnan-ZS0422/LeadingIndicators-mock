import React, { useRef, useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import CustButton from "../common/CustButton";
import Col from "react-bootstrap/Col";
import CustomModal from "../common/CustomModal";
import IncidentForm from "../form/IncidentForm";
import UserForm from "../form/UserForm";

const FeatureComponent = ({ title='', description='', subText='', modelName='Please Provide Name', content='Please Provide Model Content' }) => {
  const modalRef = useRef();
  const formRef = useRef();
  const [modelContent, setModelContent] = useState(null);
  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    if (content === "IncidentForm") {
      setIsForm(true);
      setModelContent(<IncidentForm modalRef={modalRef} ref={formRef} />);
    } else if (content === "AddNewUser") {
      setIsForm(true);
      setModelContent(<UserForm modalRef={modalRef} ref={formRef} />);
    } else {
      setIsForm(false);
      setModelContent(null);
    }
  }, [content]);

  const handleSubmit = () => {
    if (formRef.current && typeof formRef.current.formSubmit === "function") {
      formRef.current.formSubmit();
    } else {
      console.warn("formSubmit method is not defined in the formRef component.", formRef.current);
    }
  };

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col xs={12} sm={8} className="mb-2 mb-sm-0">
          <h4 className="text-sm-left">{title}</h4>
          <h6 className="text-sm-left">{description}</h6>
          <p>{subText}</p>
        </Col>
        <Col className="d-flex justify-content-center justify-content-md-end">
          {modelName !== 'Please Provide Name' &&
            <CustButton
              onClkFn={() => modalRef.current.openModal()}
              variant="primary"
              className="login-with-google-btn"
            >
              {modelName}
            </CustButton>
          }
          <CustomModal ref={modalRef} title={modelName} formsubmit={isForm ? handleSubmit : undefined}>
            {modelContent}
          </CustomModal>
        </Col>
      </Row>
    </>
  );
};

export default FeatureComponent;