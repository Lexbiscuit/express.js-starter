import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {AppRouter} from "./router";
import {ConfigProvider, theme} from "antd";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <AppRouter />
    </ConfigProvider>
  </StrictMode>,
);
