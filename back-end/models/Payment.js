module.exports = (sequelize, DataTypes) => {
    const payment = sequelize.define("payment", {
        paymentID:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paymentDate:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        referenceNumber:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });
    return payment;
};