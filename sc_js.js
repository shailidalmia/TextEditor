
//Start a new paragraph on pressing the enter key
$('.editor').on('keypress', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        $(this).after('</p><p>');
    }
}).on('click', function(e) {
    e.preventDefault();
    
}); 


//display the toolbar when text is selected
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
var flag=0;

$(document).ready(function() {
    $(document).bind("mouseup", function() {
    	if(flag==1){
    		var selectedText='';
    		flag=0;
    	}
    	else
        	var selectedText = x.Selector.getSelected();
        if(selectedText != ''){
        	flag=1;
            $('.toolbar').css({
                'left': pageX - 7,
                'top' : pageY - 70
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


//Modify selected text using execCommand
$(document).ready(function(){
	$('.toolbar a').click(function(ev){

var command=$(this).data('command');
	if (command == 'forecolor') {	
		//this will change the font color to red
      document.execCommand($(this).data('command'), false, $(this).data('value'));
  	}
	if (command == 'createlink') {
		//this will create a link 
      url = prompt('Enter the link here: ', 'http:\/\/');
      document.execCommand($(this).data('command'), false, url);
  	}
  	else{	
  		//this will make the text bold, italics or underlined
		document.execCommand($(this).data('command'), false, null);
	}
	});
});

var link_color=0;
//link creation
$(document).ready(function(){
    $('.editor').keyup(function (e) {
        if(e.keyCode==190 ){
            
            var text = $('.editor').html();
            var match= /\&lt;\s*a\s*\&gt;(.+)\&lt;\s*\/\s*a\s*\&gt;/g.exec(text);
            if(match!==null){
                url=prompt('Enter link here: ', 'http:\/\/');
                if(url!="http://"){
                text = text.replace(match[0], "<span><a href='" + url + "'>" + match[1] + "</a></span>");
                $('.editor').html(text);
                document.getElementById("links").innerHTML += "<br>"+match[1]+": "+url;
                /*if (link_color==0)
                    document.getElementById("links").innerHTML.style.color="#FF0000";
                else
                    document.getElementById("links").innerHTML.style.color="#FF0000";
                link_color=((link_color+1)%2);
                */
            }
            }

        }
 });
 });
 