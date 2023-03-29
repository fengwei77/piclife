/**
*
* @authors Your Name (you@example.org)
* @date    2020-10-15 20:37:10
* @version $Id$
*/

//when online change to false
var environmentDevelop = true;

// if the image in the window of browser when the page is loaded, show that image
var currentWidth = $(window).width();

function showWidth()
{
    if(!environmentDevelop){
        $("#test-width").hide();
    }

    currentWidth = $(window).width();
    currentHeight = $(window).height()

    $("#test-width").text(currentWidth+"-"+currentHeight);
}

function checkScreenLegal(){

    currentWidth = $(window).width();
    currentHeight = $(window).height();

    console.log(currentWidth+"-"+currentHeight);

    if((currentWidth >= 750) && (currentHeight >= currentWidth)){
        $(".illegal-mask").addClass("open");
    }
    else if((currentWidth < 750) && (currentWidth >= currentHeight)){
        $(".illegal-mask").addClass("open");
    }
    else{
        $(".illegal-mask").removeClass("open");
    }
}

/*偵測滾軸 start*/
var scroll = $(window).scrollTop();

$( window ).scroll(function() {
});

$(window).on('load', function() {
});


$(document).ready(function() {
    showWidth();

    checkScreenLegal();
});

$(window).resize(function() {
    showWidth();
    checkScreenLegal();
});