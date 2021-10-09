const { model, Schema } = require("mongoose");

const Gameschema = new Schema(
    {
        slug: String,
        name: String,
        name_original: String,
        description: String,
        metacritic: Number,
        metacritic_platforms: [
            {
                metascore: Number,
                url: String
            }
        ],
        released: String,
        tba: true,
        updated: String,
        background_image: String,
        background_image_additional: String,
        website: String,
        rating: Number,
        rating_top: Number,
        ratings: { 
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        reactions: {},
        added: Number,
        added_by_status: {},
        playtime: Number,
        screenshots_count: Number,
        movies_count: Number,
        creators_count: Number,
        achievements_count: Number,
        parent_achievements_count: String,
        reddit_url: String,
        reddit_name: String,
        reddit_description: String,
        reddit_logo: String,
        reddit_count: Number,
        twitch_count: String,
        youtube_count: String,
        reviews_text_count: String,
        ratings_count: Number,
        suggestions_count: Number,
        alternative_names: [
            String
        ],
        metacritic_url: String,
        parents_count: Number,
        additions_count: Number,
        game_series_count: Number,
        esrb_rating: {
            id: Number,
            slug: String,
            name: String
        },
        platforms: [
            {
                platform: {
                    id: Number,
                    slug: String,
                    name: String
                },
                released_at: String,
                requirements: {
                    minimum: String,
                    recommended: String
                }
            }
        ]
    },
    {
        tymestamps: true
    }
);

module.exports = model("Game", Gameschema)
