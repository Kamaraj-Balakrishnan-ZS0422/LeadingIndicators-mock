import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Header from './common/Header';
import Container from 'react-bootstrap/Container';
import Footer from "./common/Footer";
import api from "../services/apiServices";
import { setIncident } from "../redux/IncidentSlice";
import TableComponent from "./common/TableComponent";
import FeatureComponent from "./common/FeatureComponent";
import TableSkeleton from "./skeleton/TableSkeleton";
import { transformData, incidentTableColumns } from "../assets/util";
import { useTranslate } from '../context/TranslationContext';



const Dashboard = () => {
  const t = useTranslate();
  const incident = useSelector((state) => state.incident.incidents);
  const userData = useSelector((state)=>state.login.user);
  const {email} = userData;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);  // Set initial loading state to true

  //future component params
  const title=t('leadingSaftyIndicatorTitle');
  const modelName = t('add_Form_btn')



  // Fetch incident details from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);  // Start loading
      try {
        const response = await api.get('/incidents',{email:email});
        const incidentData = transformData(response.data);
        dispatch(setIncident(incidentData));  // Dispatch to Redux store
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);  // Set loading to false after data fetch
      }
    };
    fetchData();
  }, [dispatch,email]); // Only re-run the effect when 'dispatch' changes

  return (
    <>
      <Header />
      <Container className="content-wrapper">
      
        <div className="container mt-5">
          {isLoading ? (
            // Show skeleton loader while loading
            <TableSkeleton rows={5} columns={incidentTableColumns.length} />
          ) : (
            // Show the table after data is loaded
            <><FeatureComponent title={title} modelName={modelName} content='IncidentForm'/>
            <TableComponent  columns={incidentTableColumns(t)} data={incident} enableCheckboxes={false} /></>
            
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
