import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutPageHome from "@/pages/ContentPages/index";
import HomePage from "@/pages/ContentPages/HomePage/Home";
import RoutePage from '@/pages/ContentPages/RoutePage/Route'
import BlogPage from '@/pages/ContentPages/BlogPage/Blog'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPageHome isHeaderVisible={true}  />}>
          <Route index element={<HomePage />} />
          <Route path="/learning-paths" index element={<RoutePage />} />
          <Route path="/blog"index element={<BlogPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
