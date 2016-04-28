$(".slider").slick({
    autoplay: false,
    dots: true,
    customPaging : function(slider, i) {
    var thumb = $(slider.$slides[i]).data();
    return '<a>'+(i+1)+'</a>';
    }
});