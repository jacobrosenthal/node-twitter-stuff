// https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
// note, twitter is super stingy and this code requires many api requests
// Important notice: On June 19, 2019, we began enforcing a limit of 100,000
// requests per day to the /statuses/user_timeline endpoint, in addition to
// existing user-level and app-level rate limits. This limit is applied on a
// per-application basis, meaning that a single developer app can make up to
// 100,000 calls during any single 24-hour period. This method can only return
// up to 3,200 of a user's most recent Tweets. Native retweets of other statuses
// by the user is included in this total, regardless of whether include_rts is
// set to false when requesting this resource.

var Twitter = require('twitter-lite');


var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});



function getAllAvaiableTweets(results) {

    //if not called recursively, ie the first call with no config, set up the state object
    if (!results) {
        results = {};
    }
    if (!results.data) {
        results.data = []
    }
    //"Up to 3200 Tweets are obtainable on the home timeline"
    if (!results.max) {
        results.max = 3200;
    }


    // this is ugly but fuck it, our params are splashed into the top level object
    // but we need to get data array out of there because the get request will serialize all that
    var params = Object.assign({}, results);
    //dont send the data from last request back to server...
    delete params['data'];

    //how many more to get
    var thisManyMore = results.max - results.data.length
    params.count = thisManyMore >= 10 ? 10 : thisManyMore;

    //from what position
    //Returns results with an ID less than (that is, older than) or equal to the specified ID.
    if (results.data.length) {
        params.max_id = results.data[results.data.length - 1].id - 1;
    }

    return client
        .get("statuses/user_timeline", params)
        .then(function (data) {


            let debufer = data.map(function (tweet) {
                return { "text": tweet.text, "max_id": tweet.id }
            });

            //the natural exit
            //it seems like when theyre done giving you results for any reason, it comes back an empty array
            if (data.length == 0) {
                return Promise.resolve(results.data);
            }


            results.data = results.data.concat(data);
            return getAllAvaiableTweets(results);
        }
        );
}


var filterTweets = function (tweets) {

    return tweets.map(function (tweet) {
        return tweet.text
    });

}


getAllAvaiableTweets({ screen_name: 'jacobrosenthal' })
    .then(tweets => filterTweets(tweets))
    .then(console.log)
    .catch(console.error);


