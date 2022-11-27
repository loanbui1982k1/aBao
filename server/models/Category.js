module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
        {
            idCategory: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            nameCategory: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
    return Category;
};
