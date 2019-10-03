export function getAppointmentsForDay(state, day) {
  console.log(state);
  let filteredAppointments = [];
  for (let days of state.days) {
    if (days.name === day) {
      filteredAppointments = days.appointments.map(
        appointment => state.appointments[appointment]
      );
    }
  }
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewObject = {};
  for (let interviewer in state.interviewers) {
    interviewObject.student = interview.student;
    if (interview.interviewer === state.interviewers[interviewer].id) {
      interviewObject.interviewer = {
        id: state.interviewers[interviewer].id,
        name: state.interviewers[interviewer].name,
        avatar: state.interviewers[interviewer].avatar
      };
    }
  }
  return interviewObject;
}

export const getInterviewersForDay = (state, day) => {
  const interviewers = [];

  const filteredDay = state.days.filter(elem => elem.name === day);

  if (filteredDay.length === 0) {
    return interviewers;
  } else {
    filteredDay[0].interviewers.map(id =>
      interviewers.push(state.interviewers[id])
    );
  }

  return interviewers;
};