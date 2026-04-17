const User = require('../model/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        res.json(await User.find());
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllUsers,
    deleteUser
 };