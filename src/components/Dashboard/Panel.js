import React from "react";

function Panel(props) {

    return (
      <section
        className="dashboard__panel" onClick={props.onSelect}
      >
        <h1 className="dashboard__panel-header">{props.label}</h1>
        <p className="dashboard__panel-value">{props.value}</p>
      </section>
    );
  }

export default Panel;