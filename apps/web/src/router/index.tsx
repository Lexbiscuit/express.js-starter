import {BrowserRouter, Routes, Route} from "react-router";
import {Home} from "@/router/routes/Home";
import {MainLayout, RequireAuth} from "@/components/layout";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
