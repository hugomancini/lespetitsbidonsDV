$( document ).ready(function() {
  $('.plusmoins .moins').click(function(e){
    if (parseInt($('.qte').val()) > 1) {
      $('.qte').val(parseInt($('.qte').val()) - 1)
    }
  })
  $('.plusmoins .plus').click(function(e){
    $('.qte').val(parseInt($('.qte').val()) + 1)
  })
  $('.why-sub').click(function() {
    $(this).toggleClass('closed')
    $(this).toggleClass('open');
    $('.slideee').slideToggle();
  })
  $('.slideee').slideUp()

})
