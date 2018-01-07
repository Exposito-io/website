function unfoldSection(section) {
    console.log('unfolding section ' + section)
    $('#' + section).addClass('unfolded animating')
    setTimeout(function() {
        $('#' + section).removeClass('animating')
    }, 500)
}