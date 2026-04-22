

import NavBar from "./components/NavBar"
import AuthPage from "./pages/AuthPage"
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useProfileQuery } from "./store/services/authApi"
import { clearUser, setUser } from "./store/authSlice"
import type { RootState } from "./store/store";
import { Loader2 } from "lucide-react"
import ApplyInstructor from "./pages/ApplyInstructor"
import DashBoard from "./pages/admin/DashBoard"
import Courses from "./pages/admin/Courses"
import Statistics from "./pages/admin/Statistics"
import CreateCourse from "./pages/admin/CreateCourse"
import CourseEdit from "./pages/admin/CourseEdit"


function App() {
  const { data, isSuccess, isError, isLoading } = useProfileQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && data?.user) dispatch(setUser(data.user));
    if (isError) dispatch(clearUser());
  }, [isSuccess, isError, data, dispatch]);

  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  return (
    <>
      <NavBar />
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/apply-instructor" element={<ApplyInstructor />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/course-edit/:courseId" element={<CourseEdit />} />
            <Route path="/create_Course" element={<CreateCourse />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (

          <>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
}
export default App