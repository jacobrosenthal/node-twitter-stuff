// https://developer.twitter.com/en/docs/accounts-and-users/follow-search-get-users/api-reference/get-users-lookup
// note, twitter is super stingy and this code requires multiple api requests by default
// ie you can run this script only a few times before youll get api limited for another 15 minutes

var Twitter = require('twitter-lite');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// user.location is user defined, so total mess
// user MAY come with current_status which is last tweet which MAY have geo, coordinates, place
var filterGeo = function(users){
    locations = {};
    for (var i = 0; i < users.length; i++) {
      var user = {  };
      if(users[i].location){
        user.location = users[i].location
      }
      if(users[i].status){
        if(users[i].status.geo)
        user.geo = users[i].status.geo;
        if(users[i].status.place)
        user.place = users[i].status.place;
        if(users[i].status.coordinates)
        user.coordinates = users[i].status.coordinates;
      }
      if(Object.keys( user ).length>0)
      locations[users[i].screen_name] = user;
    }
    return locations;
}

function getAllFriends( results ) {
  if(!results){
    results = { users:[] };    
  }

  if(!Array.isArray(results.users)){
    results.users = [];
  }

  if ( results.next_cursor === 0 ) {
    return Promise.resolve(results.users);
  }

  // this is ugly but fuck it, our params are splashed into the top level object
  // but we need to get data array out of there because the get request will serialize all that
  var params = Object.assign({}, results);
  delete params['users'];
  params.count = 200; // can only get 200 at a time
  params.cursor = results.next_cursor ? results.next_cursor : -1

  return client
    .get("friends/list", params)
    .then(function(data) {
      //add new results to old results and recursive call
      results.users = results.users.concat(data.users)
      results.next_cursor = data.next_cursor
      return getAllFriends( results );
    }
  );
}

getAllFriends({screen_name: 'jacobrosenthal'})
  .then(users => filterGeo(users))
  .then(console.log)
  .catch(console.error);

