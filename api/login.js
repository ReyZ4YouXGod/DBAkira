const mongoose = require('mongoose');
const URI = "mongodb+srv://Reyz4You:Reyz4YouDev@cluster0.fuqnnfe.mongodb.net/reyz_db?appName=Cluster0";

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    username: String, pass: String, role: String
}, { collection: 'users' }));

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    try {
        await mongoose.connect(URI);
        const { username, pass } = req.body;
        const user = await User.findOne({ username, pass });
        if (user) {
            res.status(200).json({ success: true, username: user.username, role: user.role });
        } else {
            res.status(401).json({ success: false });
        }
    } catch (e) { res.status(500).json({ error: e.message }); }
}
