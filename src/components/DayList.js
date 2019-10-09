import React from "react";
import DayListItem from "./DayListItem";
/*
Retrived all DayListItem and put in DayList container
*/
export default function DayList(props) {
  const listItems = props.days.map(day =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay} />
  );
  return <ul>{listItems}</ul>
}