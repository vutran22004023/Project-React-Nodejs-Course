import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutPageHome from "@/pages/ContentPages/index";
import HomePage from "@/pages/ContentPages/HomePage/Home";
import RoutePage from "@/pages/ContentPages/RoutePage/Route";
import BlogPage from "@/pages/ContentPages/BlogPage/Blog";
import BlogPageDetail from "@/pages/ContentPages/BlogPage/BlogDetail";
import CoursesNotLogin from "@/pages/ContentPages/CoursesPage/CoursesPageNotLogin/CoursesNotLogin";
import CoursesLoginLayout from "@/pages/ContentPages/CoursesPage/CoursesLogin/index";
import CoursesLoginPage from "@/pages/ContentPages/CoursesPage/CoursesLogin/CourseLogin/CourseLogin";
import UserLayout from "@/pages/ContentPages/UserPage/index"
import InformationUser from "@/pages/ContentPages/UserPage/User/InformationUser"
import PasswordAndSecurity from '@/pages/ContentPages/UserPage/User/passwordSecurity'
import PersonalPage from '@/pages/ContentPages/UserPage/User/PersonalPage'
const App = () => {
  return (
    <Router>
      <Routes>

        {/* Router HomePage */}
        <Route
          path="/"
          element={
            <LayoutPageHome isSidebarVisible={true} isHeaderVisible={true} />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/learning-paths" element={<RoutePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="/courses-not-login" element={<CoursesNotLogin />} />
        </Route>
        {/* Router Blog detail */}
        <Route
          path="/"
          element={
            <LayoutPageHome isSidebarVisible={false} isHeaderVisible={true} />
          }
        >
          <Route path="blog/blog-detail" element={<BlogPageDetail />} />
        </Route>
        {/* Router User */}
        <Route path="/" element={<UserLayout isSidebarVisible={true} isHeaderVisible={true} />}>
          <Route path="/personal-page" index element={<PersonalPage />} />
          <Route path="/information-user" index element={<InformationUser />} />
          <Route path="/password-and-security" index element={<PasswordAndSecurity />} />
        </Route>
        {/* Router CoursesLogin */}
        <Route path="/" element={<CoursesLoginLayout isHeaderVisible={true} />}>
          <Route path="/courses-login" index element={<CoursesLoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
