
//Autofocus on the contenteditable box on page reload
 $(document).ready(function() {
 window.onload=function(){
    $('.editor').focus();
 } 
});

//Function to set caret positon to the end of the text
function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)
    {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }   
}

//Set caret position to the end of the text
$(document).ready(function() {
setEndOfContenteditable($('.editor')[0]); 
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
                'left': pageX - 7, // to display the toolbar above the selected text 
                'top' : pageY - 70
            }).fadeIn(200);
        } else {
            $('.toolbar').fadeOut(200);
        }
    });
    $(document).on("mousedown", function(e){
        pageX = e.pageX;    //store the x and y coordinates of the mouse caret
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
                //to display alternate colors of the link
                if (link_color==0){
                     document.getElementById("links").innerHTML += "<div class='red'><span><a href='" + url + "'>" + match[1] + "</a></span></div>";
                }
                else{
                    document.getElementById("links").innerHTML += "<div class='blue'><span><a href='" + url + "'>" + match[1] + "</a></span></div>";
                }
                link_color=((link_color+1)%2);
                //set the caret position to the end of text after link removal
                setEndOfContenteditable($('.editor')[0]); 
            }

        }
 });
 });
 
//randomizeeeeee function
var words;
 function RandomWord(words,pos) {

                if(words[pos].length == 4){
                    console.log(i +" was called");  //debug output
                    console.log(words[pos]);
                    var re = new RegExp(words[pos], "g");   //create regex object 
                    $.ajax({
                                url: 'http://randomword.setgetgo.com/get.php',
                                data: {
                                    format: 'json'
                                },
                                dataType: 'jsonp',
                                success: function(data) {
                                    ///extract the text from editor alongwith the html tags
                                    var html_content=$('.editor').html();
                                    //replace the four letter word with the random word generated and display back in the editor area
                                    $('.editor').html( html_content.replace(re , data.Word));
                                },
                                type: 'GET'
                            });  
                 }
                 else
                    return;
            }

    function RandomWordComplete() {
        //extract text from editor area without the html tags
        var content = $('.editor').text();     
        //separate the commas, fullstops and question marks so that they don't count as the length of the word
        words = content.trim().replace(/\s+/g, ' ');
        words = words.replace(/,/g, ' , ');
        words = words.replace(/\./g, ' . ');
        words = words.replace(/\?/g, ' ? ');
        //split the string by space character and store it in an array
        words= words.split(' ');
        console.log(words.length);
        for(i=0; i<words.length; i++){
          if(words[i].length==4)
            {
                RandomWord(words,i);

            }  
        }
    }

   