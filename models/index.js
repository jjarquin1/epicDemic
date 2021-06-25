const User = require('./users');
const Class = require('./gameClasses');
const Profile = require('./profile');

User.hasOne(Profile, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Profile.belongsTo(User, {
    foreignkey: 'user_id', 
});

module.exports = {User, Profile}; 