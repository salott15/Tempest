$('document').ready(function(){

console.log($("#empty").html())
	$("#empty").hover(function(){
	$(this).find("img").hide();
	$(this).addClass("empty");
	$(this).find("h2").html("Empty");
},
function(){
	$(this).find("img").show();
	$(this).removeClass("empty");
	$(this).find("h2").html("")
})

//$("#empty").click()

});