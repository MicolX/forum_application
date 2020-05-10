$('#login-form').submit((event) => {
    const username = $('#login-name').val()
    const password = $('#login-password').val()

    if (!username) {
        event.preventDefault()
        $('#error').html('Please enter the username')
        $('#error').show()
        return
    }

    if (!password) {
        event.preventDefault()
        $('#error').html('Please enter the password')
        $('#error').show()
        return
    }

    $('#error').hide()
})