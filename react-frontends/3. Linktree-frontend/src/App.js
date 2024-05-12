import "./App.css";
import { HashRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
      <HashRouter>
        <MainLayout />
      </HashRouter>
  );
}

export default App;
