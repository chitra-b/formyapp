import React from "react";
import { Dropdown, Button, Icon, Menu } from "antd";
import styled from "styled-components/macro";
import {Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {colorVariables} from "../../utils/variables"

const StyledDropdown = styled(Dropdown)`
  &.ant-dropdown-link: {
    fontweight: "bold";
    font-size: 18px;
    line-height: 1.4rem;
    color: ${colorVariables.text};
    font-family: Trebuchet MS,sans-serif;

  }
`;

const StyledLink = styled(Link)`
  font-weight: bold;
    font-size: 16px;
    color: ${colorVariables.text};
    `;


export default function UserMenu() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.myProfile.user);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link icon="user" to="/profile">
          <Button type="link" icon="user">
            Profile
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Button type="link" icon="poweroff">
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (user && (<StyledDropdown overlay={menu} trigger={["click"]}>
    <StyledLink icon="user" to="#">
    <Icon type="user" style={{marginRight: '3px' }}/> Hello, <span style={{marginLeft: '3px' }}>{user.first_name}</span> <Icon type="down" />
    </StyledLink>
</StyledDropdown>));
}
