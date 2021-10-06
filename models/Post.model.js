const { model, Schema } = require ("Mongoose");

const Postschema = new Schema(
    {
        text: String,
        imageUrl: String,
        userID: {
            type: Schema.Types.ObjeticId,
            ref: "User"  
        },
        comment: [
            {
                type: Schema.Types.ObjeticId,
                ref: "Comment"
            }
        ],
        like: [
            {
                type: Schema.Types.ObjeticId,
                ref: "User"
            }
        ],
        deslike: [
            {
                type: Schema.Types.ObjeticId,
                ref: "User"
            }
        ]
    },

{
    tymestamps: true
}
);

module.exports = model ("Post", Postschema)