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
                type: DataTypes.STRING,
                allowNull: false,
            },
            writer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nameCategory: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
    return Newspaper;
};
