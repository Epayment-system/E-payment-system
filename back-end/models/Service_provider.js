module.exports = (sequelize, DataTypes) => {
    const service_provider = sequelize.define("service_provider", {
        services_provider_id:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service_provider_name:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service_provider_description:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service_provider_contact:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });
    return service_provider;
};