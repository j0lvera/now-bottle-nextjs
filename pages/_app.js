import React from "react";
import App from "next/app";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
