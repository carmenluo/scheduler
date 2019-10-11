import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();
  /*
  Get appointments and interviews based on different day and update appointment views
  */
  const scheduleData = getAppointmentsForDay(state, state.day).map(
    appointment => {
      const interview = getInterview(state, appointment.interview);
      const interviewers = getInterviewersForDay(state, state.day);
      return (
        <Appointment
          id={appointment.id}
          time={appointment.time}
          key={appointment.id}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
        />
      );
    }
  );
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/appointmenter.png"
          alt="Appointment~er"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
          <div id="dashboard">
            <a href="*">Dashboard</a>
          </div>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* In react use id to uniquely identify appointment, we need to add one at the end to show the container */}
        <ul>{scheduleData}
          <Appointment id="last" />
        </ul>
      </section>
    </main>
  );
}