/*
 * TwitterBox jQuery plugin 
 * Version: 1.0
 *
 * Written by Michael Smith - http://spokefire.co.uk
 */
 
(function($) {
	$.fn.twitterbox = function(settings) {
		var config = {
			'screen_name': false,
			'disableAnywhereIntegration': false,
			'disableAnywhereHoverCards': false,
			'disableAnywhereFollowMeButton': false,
			'count': 5,
			'urls': {
				'api': 'http://api.twitter.com/1',
				'user_timeline': '/statuses/user_timeline.json'
			}
		};

		if (typeof(settings) == 'string') {
			config.screen_name = settings;
		}
		else if (typeof(settings) == 'object') {
			$.extend(config, settings);
		}
		
		if (!config.screen_name) {
			alert('Required config setting "screen_name" not passed to jQuery twitterbox plugin.');
			return this;
		}
		
		this.each(function() {
			var self = this;
			
			$(self).html('<p>Retrieving tweets&hellip;</p>');
			
			$.ajax({
				url: config.urls.api + config.urls.user_timeline,
				data: {
					screen_name: config.screen_name,
					count: config.count
				},
				dataType: 'jsonp',
				success: function(data, textStatus, XMLHttpRequest) {
					$(self).empty();
					if (data) {
						$.each(data, function(k,d) {
								// Wrap the links with <a> tags
							var tweet = d.text.replace(/(http:\/\/[^ \n\r]+)/gi, "<a href=\"$1\">$1</a>");
							
							$(self).append('<p class="twitterbox-tweet"><span class="twitterbox-tweet-text">@'+ d.user.screen_name +': '+ tweet +'</span> <span class="twitterbox-tweet-time"> '+ $.twitterbox.getTimeAgo(d.created_at) +'</span></p>');
						});

						if (!config.disableAnywhereIntegration && (typeof(twttr) == 'object')) {
							twttr.anywhere(function (T) {
								if (!config.disableAnywhereHoverCards) T.hovercards();
								if (!config.disableAnywhereFollowMeButton) {
									$(self).append('<span class="twitterbox-follow-me"></span>');									
									T(".twitterbox-follow-me").followButton(config.screen_name);
								}
							});
						}
					}
					else {
						$(self).html('<p>Unable to retrieve tweets.</p>');
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$(self).html('<p>Unable to retrieve tweets.</p>');
				}
			});
		});
		
		return this;
	};
	
	$.twitterbox = {
		getTimeAgo: function(createdAt) {
			var cDate = new Date();
			var tDate = new Date(createdAt)
			var diff = Math.round((cDate.getTime() - tDate.getTime()) / 1000); // Divide by 1000 to get seconds instead of miliseconds
			
			var rStr = '';
			
			if (diff < 1)										rStr = 'Less then a second ago.';
			else if ((diff >= 1) && (diff < 60))				rStr = 'About '+ diff +' seconds ago.';
			else if ((diff >= 60) && (diff < 120))				rStr = 'About a minute ago.';
			else if ((diff >= 120) && (diff < 3600))			rStr = 'About '+ Math.floor(diff / 60) +' minutes ago.';
			else if ((diff >= 3600) && (diff < 7200))			rStr = 'About an hour ago.';
			else if ((diff >= 7200) && (diff < 86400))			rStr = 'About '+ Math.floor(diff / 60 / 60) +' hours ago.';
			else if ((diff >= 86400) && (diff < 172800))		rStr = 'About '+ Math.floor(diff / 60 / 60 / 24) +' day ago.';
			else if ((diff >= 172800) && (diff < 604800))		rStr = 'About '+ Math.floor(diff / 60 / 60 / 24) +' days ago.';
			else if ((diff >= 604800) && (diff < 1209600))		rStr = 'About '+ Math.floor(diff / 60 / 60 / 24 / 7) +' week ago.';
			else if ((diff >= 1209600) && (diff < 31449600))	rStr = 'About '+ Math.floor(diff / 60 / 60 / 24 / 7) +' weeks ago.';
			else												rStr = 'More than a year ago.';
			
			return rStr;
		}
	};
})(jQuery);