$('document').ready(function(){

    $("#empty").hover(function(){
    $(this).find("span").html("Empty");
},
function(){
    $(this).find("span").html("");
})

$('#info').on('click', function() {
    $('#instructions').show()
})
//Home Page
$('#instructions .close').click(function(){ $('#instructions').hide(); });
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
$(".voteFull, .voteEmpty").click(function() {
    console.log($(this).attr("data-barId"));
    $.ajax({url:"/bar/current", method: "put", data:{
        barname: $(this).attr("data-barname"),
        barId: $(this).attr("data-barId"),
        busy: ($(this).hasClass("voteFull")) ? "full":"empty",
        lat: $(this).attr("data-lat"),
        lng: $(this).attr("data-lng")}})
    .done(function(data){
        console.log("done", data)
    });
});

$(".saveBar").click(function(){
    if(localStorage.getItem("userName")){
        $.ajax({
            url:"/user/current",
            method: "post",
            data:{
                barid: $(this).attr("data-barid"),
                uid: localStorage.getItem("uid"),
            },
            success: function(response) {
                window.location.href= "/user/mybars"
            }
        })
    }
    else{
        window.location.href= "/userlogin"
    }
});

$(".deleteBar").click(function(){
    $.ajax({
        url:"/user/mybars",
        method: "delete",
        data:{ barid: $(this).attr("data-id")},
        success: function(response) {
            window.location.reload()
        }
    })
})
});