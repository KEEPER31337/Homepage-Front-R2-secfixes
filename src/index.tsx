import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import axios from "axios";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";

import "./tailwind.css";
import muiTheme from "@constants/muiTheme";
import App from "./App";

axios.defaults.baseURL = import.meta.env.PUBLIC_API_URL;
axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <MUIThemeProvider theme={muiTheme}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </MUIThemeProvider>
      </LocalizationProvider>
    </RecoilRoot>
  </React.StrictMode>,
);
