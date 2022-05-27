import * as React from 'react';
import {Auth, JS} from 'aws-amplify';

import { RouteComponentProps, withRouter } from 'react-router';
import { Layout, Menu, Icon, notification } from 'antd';

/** App Theme */
import { colors } from '../../Themes/Colors';

/** App Constatns */
import { AUTH_USER_TOKEN_KEY } from '../../Utils/constants';
import { ClickParam } from 'antd/lib/menu';

const user = Auth.currentAuthenticatedUser()
var data=''
var userRole=''
var userEmail=''
Promise.resolve(user).then(value=>{
  console.log('value:',value)
  data=value;
  userRole=value.attributes['custom:role']
  userEmail=value.attributes['email']

  console.log(userEmail)
  console.log(userRole)

})


const DashBoardContainer: React.SFC<RouteComponentProps> = props => {
  const [collapsed, setCollapsed] = React.useState(false);
  const handleLogout = async (event: ClickParam) => {
    const { history } = props;
    try {

      await Auth.signOut({ global: true }).then(() => {
        localStorage.removeItem(AUTH_USER_TOKEN_KEY);
        history.push('/login');
      });
    } catch (err) {
      notification.error({ message: err.message });
    }
  };



  return (

    <Layout className="cover" id="app-header">

      <Layout.Sider className="cover" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="setting" />
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={event => handleLogout(event)}>
            <Icon type="logout" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: colors.white, padding: 0 }}>
          <Icon
            className="trigger"
            onClick={() => setCollapsed(!collapsed)}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
          />
        </Layout.Header>
        <Layout.Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colors.white,
            minHeight: 280
          }}
        >
          <div className="text-center">
            <h1>Hello : {userEmail}</h1>
            <h3>Your role is : {userRole} </h3>


          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(DashBoardContainer);
