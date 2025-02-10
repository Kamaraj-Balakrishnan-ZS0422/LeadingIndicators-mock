import React, { useEffect, useRef, useState } from "react";
import api from "../../services/apiServices";
import {
  prepareAdminTableData,
  adminIncidentTableColumns,
} from "../../assets/util";
import TableComponent from "../common/TableComponent";
import FeatureComponent from "../common/FeatureComponent";
import { useTranslate } from "../../context/TranslationContext";
import CustomAlert from "../common/CustomAlert";
import CustomModal from "../common/CustomModal";

const OrphanRecordList = () => {
  const t = useTranslate();
  const [orphanData, setOrphanData] = useState([]);
  const [selectedOrphanData, setSelectedOrphandata] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const alertRef = useRef();
  const modelRef = useRef();

  //future component params
  const title = t("orphanrecordlist");
  const description = t("orphan_description");
  const subText = t("orphan_note");

  // Fetch incident details from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/incidents");
        const incidentData = prepareAdminTableData(response.data);
        setOrphanData(incidentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isSuccess]); // Only re-run the effect when 'isSuccess' changes

  //submit selected data
  const handleSubmit = async () => {
    setIsSuccess(true);
    const orphanIds = selectedOrphanData.map((item) => item.recordNo);
    try {
      const response = await api.put("/incidents", orphanIds);
      setIsSuccess(false);
      alertRef.current.showAlert();
      alertRef.current.updateContent(response.data.message);
    } catch (error) {
      alertRef.current.showAlert();
      alertRef.current.updateContent(error.message, "danger");
      console.error("Error fetching data:", error);
    }
  };

  const handleActionView = ()=>{
    modelRef.current.openModal();
  }


  return (
    <>
    <CustomModal ref={modelRef} handleActionView={handleActionView}></CustomModal>
      <FeatureComponent
        title={title}
        description={description}
        subText={subText}
      />
      <CustomAlert
        ref={alertRef}
        name="Orphan Data Update"
        content="Initial Content"
      />
      <TableComponent
        columns={adminIncidentTableColumns(t)}
        data={orphanData}
        enableCheckboxes={true}
        enableActions = {false}
        handleSubmit={handleSubmit}
        setSelectedOrphandata={setSelectedOrphandata}
        isSuccess={isSuccess}
        handleActionView={handleActionView}
      ></TableComponent>
    </>
  );
};

export default OrphanRecordList;
