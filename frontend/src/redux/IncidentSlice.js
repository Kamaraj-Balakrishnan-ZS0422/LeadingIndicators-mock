import { createSlice } from '@reduxjs/toolkit';

const incidentSlice = createSlice({
    name:"incident",
    initialState: {
        incidents:[]
      },
    reducers:{
        setIncident:(state,action)=>{
          state.incidents = action.payload;
                   
        },
        addIncident: (state, action) => {
          const newIncident = {
            ...action.payload[0],  
            id: state.incidents.length + 1,  
          };
          // Push the updated incident into the state
          state.incidents.push(newIncident);
        },
        getIncident:(state)=>{
            return state.incidents;
        }
    },
});

export const {setIncident,getIncident,addIncident} = incidentSlice.actions;
export default incidentSlice.reducer;