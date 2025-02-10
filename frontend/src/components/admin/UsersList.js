import React, { useEffect, useRef, useState } from "react";
import FeatureComponent from "../common/FeatureComponent";
import TableComponent from "../common/TableComponent";
import api from "../../services/apiServices";
import { prepareUserTableData, userDetailsColumns } from "../../assets/util";
import { useTranslate } from "../../context/TranslationContext";
import CustomModal from "../common/CustomModal";
const UsersList = () => {
  const modelRef = useRef();

  const [userDetails, setUserDetails] = useState([]);
  const t = useTranslate();
  //future component params
  const title = t("userdetails");
  const modelName = t("add_new_user_btn");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");

        const usersData = prepareUserTableData(response.data);
        setUserDetails(usersData);
        console.log("userDetails");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleView = (rowData) => {
    console.log(rowData);
    modelRef.current.openModal();
    //modelRef.current.updateContent();
  };

  return (
    <>
      <CustomModal ref={modelRef}></CustomModal>
      <FeatureComponent
        title={title}
        modelName={modelName}
        content="AddNewUser"
      />
      <TableComponent
        columns={userDetailsColumns(t)}
        data={userDetails}
        enableActions={true}
        handleActionView={handleView}
      ></TableComponent>
    </>
  );
};

export default UsersList;
