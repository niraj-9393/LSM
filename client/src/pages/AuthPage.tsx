import { useLoginMutation, useSignupMutation } from "@/store/services/authApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner"
export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const [isLogin, setIsLogin] = useState(mode !== "signup");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  useEffect(() => {
    setIsLogin(mode !== "signup");
  }, [mode]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const [
  login,
  {
    isLoading: isLoginLoading,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
    data: loginData,
    error: loginError
  }
] = useLoginMutation();

const [
  signup,
  {
    isLoading: isSignUpLoading,
    isError: isSignUpError,
    isSuccess: issignUpSuccess,
    data: signupData,
    error: signupError
  }
] = useSignupMutation();
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await login({
          email: form.email,
          password: form.password
        }).unwrap();
        console.log(res);
        dispatch(setUser(res.user))
        navigate("/")
      } else {
        const res = await signup({
          name: form.name,
          email: form.email,
          password: form.password

        }).unwrap();
        console.log(res);
        dispatch(setUser(res.user))
        navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  }


useEffect(() => {

  if (isLoginLoading) {
    toast.loading("Logging in...", { id: "login" });
  }

  if (isLoginSuccess) {
    toast.success(loginData?.message || "Login successful 🎉", { id: "login" });
  }

  if (isLoginError) {
    toast.error(
      (loginError as any)?.data?.message || "Login failed ❌",
      { id: "login" }
    );
  }

  // 📝 SIGNUP
  if (isSignUpLoading) {
    toast.loading("Creating account...", { id: "signup" });
  }

  if (issignUpSuccess) {
    toast.success(
      signupData?.message || "Account created 🎉",
      { id: "signup" }
    );
  }

  if (isSignUpError) {
    toast.error(
      (signupError as any)?.data?.message || "Signup failed ❌",
      { id: "signup" }
    );
  }

}, [
  isLoginError,
  isLoginLoading,
  isLoginSuccess,
  isSignUpError,
  isSignUpLoading,
  issignUpSuccess,
  loginData,
  signupData
]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {isLogin ? "Welcome Back ." : "Create Account ."}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLogin ? "Login to continue" : "Register to get started"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name (Register only) */}
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>


          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#059669] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              const newMode = isLogin ? "signup" : "login";
              navigate(`/auth?mode=${newMode}`);
              setIsLogin(!isLogin);
            }}
            className="ml-2 text-blue-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

      </div>
    </div>
  );
}