$(document).ready(function(){
	var bg = chrome.extension.getBackgroundPage();
	if(bg.target_time.length > 0){
		var str = "已设置时间 " + bg.target_time;
		$("#tip").html(str).css("color","green");
	}
	else{
		$("#tip").html("当前未设置时间").css("color","red");
	}
	//拦截按钮
	$("#msButton").click(function () {
		var input_str = $("#time").val();
		bg.set_time(input_str);
		window.close();
		return false;
    });
	//截取回车
	$(document).keydown(function(event){
		if ( event.which == 13 ) {
			var input_str = $("#time").val();
			if(input_str.length < 4)
			{
				alert('请输入时间');
			}
			else{
				bg.set_time(input_str);
				window.close();
			}
		}
	});
});