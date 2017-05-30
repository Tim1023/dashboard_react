const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    ProfileID: String,
    DisplayName: String,
    RoleName: String,
    AccessToken: String,
    RefreshToken: String,
    Domain: String,
    TokenType: String,
    Avatar: String,
    ExpiresIn: String,
    DefaultMerchantID: String
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
