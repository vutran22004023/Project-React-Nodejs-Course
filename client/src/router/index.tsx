import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute, PrivateAdminRoute, PrivateUserRoute } from './PrivateRoute';
import LayoutPageHome from "@/pages/ContentPages/index";
import CoursesLoginLayout from "@/pages/ContentPages/CoursesPage/CoursesLogin/index";
import UserLayout from "@/pages/ContentPages/UserPage/index";
import AdminLayout from '@/pages/ContentAdmin/index';

const HomePage = lazy(() => import('@/pages/ContentPages/HomePage/Home'));
const RoutePage = lazy(() => import('@/pages/ContentPages/RoutePage/Route'));
const BlogPage = lazy(() => import('@/pages/ContentPages/BlogPage/Blog'));
const BlogPageDetail = lazy(() => import('@/pages/ContentPages/BlogPage/BlogDetail'));
const CoursesNotLogin = lazy(() => import('@/pages/ContentPages/CoursesPage/CoursesPageNotLogin/CoursesNotLogin'));
const CoursesLoginPage = lazy(() => import('@/pages/ContentPages/CoursesPage/CoursesLogin/CourseLogin/CourseLogin'));
const InformationUser = lazy(() => import('@/pages/ContentPages/UserPage/User/InformationUser'));
const PasswordAndSecurity = lazy(() => import('@/pages/ContentPages/UserPage/User/passwordSecurity'));
const PersonalPage = lazy(() => import('@/pages/ContentPages/UserPage/User/PersonalPage'));
const PostsBlog = lazy(() => import('@/pages/ContentPages/UserPage/User/postsblog'));
const FormResetPass = lazy(() => import('@/pages/ContentPages/FromForgotPass/FormResetPass'));
const FormStatusAuth = lazy(() => import('@/pages/ContentPages/FromForgotPass/FormStatusAuth'));
const DashBoardAdmin = lazy(() => import('@/pages/ContentAdmin/DashBoards/dashboard'));
const InformationpageAdmin = lazy(() => import('@/pages/ContentAdmin/Informationpages/Informationpage'));
const CoursesAdmin = lazy(() => import('@/pages/ContentAdmin/Courses/courses'));
const UsersAdmin = lazy(() => import('@/pages/ContentAdmin/Users/users'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<LayoutPageHome isSidebarVisible={true} isHeaderVisible={true} />}>
              <Route index element={<HomePage />} />
              <Route path="/learning-paths" element={<RoutePage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="/courses-not-login" element={<CoursesNotLogin />} />
            </Route>
            <Route path="/" element={<LayoutPageHome isSidebarVisible={false} isHeaderVisible={true} />}>
              <Route path="blog/blog-detail" element={<BlogPageDetail />} />
              <Route path="reset-password" element={<FormResetPass />} />
              <Route path="form-status-auth" element={<FormStatusAuth />} />
            </Route>
            <Route path="/" element={<PrivateUserRoute><UserLayout isSidebarVisible={true} isHeaderVisible={true} /></PrivateUserRoute>}>
              <Route path="/personal-page" index element={<PersonalPage />} />
              <Route path="/information-user" index element={<InformationUser />} />
              <Route path="/password-and-security" index element={<PasswordAndSecurity />} />
              <Route path="/posts-blog" index element={<PostsBlog />} />
            </Route>
            <Route path="/" element={<CoursesLoginLayout isHeaderVisible={true} />}>
              <Route path="courses-login" index element={<CoursesLoginPage />} />
            </Route>
            <Route path="/admin" element={<PrivateAdminRoute><AdminLayout isSidebarVisible={true} isHeaderVisible={true} /></PrivateAdminRoute>}>
              <Route path="dash-board" index element={<DashBoardAdmin />} />
              <Route path="information-page" index element={<InformationpageAdmin />} />
              <Route path="courses" index element={<CoursesAdmin />} />
              <Route path="users" index element={<UsersAdmin />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
