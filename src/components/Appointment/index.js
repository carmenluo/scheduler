import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import { action } from "@storybook/addon-actions";
import Status from "./Status";
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
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function deleteInterview() {
    transition(DELETING);
    props.deleteInterview(props.id)
      .then(() => transition(EMPTY));
  }
  // return props.interview
  //   ? <><Header time={props.time} /><Show student={props.interview.student}
  //     interviewer={props.interview.interviewer}
  //     onEdit={action("onEdit")}
  //     onDelete={action("onDelete")} /></>
  //   : <><Header time={props.time} /> <Empty onAdd={action("onAdd")} /></>
  return (<article className="appointment">
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && (
      <Form
        name={props.interview}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />
    )}
    {mode === CONFIRM && (
      <Confirm
        message="Delete this appointment?"
        onConfirm={() => deleteInterview()}
        onCancel={() => back()}
      />
    )}
    {mode === SAVING && <Status message='Saving' />}

    {mode === DELETING && <Status message='Deleting' />}

    {mode === EDIT &&
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />}
  </article>)
}