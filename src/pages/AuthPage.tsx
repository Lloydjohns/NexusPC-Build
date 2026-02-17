// src/pages/AuthPage.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { UserCircle, Mail, Lock, Eye, EyeOff, Upload, Sparkles } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, signup, loginWithGoogle } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null as File | null,
  });

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!signupData.avatar) {
      setPreviewAvatar(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreviewAvatar(reader.result as string);
    reader.readAsDataURL(signupData.avatar);
  }, [signupData.avatar]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(loginData.email, loginData.password);
    if (ok) navigate("/");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) return;
    const ok = await signup(
      signupData.email,
      signupData.password,
      signupData.name
    );
    if (ok) navigate("/");
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 md:grid-cols-5 overflow-hidden">
      
      {/* LEFT — BRAND (Enhanced with animations and icons) */}
      <div className="hidden md:flex col-span-3 bg-gradient-to-br from-black via-zinc-900 to-primary text-white relative">
        <div className="absolute inset-0 bg-black/40" />
        {/* Animated background elements for cool effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-secondary/30 rounded-full blur-lg animate-bounce" />
          <Sparkles className="absolute top-1/4 left-1/3 w-8 h-8 text-primary animate-spin" />
          <Sparkles className="absolute bottom-1/3 right-1/4 w-6 h-6 text-secondary animate-ping" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-20">
          <h1 className="text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent animate-fade-in">
            NexusPC
          </h1>
          <p className="text-xl text-zinc-300 max-w-xl leading-relaxed mb-8">
            Build high-performance PCs, manage your orders, and shop premium
            components — all in one powerful platform. Unleash your creativity with cutting-edge tech.
          </p>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2 text-zinc-400">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Secure & Fast</span>
            </div>
            <div className="flex items-center space-x-2 text-zinc-400">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>Custom Builds</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — FORM (Modernized with icons, animations, and details) */}
      <div className="col-span-2 flex items-center justify-center bg-background px-8 md:px-16 relative">
        {/* Subtle background pattern for modern look */}
        <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/20 opacity-50" />
        <div className="relative z-10 w-full max-w-md">

          {/* Toggle with smooth transition */}
          <div className="flex mb-10 border-b border-muted">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-3 text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? "border-b-2 border-primary text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-3 text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? "border-b-2 border-primary text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* LOGIN */}
          {isLogin && (
            <>
              <h2 className="text-4xl font-semibold mb-2 text-foreground">
                Welcome back
              </h2>
              <p className="text-muted-foreground mb-8">
                Login to your NexusPC account and continue building.
              </p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-12 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-background"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-12 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-background"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="text-right">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button className="w-full h-12 bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl" variant="hero">
                  Login
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-muted" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">or</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-2 hover:bg-muted/50 transition-all duration-200"
                  onClick={loginWithGoogle}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    {/* Google icon SVG */}
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
              </form>
            </>
          )}

          {/* SIGNUP */}
          {!isLogin && (
            <>
              <h2 className="text-4xl font-semibold mb-2 text-foreground">
                Create account
              </h2>
              <p className="text-muted-foreground mb-8">
                Join NexusPC today and start your build journey.
              </p>

              <form onSubmit={handleSignup} className="space-y-6">
                {/* Avatar with enhanced styling */}
                <div className="flex justify-center mb-6">
                  <div
                    onClick={() => avatarRef.current?.click()}
                    className="relative w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary transition-all duration-200 group"
                  >
                    {previewAvatar ? (
                      <img
                        src={previewAvatar}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle className="w-14 h-14 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <input
                    ref={avatarRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        avatar: e.target.files?.[0] || null,
                      })
                    }
                  />
                </div>

                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full h-12 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-background"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-12 pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-background"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-12 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-background"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="w-full h-12 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 bg-background"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Button className="w-full h-12 bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl" variant="hero">
                  Create account
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By signing up, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;