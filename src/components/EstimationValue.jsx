import React from 'react';

export default class EstimationValue extends React.Component {
  render() {
    var values = this.props.estimation.steps.map((step) => {
      return step.value;
    });
    var sum = values.reduce((a, b) => a + b);
    var buffer = (sum / Math.sqrt(values.length));
    return <div className="estimationValue">
      <span className="base">{sum.toFixed(1)}</span>
      <span className="small">+</span>
      <span className="buffer">{buffer.toFixed(1)}</span>
      <span className="small">=</span>
      <span className="total">{(sum + buffer).toFixed(1)}</span></div>
  };
}
