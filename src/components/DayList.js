import React from "react";
import classnames from 'classnames';
import DayListItem from "./DayListItem";
export default function DayList(props) {
  const listItems = props.state.days.map(day =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.state.day}
      setDay={props.setDay} />
  );
  return <ul>{listItems}</ul>
}