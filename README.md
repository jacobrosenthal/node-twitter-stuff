node-twitter-stuff
------------------

Just a dump of scripts I run occasionally to utilize my twitter data. 

Uses [twitter-lite](https://github.com/Preposterous/twitter-lite) under the hood. See their readme to set up twitter api access and retreive all four credentials you need. 

Noisy helps me slow down my twitter feed when its feeling noisy. It fetches your [Home Timeline](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline.html) which twitter defines as "Returns a collection of the most recent Tweets and Retweets posted by the authenticating user and the users they follow." Presumably then you could (manually) unfollow some of the more noisy actors. Note: "Up to 800 Tweets are obtainable on the home timeline" so this is only accurate up to that far back, ie if you get a couple hundred tweets a day, this is only telling you the noisiest over the last few days tops.

Also note, the twitter api is incredibly stingy and getting 800 tweets requires ~5 api requests which is 1/3 of your allowable requests within the 15 minute window so don't be suprised if you run this two or three times and it blocks you for a bit.


Install with
```
npm i
```

Call like this:
```
TWITTER_CONSUMER_KEY="yourconumserkey" TWITTER_CONSUMER_SECRET="yourconsumersecret" TWITTER_ACCESS_TOKEN_KEY="youracesstoken" TWITTER_ACCESS_TOKEN_SECRET="youraccesssecret" node noisy.js
[ { screen_name: 'https://www.twitter.com/rustlang', count: 47 },
  { screen_name: 'https://www.twitter.com/esden', count: 21 },
  { screen_name: 'https://www.twitter.com/loremgibson',
    count: 18 },
  { screen_name: 'https://www.twitter.com/Chris_Gammell',
    count: 18 },
  { screen_name: 'https://www.twitter.com/longnow', count: 18 },
  { screen_name: 'https://www.twitter.com/pfrazee', count: 16 },
  { screen_name: 'https://www.twitter.com/heatsynclabs',
    count: 16 },
  { screen_name: 'https://www.twitter.com/VitalikButerin',
    count: 14 },
  { screen_name: 'https://www.twitter.com/samrocksc', count: 14 },
  { screen_name: 'https://www.twitter.com/mbeddedartistry',
    count: 14 },
  { screen_name: 'https://www.twitter.com/lessig', count: 13 },
  { screen_name: 'https://www.twitter.com/todbot', count: 12 },
  { screen_name: 'https://www.twitter.com/BKStreetArt',
    count: 12 },
  { screen_name: 'https://www.twitter.com/bitshiftmask',
    count: 12 },
  { screen_name: 'https://www.twitter.com/ashponders', count: 11 },
  { screen_name: 'https://www.twitter.com/petewarden', count: 11 },
  { screen_name: 'https://www.twitter.com/travisgoodspeed',
    count: 11 },
  { screen_name: 'https://www.twitter.com/retrohack3r',
    count: 10 },
  { screen_name: 'https://www.twitter.com/oe1cxw', count: 10 },
  { screen_name: 'https://www.twitter.com/davidcrummey',
    count: 10 } ]
```
