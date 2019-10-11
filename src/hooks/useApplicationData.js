import { useEffect, useReducer } from "react";
import axios from "axios";
import {reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application";
export default function useApplicaionData() {
  //Update WebSocket when client received from server, we can update appointments accordingly
  useEffect(() => {
    // const wss = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    const wss = new WebSocket('ws://localhost:8001');
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
    day: "",
    days: [],
    appointments: {},
    interviewers: {},
    reports:[]
  });
  const setDay = day => { dispatch({ type: SET_DAY, value: day }) };
  // const getReport = day => {dispatch({type: GET_REPORT, value: day})}
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
        let eventData = {id, interview};
        if (response.status >= 200 && response.status < 300) {
          dispatch({ type: SET_INTERVIEW, eventData });
        }
      });
  };
  
  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(response => {
      let eventData = {id, interview: null};
      if (response.status >= 200 && response.status < 300) {
        dispatch({ type: SET_INTERVIEW, eventData });
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