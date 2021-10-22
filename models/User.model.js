
const { model, Schema } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            unique: true,
            type: String,
            required: true
        },
        password: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String,
            unique: true
        },
        profilePicture: String,
        profileCover:String,
        biography: String,
        posts: [],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        favoriteGames: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Game'
            }
        ],
        profilePicture: String,
        
    },
    {
        tymestamps: true
    }
);
module.exports = model('User', userSchema)
