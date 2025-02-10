import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useImperativeHandle, forwardRef } from "react";
import { useTranslate } from '../../context/TranslationContext';
import Notification from "../common/Notification";
import api from "../../services/apiServices";
import { validateForm, addUserFormFields } from "../../assets/util";

const UserForm = forwardRef(({ modalRef}, ref) => {
  const  t  = useTranslate();
  const [formInput, setFormInput] = useState(addUserFormFields);
  const inputKeys = Object.keys(formInput);
  const [isError, setIsError] = useState(inputKeys);
  const [isValid, setIsValid] = useState(inputKeys);
  const options = [t("yes"), t("no")];

  const getFormData = ({ target: { name, type, value, checked, files } }) => {
    const inputValue = type === "checkbox" ? checked : type === "file" ? files[0] : value;
    const isValidVal = validateForm(type, inputValue);

    setIsError((prev) => ({ ...prev, [name]: !isValidVal }));
    setIsValid((prev) => ({ ...prev, [name]: isValidVal }));

    if (isValidVal) {
      setFormInput((prev) => ({ ...prev, [name]: inputValue }));
    }
  };

  const handleSubmit = async () => {
    const isFormValid = Object.values(isValid).every((value) => value === true);
    if (isFormValid) {
      modalRef.current.setLoading(false);
      console.error("Form validation failed.",isValid);
      return;
    }

    try {
      formInput.isadmin = formInput.isadmin === "Yes" || formInput.isadmin === "Oui";
      const response = await api.post("/user", formInput);
      console.log(response.data);

      setFormInput((prevInput) =>
        Object.keys(prevInput).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
      );

      modalRef.current.updateContent(
        <Notification
          type="success"
          title={t("user_form_success_title")}
          message={t("user_form_success_message")}
          buttonText={t("user_form_btn_text")}
        />
      );
    } catch (error) {
      modalRef.current.updateContent(
        <Notification
          type="failure"
          title={t("try_again")}
          message={error.response.data.message}
        />
      );
      console.error("Error:", error);
    }
  };

  // Expose formSubmit method through the ref
  useImperativeHandle(ref, () => ({
    formSubmit: () => handleSubmit(),
  }));

  return (
    <Container>
      <Form>
        {/* Name Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          <Form.Label column sm="2">
            {t("name")} <span className="text-danger">*</span>
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder={t("name")}
              name="name"
              onBlur={getFormData}
              defaultValue={formInput.name}
              isInvalid={isError.name}
              isValid={isValid.name}
            />
          </Col>
        </Form.Group>

        {/* Email Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            {t("email")} <span className="text-danger">*</span>
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              placeholder="abc@veolia.com"
              name="email"
              onBlur={getFormData}
              defaultValue={formInput.email}
              isInvalid={isError.email}
              isValid={isValid.email}
            />
          </Col>
        </Form.Group>

        {/* Is Root User Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextIsAdmin">
          <Form.Label column sm="2">
            {t("isrootuser")} <span className="text-danger">*</span>
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              name="isadmin"
              value={formInput.isadmin}
              onChange={getFormData}
              isInvalid={isError.isadmin}
              isValid={isValid.isadmin}
            >
              <option value="">{t("input_select_option")}</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
});

export default UserForm;