import React from "react";
import  "components/DayListItem.scss";
import classnames from 'classnames';
export default function DayListItem(props) {
  // Create an object called dayClass that applies the day-list__item--selected class name if props.selected is true and the day-list__item--full class name if props.spots is 0.
  const dayClass = classnames("day-list__item", {
     "day-list__item--selected": props.selected,
     "day-list__item--full": !props.spots
});
function formatSpots(spots){
  if (spots > 1){
  return `${spots} spots remaining`;}
  else if  (spots === 1) {
    return `${spots} spot remaining`;}
    else return `no spots remaining`;
}
  return (
    <li className={dayClass} key ={props.id} onClick={() => props.setDay(props.name)}
    data-testid='day'>
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
      </li>
  )
}