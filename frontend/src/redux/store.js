import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import incidentReducer from './IncidentSlice';

const store = configureStore({
    reducer:{
        login : loginReducer,
        incident: incidentReducer
    },
})
export default store;
