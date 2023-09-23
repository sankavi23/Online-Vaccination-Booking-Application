import { ThemeProvider, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { appTheme } from "./themes/theme";

import Layout from "./components/layout";
import SeperatePages from "./pages_welcome/seperatePages";
import WelcomePage from "./pages_welcome/welcomePage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store";


function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Provider store={store}>
        <CssBaseline />
        <ToastContainer />
        <SeperatePages seperate={1} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
