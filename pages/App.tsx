import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Home />
    </ThemeProvider>
  );
}
