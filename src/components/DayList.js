import React from "react";
import classnames from 'classnames';
import DayListItem from "./DayListItem";
export default function DayList(props) {
  const listItems = props.days.map(day =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />
  );
  // const listItems= <li key={props.days[0].id.toString()}>
  //   {<DayListItem
  //     name={props.days[0].name}
  //     spots={props.days[0].spots}
  //     selected={props.days[0].name === props.day}
  //     setDay={props.days[0].setDay} />}
  // </li>
  return <ul>{listItems}</ul>
}