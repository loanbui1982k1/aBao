module.exports = (sequelize, DataTypes) => {
    const Newspaper = sequelize.define(
        'Newspaper',
        {
            idNewspaper: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            idWriter: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            idCategory: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    );
    return Newspaper;
};
