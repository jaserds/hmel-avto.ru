import { Sequelize } from "sequelize";


const sequelize = new Sequelize(
    'db_cars', 
    'root', 
    '111222333+sSs=', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
}
);

export default sequelize;