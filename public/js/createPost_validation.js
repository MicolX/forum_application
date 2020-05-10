$('#createPost').submit((event) => {
    $('#error').hide()
    const title = $('#titleID').val()
    const content = $('#contentID').val()

    if (!title) {
        event.preventDefault()
        $('#error').html('Title can not be empty')
        $('#error').show()
        return
    }

    if (!content) {
        event.preventDefault()
        $('#error').html('Content can not be empty')
        $('#error').show()
        return
    }

})