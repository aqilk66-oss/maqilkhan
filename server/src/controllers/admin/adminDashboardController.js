import Project from '../../models/Project.js';
import Skill from '../../models/Skill.js';
import Message from '../../models/Message.js';
import Cv from '../../models/Cv.js';
import Experience from '../../models/Experience.js';
import Education from '../../models/Education.js';
import Media from '../../models/Media.js';
import { sendSuccess } from '../../utils/apiResponse.js';

export const adminDashboardController = {
  getOverview: async (req, res, next) => {
    try {
      const [
        totalProjects,
        publishedProjects,
        totalSkills,
        totalExperiences,
        totalEducation,
        totalMedia,
        unreadMessages,
        activeCv,
      ] = await Promise.all([
        Project.countDocuments(),
        Project.countDocuments({ published: true }),
        Skill.countDocuments(),
        Experience.countDocuments(),
        Education.countDocuments(),
        Media.countDocuments(),
        Message.countDocuments({ isRead: false }),
        Cv.findOne({ isActive: true }).select('version title fileName updatedAt'),
      ]);

      const recentMessages = await Message.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email subject isRead createdAt');

      return sendSuccess(res, 200, 'Admin dashboard overview loaded.', {
        counts: {
          totalProjects,
          publishedProjects,
          draftProjects: totalProjects - publishedProjects,
          totalSkills,
          totalExperiences,
          totalEducation,
          totalMedia,
          unreadMessages,
        },
        activeCv: activeCv || null,
        recentMessages,
      });
    } catch (err) {
      next(err);
    }
  },
};

export default adminDashboardController;
