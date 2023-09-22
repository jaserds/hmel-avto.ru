import { DataTypes } from "sequelize";
import db from "../db.js"


const brand = db.define(
    'brand', 
    {
        BrandID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        BrandName: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
      },
      {
        tableName: 'brand',
        timestamps: false,
      }
)

export default brand;