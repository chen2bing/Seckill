var target_time = '';
var ms_flag = false;
function set_time(input_str){
	//校验字符串
	if(input_str.length == 5 && (input_str.substr(2,1) == ':' || input_str.substr(2,1) == '：')){
		//校验小时和分钟
		set_hour = parseInt(input_str.substr(0,2));
		set_min = parseInt(input_str.substr(3,2));
		const current_time = new Date();
		const current_hour = current_time.getHours();
		const current_min = current_time.getMinutes();
		if(set_hour <= current_hour && set_min <= current_min){
			alert('输入的时间应大于当前时间');
		}
		else if(set_hour >= 0 && set_hour <= 23 && set_min >= 0 && set_min <=59){
			//设置目标时间
			target_time = input_str;
			ms_flag = true;
			alert('成功设置时间：'+ input_str + '\n等待秒杀中...');
			chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
				chrome.tabs.reload(arrayOfTabs[0].id);
			});
		}
		else{
			alert('时间格式错误，请重新输入');
		}
	}
	else{
		alert('格式错误，请重新输入\n举例(13点05分)：13:05');
	}
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	var response_str = '';
	if(request.greeting == 'is_true')
	{
		if(ms_flag == true && target_time.length > 0){
			response_str = target_time;
		}
		else{
			response_str = 'false';
		}
	}
	sendResponse(response_str);
});