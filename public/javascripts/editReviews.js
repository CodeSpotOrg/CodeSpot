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
    $(e.target).parent().append(`<form action="${url}?_method=PUT" method="POST">
      <input type='hidden' name='url' value=${window.location.href}>
      <textarea name="content">${$(e.target).prev().prev().text()}
      </textarea><input type="submit"/>`)
    $(e.target).remove();
  }
  })

});