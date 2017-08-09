/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_opcdata', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    tagName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timer: {
      type: DataTypes.DATE,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'tb_opcdata'
  });
};
