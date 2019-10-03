import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import { action } from "@storybook/addon-actions";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
export default function Appointment(props) {
  return props.interview
    ? <><Header time={props.time} /><Show student={props.interview.student}
      interviewer={props.interview.interviewer}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")} /></>
    : <><Header time={props.time} /> <Empty onAdd={action("onAdd")} /></>


}