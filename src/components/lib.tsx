import React from "react";
import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

interface RowProps {
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}

export const Row = styled.div<RowProps>`
  /* height: 6rem; */
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  );
};

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <DevTools />
      <Typography.Text type="danger">{error?.message}</Typography.Text>
    </FullPage>
  );
};
