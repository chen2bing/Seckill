var target_time = 0;
chrome.runtime.sendMessage({greeting: 'is_true'}, function(response) {
	if(response !== "false"){
		var input_str = response;
		//设置目标时间
		const set_date = new Date();
		const set_year = set_date.getFullYear();
		const set_month = set_date.getMonth();
		const set_day = set_date.getDate();
		const set_hour = parseInt(input_str.substr(0,2));
		const set_min = parseInt(input_str.substr(3,2));
		target_time = new Date(set_year, set_month, set_day, set_hour, set_min, 0);
		//检测是否过时
		var current_time = new Date();
		if(target_time <= current_time){
			return;
		}
		
		//每5s检查一次
		check_time();
		var check_time_per_period = setInterval(function(){ check_time() }, 5000);
		//检查时间
		function check_time(){
			current_time = new Date();
			var time_dif = parseInt((target_time - current_time) / 1000);
			//获取购买按钮
			var buy_button = document.getElementById('J_Go');
			//如果时间小于5s，开始准备秒杀
			if(time_dif <= 5){
				//关闭定期检查
				clearInterval(check_time_per_period);
				//准备秒杀
				current_time = new Date();
				while(current_time <= target_time)
					current_time = new Date();
				buy_button.click();
			}
			//否则输出还剩多长时间
			else{
				var hour_dif = Math.floor(time_dif / 3600);
				var min_dif = Math.floor((time_dif - hour_dif * 3600) / 60);
				var sec_dif = time_dif - hour_dif * 3600 - min_dif * 60;
				console.log('离秒杀开始还有' + hour_dif + '小时' + min_dif + '分' + sec_dif + '秒');
			}
		}
	}
});