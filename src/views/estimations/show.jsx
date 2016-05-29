import React from 'react';


export default class EstimationsShow extends React.Component {
  getEstimation() {
    return this.props.estimations.find((e) => {
      return e.id == this.props.params.id;
    });
  }
  render() {
    return <main className="row">
        <div className="col-xs-12 col-md-6 col-md-offset-2">
          <h1>Hello from estimation {this.props.params.id}</h1>
        </div>
        <div className="col-xs-12 col-md-3 col-md-offset-1">
          <h2>{ this.getEstimation().title }</h2>
        </div>
    </main>
  }
};
