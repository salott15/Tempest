$('document').ready(function(){

console.log($("#empty").html())
	$("#empty").hover(function(){
	$(this).find("span").html("Empty");
},
function(){
	$(this).find("span").html("");
})

});

$('document').ready(function(){

console.log($("#full").html())
	$("#full").hover(function(){
	$(this).find("span").html("Full");
},
function(){
	$(this).find("span").html("");
})

//$("#full").click()

});