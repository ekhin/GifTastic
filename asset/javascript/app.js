$(document).ready(function(){
var topics = ['dog', 'cat', 'rabbit', 'monkey', 'hamster', 'goldfish', 'turtle', 'chicken', 'frog', 'goat', 'crab', 'tiger', 'lion', 'elephant', 'snake', 'pig',
'horse', 'rat', 'spider', 'giraffe', 'alligator', 'starfish', 'cow', 'sheep', 'dinosaur', 'sea urchin', 'snail', 'jellyfish', 'butterfly', 'shark', 'zebra', 'lobster',
'ant', 'leopard', 'penguin', 'polar bear', 'wolf'];

function createInitialButton(){
	
	topics.forEach(function(value, index){
		var button = $('<button id="topicData" class="button" data="'+value+'">').text(value);
		$('#topics').append(button);
	});
}

function renderButtons() {
	$("#topics").empty();
	for (var i = 0; i < topics.length; i++) {
		var a = $('<button id="topicData" class="button" data="'+topics[i]+'">');
		a.addClass("gif-btn");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);
		$("#topics").append(a);
	}
}
$("#add-gif").on("click", function(event){
	event.preventDefault();
    var gif = $("#gif-input").val().trim();
        topics.push(gif);
        renderButtons();
});

createInitialButton();

function loadImages(item){

	$.ajax({
		url: 'https://api.giphy.com/v1/gifs/search?q=' + item +'&limit=10&api_key=e53VaSsk9eBoNVZS8pxhkoxBzcxCb1K4', 
		method : "GET"
	}).then(function(response){
		var results = response.data;
		if(!results || results.length < 1){
			return {Error : "GIPHY API does not respond!!"};
		}

		for(var i=0; i< results.length; i++){
			var imageBlock = $('<div class="images">');
			var rating = $("<h5>").text("Rating: " + results[i].rating);
			var drawImage = $('<img class="gif" id="gif" data-state="still" data-still="'+ results[i].images.fixed_height_still.url+'" data-animate="'+results[i].images.fixed_height.url+'">');

			drawImage.attr('src', results[i].images.fixed_height_still.url);

			imageBlock.append(rating);
			imageBlock.append(drawImage);
			imageBlock.append(" ");
			$('#images').prepend(imageBlock);
		}
	});
}

$("body").on("click",'img', function(){

	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});

$("body").on("click", '#topicData', function() {
	var item = $(this).attr("data");
	$('#images').html("");
	loadImages(item);
	console.log(item);
});
});