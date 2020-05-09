$("#signup-form").submit((event) => {
    let username = $('#username_id').val()
    let email = $('#email_id').val()
    let password1 = $('#password_id').val()
    let password2 = $('#re-enter_password').val()

    if (!username) {
        event.preventDefault()
        $('#error').html('Please enter a username')
        $('#error').show()
        return
    }

    if (!email) {
        event.preventDefault()
        $('#error').html('Please enter an E-mail')
        $('#error').show()
        return
    } else {
        let re = /^\S+@\S+$/
        if (!re.test(email)) {
            event.preventDefault()
            $('#error').html('Please enter a valid E-mail')
            $('#error').show()
            return
        }
    }

    if (!password1) {
        event.preventDefault()
        $('#error').html('Please enter an E-mail')
        $('#error').show()
        return
    }

    if (password1!=password2) {
        event.preventDefault()
        $('#error').html('Please enter the same password two times')
        $('#error').show()
        return
    }

    $('#error').hide()

})