
$('.editor').on('keypress', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        $(this).after('</p><p>');
    }
}).on('click', function(e) {
    e.preventDefault();
    
}); 


$(document).ready(function(){
	$('.toolbar a').click(function(ev){
	var command=$(this).data('command');
	document.execCommand($(this).data('command'), false, null);
	});
});

