import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Coffee, User, Mail, Lock, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setError('');
  }, [isLogin, isAdminLogin, email, password, name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdminLogin) {
      // Admin login logic (unchanged)
      if (email === 'admin@gmail.com' && password === 'admin123') {
        navigate('/admin');
      } else {
        setError('Invalid admin credentials');
      }
    } else if (isLogin) {
      // User login logic
      const response = axios.post("http://localhost:5000/db/users/log-in", { email, password })
        .then(navigate('/shopping'))
        .catch(() => { setError('Invalid email or password') });
    } else {
      // console.log(name, email, password);

      const response = axios.post("http://localhost:5000/db/users/register", { name, email, password })
        .then(res => { console.log(res.data) })
        .catch(err => { console.log(err) });

      setIsLogin(true); // Switch to login form after successful signup
      setError('Account created successfully. Please log in.');
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const formVariants = {
    hidden: { opacity: 0, x: '-100%' },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-[#034c52] flex items-center justify-center px-4 py-12"
    >
      <div className="max-w-md w-full space-y-8 bg-[#ECDFCC] p-8 rounded-lg shadow-2xl">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Coffee size={64} className="mx-auto text-[#034c52]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-3xl font-extrabold text-[#034c52]"
          >
            {isAdminLogin ? 'Admin Login' : isLogin ? 'Welcome back to ACafe' : 'Join ACafe today'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-sm text-[#034c52]"
          >
            {isAdminLogin ? 'Sign in to admin account' : isLogin ? 'Sign in to your account' : 'Create your account'}
          </motion.p>
        </div>

        {isAdminLogin && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-100 p-4 rounded-md text-sm"
          >
            <p><strong>Admin Email:</strong> admin@gmail.com</p>
            <p><strong>Admin Password:</strong> admin123</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.form
            key={isAdminLogin ? 'admin' : isLogin ? 'login' : 'signup'}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            {!isLogin && !isAdminLogin && (
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#034c52] focus:border-[#034c52] focus:z-10 sm:text-sm pl-10"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLogin || isAdminLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-[#034c52] focus:border-[#034c52] focus:z-10 sm:text-sm pl-10`}
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#034c52] focus:border-[#034c52] focus:z-10 sm:text-sm pl-10 pr-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Eye className="h-5 w-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#ECDFCC] bg-[#034c52] hover:bg-[#023c41] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#034c52] transition-colors duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {isAdminLogin ? <Lock className="h-5 w-5" aria-hidden="true" /> : <ShoppingBag className="h-5 w-5" aria-hidden="true" />}
                </span>
                {isAdminLogin ? 'Admin Sign in' : isLogin ? 'Sign in' : 'Sign up'}
              </motion.button>
            </div>
          </motion.form>
        </AnimatePresence>

        <div className="text-center mt-4 space-y-2">
          {!isAdminLogin && (
            <motion.button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-[#034c52] hover:text-[#023c41] transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
            </motion.button>
          )}
          <motion.button
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className="font-medium text-[#034c52] hover:text-[#023c41] transition-colors duration-200 block w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAdminLogin ? 'Back to User Login' : 'Admin Login'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthPage;