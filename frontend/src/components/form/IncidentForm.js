import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Notification from "../common/Notification";
import { useTranslate } from '../../context/TranslationContext';
import { useSelector, useDispatch } from 'react-redux';
import { addIncident } from "../../redux/IncidentSlice";
import {validateForm,initialFormInput} from "../../assets/util";
import { useState,useImperativeHandle,forwardRef } from "react";
import {transformData} from '../../assets/util';
import api from '../../services/apiServices';

const IncidentForm = forwardRef(({modalRef}, ref) => {
  const  t  = useTranslate();
  const dispatch = useDispatch();

  const initialIsValid = Object.keys(initialFormInput).reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {});
  const [formInput, setFormInput] = useState(initialFormInput);
  const [isValid, setIsValid] = useState(initialIsValid);
  const [isError, setIsError] = useState({});
  const email = useSelector((state) => state.login.user.email);
  const options = [t('input_select_option_1'), t('input_select_option_2'), t('input_select_option_3'), t('input_select_option_4'), t('input_select_option_5')];

  const getFormData = ({ target: { name, type, value, checked,files } }) => {

    const inputValue = type === 'checkbox' ? checked : (type === 'file' ? files[0] : value);
    const isValidval = validateForm(type, inputValue);
  
    setIsError((prev) => ({ ...prev, [name]: !isValidval }));
    setIsValid((prev) => ({ ...prev, [name]: isValidval }));
  
    if (isValidval) {
      setFormInput((prev) => ({ ...prev, [name]: inputValue }));
    }
  };

  const formValidation = (isValid) => {
    const updatedIsError = {};
    const allValid = Object.keys(isValid).every((key) => {
      const valid = isValid[key];
      if (!valid) {
        updatedIsError[key] = true;
      }
      return valid;
    });
    setIsError(updatedIsError);
    return allValid; // Optional: Return whether all fields are valid
  };
  
  

  //form submit
  const handleSubmit = async () => {
    
    console.log(isValid,formValidation(isValid));
    const isFormValid = Object.values(isValid).every(value => value === true);

    if(isFormValid){

      if (!formInput.file) {
        alert(t('file_select_error'));
        return;
      }
  
    const fileData = { file: formInput.file };
  
    try {
     
      const response = await api.post('/upload', fileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        const { filename } = response.data;
        const finalData = { ...formInput, file: filename, initiatedBy:email};
        try {
          const incidentResponse = await api.post('/incidents', finalData);
          const incidentData = transformData([incidentResponse.data]);
          dispatch(addIncident(incidentData));
          
          // Clear form input using `reduce` for simplicity
          setFormInput((prevInput) => 
            Object.keys(prevInput).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
          );
          modalRef.current.updateContent(<Notification
            type="success"
            title={incidentResponse.data.recordId}
            message={t('incident_success')}
          />);
              } catch (err) {
          console.error('Error uploading file:', err);
        }
      }
    } catch (error) {
      modalRef.current.updateContent(<Notification
        type="failure"
        title={t('try_again')}
        message={error.response.data.message}
      />);
      console.error('File upload failed:', error);
      
    }
  }else{
    modalRef.current.setLoading(false);
  }
  };

  useImperativeHandle(ref, () => ({
    formSubmit: () => handleSubmit(),
  }));

  return (
    <>
      <Container>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              {t('location')} <span className="text-danger">*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder={t('input_location_placeholder')} 
                defaultValue={formInput.location}
                name="location"
                onBlur={getFormData} 
                isInvalid={isError.location}
                isValid={isValid.location}
                required
              />
              <span></span>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextArea">
            <Form.Label column sm="2">
              {t('input_specific_area')} <span className="text-danger">*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder={t('input_specific_area_placeholder')}
                defaultValue={formInput.area}
                name="area"
                onBlur={getFormData}
                isInvalid={isError.area}
                isValid={isValid.area}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
            {t('date')} <span className="text-danger">*</span>
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="Date"
                placeholder={t('input_date_placeholder')}
                name="date"
                defaultValue={formInput.date}
                onBlur={getFormData}
                isInvalid={isError.date}
                isValid={isValid.date}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              {t('input_time')}
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="time"
                placeholder={t('input_time_placeholder')}
                name="time"
                defaultValue={formInput.time}
                onBlur={getFormData}
                isInvalid={isError.time}
                isValid={isValid.time}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              {t('safetyIndicator')}{" "}
              <span className="text-danger">*</span>
            </Form.Label>
            <Col sm="10">
            <Form.Control
          as="select"
          name="indicatorType"
          value={formInput.indicatorType}
          onChange={getFormData}
          isInvalid={isError.indicatorType}
          isValid={isValid.indicatorType}
        >
          <option value="">{t('input_select_option')}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              {t('description')}{" "}
              <span className="text-danger">*</span>
            </Form.Label>
            <Col sm="10">
            <Form.Control
              as="textarea"
              placeholder={t('input_description_placeholder')}
              name="issuedescription"
              defaultValue={formInput.issuedescription}
              onBlur={getFormData}
              isInvalid={isError.issuedescription}
              isValid={isValid.issuedescription}
              rows={3} // Adjust the rows to control the height of the textarea
            />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              {t('input_file_upload')}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="file"
                placeholder="Veolia SA"
                name="file"
                onChange={getFormData}
                isInvalid={isError.file}
                isValid={isValid.file}
              />
              <span>
                <i>png / jpeg / docx / pdf</i>
              </span>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              {t('input_initiated_by')} <span className="text-danger">*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Veolia SA"
                name={t('input_initiated_by')}
                defaultValue={email}
                onBlur={getFormData}
                readOnly
              />
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
});

export default IncidentForm;
