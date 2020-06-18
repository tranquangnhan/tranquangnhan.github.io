// navbar btn
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
const navbarSub = document.querySelector('.navbar-sub__nav');
menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            navbarSub.style.transform = 'translateX(0%)';
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            navbarSub.style.transform = 'translateX(-100%)';
            menuOpen = false;
        }
    })
    // end navbar btn
    // start modal
var modal = document.querySelector('.modal');
var modalVideo = document.querySelector('.modal .modal__video video');
modal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalVideo.pause();
});
var boxright__btnplay = document.querySelector('.boxright__btnplay');
boxright__btnplay.addEventListener('click', () => {
        modal.style.display = 'block';
        modalVideo.play();
    })
    // change text
var selectLi = document.querySelectorAll('.option__nice-select ul li');
for (let i = 0; i < selectLi.length; i++) {
    selectLi[i].addEventListener('click', () => {
        selectLi[i].parentNode.previousElementSibling.previousElementSibling.innerText = selectLi[i].innerText;
    })



}
// coi xe
const coixe = new Audio('audio/coixe.wav');
const khoidong = new Audio('audio/khoidong.mp3');
const phanhxe = new Audio('audio/phanhxe.mp3');
var nutcoixe = document.querySelector('.nutcoixe');
var nutkhoidong = document.querySelector('.nutkhoidong');
var nutphanhxe = document.querySelector('.nutphanhxe');

nutcoixe.addEventListener('click', () => {
    coixe.play();

});
nutkhoidong.addEventListener('click', () => {
    khoidong.play();
});
nutphanhxe.addEventListener('click', () => {
    phanhxe.play();

});

//====================== menu đổi màu ============================//
window.onscroll = function() {
    myFunction()
};

function myFunction() {

    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("navmain").className = "header__navbar-main2";
    } else {
        document.getElementById("navmain").className = "header__navbar-main";
    }

}

// geolocation
var x = document.getElementById("getLocation");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var gLatLon = new google.maps.LatLng(lat, lon);
    var ojbConfig = {
        zoom: 17,
        center: gLatLon
    }
    var gMap = new google.maps.Map(x, ojbConfig);
    var gMarkerConfig = {
        position: gLatLon,
        map: gMap,
        title: "Đây là nhà của Trần Quang Nhân đẹp trai "

    };
    var gMarker = new google.maps.Marker(gMarkerConfig);
}