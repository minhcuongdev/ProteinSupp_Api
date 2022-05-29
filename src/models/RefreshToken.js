import  mongoose  from "mongoose";
const { Schema } = mongoose

const RefreshTokenSchema = new Schema({
    refreshToken: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema)

export default RefreshToken