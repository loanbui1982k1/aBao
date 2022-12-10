module.exports = (sequelize, DataTypes) => {
  const Newspaper = sequelize.define(
    'Newspaper',
    {
      idNewspaper: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING(10000),
        allowNull: false,
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nameCategory: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return Newspaper;
};
