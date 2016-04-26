var options = [];


$(document).ready(function(){
    $("#loginButton").click(function(e){
        e.preventDefault();
        bootbox.confirm("\
            <center>\
            <table>\
            <form id='infos' action=''>\
                <tr>\
                    <td class='text-right'>Email:</td>\
                    <td><input type='text' name='first_name' /></td>\
                </tr>\
                <tr>\
                    <td>Password:</td>\
                    <td><input type='text' name='last_name' /></td>\
                </tr>\
            </form>\
            </table>\
            </center>\
            ", function(result) {
        if(result)
            $('#infos').submit();
        }).find("div.modal-content").addClass("loginModal");
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
      
   console.log( options );
   return false;
});
})
