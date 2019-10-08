import React from "react";
import  "components/InterviewerList.scss";
import classnames from 'classnames';
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
    // const listItems= <li key={props.interviewers[0].id.toString()}>
    //   {<interviewerListItem
    //     name={props.interviewers[0].name}
    //     spots={props.interviewers[0].spots}
    //     selected={props.interviewers[0].name === props.interviewer}
    //     setinterviewer={props.interviewers[0].setinterviewer} />}
    // </li>
    return <ul className={"interviewers__list"}> {listItems}</ul>
  }
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };