import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

class PCFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <footer>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="footer">
            &copy;&nbsp;2018 ReactNews. All Rights Reserved.
          </Col>
          <Col span={2}></Col>
        </Row>
      </footer>
    );
  }
}
export default PCFooter;
