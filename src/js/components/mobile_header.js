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

class MobileHeader extends React.Component {
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
    console.log(formData);
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword', myFetchOptions).then(response => response.json()).then(json => {
      this.setState({userNickName: json.NickUserName, userId: json.UserId});
    });
    message.success('请求成功');
    this.setModalVisible(false);
  }

  login() {
    this.setModalVisible(true);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const userShow = this.state.hasLogined ?
    <Link>
      <Icon type="inbox"></Icon>
    </Link> :
    <Icon type="setting" onClick={this.login.bind(this)}></Icon>
    return(
      <div id="mobileheader">
        <header>
          <img src="./src/images/logo.png" alt="logo" />
          <span>ReactNews</span>
          {userShow}
        </header>
        <Modal title="用户中心" wrapClassName="vertival-center-modal" visible={this.state.modalVisible} onOk={() => this.setModalVisible(false)} onCancel={() => this.setModalVisible(false)} okText="关闭">
              <Tabs type="card">
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
                    <Button type="primary" htmlType="submit">Register</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
      </div>
    );
  }
}
export default MobileHeader= Form.create({})(MobileHeader);
