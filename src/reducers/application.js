const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';
/*
if addOneSpot true means bookInterview otherwise deleteInterview
*/
const updateSpots = (state, addOneSpot) => {
  let currentSpot;
  return state.days.map((day) => {
    if (day.name !== state.day) {
      return day;
    } else {
      if (addOneSpot){
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
/*
export reducer to useApplcationData so that it knows when to update appointment info
*/
const reducer = function (state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.eventData.id],
        interview: action.eventData.interview ? { ...action.eventData.interview } : null
      };
      const appointments = {
        ...state.appointments,
        [action.eventData.id]: appointment
      };
      let days = action.eventData.interview ? updateSpots(state, true) : updateSpots(state, false);
      return { ...state, appointments, days }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, reducer };