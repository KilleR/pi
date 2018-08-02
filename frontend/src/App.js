import React, {Component} from 'react';
import './App.css';
import DotDiv from './DotDiv';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';

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
      dataDivs.push(<DotDiv key={'h'+i} color={'#0000FF'} x={i} y={this.state.sensorData[i]['humid']} />)
      dataDivs.push(<DotDiv key={'p'+i} color={'#FFFF00'} x={i} y={this.state.sensorData[i]['pres']/100} />)
      dataDivs.push(<DotDiv key={'t'+i} color={'#FF0000'} x={i} y={this.state.sensorData[i]['temp']} />)
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

        {dataDivs}
        {/*<div>Humidity: {this.state.sensorData.filter(d => d.humid)}</div>*/}
        {/*<div>Pressure: {this.state.sensorData}</div>*/}
        {/*<div>Temperature: {this.state.temp}</div>*/}

        {/*<button onClick={this.getApi}>get stuff</button>*/}
      </div>
    );
  }

  getApi = () => {
    fetch('/api/sensor-data/', {
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
