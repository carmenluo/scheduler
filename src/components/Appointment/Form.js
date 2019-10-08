import React, {useState} from "react";
import "./styles.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
function onCancel() {
  setName("");
  setInterviewer(null);
}

<input
  className="appointment__create-input text--semi-bold"
  name="name"
  type="text"
  placeholder="Enter Student Name"
  value={name}
  onChange={event => {
    setName(event.target.value);
  }}
  data-testid="student-name-input"
/>

const validate = () => {
  console.log("click");
  // if (studentName === "") {
  //   setError("Student name cannot be blank");
  //   return;
  // }

  // setError("");
  props.onSave(name, interviewer);
}; 

  return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
        */
       value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel}>Cancel</Button>
      <Button confirm onClick={()=>validate()}>Save</Button>
    </section>
  </section>
</main>
}
