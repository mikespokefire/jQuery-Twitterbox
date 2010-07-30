
# How to use

## Get started with default options

	$("#selector").twitterbox('twitter_username');

Replace twitter_username with the username of the tweet stream you want.

## Specifying options

	$("#selector").twitterbox({
		screen_name: false,
		disableAnywhereIntegration: false,
		disableAnywhereHoverCards: false,
		disableAnywhereFollowMeButton: false,
		count: 5,
	});

* screen_name = The twitter username of the tweet stream you want.
* disableAnywhereIntegration = Fully disable automatic @Anywhere integration
* disableAnywhereHoverCards = Disable automatic @Anywhere Hover cards
* disableAnywhereFollowMeButton = Disable automatic @Anywhere follow me button
* count = The number of Tweets you want to display
