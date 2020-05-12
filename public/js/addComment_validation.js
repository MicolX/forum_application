

$('#add-comment').submit((event) => {
    $('#error').hide()
    const content = $('#commentID').val()

    if (!content) {
        event.preventDefault()
        $('#error').html('Comment can not be empty')
        $('#error').show()
        return
    }

})

$(function () {

    $(".like").click(function () {
        var input = $(this).find('.qty1');
        input.val(parseInt(input.val())+ 1);
        
        $(this).off('click');

        
    });
    $(".dislike").click(function () {
        var input = $(this).find('.qty2');
        input.val(input.val() - 1);
        
        $(this).off('click');


    });
});








