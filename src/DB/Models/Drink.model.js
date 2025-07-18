import { DataTypes } from "sequelize";
import {sequelize} from "../../DB/connection.js";

const Drink = sequelize.define("Drink", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  base_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM("hot", "cold"),
    allowNull: false,
  },
});

export default Drink;
