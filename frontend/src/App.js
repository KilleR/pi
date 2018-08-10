import React, {Component} from 'react';
import './App.css';
import DotDiv from './DotDiv';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import ChartArea from './ChartArea';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const options = {
  title: "Environment metrics",
  curveType: "function",
  chartArea: {width: '90%', height: '80%'},
  legend: {position: "bottom"}
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartHeaders: ['Time', 'Humidity (%)', 'Temperature (°C)', 'Pressure (cbar)'],
      chartData: []
    };
  }

  componentDidMount() {
    this.getApi();
    setInterval(this.getApi, 1000);
  }

  render() {
    return (
      <div className="App">
        <AppBar>
          <Toolbar>
            <Typography variant={"title"} color={"inherit"}>
              Environment Toolbox
            </Typography>
          </Toolbar>
        </AppBar>

        <Card>
          <CardContent>
            <Typography>Stuff here</Typography>
          </CardContent>
        </Card>

        <ChartArea graphName={'Line'} graphData={[this.state.chartHeaders, ...this.state.chartData]}
                   chartOptions={options}/>

      </div>
    );
  }

  getApi = () => {
    fetch('http://82.69.95.51/api/sensor-data/', {
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        // do chart data
        let chartData = this.state.chartData;
        chartData.push([chartData.length, parseFloat(res['humid']), parseFloat(res['temp']), parseFloat(res['pres']) / 100]);
        this.setState({chartData: chartData});
        // console.log('Chart Data:', this.state.chartData);
      })
  }
}

export default App;
