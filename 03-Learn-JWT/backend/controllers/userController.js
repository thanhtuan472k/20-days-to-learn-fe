const User = require('../models/User');

const userController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find({});
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json('Delete Success');
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = userController;
