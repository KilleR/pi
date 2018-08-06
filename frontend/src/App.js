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


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sensorData: []
    };
  }

  componentDidMount() {
    setInterval(this.getApi, 1000);
  }

  render() {
    let dataDivs = [];
    for (let i = 0; i < this.state.sensorData.length; i++) {
      dataDivs.push(<DotDiv key={'h' + i} color={'#0000FF'} x={i} y={this.state.sensorData[i]['humid']}/>)
      dataDivs.push(<DotDiv key={'p' + i} color={'#FFFF00'} x={i} y={this.state.sensorData[i]['pres'] / 100}/>)
      dataDivs.push(<DotDiv key={'t' + i} color={'#FF0000'} x={i} y={this.state.sensorData[i]['temp']}/>)
    }
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

        <ChartArea graphName={'Line'} graphData={[["age", "weight"], [8,12], [10,5]]}/>

        {dataDivs}
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
        let data = this.state.sensorData;
        data.push(res);
        this.setState({sensorData: data});
        console.log(this.state.sensorData);
      })
  }
}

export default App;
