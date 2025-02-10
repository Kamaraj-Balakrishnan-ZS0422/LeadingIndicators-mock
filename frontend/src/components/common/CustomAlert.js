import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const CustomAlert = forwardRef(({ name, content }, ref) => {
  const [show, setShow] = useState(false);
  const [alertContent, setAlertContent] = useState(content);
  const [variant, setVariant] = useState('success');

  // Expose methods via useImperativeHandle
  useImperativeHandle(ref, () => ({
    showAlert: () => setShow(true),
    closeAlert: () => setShow(false),
    updateContent: (newContent, newVariant = 'success') => {
      setAlertContent(newContent);
      setVariant(newVariant);
    },
    handleSubmit: () => {
      // Handle any submit logic here
      console.log('Submit handled with content:', alertContent);
    },
  }));

  return (
    <>
      {show && (
        <Alert variant={variant}>
          <Alert.Heading>{name}</Alert.Heading>
          <p>{alertContent}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant={`outline-${variant}`}>
              Close
            </Button>
          </div>
        </Alert>
      )}
    </>
  );
});

export default CustomAlert;
