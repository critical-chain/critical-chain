import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {List} from 'immutable';

export default class EstimationValue extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }


  render() {
    var steps = this.props.estimation.get('steps', List([])).map((step) => {
      return {value: step.get('value', 0), quantity: step.get('quantity', 1)}
    });
    var sum = 0;
    var size = 1;
    var buffer = 0;
    if(steps.size > 0) {
      sum = steps.map(a => a.value*a.quantity).reduce((a, b) => a+b);
      size = steps.map(a => a.quantity).reduce((a, b) => a+b);
      buffer = (sum / Math.sqrt(size));
    }
    return <div className="estimationValue">
      <span className="base">{sum.toFixed(1)}</span>
      <span className="small">+</span>
      <span className="buffer">{buffer.toFixed(1)}</span>
      <span className="small">=</span>
      <span className="total">{(sum + buffer).toFixed(1)}</span></div>
  };
}
