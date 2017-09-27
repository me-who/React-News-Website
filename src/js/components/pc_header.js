import React from 'react';
import { Row, Col } from 'antd';
import {
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  Checkbox,
  Modal
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import 'antd/dist/antd.css';
import {Router, Route, Link, browserHistory} from 'react-router';

class PCHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0
    };
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClick(e) {
    if (e.key == 'register') {
      this.setState({
        current: 'register'
      });
      this.setModalVisible(true);
    }else {
      this.setState({
        current: e.key
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };
    var formData = this.props.form.getFieldsValue();
    // console.log(formData);
    // {r_userName: undefined, r_password: undefined, r_confirmPassword: undefined} 使用过时的getFieldProps能够获取到输入框的值，与getFieldDecorator有关
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword', myFetchOptions).then(response => response.json()).then(json => {
      this.setState({userNickName: json.NickUserName, userId: json.UserId});
      localStorage.userid= json.UserId;
			localStorage.userNickName = json.NickUserName;
    });
    if (this.state.action == "login") {
      this.setState({hasLogined: true});
    }
    message.success('请求成功');
    this.setModalVisible(false);
  }

  // callback(key) {
  //   if (key == 1) {
  //     this.setState({action: 'login'});
  //   } else if (key == 2) {
  //     this.setState({action: 'register'});
  //   }
  // }
  //
  // logout() {
  //   localStorage.userid = '';
  //   localStorage.userNickName = '';
  //   this.setState({hasLogined: false});
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    const userShow = this.state.hasLogined
      ? <Menu.Item key="logout" className="register">
          <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
          <Link target="_blank">
            <Button type="dashed" htmlType="button">个人中心</Button>
          </Link>
          <Button type="dashed" htmlType="button">退出</Button>
        </Menu.Item>
      : <Menu.Item key="register" className="register">
          <Icon type="appstore" />注册/登录
        </Menu.Item>
    return(
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className="logo">
              <img src="./src/images/logo.png" alt="logo" />
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
              <Menu.Item key="top">
                <Icon type="mail" />头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore" />社会
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore" />国内
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore" />国际
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore" />娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore" />体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore" />科技
              </Menu.Item>
              <Menu.Item key="shishang">
                <Icon type="appstore" />时尚
              </Menu.Item>
              {userShow}
            </Menu>
            {/* 登录/注册 模态框 */}
            <Modal title="用户中心" wrapClassName="vertival-center-modal" visible={this.state.modalVisible} onOk={() => this.setModalVisible(false)} onCancel={() => this.setModalVisible(false)} okText="关闭">
              <Tabs type="card">
              {/* TODO: 可能与form.create 后父组件无法获取到子组件的自定义方法有关 */}
                <TabPane tab="登录" key="1">
									<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											<Input placeholder="请输入您的账号" {...getFieldDecorator('userName')}/>
										</FormItem>
										<FormItem label="密码">
											<Input type="password" placeholder="请输入您的密码" {...getFieldDecorator('password')}/>
										</FormItem>
										<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>
                <TabPane tab="注册" key="2">
                  <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="账户">
                      <Input placeholder="username" {...getFieldDecorator('r_userName')} />
                    </FormItem>
                    <FormItem label="密码">
                      <Input type="password" placeholder="password" {...getFieldDecorator('r_password')} />
                    </FormItem>
                    <FormItem label="确认密码">
                      <Input type="password" placeholder="confirm password" {...getFieldDecorator('r_confirmPassword')} />
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}
export default PCHeader = Form.create({})(PCHeader);
