var VideoListener = {

	duration_video_sec: null,
	all_time_playing: 0,
	video_src: document.getElementById('video_src'),
	//	base_url: 'https://www.youtube.com/watch?v=JSd00naB4Sw&id=291702',


	// methods 
	sleepFor: function (sleepDuration) {
		var now = new Date().getTime();
		while (new Date().getTime() < now + sleepDuration) {}
	},

	listener_for_video: function (url) {
		console.log('url in listener', url);
		console.log('duration video is ', duration_video_sec);
		//		console.log(this);
		//		console.log(url);/
		if (video_src.play) {
			VideoListener.all_time_playing++;
			VideoListener.sleepFor(1000);
			console.log(VideoListener.all_time_playing);
		}
		if (VideoListener.all_time_playing >= duration_video_sec) { // change 10  to duration_video_sec
			var request = new XMLHttpRequest();
			request.open('GET', url);
			request.onreadystatechange = function () {
				if (this.readyState === 4) {
					console.log('Status:', this.status);
					console.log('Headers:', this.getAllResponseHeaders());
					console.log('Body:', this.responseText);
				}
			};
			request.send();
			//			this.removeListener(this);
		}
	},

	removeListener: function (obj) {
		obj.removeEventListen('timeupdate', this.listener_for_video, false);
	},

	addListener: function (url) {
		video_src.addEventListener('loadedmetadata', function () {
			duration_video_sec = video_src.duration * 0.15;
		});
		video_src.addEventListener('timeupdate', function () {
			VideoListener.listener_for_video(url)
		}, false);
	},

	init: function () {
		//		console.log('asdas');
		var current_url = window.location.href;
		//		var url_for_api_bot  = 'https://api.pipe.bot/user/121319?apikey=7f502b1a984a6a7f7c9a968a0c6b638c&statusVideo1=done'
		var index_id = current_url.indexOf('id=');
		var id = current_url.substr(index_id + 3);

		//		console.log(window.location.href);
		//		console.log(index_id);
		var url_for_api_bot = 'https://api.pipe.bot/user/' + id + '?apikey=f20a6fc8576ba9d14bb4e3c9d984a2d6&statusVideo2=done';
		//		console.log('id' , id);
		console.log('url for bot', url_for_api_bot);


		this.addListener(url_for_api_bot);
	}

};

VideoListener.init();
