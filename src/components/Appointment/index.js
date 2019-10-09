import React, {useEffect }from "react";
import "./styles.scss";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
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
  /* When we pass new props to the Appointment component, we need to determine if the interview data has changed. We can handle this as a side effect in the Appointment. When the component renders, we want to check if we are in the EMPTY mode with a truthy interview value. When this happens, we can call transition(SHOW) to update the visual mode. The same is true when we remove an interview. We need to transition to the EMPTY visual mode.*/
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);
  //if save success, transition to SAVING (permissive) 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => {
        transition(ERROR_SAVE, true);
      });
  }
  
  function deleteInterview() {
    transition(DELETING, true);
    props.deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => {
        transition(ERROR_DELETE, true);
      });
    }
  return (<article className="appointment" data-testid='appointment'> 
  <p>{props.time}</p>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW  && props.interview  && (
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
       {mode === ERROR_SAVE && (
        <Error
          message={"Error with saving appointment, please try again."}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Error with deleting, please try again."}
          onClose={() => back()}
        />
      )}
  </article>)
}