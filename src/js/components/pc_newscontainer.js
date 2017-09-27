import React from 'react';
import PCNewsBlock from './pc_news_block';
import { Row, Col } from 'antd';
import { Carousel, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import 'antd/dist/antd.css';

class PCNewsContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slideToShow: 1,
      autoplay: true
    };
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <Carousel {...settings} className="carousel">
                <div><img src="./src/images/carousel_1.jpg" /></div>
                <div><img src="./src/images/carousel_2.jpg" /></div>
                <div><img src="./src/images/carousel_3.jpg" /></div>
                <div><img src="./src/images/carousel_4.jpg" /></div>
              </Carousel>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab="头条新闻" key="1">
                <PCNewsBlock type="top" count={10} />
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  }
}
export default PCNewsContainer;
