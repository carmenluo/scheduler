import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
export default function useApplicaionData() {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });


  const SET_DAY = 'SET_DAY';
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  const SET_INTERVIEW = 'SET_INTERVIEW';
  function reducer(state, action) {
    console.log(action.type);
    switch (action.type) {
      case SET_DAY:
        return { ...state, day:action.value };
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      case SET_INTERVIEW: {
        return { ...state, appointments: action.value }
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => {dispatch({ type: SET_DAY, value: day })};

  const getDaysData = axios.get("/api/days");
  const getAppointmentData = axios.get("/api/appointments");
  const getInterviewersData = axios.get("/api/interviewers");

  useEffect(() => {
    Promise.all([getDaysData, getAppointmentData, getInterviewersData]).then(
      all => {
        const [days, appointments, interviewers] = all;
        console.log(interviewers);
        // setState(prev => ({
        //   days: days.data,
        //   appointments: appointments.data,
        //   interviewers: interviewers.data
        // }));
       dispatch({type: SET_APPLICATION_DATA,  days: days.data, appointments: appointments.data, interviewers: interviewers.data})
      }
    );
  }, []);
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          dispatch({ type: "SET_INTERVIEW",  value: appointments });
        }
      });
  };
  const deleteInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(response => {
      if (response.status >= 200 && response.status < 300) {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        dispatch({ type: SET_INTERVIEW,  value: appointments });
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