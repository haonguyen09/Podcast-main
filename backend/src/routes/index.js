const UserRouter = require('./UserRouter')
const PodcastRouter = require('./PodcastRouter')
const TopicRouter = require('./TopicRouter')
const CommentRouter = require('./CommentRouter')
const TeamRouter = require('./TeamRouter')
const FollowerRouter = require('./FollowerRouter')
const FollowingRouter = require('./FollowingRouter')
const SuggestFollowRouter = require('./SuggestFollowRouter')
const RateRouter = require('./RateRouter')
const PlaylistRouter = require('./PlaylistRouter')
const LikeRouter = require('./LikeRouter')

const routes = (app) => {
    app.use("/api/user", UserRouter)
    app.use("/api/podcast", PodcastRouter)
    app.use("/api/topic", TopicRouter)
    app.use("/api/comment", CommentRouter)
    app.use("/api/team", TeamRouter)
    app.use("/api/follower", FollowerRouter)
    app.use("/api/following", FollowingRouter)
    app.use("/api/suggestFollow", SuggestFollowRouter)
    app.use("/api/rate", RateRouter)
    app.use("/api/like", LikeRouter)
    app.use("/api/playlist", PlaylistRouter)
}

module.exports = routes