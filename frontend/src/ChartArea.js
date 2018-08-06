import React, {Component} from 'react';
import {Chart} from 'react-google-charts';

// google.setOnLoadCallback(init);

class ChartArea extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div id={this.props.graphName} style={{width: '800px', height: '500px', border: '1px solid black'}}>
        <Chart
          chartType={'ScatterChart'}
          width={'100%'}
          height={'100%'}
          data={this.props.graphData}
        />
      </div>
    )
  }


}

export default ChartArea;