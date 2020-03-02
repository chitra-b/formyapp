import React from "react";
import {Layout, Menu, Icon} from "antd";
import styled from "styled-components/macro";

const Styled = {
    Sider: styled(Layout.Sider)`
    margin-top: 15px;

    & .ant-layout-sider-children {
      display: flex;
      align-items: center;
      flex-direction: column;
    `
};


export default function Sidebar() {
    return (
      <Styled.Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
        >
          <Menu.SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                Forms
              </span>
            }
          >
            <Menu.Item key="1">View Forms</Menu.Item>
            <Menu.Item key="2">Create Form</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="settings" />
                Settings
              </span>
            }
          >
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="notification" />
                Notifications
              </span>
            }
          >
          </Menu.SubMenu>
        </Menu>
      </Styled.Sider>
        
    );
}