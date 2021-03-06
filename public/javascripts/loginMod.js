var options = [];

$(document).ready(function(){
   $('input[name=url]').val(window.location.href);
    $('#loginButton').click(function(e) {
      e.preventDefault();
      $('#login-form').slideToggle('slow')
    })
    $('#registerButton').click(function(e) {
      e.preventDefault();
      $('#register-form').slideToggle('slow')
    })
  $( '.dropdown-menu a' ).on( 'click', function( event ) {

   var $target = $( event.currentTarget ),
       val = $target.attr( 'data-value' ),
       $inp = $target.find( 'input' ),
       idx;

   if ( ( idx = options.indexOf( val ) ) > -1 ) {
      options.splice( idx, 1 );
      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
   } else {
      options.push( val );
      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
   }

   $( event.target ).blur();

   return false;
  });
})
