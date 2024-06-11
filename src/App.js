import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import About from "./components/About";
import NavigationBar from "./components/NavBar";

function App() {
  return (
    <div className="main bg-primary">
      <NavigationBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeList />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
