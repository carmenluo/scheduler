// import React, { Component } from "react";
// import Loading from './Loading';
// import Panel from './Panel';
// import classnames from "classnames";
// import axios from "axios";
// import { setInterview } from "../../reducers/application";
// import {
//   getTotalInterviews,
//   getLeastPopularTimeSlot,
//   getMostPopularDay,
//   getInterviewsPerDay
//  } from "helpers/selectors";
// const data = [
//   {
//     id: 1,
//     label: "Total Interviews",
//     getValue: getTotalInterviews
//   },
//   {
//     id: 2,
//     label: "Least Popular Time Slot",
//     getValue: getLeastPopularTimeSlot
//   },
//   {
//     id: 3,
//     label: "Most Popular Day",
//     getValue: getMostPopularDay
//   },
//   {
//     id: 4,
//     label: "Interviews Per Day",
//     getValue: getInterviewsPerDay
//   }
// ];
// class Dashboard extends Component {
//   state = {
//     // loading: true,
//     focused: null,
//     days: [],
//     appointments: {},
//     interviewers: {}
//   };
//   //It must be an arrow function because of how they handle this context. Arrow functions are designed to alter this behaviour in a specific way. The binding is not dynamic; it is is based on where the function is declared.
//   // selectPanel = id => {
//   selectPanel(id) {
//     this.setState(previousState => ({
//       focused: previousState.focused !== null ? null : id
//     }));
//   }
//   componentDidMount() {
//     const focused = JSON.parse(localStorage.getItem("focused"));

//     Promise.all([
//       axios.get("/api/days"),
//       axios.get("/api/appointments"),
//       axios.get("/api/interviewers")
//     ]).then(([days, appointments, interviewers]) => {
//       this.setState({
//         loading: false,
//         days: days.data,
//         appointments: appointments.data,
//         interviewers: interviewers.data
//       });
//     });
//     this.socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
//     this.socket.onmessage = event => {
//       const data = JSON.parse(event.data);

//       if (typeof data === "object" && data.type === "SET_INTERVIEW") {
//         this.setState(previousState =>
//           setInterview(previousState, data.id, data.interview)
//         );
//       }
//     };
//     if (focused) {
//       this.setState({ focused });
//     }
//   }
//   //TODO: check componentDidUpdate function, why we don't need to declare localStorage previouse state
//   componentDidUpdate(previousProps, previousState) {
//     if (previousState.focused !== this.state.focused) {
//       localStorage.setItem("focused", JSON.stringify(this.state.focused));
//     }
//   }
//   componentWillUnmount() {
//     this.socket.close();
//   }
//   render() {

//     const dashboardClasses = classnames("dashboard", { "dashboard-focused": this.state.focused });
//     let panels = data
//       .filter(panel => this.state.focused === null || this.state.focused === panel.id)
//       .map(panel => <Panel key={panel.id} id={panel.id} label={panel.label} value={panel.getValue(this.state)} onSelect={event => this.selectPanel(panel.id)} />);
//     if (this.state.loading) {
//       return <Loading />;
//     }
//     return <main className={dashboardClasses}>{panels}</main>

//   }
// }

// export default Dashboard;
import React, {useState} from "react";
import "./Dashboard.scss";
import classnames from "classnames";
import Panel from "./Panel";
import useApplicationData from "../../hooks/useApplicationData";
import { setInterview } from "../../reducers/application";


function Dashboard(props) {
  //Get Application Data
  let data = props.reportData;
  const {
    state,
  } = useApplicationData();
  const [focused, setFocused] = useState(null); 
  const dashboardClasses = classnames("dashboard", {
    "dashboard--focused": focused
  });
  function selectPanel(id) {
    if (focused){
      setFocused(null);
    } else {
      setFocused(id)
    }
  }
  if (data) {
    console.log(data)
    const panels = data
    .filter(
      panel => focused === null || focused === panel.id
    )
    .map(panel => {
      return <Panel key={panel.id} id={panel.id} label={panel.label} value={panel.getValue(state)} onSelect={()=> {
        console.log('click')
        selectPanel(panel.id)}}/>
    })
    return <main className={dashboardClasses} >
      {panels}
    </main>
  }
  return null;
}


export default Dashboard;