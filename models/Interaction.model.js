const { model, Schema } = require ("mongoose");

const InteractionSchema = new Schema(
    {
        comment: [
            {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        },
    ],
        User: {
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        game: {
            type: Schema.Types.ObjectId,
            ref: "Game"
        },
        rating: Number,
        favotite: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },

    {
        timestamps: true,
      },
);
