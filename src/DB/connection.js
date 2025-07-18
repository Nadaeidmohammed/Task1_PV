import Sequelize from "sequelize";

export const sequelize =new Sequelize('task1_sequelize','root','root',{
    port:3306,
    host:'localhost',
    dialect:"mysql"
});
export const connectDB=async()=>{
    try {
      await sequelize.authenticate();
        console.log("connected to DB");
        
    } catch (error) {
        console.log( `unable to connected to DB${error.message}`);
    }
};
export const syncTables=async()=>{
    try {
        await sequelize.sync();
        console.log("tables sync");
    } catch (error) {
        console.log( `unable to sync tables ${error.message}`);
    }
}