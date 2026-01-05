import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUsersErrors, login } from "@/store/slices/userSlice";
import { toast } from "react-toastify";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    loading,
    isAuthenticated,
    error,
    message,
  } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = () => {
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersErrors())
    }
    if (isAuthenticated) {
      navigateTo("/")
    }
  }, [dispatch, isAuthenticated, error, loading])
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Sign in to access your portfolio dashboard
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      to="/password/forgot"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Login Button */}
                <div>
                  {loading ? (
                    <Button disabled className="w-full">
                      <Loader2 className="w-5 h-5 animate-spin" /> Logging In...
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleLogin(email, password)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex justify-center items-center bg-blue-50 dark:bg-gray-800">
        <img
          src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-6324.jpg?w=740&t=st=1698672000~exp=1698672600~hmac=5f3c1c88c8c1b1f7c3e091b623b9f19a2f8dc0c68c9f5c1deab2e1a1b45e1d14"
          alt="Secure Login"
          className="max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
