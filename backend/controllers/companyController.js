import Company from '../models/Company.js';

// @desc    Get company profile
// @route   GET /api/company/profile
// @access  Private (Company)
export const getCompanyProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const company = await Company.findOne({ userId });
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company profile not found.' });
    }
    return res.json({ success: true, data: company });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update company profile
// @route   PUT /api/company/profile
// @access  Private (Company)
export const updateCompanyProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { companyName, description, industry, website, location, contactPerson, logo } = req.body;

    const updated = await Company.findOneAndUpdate(
      { userId },
      {
        ...(companyName && { companyName }),
        ...(description !== undefined && { description }),
        ...(industry && { industry }),
        ...(website && { website }),
        ...(location && { location }),
        ...(contactPerson && { contactPerson }),
        ...(logo && { logo }),
      },
      { new: true, upsert: true }
    );

    return res.json({ success: true, message: 'Company profile updated.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
