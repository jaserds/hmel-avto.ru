import { DataTypes } from "sequelize";
import db from "../db.js"


const models = db.define(
    'models', 
    {
        ModelID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        ModelName: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        BrandID: {
            type: DataTypes.INTEGER ,
            allowNull: true,
        }
      },
      {
        tableName: 'models',
        timestamps: false,
      }
)


export default models;