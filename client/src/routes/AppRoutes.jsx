import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages (Direct / Lazy for optimal initial paint)
import HomePage from '../pages/public/HomePage';
const ProjectsPage = lazy(() => import('../pages/public/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('../pages/public/ProjectDetailPage'));
const ExperiencePage = lazy(() => import('../pages/public/ExperiencePage'));
const EducationPage = lazy(() => import('../pages/public/EducationPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));
const ResumePage = lazy(() => import('../pages/public/ResumePage'));

// Public pages exported from PublicPages.jsx
const AboutPage = lazy(() =>
  import('../pages/public/PublicPages').then((module) => ({ default: module.AboutPage }))
);
const SkillsPage = lazy(() =>
  import('../pages/public/PublicPages').then((module) => ({ default: module.SkillsPage }))
);
const NotFoundPage = lazy(() =>
  import('../pages/public/PublicPages').then((module) => ({ default: module.NotFoundPage }))
);

// Admin CMS Pages (Fully lazy-loaded to keep admin bundle out of public initial payload)
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const LoginPage = lazy(() => import('../pages/admin/LoginPage'));
const DashboardOverviewPage = lazy(() => import('../pages/admin/DashboardOverviewPage'));
const ProfileManagerPage = lazy(() => import('../pages/admin/ProfileManagerPage'));
const ProjectsListPage = lazy(() => import('../pages/admin/ProjectsListPage'));
const ProjectEditorPage = lazy(() => import('../pages/admin/ProjectEditorPage'));
const SkillsManagerPage = lazy(() => import('../pages/admin/SkillsManagerPage'));
const ExperienceManagerPage = lazy(() => import('../pages/admin/ExperienceManagerPage'));
const EducationManagerPage = lazy(() => import('../pages/admin/EducationManagerPage'));
const CvManagerPage = lazy(() => import('../pages/admin/CvManagerPage'));
const MediaLibraryPage = lazy(() => import('../pages/admin/MediaLibraryPage'));
const MessagesInboxPage = lazy(() => import('../pages/admin/MessagesInboxPage'));
const SystemSettingsPage = lazy(() => import('../pages/admin/SystemSettingsPage'));

// Route Suspense Loading Fallback
const RouteSuspenseFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center bg-navy-950 font-mono text-xs text-electric-cyan">
    <div className="w-5 h-5 border-2 border-electric-cyan/20 border-t-electric-cyan rounded-full animate-spin mr-2.5" />
    <span>Loading resource...</span>
  </div>
);

export const AppRoutes = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <Suspense fallback={<RouteSuspenseFallback />}>
      <Routes>
        {/* Public Portfolio Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected Admin CMS Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardOverviewPage />} />
            <Route path="profile" element={<ProfileManagerPage />} />
            <Route path="projects" element={<ProjectsListPage />} />
            <Route path="projects/new" element={<ProjectEditorPage />} />
            <Route path="projects/:id/edit" element={<ProjectEditorPage />} />
            <Route path="skills" element={<SkillsManagerPage />} />
            <Route path="experience" element={<ExperienceManagerPage />} />
            <Route path="education" element={<EducationManagerPage />} />
            <Route path="cv" element={<CvManagerPage />} />
            <Route path="media" element={<MediaLibraryPage />} />
            <Route path="contact" element={<ProfileManagerPage />} />
            <Route path="messages" element={<MessagesInboxPage />} />
            <Route path="settings" element={<SystemSettingsPage />} />
          </Route>
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
