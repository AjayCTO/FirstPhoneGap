//Initialize function
var init = function () {
	// TODO:: Do your initialization job
	console.log("init() called");

	// add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back")
			tizen.application.getCurrentApplication().exit();
	});
};
$(document).bind('pageinit', init);

function decodeBarcode() {
    debugger;
	var c = document.createElement("canvas");
	var ctx = c.getContext("2d");
	var img = document.getElementById("Image");
	c.height = 480;
	c.width = 640;
	var workerCount = 0;
	var ResultOfDecoding = document.getElementById("Result");
	function receiveMessage(e) {
	    debugger;
		if (e.data.success === "log") {
			console.log(e.data.result);
			return;
		}
		workerCount--;
		if (e.data.success) {
			var tempArray = e.data.result;
			for ( var i = 0; i < tempArray.length; i++) {
				if (resultArray.indexOf(tempArray[i]) == -1) {
					resultArray.push(tempArray[i]);
				}
			}
			ResultOfDecoding.innerHTML = resultArray.join("<br />");
			workerCount = 0;
		} else {
			if (workerCount == 1) {
				FlipWorker.postMessage({
					pixels : ctx.getImageData(0, 0, c.width,
							c.height).data,
							cmd : "flip"
				});
			}
		}
		if (workerCount == 0) {
			if (resultArray.length === 0) {
				ResultOfDecoding.innerHTML = "Decoding failed.";
			} else {
				ResultOfDecoding.innerHTML = resultArray.join("<br/>");
			}
		}
	}

	debugger;
	var DecodeWorker = new Worker("./js/DecoderWorker.js");
	DecodeWorker.onmessage = receiveMessage;
	var FlipWorker = new Worker("./js/DecoderWorker.js");
	FlipWorker.onmessage = receiveMessage;
	var resultArray = [];
	if (workerCount > 0){
		return;
	}
	workerCount = 2;
	ResultOfDecoding.innerHTML = '';
	resultArray = [];
	ctx.drawImage(img, 0, 0, c.width, c.height);
	DecodeWorker.postMessage({
		pixels : ctx.getImageData(0, 0, c.width,
				c.height).data,
				cmd : "normal"
	});

}