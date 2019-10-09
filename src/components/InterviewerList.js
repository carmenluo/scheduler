import React from "react";
import  "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

  export default function InterviewerList(props) {
    const listItems = props.interviewers.map(interviewer =>
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer= {()=>props.onChange(interviewer.id)} />
    );
    return <ul className={"interviewers__list"}> {listItems}</ul>
  }
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };