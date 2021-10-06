const { model, Schema, Types } = require('mongoose');

const commentSchema = new Schema(
    {
        user: {
            type: Schemas.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        likes:[
            {
                type: Schemas.Types.ObjectId,
                ref: 'User'
            }
        ],
        disLikes:[
            {
                type: Schemas.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
    timestamps: true
    }
)

module.exports = model('Comment', commentSchema)