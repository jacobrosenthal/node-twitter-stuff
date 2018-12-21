// https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline.html
// note, twitter is super stingy and this code requires like 5 api requests by default, ie 1/3 of your 15 min max
// ie you can run this script as many as 3 times before youll get api limited for another 15 minutes
var Twitter = require('twitter-lite');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


var printTweetsPerDay = function(tweets){

  var byday={};
  for (var i = 0; i < tweets.length; i++) {
    var d = new Date(tweets[i]['created_at'].replace("+0000 ", "") + " UTC");
    var dateString = d.toString().substring(0,15);
    byday[dateString] = byday[dateString] || [];
    byday[dateString].push(tweets[i]);
  }

  return tweets;
}

var sortTweetsByNoisyUser = function(tweets){

  // shame its associative, but cant think of a better solution
  // https://stackoverflow.com/questions/15052702/count-unique-elements-in-array-without-sorting
  var counts = {};
  for (var i = 0; i < tweets.length; i++) {
      counts[tweets[i].user.screen_name] = 1 + (counts[tweets[i].user.screen_name] || 0);
  }

  //lets get back to an array we can sort
  var countsArray = [];
  for(var key in counts){
    countsArray.push({screen_name:key, count: counts[key]})
  }

  countsArray.sort((a,b) => b.count - a.count)

  return countsArray;
}


function getHomeTimeline( results ) {
  if(!results) {
    results = {};
  }
  if(!results.data){
    results.data = []
  }
  //"Up to 800 Tweets are obtainable on the home timeline"
  if(!results.max){
    results.max = 800;
  }

  if ( results.data.length >= results.max ) {
    return Promise.resolve(results.data);
  }

  // this is ugly but fuck it, our params are splashed into the top level object
  // but we need to get data array out of there because the get request will serialize all that
  var params = Object.assign({}, results);
  delete params['data'];

  //how many more to get
  var thisManyMore = results.max - results.data.length
  params.count = thisManyMore >= 200 ? 200 : thisManyMore;

  //from what position
  if(results.data.length){
    params.max_id = results.data[results.data.length-1].id;
  }

  return client
    .get("statuses/home_timeline", params)
    .then(function(data) {

      //sadly errors come back as an object, while results come back as an array
      if(!Array.isArray(data)){
        return Promise.reject(data);
      }

      //seems like when theyre done giving you results for any reason, it comes back an empty array
      if(data.length == 0){
        return Promise.resolve(results.data);
      }

      //add new results to old results and recursive call
      results.data = results.data.concat(data);
      return getHomeTimeline( results );
    }
  );
}

function pretty( users ) {
  return users.map(function(user){
    user.screen_name = "https://www.twitter.com/" + user.screen_name;
    return user
  });
}



getHomeTimeline()
  .then(tweets => printTweetsPerDay(tweets))
  .then(tweets => sortTweetsByNoisyUser(tweets))
  .then(users => pretty(users))
  .then(users => console.log(users.slice(0, 20)))
  .catch(console.error);
