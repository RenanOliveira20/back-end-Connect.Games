const { model, Schema} = require('mongoose');

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: 
        {
            type: String, required: true
        },
        likes:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        disLikes:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
    timestamps: true
    }
)

module.exports = model('Comment', commentSchema)