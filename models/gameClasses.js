const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Class extends Model { }

Class.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // look back to possibly change to boolean for game logic?
        Affinity: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'class',
    }
);

module.exports = Class;