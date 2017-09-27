import React from 'react';
import ReactDOM from 'react-dom';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import MediaQuery from 'react-responsive';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <MediaQuery minDeviceWidth={1224}>
          <PCIndex />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <MobileIndex />
        </MediaQuery>
      </div>
    );
  }
}
ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
export default Root;
