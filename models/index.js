const User = require('./users');
const Class = require('./gameClasses')

User.hasOne(Class, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Class.belongsTo(User, {
    foreignkey: 'user_id', 
})

module.exports = {User, Class}; 