export default function getAppointmentsForDay(state, day) {
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
