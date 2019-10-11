import { flow, map, reduce, filter, join, minBy } from "lodash/fp";
export function getAppointmentsForDay(state, day) {
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

export function getTotalInterviews(state) {
  return filter(appointment => appointment.interview)(state.appointments)
    .length;
}

export function getLeastPopularTimeSlot(state) {
  return flow([
    map(appointment => ({
      time: appointment.time,
      interview: appointment.interview ? 1 : 0
    })),
    reduce(
      (times, appointment) => ({
        ...times,
        [appointment.time]: times[appointment.time]
          ? times[appointment.time] + appointment.interview
          : appointment.interview
      }),
      {}
    ),
    map.convert({ cap: false })((count, time) => ({ time, count })),
    times => filter(time => time.count === minBy("count")(times).count)(times),
    map(time => time.time),
    join(", ")
  ])(state.appointments);
}

export function getMostPopularDay(state) {
  return flow([
    days => filter(day => day.spots === minBy("spots")(days).spots)(days),
    map(day => day.name),
    join(", ")
  ])(state.days);
}

export function getInterviewsPerDay(state) {
  return getTotalInterviews(state) / state.days.length || 0;
}
