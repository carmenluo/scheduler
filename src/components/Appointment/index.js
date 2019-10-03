import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import { action } from "@storybook/addon-actions";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // return props.interview
  //   ? <><Header time={props.time} /><Show student={props.interview.student}
  //     interviewer={props.interview.interviewer}
  //     onEdit={action("onEdit")}
  //     onDelete={action("onDelete")} /></>
  //   : <><Header time={props.time} /> <Empty onAdd={action("onAdd")} /></>
 return (<article className="appointment">
 {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
  )}
  {mode === CREATE && (
    <Form
          name={props.interview}
          interviewers={props.interviewers}
       //   onSave={save}
          onCancel={() => back()}
        />
  ) 
  }
  </article>)
}