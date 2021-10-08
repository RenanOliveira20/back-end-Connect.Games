const { model, Schema } = require ("mongoose");

const Postschema = new Schema(
    {
        text: String,
        imageUrl: String,
        userID: {
            type: Schema.Types.ObjectId,
            ref: "User"  
        },
        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        like: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        deslike: [
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