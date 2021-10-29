import { Page } from "@geist-ui/react";
import React from "react";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <Page style={{
      maxWidth: 900,
      margin: "0 auto",
      padding: 0,
      width: "80%"
    }}>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Content>{children}</Page.Content>
    </Page>
  );
};
