const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    nickname: {type: DataTypes.STRING, defaultValue: ""}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // Pass the id's of the devices here. E.G: ["5", "1", "167", "76"]
    items: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER},
    message: {type: DataTypes.TEXT}
})

const BasketItem = sequelize.define('basketItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    item: {type: DataTypes.JSON, allowNull: false}
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.TEXT('long')},
    // In the info field you can only pass JSON encoded objects. E.G: "{name: "CPU", "value": "14"}"
    info: {type: DataTypes.TEXT, defaultValue: "[]"}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

module.exports = {
    User,
    Basket,
    Device,
    Type,
    Brand,
    Rating,
    BasketItem
}