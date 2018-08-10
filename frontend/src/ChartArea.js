import React, {Component} from 'react';
import {Chart} from 'react-google-charts';

// google.setOnLoadCallback(init);

class ChartArea extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div style={{width: '800px', height: '500px', border: '1px solid black'}}>
        <Chart
          chartType={'LineChart'}
          width={'100%'}
          height={'100%'}
          data={this.props.graphData}
          options={this.props.chartOptions}
        />
      </div>
    )
  }


}

export default ChartArea;