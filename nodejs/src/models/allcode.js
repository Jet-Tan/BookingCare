"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: "positionId", as: 'positionData' });
      Allcode.hasMany(models.User, { foreignKey: "gender", as: "genderData" });
      Allcode.hasMany(models.Schedule,{foreignKey:'timeType', as:'timeTypeData'});

      Allcode.hasMany(models.Doctor_Infor,{foreignKey:'priceId', as:'priceData'})
      Allcode.hasMany(models.Doctor_Infor,{foreignKey:'paymentId', as:'paymentData'})
      Allcode.hasMany(models.Doctor_Infor,{foreignKey:'provinceId', as:'provinceData'})

      Allcode.hasMany(models.Booking,{foreignKey:'timeType', as:'timeTypeDataPatient'});
    }
    
  }

  Allcode.init(
    {
      keyMap: {
        type: DataTypes.STRING,
        allowNull: false, // Example validation: Key cannot be null
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );

  return Allcode;
};
