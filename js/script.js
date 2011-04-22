/* Author: 

*/



$(document).ready(function() {
    //Setup the scroller
    $(".scrollable").scrollable({circular:true}).navigator({
       navi:"#targetNav",
       navItem:"a",
       activeClass:"currentTarget",
       history:true
    }).autoscroll();

    //Setup the resource accordian
    $("#serviceBlocks h1").click(function() {
        $(this).parent().children("nav").hide('fast');
        $(this).next().show('fast');
    });
    $("#serviceBlocks h1:eq(0)").next().show('fast');

    //Primary navigation simulator
    $("#siteNavigation a").click(function(event) {
        $("#siteNavigation ul li").each(function(){
            $(this).removeClass("active");
        });
        $(this).parent().addClass("active");
    });

    

});



















