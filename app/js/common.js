$(document).ready(function(){
    $(".slider.horizontal").slick({
        infinite: false,
        slidesToShow: 2,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1
              },
              breakpoint: 768,
              settings: {
                vertical: true,
                slidesToShow: 1
              }
            }
        ]
    });
    $(".slider.vertical").slick({
        vertical: true,
        autoplay: false,
        arrows: true,
        slidesToShow: 3,
        infinite: false,
        centerPadding: "20px",
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1
              }
            }
        ]
    });
    $('.burg').on('click', function(){
        $('.menu_mobile .header-content').toggleClass('active');
        if ($('span.bar').hasClass('active')){
            $('span.bar').removeClass('active');
        } else {
            $('span.bar').addClass('active');
        }
    });

    // $(window).scroll(function() {
    //     if ($(this).scrollTop() > 50){
    //         $('header').addClass("test");
    //     } else{
    //         $('header').removeClass("test");
    //     }
    // });
});

// ;function menu() {
//     function closeMenu() {
//         if($('.button_menu').hasClass('closed')){
//             $('.button_menu').removeClass('closed');
//             $('nav').removeClass('active');
//             $('html').removeClass('dark_menu');
//         }
//         else{
//             $('.button_menu').addClass('closed');
//             $('nav').addClass('active');
//             $('html').addClass('dark_menu');
//         }
//     }
//     $(document).on('click touch','header .list',function(){
//         closeMenu()
//     });

//     // close menu
//     // $('section').click(function(){
//     //     closeMenu();
//     //     $('.language').removeClass('active');
//     // });
//     $('nav a').click(function(){
//         closeMenu();
//     });
// }

// ;function changeMenu() {
//     var header = $("header");
//     $(window).scroll(function() {
//         var scroll = $(window).scrollTop();

//         if (scroll >= 100) {
//             header.addClass('header-alt');
//         } else {
//             header.removeClass("header-alt");
//         }
//     });
// }
// ;function smoothScroll() {
//     if ( !$( 'html' ).hasClass( 'fp-enabled' ) ) {
//         $(document).ready(function () {
//             //smoothscroll
//             $('#menu .hide-on-desktop a').on('click', function (e) {
//                 e.preventDefault();
//                 $(document).off("scroll");

//                 $('#menu .hide-on-desktop a').each(function () {
//                     $(this).removeClass('active');
//                 });
//                 $(this).addClass('active');

//                 var target = this.hash,
//                     menu = target;
//                 $target = $(target);
//                 $('html, body').stop().animate({
//                     'scrollTop': $target.offset().top
//                 }, 500, 'swing', function () {
//                     window.location.hash = target;
//                 });
//             });
//         });
//     }
// }

// ;function identifyOS() {
//     if (navigator.userAgent.indexOf('Mac') > 0) {
//         var elemHTML = document.getElementsByTagName('html')[0];

//         elemHTML.className += " mac-os";

//         if (navigator.userAgent.indexOf('Safari') > 0) elemHTML.className += " mac-safari";
//         if (navigator.userAgent.indexOf('Chrome') > 0) elemHTML.className += " mac-chrome";
//     }
// }