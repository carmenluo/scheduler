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
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      case SET_INTERVIEW: {
        return { ...state, appointments: action.value, days:action.days }
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
  const setDay = day => { dispatch({ type: SET_DAY, value: day }) };

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
        console.log(`WHERE IS ME ${days.data[0].name}`);
        dispatch({ type: SET_APPLICATION_DATA, days: days.data, appointments: appointments.data, interviewers: interviewers.data })
      }
    );
  }, [state]);
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log("interview" + interview)
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          const days = updateSpots(state,true);
          dispatch({ type: "SET_INTERVIEW", value: appointments, days });
        }
      });
  };
  const updateSpots = (state, addOneSpot) => {
    return state.days.map((day) => {
      if (day.name !== state.day) {
        return day;
      }
      return {
        ...day, spots: addOneSpot ? day.spots++ : day.spots--
      }
    })
  }
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
        const days = updateSpots(state,false);
        dispatch({ type: SET_INTERVIEW, value: appointments, days });
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