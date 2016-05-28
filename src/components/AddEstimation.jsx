import React from 'react';

export default class AddEstimation extends React.Component {
  render() {
    return <div>
      <h4 className="subheader">Add estimation</h4>
      <span className="inline-label">
        <input type="text" name="estimation_name" placeholder="Name your estimation"></input>
        <a href="#" className="secondary button">⏎</a>
      </span>
    </div>
  }
};
