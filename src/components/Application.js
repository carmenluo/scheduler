import React from "react";
import DayList from "./DayList";
import Footer from "./Footer";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay,getTotalInterviews,
  getLeastPopularTimeSlot,
  getMostPopularDay,
  getInterviewsPerDay } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
import Dashboard from "./Dashboard/Dashboard";

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

const showReport = function(state){
  if (!state.day) {
    const reportData = [
      {
        id: 1,
        label: "Total Interviews",
        getValue: getTotalInterviews
      },
      {
        id: 2,
        label: "Least Popular Time Slot",
        getValue: getLeastPopularTimeSlot
      },
      {
        id: 3,
        label: "Most Popular Day",
        getValue: getMostPopularDay
      },
      {
        id: 4,
        label: "Interviews Per Day",
        getValue: getInterviewsPerDay
      }
    ];
    console.log(reportData);
    return reportData;
  } else {
    return null;
  }
}
  return (
    <div>
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered logo"
          src="images/appointmenter.png"
          alt="Appointment~er"
          width="220px"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
          <div id="dashboard" className= "day-list__item">
            <li>
              <h2 onClick={()=>setDay("")}>Dashboard</h2>
            </li>
          </div>
        </nav>
        <img
          className="sidebar__foot sidebar--centered"
          src="images/calendar.png"
          alt="calendar"
          width="100px"
        />
       
      </section>
      <section className="schedule">
        {/* In react use id to uniquely identify appointment, we need to add one at the end to show the container */}
        <ul>{scheduleData}
          <Appointment id="last" />
          <Dashboard reportData={showReport(state)}></Dashboard>
        </ul>
      </section>
     
    </main>
     <Footer></Footer>
     </div>
  );
}