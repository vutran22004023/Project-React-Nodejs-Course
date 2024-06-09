import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutPageHome from "@/pages/ContentPages/index";
import HomePage from "@/pages/ContentPages/HomePage/Home";
import RoutePage from "@/pages/ContentPages/RoutePage/Route";
import BlogPage from "@/pages/ContentPages/BlogPage/Blog";
import CoursesNotLogin from "@/pages/ContentPages/CoursesPage/CoursesPageNotLogin/CoursesNotLogin";
import CoursesLoginLayout from "@/pages/ContentPages/CoursesPage/CoursesLogin/index";
import CoursesLoginPage from "@/pages/ContentPages/CoursesPage/CoursesLogin/CourseLogin/CourseLogin"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPageHome isHeaderVisible={true} />}>
          <Route index element={<HomePage />} />
          <Route path="/learning-paths" index element={<RoutePage />} />
          <Route path="/blog" index element={<BlogPage />} />
          <Route
            path="/courses-not-login"
            index
            element={<CoursesNotLogin />}
          />
        </Route>
        <Route
          path="/"
          element={<CoursesLoginLayout isHeaderVisible={true} />}
        >
          <Route
            path="/courses-login"
            index
            element={<CoursesLoginPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
