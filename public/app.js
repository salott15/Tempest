$('document').ready(function(){

console.log($("#empty").html())
	$("#empty").hover(function(){
	$(this).find("span").html("Empty");
},
function(){
	$(this).find("span").html("");
})
//Home Page
console.log($("#full").html())
	$("#full").hover(function(){
	$(this).find("span").html("Full");
},
function(){
	$(this).find("span").html("");
})

//Bar Page
$(".voteFull").click(function() {
	console.log($(this).attr("data-barId"));
	$.ajax({url:"/bar/current", method: "put", data:{
		name: $(this).attr("data-barname"), 
		barId: $(this).attr("data-barId"), 
		busy: "full", 
		lat: $(this).attr("data-lat"), 
		lng: $(this).attr("data-lng")}})
	.done(function(data){
		console.log("done", data)
	});
});

$(".voteEmpty").click(function() {
	console.log("empty")
	$.ajax({url:"/bar/current", method: "put", data:{
		name: $(this).attr("data-barname"), 
		barId: $(this).attr("data-barId"), 
		busy: "empty", 
		lat: $(this).attr("data-lat"), 
		lng: $(this).attr("data-lng")}})
	.done(function(data){
		console.log("done", data)
});
});
});