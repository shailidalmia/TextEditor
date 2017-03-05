$('.editor').on('keypress', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        $(this).after('</p><p>');
    }
}).on('click', function(e) {
    e.preventDefault();
    
});