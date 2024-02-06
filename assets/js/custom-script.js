
var parentDiv = document.getElementById("navbarNavDropdown");
var overlay = document.getElementById("overLay");
// console.log(parentDiv, "parentDiv***")
function toggleNavBar(){
    if(parentDiv.classList.contains("slide")){
        console.log("yes has")
        document.body.style.overflowY = "auto"
        parentDiv.classList.remove("slide")
        overlay.classList.remove("overlay");
    }
    else {
        console.log("no it has")
        document.body.style.overflowY = "hidden"
        overlay.classList.add("overlay");
        parentDiv.classList.add("slide")
    }
}

let mybutton = document.getElementById("bottomTop");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    mybutton.style.display = "block";
} else {
    mybutton.style.display = "none";
}
}


var top_tags = new Splide( '.topTags', {
// padding: '5rem',
type: 'loop',
perPage: 1,
perMove: 1,
pagination: false,
arrows: false,
autoplay: true,
speed: '1000',
breakpoints: {
    767: {
    // destroy: true,
    // label  : 'My Gallery', // Used after destruction
    
    }
}
} );

top_tags.mount();
