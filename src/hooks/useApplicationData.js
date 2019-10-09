import React, { useEffect, useReducer } from "react";
import axios from "axios";
import {reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";
export default function useApplicaionData() {
  useEffect(() => {
    const wss = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    wss.onopen = function(event) {
      wss.onmessage = function(event) {
        const eventData = JSON.parse(event.data);
        if (eventData.type === "SET_INTERVIEW") {
          dispatch({ type: SET_INTERVIEW, eventData });
        }
      };
    };
    return () => {
      wss.close();
    };
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => { dispatch({ type: SET_DAY, value: day }) };

  const getDaysData = axios.get("/api/days");
  const getAppointmentData = axios.get("/api/appointments");
  const getInterviewersData = axios.get("/api/interviewers");
//If I dependant anything of the state if will go into infinite loop because we depend on the days, when it change, it get rerender
  useEffect(() => {
    Promise.all([getDaysData, getAppointmentData, getInterviewersData]).then(
      all => {
        const [days, appointments, interviewers] = all;
        dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data })
      }
    );
  }, []);

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          let eventData = {id, interview};
          //  dispatch({ type: "SET_INTERVIEW", eventData });
        }
      });
  };
  
  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(response => {
      if (response.status >= 200 && response.status < 300) {
        let eventData = {id, interview: null};
        // dispatch({ type: SET_INTERVIEW, eventData });
      }
    });
  }
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  }
}