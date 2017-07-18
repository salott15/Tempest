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
let fullHref = `/bar/status/full/${localStorage.getItem("boundsLatOne")}/${localStorage.getItem("boundsLat2")}/${localStorage.getItem("boundsLngOne")}/${localStorage.getItem("boundsLng2")}`
$("#full").closest("a").attr("href", fullHref)
let emptyHref = `/bar/status/empty/${localStorage.getItem("boundsLatOne")}/${localStorage.getItem("boundsLat2")}/${localStorage.getItem("boundsLngOne")}/${localStorage.getItem("boundsLng2")}`
$("#empty").closest("a").attr("href", emptyHref)

//Bar Page
$(".voteFull").click(function() {
	console.log($(this).attr("data-barId"));
	$.ajax({url:"/bar/current", method: "put", data:{
		barname: $(this).attr("data-barname"), 
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
		barname: $(this).attr("data-barname"), 
		barId: $(this).attr("data-barId"), 
		busy: "empty", 
		lat: $(this).attr("data-lat"), 
		lng: $(this).attr("data-lng")}})
	.done(function(data){
		console.log("done", data)
});
});

$(".saveBar").click(function(){
	if(localStorage.getItem("userName")){
		$.ajax({url:"/user/current", method: "post", data:{
			barid: $(this).attr("data-barid"),
			uid: localStorage.getItem("uid"),
		}})
	}
	else{
		window.location.href= "/userlogin"
	}
});
});