import React from 'react'; // or 'preact';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router, Route, Link
} from "react-router-dom";
import Loadable from "react-loadable";
import {
  Icon,
  Menu,
  Layout
} from 'antd';

import './main.css';

const {
  Header,
  Footer,
  Content,
  Sider
} = Layout;

const loading = () => <div />

const routes = [
  {
    path: "/overview",
    component: Loadable({
      loading,
      loader: () => import('../components/Overview')
    })
  },
  {
    path: '/network/interface',
    component: Loadable({
      loading,
      loader: () => import('../components/Network/Interface')
    })
  },
  {
    path: '/aria2',
    component: Loadable({
      loading,
      loader: () => import('../components/Aria2')
    })
  },
  {
    path: '/shadowsocks',
    component: Loadable({
      loading,
      loader: () => import('../components/Shadowsocks')
    })
  },
  {
    path: '/v2ray',
    component: Loadable({
      loading,
      loader: () => import('../components/V2ray')
    })
  },
  {
    path: '/network/dhcp',
    component: Loadable({
      loading,
      loader: () => import('../components/DHCP')
    })
  }
];

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const MenuTitle = ({ icon, text }) => {
  return (
    <span>
      <Icon type={icon} />
      <span>{text}</span>
    </span>
  );
};

const MenuLink = ({ icon, text, to }) => {
  return (
    <Link to={to} >
      <Icon type={icon} />
      <span>{text}</span>
    </Link>
  );
};

class Index extends React.PureComponent {
  state = {
    collapsed: !false
  }
  toggleSider(collapsed) {
    this.setState({ collapsed });
  }
  onMenuOpen = keys => {
    this.setState({ openKeys: [keys[keys.length - 1]] });
  }
  render() {
    const { collapsed, openKeys } = this.state;
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }} >
          <Sider
            width="256"
            className="sider"
            collapsible
            collapsed={collapsed}
            style={{ position: 'fixed', height: '100vh' }} >
            <div className="logo" ></div>
            <Menu theme="dark" mode="inline" onOpenChange={this.onMenuOpen} openKeys={openKeys} >
              <Menu.Item key="overview">
                <MenuLink icon="dashboard" text="Overview" to="/overview" />
              </Menu.Item>
              <Menu.SubMenu key="network" title={<MenuTitle icon="global" text="Network" />} >
                <Menu.Item key="6">
                  <MenuLink icon="link" text="Interface" to="/network/interface" />
                </Menu.Item>
                <Menu.Item>
                  <MenuLink icon="gateway" text="DHCP" to="/network/dhcp" />
                </Menu.Item>
                <Menu.Item>
                  <MenuLink icon="build" text="DNS" to="/network/dns" />
                </Menu.Item>
                <Menu.Item>
                  <MenuLink icon="table" text="Firewall" to="/network/iptables" />
                </Menu.Item>
                <Menu.Item>
                  <MenuLink icon="wifi" text="Wireless" to="/network/wireless" />
                </Menu.Item>
                <Menu.Item key="shadowsocks">
                  <MenuLink icon="rocket" text="Shadowsocks" to="/shadowsocks" />
                </Menu.Item>
                <Menu.Item key="v2ray">
                  <MenuLink icon="rocket" text="V2ray" to="/v2ray" />
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="app" title={<MenuTitle icon="appstore" text="App Center" />} >
                <Menu.Item key="file">
                  <MenuLink icon="file" text="File Manager" to="/file" />
                </Menu.Item>
                <Menu.Item key="download">
                  <MenuLink icon="download" text="Download" to="/aria2" />
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="system" title={<MenuTitle icon="setting" text="System" />} >
                <Menu.Item key="system-basic">
                  <MenuLink icon="user" text="Basic" to="/system/basic" />
                </Menu.Item>
                <Menu.Item>
                  <MenuLink icon="user" text="User" to="/system/user" />
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: collapsed ? 80 : 256 }} >
            <Header className="header" style={{ width: `calc(100% - ${collapsed ? 80 : 256}px)` }} >
              <Icon
                className="trigger"
                onClick={e => this.toggleSider(!collapsed)}
                type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Header>
            <Content className="content" >
              {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            </Content>
            <Footer></Footer>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(<Index />,
  document.getElementById('app'));
