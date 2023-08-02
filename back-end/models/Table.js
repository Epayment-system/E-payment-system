module.exports=(sequelize,DataTypes)=>{
    const Agents = Sequelize.define("Agents",{
        agentID:{
            type: DataTypes.INTEGER,
            allowNUll:false,
            primarykey: true,
        },

        agentName:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        agentEmail:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        contactInfo:{
            type: DataType.STRING,
            allowNUll:false
        }


    })
    return Agents;
}

module.exports=(sequelize,DataTypes)=>{
const ServiceProvider= sequelize.define("service_Provider",{
    ServiceProvider_id:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
ServiceProvider_name:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
ServiceProvider_description:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
ServiceProvider_contact:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});
return ServiceProvider;
}

module.exports=(sequelize,DataTypes)=>{
    const Role = Sequelize.define("Role",{
        roleID:{
            type: DataTypes.INTEGER,
            allowNUll:false,
            primarykey: true,
        },

        roleName:{
            type: DataTypes.STRING,
            allowNUll:false
            unique:true
        }
    })
    return Role;
};
