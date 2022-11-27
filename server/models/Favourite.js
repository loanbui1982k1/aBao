module.exports = (sequelize, DataTypes) => {
    const Favourite = sequelize.define(
        'Favourite',
        {
            idUser: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            idNewspaper: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
    return Favourite;
};
