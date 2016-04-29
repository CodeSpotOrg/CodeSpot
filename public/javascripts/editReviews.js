$(document).ready(function(){
  $('a[href=""]').click((e) => {
    e.preventDefault();
    var url = window.location.href + `/reviews/${e.target.id}`;
    if (e.target.classList.contains('Delete')) {
      $.ajax({
        url,
        type: 'DELETE',
        success (response) {
          $(e.target).parent().parent().remove();
        }
     });
    }
 if (e.target.classList.contains('Edit')) {
    $(e.target).parent().append(`<form action="${url}_PUT" method="POST">
      <input type='hidden' name='url' value=${url}/>
      <textarea name="content"></textarea><input type="submit"/>`)
    $(e.target).remove();
  }
  })

});