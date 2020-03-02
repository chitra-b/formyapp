import styled from "styled-components/macro";
import { Row as AntdRow, Layout, Table, Upload as AntdUpload } from "antd";

const PageLayout = styled(Layout)`
  &.ant-layout {
    min-height: 100vh;
  }
`;

// const TableXScroll = styled(Table).attrs(props => ({
//   scroll: { x: props.xMinWidth }
// }))``;

// const Row = styled(AntdRow).attrs(() => ({ type: "flex", align: "middle" }))``;

// const Upload = styled(AntdUpload).attrs(() => ({
//   listType: "picture-card"
// }))`
//   &
//     .ant-upload-list-item.ant-upload-list-item-done.ant-upload-list-item-list-type-picture-card
//     > div {
//     height: 100%;
//   }

//   & .anticon.anticon-download {
//     display: none !important;
//   }
// `;

export { PageLayout };
