
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
	if (command == 'forecolor') {	
      document.execCommand($(this).data('command'), false, $(this).data('value'));
  	}
	if (command == 'createlink') {
      url = prompt('Enter the link here: ', 'http:\/\/');
      document.execCommand($(this).data('command'), false, url);
  	}
  	else{	
		document.execCommand($(this).data('command'), false, null);
	}
	});
});


if (!window.x) {
    x = {};
}

x.Selector = {};
x.Selector.getSelected = function() {
    var t = '';
    if (window.getSelection) {
        t = window.getSelection();
    } else if (document.getSelection) {
        t = document.getSelection();
    } else if (document.selection) {
        t = document.selection.createRange().text;
    }
    return t;
}

var pageX;
var pageY;

$(document).ready(function() {
    $(document).bind("mouseup", function() {
        var selectedText = x.Selector.getSelected();
        if(selectedText != ''){
            $('.toolbar').css({
                'left': pageX + 5,
                'top' : pageY - 55
            }).fadeIn(200);
        } else {
            $('.toolbar').fadeOut(200);
        }
    });
    $(document).on("mousedown", function(e){
        pageX = e.pageX;
        pageY = e.pageY;
    });
});