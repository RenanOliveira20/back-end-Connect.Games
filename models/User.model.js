
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
        ]

    },
    {
        tymestamps: true
    }
);
module.exports = model('User', userSchema)
