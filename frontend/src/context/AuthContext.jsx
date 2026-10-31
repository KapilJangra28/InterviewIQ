import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure dynamic API Base URL (Render deployment or local dev)
if (import.meta.env.VITE_API_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}

const AuthContext = createContext(null);

const DEMO_USERS = {
  student: {
    _id: 'usr_student_01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.edu',
    role: 'student',
    phone: '+91 9876543210',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    accountStatus: 'active',
    studentProfile: {
      college: 'Indian Institute of Technology (IIT) Bombay',
      degree: 'B.Tech',
      branch: 'Computer Science & Engineering',
      graduationYear: 2025,
      skills: ['React.js', 'Node.js', 'Python', 'Data Structures', 'System Design', 'PostgreSQL', 'Docker'],
      projects: [
        {
          title: 'Distributed Cache System',
          description: 'Engineered an in-memory LRU cache with Raft consensus protocol in Go.',
          techStack: ['Go', 'Raft', 'gRPC'],
          link: 'https://github.com'
        },
        {
          title: 'AI Code Review Assistant',
          description: 'Built a GitHub action that generates security & performance summaries using LLMs.',
          techStack: ['TypeScript', 'Gemini API', 'GitHub Actions'],
          link: 'https://github.com'
        }
      ],
      certifications: ['AWS Certified Solutions Architect', 'Meta Front-End Developer Specialization'],
      resume: 'https://res.cloudinary.com/demo/image/upload/sample_resume.pdf'
    }
  },
  company: {
    _id: 'usr_company_01',
    name: 'Sarah Jenkins',
    email: 'recruiter@techpulse.io',
    role: 'company',
    phone: '+1 415 555 2671',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    accountStatus: 'active',
    companyProfile: {
      companyName: 'TechPulse Cloud Solutions',
      description: 'Next-generation cloud infrastructure orchestration and developer toolchain platform.',
      industry: 'Cloud Infrastructure & AI',
      website: 'https://techpulse.io',
      location: 'San Francisco, CA & Bengaluru, India',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
      verificationStatus: 'verified',
      contactPerson: 'Sarah Jenkins (Head of Talent Acquisition)'
    }
  },
  admin: {
    _id: 'usr_admin_01',
    name: 'InterviewIQ Chief Admin',
    email: 'admin@interviewiq.ai',
    role: 'admin',
    phone: '+1 800 555 0199',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    accountStatus: 'active'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('interviewiq_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('interviewiq_token') || null);
  const [loading, setLoading] = useState(false);

  // Set default auth headers on token change
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('interviewiq_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('interviewiq_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('interviewiq_user', JSON.stringify(user));
      localStorage.setItem('interviewiq_role', user.role);
    } else {
      localStorage.removeItem('interviewiq_user');
      localStorage.removeItem('interviewiq_role');
    }
  }, [user]);

  // ==============================================================
  // FIREBASE AUTHENTICATION HOOKS & INTEGRATION PLACEHOLDERS
  // When ready to connect to Firebase, initialize Firebase SDK:
  // import { initializeApp } from "firebase/app";
  // import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
  // const firebaseConfig = { ... };
  // const firebaseApp = initializeApp(firebaseConfig);
  // const auth = getAuth(firebaseApp);
  // ==============================================================

  // Unified login handler
  const login = async (email, password, role, customName = '') => {
    setLoading(true);
    try {
      // Attempt backend API call
      const res = await axios.post('/api/auth/login', { email, password, role, name: customName });
      if (res.data?.success && res.data?.data) {
        setUser(res.data.data.user);
        setToken(res.data.data.token);
        return { success: true, user: res.data.data.user };
      }
    } catch (err) {
      // If backend API is unreachable or in dev mode without database, verify demo accounts
      console.warn('API login failed or unavailable, checking demo credentials fallback...', err.message);
      
      const foundDemo = Object.values(DEMO_USERS).find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && (!role || u.role === role)
      );

      if (foundDemo) {
        const activeDemo = customName ? { ...foundDemo, name: customName } : foundDemo;
        setUser(activeDemo);
        const demoToken = `demo_jwt_token_${foundDemo.role}_${Date.now()}`;
        setToken(demoToken);
        return { success: true, user: activeDemo };
      }

      // If user typed custom credentials in offline/mock mode, provide friendly testing profile
      if (email && password) {
        const fallbackRole = role || 'student';
        const derivedName = customName || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        const customUser = {
          _id: `usr_${Date.now()}`,
          name: derivedName,
          email,
          role: fallbackRole,
          accountStatus: 'active',
          profileImage: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(derivedName)}`,
          ...(fallbackRole === 'student' ? { studentProfile: DEMO_USERS.student.studentProfile } : {}),
          ...(fallbackRole === 'company' ? { companyProfile: DEMO_USERS.company.companyProfile } : {})
        };
        setUser(customUser);
        setToken(`mock_token_${customUser._id}`);
        return { success: true, user: customUser };
      }

      return {
        success: false,
        message: err.response?.data?.message || 'Invalid email or password.'
      };
    } finally {
      setLoading(false);
    }
  };

  // Demo 1-click Quick Login
  const loginAsDemo = (demoRole) => {
    const demoProfile = DEMO_USERS[demoRole] || DEMO_USERS.student;
    setUser(demoProfile);
    setToken(`demo_token_${demoRole}`);
    return demoProfile;
  };

  // Student registration handler
  const registerStudent = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register/student', formData);
      if (res.data?.success) {
        setUser(res.data.data.user);
        setToken(res.data.data.token);
        return { success: true, user: res.data.data.user };
      }
    } catch (err) {
      console.warn('Backend API registration offline, falling back to local registration...', err.message);
      const newUser = {
        _id: `stu_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: 'student',
        profileImage: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name)}`,
        accountStatus: 'active',
        studentProfile: {
          college: formData.college,
          degree: formData.degree,
          branch: formData.branch,
          graduationYear: Number(formData.graduationYear),
          skills: formData.skills || [],
          projects: [],
          certifications: [],
          resume: formData.resume || null
        }
      };
      setUser(newUser);
      setToken(`jwt_demo_${newUser._id}`);
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  // Company registration handler
  const registerCompany = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register/company', formData);
      if (res.data?.success) {
        setUser(res.data.data.user);
        setToken(res.data.data.token);
        return { success: true, user: res.data.data.user };
      }
    } catch (err) {
      console.warn('Backend API company registration offline, using local mock...', err.message);
      const newCompany = {
        _id: `comp_${Date.now()}`,
        name: formData.contactPerson || formData.companyName,
        email: formData.email,
        role: 'company',
        accountStatus: 'active',
        companyProfile: {
          companyName: formData.companyName,
          description: formData.description,
          industry: formData.industry,
          website: formData.website,
          location: formData.location,
          contactPerson: formData.contactPerson,
          logo: formData.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
          verificationStatus: 'pending' // Admin must verify before publishing
        }
      };
      setUser(newCompany);
      setToken(`jwt_demo_${newCompany._id}`);
      return { success: true, user: newCompany };
    } finally {
      setLoading(false);
    }
  };

  // Profile update handler
  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('interviewiq_user', JSON.stringify(updated));
      return updated;
    });
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('interviewiq_user');
    localStorage.removeItem('interviewiq_role');
    localStorage.removeItem('interviewiq_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        loginAsDemo,
        registerStudent,
        registerCompany,
        updateProfile,
        logout,
        isAuthenticated: !!user,
        isStudent: user?.role === 'student',
        isCompany: user?.role === 'company',
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
