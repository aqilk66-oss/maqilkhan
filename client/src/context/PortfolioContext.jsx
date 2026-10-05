import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import publicService from '../services/publicService';
import { VERIFIED_PROFILE, VERIFIED_SKILLS } from '../data/skillsData';
import { VERIFIED_PROJECTS } from '../data/projectsData';
import { VERIFIED_EDUCATION, VERIFIED_JOURNEY } from '../data/credibilityData';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(VERIFIED_PROFILE);
  const [skills, setSkills] = useState(VERIFIED_SKILLS);
  const [projects, setProjects] = useState(VERIFIED_PROJECTS);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState(VERIFIED_EDUCATION);
  const [activeCv, setActiveCv] = useState(null);

  const [loading, setLoading] = useState({
    profile: false,
    skills: false,
    projects: false,
    experience: false,
    education: false,
    cv: false,
  });

  const [error, setError] = useState(null);

  // Fetch all public shared data with graceful individual fallbacks
  const fetchAllPublicData = useCallback(async () => {
    // 1. Profile
    try {
      const res = await publicService.getProfile();
      if (res.data) setProfile(res.data);
    } catch (err) {
      console.warn('[PORTFOLIO-SYNC] Using local profile fallback:', err.message);
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }));
    }

    // 2. Skills
    try {
      const res = await publicService.getSkills();
      if (res.data && res.data.length > 0) setSkills(res.data);
    } catch (err) {
      console.warn('[PORTFOLIO-SYNC] Skills API fallback:', err.message);
    } finally {
      setLoading((prev) => ({ ...prev, skills: false }));
    }

    // 3. Projects
    try {
      const res = await publicService.getProjects();
      if (res.data && res.data.length > 0) setProjects(res.data);
    } catch (err) {
      console.warn('[PORTFOLIO-SYNC] Projects API fallback:', err.message);
    } finally {
      setLoading((prev) => ({ ...prev, projects: false }));
    }

    // 4. Experience
    try {
      const res = await publicService.getExperience();
      if (res.data && res.data.length > 0) setExperience(res.data);
    } catch (err) {
      console.warn('[PORTFOLIO-SYNC] Experience API fallback:', err.message);
    } finally {
      setLoading((prev) => ({ ...prev, experience: false }));
    }

    // 5. Education
    try {
      const res = await publicService.getEducation();
      if (res.data && res.data.length > 0) setEducation(res.data);
    } catch (err) {
      console.warn('[PORTFOLIO-SYNC] Education API fallback:', err.message);
    } finally {
      setLoading((prev) => ({ ...prev, education: false }));
    }

    // 6. Active CV
    try {
      const res = await publicService.getActiveCv();
      if (res.data) setActiveCv(res.data);
    } catch (err) {
      console.warn('[PORTFOLIO-SYNC] CV API fallback:', err.message);
    } finally {
      setLoading((prev) => ({ ...prev, cv: false }));
    }
  }, []);

  useEffect(() => {
    fetchAllPublicData();
  }, [fetchAllPublicData]);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        projects,
        experience,
        education,
        activeCv,
        loading,
        error,
        refetchAll: fetchAllPublicData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export default PortfolioContext;
