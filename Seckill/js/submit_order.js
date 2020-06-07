
chrome.runtime.sendMessage({greeting: 'is_true'}, function(response) {
	if(response !== "false"){
		var submit_button = document.getElementsByClassName('go-btn')[0];
		submit_button.click();
	}
});
