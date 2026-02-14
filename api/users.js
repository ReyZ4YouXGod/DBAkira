const mongoose = require('mongoose');
const URI = "mongodb+srv://Reyz4You:Reyz4YouDev@cluster0.fuqnnfe.mongodb.net/reyz_db?appName=Cluster0";

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    username: String, pass: String, role: String
}, { collection: 'users' }));

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    try {
        await mongoose.connect(URI);
        const { username, pass, role } = req.body;
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ message: 'Exist' });
        const newUser = new User({ username, pass, role: role || 'Reseller' });
        await newUser.save();
        res.status(200).json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
}
