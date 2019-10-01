import React, { useState, Fragment } from "react";

import "components/Application.scss";
import DayListItem from './DayListItem';
import DayList from './DayList';
import Appointment from "./Appointment";
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 3,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
    interview: {
      student: "carmen Luo",
      interviewer: {
        id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png"

      }
    }
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  }
  
];
export default function Application(props) {
  const [day, setDay] = useState("Monday");
  let appointmentItems = appointments.map((appointment) => {
    // let student = appointment.interview.student && "";
    // let interviewer = appointment.interview.interviewer && null;
    return <Appointment
      key={appointment.id}
     {...appointment}
    />
  })
  console.log(appointmentItems);
  // appointmentItems =+ <Appointment id="last" time="1pm" />;
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Fragment>
          {appointmentItems}
          <Appointment id="last" time="1pm" />
        </Fragment>

        <DayListItem />

      </section>
    </main>
  );
}
