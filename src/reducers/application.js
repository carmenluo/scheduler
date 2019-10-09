const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';
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
const reducer = function (state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW: {
       const appointment = {
            ...state.appointments[action.eventData.id],
            interview: action.eventData.interview ? {...action.eventData.interview} : null
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