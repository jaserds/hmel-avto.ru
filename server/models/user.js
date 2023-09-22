import { DataTypes } from "sequelize";
import db from "../db.js"

 const Users = db.define(
        'User', 
        {
            login: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            hashedPassword: {
                type: DataTypes.STRING(64),
                is: /^[0-9a-f]{64}$/i,
            }
          },
          {
            tableName: 'Users',
            timestamps: false,
          }
    )
  
  export default Users;