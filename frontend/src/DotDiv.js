import React, {Component} from 'react';
import './DotDiv.css';

class DotDiv extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    const styles = {
      divLocation: {
        position: 'absolute',
        left: this.props.x * 10,
        bottom: this.props.y * 10,
        borderStyle: 'solid',
        borderWidth: '5px',
        borderColor: this.props.color,
        borderRadius: '5px'
      }
    };

    return (
      <div style={styles.divLocation}></div>
    )
  }
}

export default DotDiv;