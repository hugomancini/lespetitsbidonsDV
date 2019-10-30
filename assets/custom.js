
console.log("Hello moto")
$( document ).ready(function() {

  // FIX IOS 13
  (function() {
      var touchingCarousel = false,
        touchStartCoords;

      document.body.addEventListener('touchstart', function(e) {
        if (e.target.closest('.flickity-slider')) {
          touchingCarousel = true;
        } else {
          touchingCarousel = false;
          return;
        }

        touchStartCoords = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        }
      });

      document.body.addEventListener('touchmove', function(e) {
        if (!(touchingCarousel && e.cancelable)) {
          return;
        }

        var moveVector = {
          x: e.touches[0].pageX - touchStartCoords.x,
          y: e.touches[0].pageY - touchStartCoords.y
        };

        if (Math.abs(moveVector.x) > 7)
          e.preventDefault()

      }, {passive: false});
    })();
  // TIMELINE
  if ($('.mainslider').attr('data-slideshow-animation') == "fade") {
    $(this).addClass('fade');
  }
  $length = $('.mainslider').attr('data-slides-length');

  function time_slider() {
    console.log('slide');
    $('.mainslider').flickity({
      pageDots: false,
      resize: true,

      // adaptiveHeight: true,
      arrowShape: {
        x0: 30,
        x1: 55, y1: 25,
        x2: 60, y2: 25,
        x3: 35
      }
    });
    $('#progressbar').flickity({
      asNavFor: '.mainslider',
      pageDots: false,
      resize: true,
      autoPlay: false,
      draggable: false,
      prevNextButtons: false,
      groupCells: $length
    });
  }
  time_slider()
  $( window ).resize( function() {
    console.log('resize');
    $('.mainslider').flickity('resize');

  })


  // TIMELINE
})
$( document ).ready(function() {
  // SCROLL MAGIC HOME
  var $scene_length = $('.animation').attr('data-scene-length');
  var $duration = $('.animation').attr('data-scene-duration');
  var controller = null;

  console.log(controller);

  controller = new ScrollMagic.Controller()


  var big_logo_path = {
    values: [
      {x: 700, y: -50},
      {x: 700, y: window.innerHeight},
    ]
  }
  var line_path = {
    values: [
      {x: 700, y: -50},
      {x: 700, y: window.innerHeight},
    ]
  }

  var right_path = {
    values: [
      {x: 700, y: -50},
      {x: 700, y: window.innerHeight},
    ]
  }




  $('.animated').each(function(index) {
    if( index < $scene_length ) {
      var $triggerHook = 0.16;
      var $offset = $duration * index;
      var $content = "#content" + (index + 1);
      console.log($offset);
      var $scene = "#high" + (index + 1);
      var $right = "#right" + (index + 1);
      if ( $($right).innerHeight() > (($(window).innerWidth() / 100) * 30 ) ) {
        var $right_height = "-" + ($($right).innerHeight() - 300);
      } else {
        var $right_height = '5vw'

      }
      var $logo = "#biglogo" + (index + 1);

      var $active_classes = $scene
      var $span_after = ".step" + (index + 1) + " div.after";
      $dynHeight = (($(window).innerWidth() / 100) * 30 ) / ($scene_length - 1 )
      console.log($span_after + '==');
      for (i = 0; i <= index; i++) {
        $active_classes +=", .step" + (i + 1) + ', #logo-active'+ (i + 1)
      }
      var tween = null;
      tween = new TimelineLite();
      tween
        .fromTo($right, 1.5, {
          top: '5vw'
        },{
          top: $right_height
        }, 0.5)
        .fromTo($logo, 1.5, {
          top: 0
        },{
          top: "60vh"
        }, 0)
        .fromTo($span_after, 1.5,{
          height: 0
        }, {
          height: $dynHeight
        }, 0)

      if (0 == index) {
         $offset = 0;
      }


      var scene = new ScrollMagic.Scene({
        triggerElement: '.animation',
        duration: $duration,
        offset: $offset,
        triggerHook: $triggerHook
      })
      .setTween(tween)
      .setClassToggle(($active_classes), "active")
      .setPin('.animation')
      .on("start", function(event) {
        console.log(event)
        if (index == 0 && event.state == "DURING"){
          $('#biglogo1').fadeIn();
        } else if (index == 0 && event.state == "BEFORE") {
          $('#biglogo1').fadeOut();

        }
      })
      .on("end", function (event) {
        if (index == ($scene_length - 1 ) && event.state == "AFTER") {
          $('.logo-line').hide();
        } else if (index == 0 && event.state == "AFTER"){
          $('#high1').fadeOut()
        } else if (index == 0 && (event.state == "DURING" || event.state == "BEFORE" )){
          $('#high1').fadeIn()
          console.log(event.state);
        } else {
          $('.logo-line').show();

        }
      })
      .addTo(controller)



    }
  })
  $('.logo-mob-active').hide()
  $('.logo-mob').click(function() {
    $('.logo-mob').removeClass('selected')
    $('.logo-mob-img').show()
    $('.logo-mob-active').hide()
    $('.logo-mob-img', this).hide()
    $('.logo-mob-active', this).show()

    $('.content_text').hide()
    $(this).addClass('selected')
    $("#"+$(this).attr('data-join')).fadeIn()
  })

  $('.logo-mob').eq(0).click()

})

$( document ).ready( function() {
      console.log('la?');

  if ($(window).width() < 798) {
      console.log('la?');

    if ($('.content_for_logo .content').height() > 125) {
      console.log('ici?');
      var oldHeight = $('.content_for_logo .content').height() +110;
      $('.content_for_logo .content').addClass('open');
      $('#readMore').css('display', 'block');

      var i = 0;
      $('#readMore').on('click', function(e) {
        i += 1
        $('#readMore').text((i % 2) ? '(Voir moins...)' : '(...)');
        // (i % 2) ? $('.fade').fadeOut(): $('.fade').fadeIn();
        $('.content_for_logo .content').animate({ height: (i % 2) ? oldHeight : '125px' }, 200);
      });
    }
  }
})

console.log("Hello moto")

$(document).ready( function() {
  mapboxgl.accessToken = 'pk.eyJ1IjoicHVyMTAwIiwiYSI6ImNrMmJ4NGZrYTA4eG8zY3FvdDhuZGd2MmYifQ.XeblSVjMc6eMbi6SUipC-A';
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11'
  });
})


