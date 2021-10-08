const { model, Schema } = require ('mongoose');

const Postschema = new Schema(
    {
        text: String,
        imageUrl: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"  
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        deslikes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },

{
    tymestamps: true
}
);

module.exports = model ("Post", Postschema)