node-twitter-stuff
------------------

Just a dump of scripts I run occasionally to utilize my twitter data. 

Noisy helps me slow down my twitter feed when its feeling noisy. It fetches your [https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline.html](Home Timeline) which twitter defines as "Returns a collection of the most recent Tweets and Retweets posted by the authenticating user and the users they follow." Presumably then you could unfollow some of the more noisy actors. Note: "Up to 800 Tweets are obtainable on the home timeline" so this is only accurate up to that far back, ie if you get a couple hundred tweets a day, this is only telling you the noisiest over the last few days tops.

Also note, the twitter api is incredibly stingy and getting 800 tweets requires ~5 api requests which is 1/3 of your allowable requests within the 15 minute window so don't be suprised if you run this two or three times and it blocks you for a bit


install with
```
npm i
```

call like this
```
TWITTER_CONSUMER_KEY="yourconumserkey" TWITTER_CONSUMER_SECRET="yourconsumersecret" TWITTER_ACCESS_TOKEN_KEY="youracesstoken" TWITTER_ACCESS_TOKEN_SECRET="youraccesssecret" node noisy.js
[ { screen_name: 'bruces', count: 43 },
  { screen_name: 'BrendanEich', count: 42 },
  { screen_name: 'qrs', count: 40 },
  { screen_name: 'TychoBrahe', count: 27 },
  { screen_name: 'warrenellis', count: 22 },
  { screen_name: 'retrohack3r', count: 22 },
  { screen_name: 'BKStreetArt', count: 21 },
  { screen_name: 'oe1cxw', count: 18 },
  { screen_name: 'pfrazee', count: 16 },
  { screen_name: 'loremgibson', count: 15 },
  { screen_name: 'davidcrummey', count: 15 },
  { screen_name: 'cwgabriel', count: 15 },
  { screen_name: 'travisgoodspeed', count: 13 },
  { screen_name: 'Stefania_druga', count: 13 },
  { screen_name: 'longnow', count: 13 },
  { screen_name: 'Chris_Gammell', count: 13 },
  { screen_name: 'PhxDowntowner', count: 12 },
  { screen_name: 'techieshark', count: 12 },
  { screen_name: 'einball', count: 11 },
  { screen_name: 'VitalikButerin', count: 11 } ]

```

