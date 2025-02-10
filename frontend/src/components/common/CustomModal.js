import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustomModal = forwardRef(
  ({ children, title = '', formsubmit = undefined, disableClose = false }, ref) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(children);
    const [initialContent, setInitialContent] = useState(children); // Store initial content
    const [showFooter, setShowFooter] = useState(false);

    // Save initial content when the component mounts or children change
    useEffect(() => {
      setContent(children);
      setInitialContent(children);
    }, [children]);

    const handleUpdate = (updateContent) => {
      setShowFooter(true);
      setContent(updateContent);
    };

    const handleClose = () => {
      if (!disableClose) {
        setShow(false);
        setContent(initialContent); // Reset content to the initial state
        setShowFooter(false); // Reset footer state if needed
        setLoading(false);
      }
    };

    // Expose methods to the parent using useImperativeHandle
    useImperativeHandle(ref, () => ({
      openModal: () => setShow(true),
      closeModal: () => handleClose(),
      setLoading: (val) => setLoading(val),
      updateContent: (val) => handleUpdate(val),
    }));

    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop={disableClose ? "static" : true} // Prevent closing by clicking the backdrop
          keyboard={!disableClose} // Prevent closing with the escape key
        >
          <Modal.Header closeButton={!disableClose}> {/* Hide close button if disableClose is true */}
            <Modal.Title id="example-custom-modal-styling-title">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{content}</Modal.Body>
          {!showFooter && (
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => !disableClose && setShow(false)}
              >
                Cancel
              </Button>
              {/* Conditionally render the submit button if formsubmit is provided */}
              {formsubmit && (
                <Button
                  variant="primary"
                  onClick={() => {
                    setLoading(true);
                    formsubmit();
                  }}
                  disabled={loading} // Disable the button if loading
                >
                  {loading ? "Loading..." : "Submit"}
                </Button>
              )}
            </Modal.Footer>
          )}
        </Modal>
      </>
    );
  }
);

export default CustomModal;