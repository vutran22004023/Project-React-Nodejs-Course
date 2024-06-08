import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutPageHome from "@/pages/ContentPages/index";
import HomePage from "@/pages/ContentPages/HomePage/index";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPageHome />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
