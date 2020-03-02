import React, { Fragment } from "react";
import { Menu, Dropdown, Button, Icon } from "antd";

// ResponsiveActions component is used to display set of components as a dropdown menu item
// props:
//     controls  : list of items
//     controlsname : name to display on the dropdown button

function ResponsiveActions(controls, controlsname) {
  console.log(controls);
  let menu = controls
    ? controls.map((item, idx) => <Menu.Item key={idx}>{item}</Menu.Item>)
    : "";
  menu = <Menu>{menu}</Menu>;
  return (
    <Dropdown overlay={menu}>
      <Button>
        {controlsname ? controlsname : "More"}
        <Icon type="down"></Icon>
      </Button>
    </Dropdown>
  );
}
export default ResponsiveActions;
