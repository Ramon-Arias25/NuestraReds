$('#post-comment').hide();

$('#btn-toggle-comments').click(e => {
    e.preventDefault();
    $('#post-comment').slideToggle();
});

$('#btn-like').click(function(e){
    e.preventDefault();
    let imgId = $(this).data('id');

    $.post('/images/' + imgId + '/like')
        .done(data => {
            $('.like-count').text(data.like);
        });
});

$('#btn-delete').click(function(e){
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Are you sure you want to delete this image?');
    if (response){
        let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'
        })
        .done(function (result){
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Deleted!</span>');
        });
    } 
});

$('#card-postx').hide();

$('#btn-toggle-comments').click(e => {
    e.preventDefault();
    $('#card-post').slideToggle();
});
/*
$("#btn-post").click(function(e){
    e.preventDefault
    $(".post-popup.pst-pj").addClass("active");
    $(".wrapper").addClass("overlay");
    return false;
});*/

    //  ============= SIGNIN CONTROL FUNCTION =========

    $('.sign-control li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.sign-control li').removeClass('current');
        $('.sign_in_sec').removeClass('current');
        $(this).addClass('current animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });