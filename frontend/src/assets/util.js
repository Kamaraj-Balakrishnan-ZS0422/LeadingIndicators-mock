
const validateForm = (type, value) => {
    switch (type) {
      case 'text':
        return typeof value === 'string' && value.trim() !== ''; // Non-empty string
  
      case 'number':
        return !isNaN(value) && value.trim() !== ''; // Non-empty and is a number
  
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Basic email structure
  
      case 'file':
          if (!(value instanceof File)) {
            return false; 
          }
          // Check the file type (PNG, JPEG, DOC, PDF)
          const validTypes = ['image/png', 'image/jpeg', 'application/msword', 'application/pdf'];
          if (!validTypes.includes(value.type)) {
            return false;
          }
          // Check the file size (up to 10MB)
          const maxSize = 10 * 1024 * 1024; 
          if (value.size > maxSize) {
            return false; 
          }
          return true;
      case 'checkbox':
        return typeof value === 'boolean'; // Boolean for checkbox
  
      case 'date':
        return !isNaN(new Date(value).getTime()); // Valid date string
  
      case 'time':
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value); // Matches HH:MM format

      default:
        return value.trim() !== ''; // Ensures value is non-empty
    }
  };


  const initialFormInput = {
    location: "",
    area: "",
    date: "",
    time: "",
    indicatorType: "",
    issuedescription: "",
  };

  const addUserFormFields = {
    name:"",
    email: "",
    isadmin: "",
  };


  const transformData = (apiData) => {
    return apiData.map((item, index) => ({
      id: index + 1, 
      recordNo: item.recordId, 
      location: item.location || "",
      safetyIndicator: item.indicatorType || "",
      date: item.date.split("T")[0] || "",
      description: item.issuedescription || "",
      classification: item.classification || "N/A", 
      workflowStage: item.status || "N/A", 
    }));
  };
  

  const prepareAdminTableData = (apiData) => {
    return apiData.map((item, index) => ({
      id: index + 1, 
      recordNo: item.recordId, 
      InitiatedByName: item.initiatedBy.split("@")[0] || "",
      InitiatedByEmail: item.initiatedBy || "",
      attemptedOn: item.updatedAt.split("T")[0] || "",
    }));
  };

  const incidentTableColumns =(t)=> [
    {
      Header: '#',
      accessor: 'id', // Accessor for column data
    },
    {
      Header: t('recordNo'),
      accessor: 'recordNo',
    },
    {
      Header: t('location'),
      accessor: 'location',
    },
    {
      Header: t('safetyIndicator'),
      accessor: 'safetyIndicator',
    },
    {
      Header: t('date'),
      accessor: 'date',
    },
    {
      Header: t('description'),
      accessor: 'description',
    },
    {
      Header: t('classification'),
      accessor: 'classification',
    },
    {
      Header: t('workflowStage'),
      accessor: 'workflowStage',
    },
  ]

  const adminIncidentTableColumns =(t)=> [
    {
      Header: '#',
      accessor: 'id', // Accessor for column data
    },
    {
      Header: t('recordNo'),
      accessor: 'recordNo',
    },
    {
      Header: t('InitiatedByName'),
      accessor: 'InitiatedByName',
    },
    {
      Header: t('InitiatedByEmail'),
      accessor: 'InitiatedByEmail',
    },
    {
      Header: t('attemptedOn'),
      accessor: 'attemptedOn',
    },
  ];

  const userDetailsColumns = (t) => [
    {
      Header:t('name'),
      accessor:'name'
    },
    {
      Header:t('email'),
      accessor:'email'
    },
    {
      Header:t('isadmin'),
      accessor:'isadmin'
    }

  ];

  const prepareUserTableData=(apiData)=>{
    return apiData.map((item, index) => ({
      id: index + 1, 
      name: item.name, 
      email: item.email,
      isadmin: item.isadmin === true ? 'Yes' : 'No',
    }));
  }

  const util = {
                  validateForm,
                  initialFormInput,
                  transformData,
                  incidentTableColumns,
                  adminIncidentTableColumns,
                  addUserFormFields,
                  prepareAdminTableData,
                  userDetailsColumns,
                  prepareUserTableData
                }

  module.exports = util;