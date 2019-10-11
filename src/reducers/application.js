import { filter } from "lodash/fp";
import {  getTotalInterviews,
  getLeastPopularTimeSlot,
  getMostPopularDay,
  getInterviewsPerDay } from "../helpers/selectors";
import { get } from "https";
const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';
const GET_REPORT = 'GET_REPORT';
/*
if addOneSpot true means bookInterview otherwise deleteInterview
*/
const updateSpots = (state, addOneSpot) => {
  let currentSpot;
  return state.days.map((day) => {
    if (day.name !== state.day) {
      return day;
    } else {
      if (addOneSpot) {
        currentSpot = day.spots - 1;
      } else {
        currentSpot = day.spots + 1;
      }
      return {
        ...day, spots: currentSpot
      }
    }
  })
}
// //get Report Data
// const getReportData = (state) => {
//   const reportData = [
//     {
//       id: 1,
//       label: "Total Interviews",
//       getValue: getTotalInterviews(state)
//     },
//     {
//       id: 2,
//       label: "Least Popular Time Slot",
//       getValue: getLeastPopularTimeSlot(state)
//     },
//     {
//       id: 3,
//       label: "Most Popular Day",
//       getValue: getMostPopularDay(state)
//     },
//     {
//       id: 4,
//       label: "Interviews Per Day",
//       getValue: getInterviewsPerDay(state)
//     }
//   ]
//   console.log(reportData)
//   return reportData;
// }
/*
export reducer to useApplcationData so that it knows when to update appointment info
*/
const reducer = function (state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:

      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers}
    case SET_INTERVIEW:
      const appointment = {
        ...state.appointments[action.eventData.id],
        interview: action.eventData.interview ? { ...action.eventData.interview } : null
      };
      const appointments = {
        ...state.appointments,
        [action.eventData.id]: appointment
      };
      //if edit an interview, we don't need to update spots
      if (state.appointments[action.eventData.id].interview) {
        return { ...state, appointments };
      }
      //if delete or create, call updateSpots to update spots in '/api/days'
      let days = action.eventData.interview ? updateSpots(state, true) : updateSpots(state, false);
      return { ...state, appointments, days };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
function getSpotsForDay(state, day) {
  const foundDay = state.days.find(d => d.name === day);

  if (!foundDay) throw new Error(`No Day Found: ${day}`);

  return filter(id => state.appointments[id].interview === null)(
    foundDay.appointments
  ).length;
}

export function setInterview(state, id, interview) {
  const appointments = {
    ...state.appointments,
    [id]: {
      ...state.appointments[id],
      interview
    }
  };

  return {
    ...state,
    days: state.days.map(day => ({
      ...day,
      spots: getSpotsForDay({ ...state, appointments }, day.name)
    })),
    appointments
  };
}

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, reducer };