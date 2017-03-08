
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
        if(selectedText != ""){
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
  	else{	
  		//this will make the text bold, italics or underlined
		document.execCommand($(this).data('command'), false, null);
	}
	});
});


//link creation
var link_color=0;
$(document).ready(function(){
    $('.editor').keyup(function (e) {
        //When closing angular bracket key is pressed
        if(e.keyCode==190 ){
            
            var text = $('.editor').html();
            //Regular expression to match text such as <a>link me!</a>
            var match= /\&lt;\s*a\s*\&gt;(.+)\&lt;\s*\/\s*a\s*\&gt;/g.exec(text);
            if(match!==null){
                //input link from the user
                url=prompt('Enter link here: ', 'http:\/\/');
                    text = text.replace(match[0],"");
                    $('.editor').html(text);
                
                if (link_color==0){
                     document.getElementById("links").innerHTML += "<div class='red'><span><a href='" + url + "'>" + match[1] + "</a></span></div>";
                }
                else{
                    document.getElementById("links").innerHTML += "<div class='blue'><span><a href='" + url + "'>" + match[1] + "</a></span></div>";
                }
                link_color=((link_color+1)%2);
                
            }

        }
 });
 });
 