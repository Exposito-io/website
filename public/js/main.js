function unfoldSection(section) {
    console.log('unfolding section ' + section)
    $('#' + section).addClass('unfolded animating')
    setTimeout(function() {
        $('#' + section).removeClass('animating')
    }, 500)
}


$(function() {
    $('.learn-more').click(function() {
        var containerId = $(this).parents('section').get(0).id
        unfoldSection(containerId)
        return false
    })
})