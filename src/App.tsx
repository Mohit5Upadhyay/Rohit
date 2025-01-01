import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './appwrite/auth';
import Layout from './pages/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost'; // Import BlogPost component
import Contact from './pages/Contact';
import Pictures from './pages/Pictures';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import NotFound from './pages/NotFound';
import NewBlog from './pages/admin/NewBlog';
import EditBlog from './pages/admin/EditBlog';
import UploadPicture from './pages/admin/UploadPicture';
import NewBook from './pages/admin/NewBook';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="font-sans min-h-screen bg-turquoise">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Protected Routes */}
            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>
                {/* Regular User Routes */}
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/books" element={<Books />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} /> {/* Add BlogPost route */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/pictures" element={<Pictures />} />

                {/* Admin Only Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/blog/new" element={<NewBlog />} />
                  <Route path="/blog/edit/:id" element={<EditBlog />} />
                  <Route path="/pictures/upload" element={<UploadPicture />} />
                  <Route path="/books/new" element={<NewBook />} />
                </Route>
              </Route>
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;