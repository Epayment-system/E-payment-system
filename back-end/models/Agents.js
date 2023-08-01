module.exports=(Sequelize,DataTypes)=>{
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
            type: DataTypes.STRING,
            allowNUll:false
        }


    })
    return Agents
}