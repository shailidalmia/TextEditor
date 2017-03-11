
//Autofocus on the contenteditable box on page reload
 $(document).ready(function() {
 window.onload=function(){
    $('.editor').focus();
 } 
});

//Set caret positon to the end of the text
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

$(document).ready(function() {
setEndOfContenteditable($('.editor')[0]); 

});


  /*$('.editor p').on('keypress', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
       // $(this).after('</p><p>');
     //  var div=document.createElement('div');
       $('.editor').append("<div>Some text</div>");
    }
}).on('click', function(e) {
    e.preventDefault();
    
}); */

function showHTML(){
   // $('#words').text(words);
    var html_content=$('.editor').html();
    var replace="ere";
    var re = new RegExp(replace, "g");
    var newStr='POTATO';
    
    $('#html').html(html_content.replace(re, newStr));
    //$('#html').text(html_content.trim().replace(/\s+/g, ' ').split(' '));


}
function convertHTML(){
    $('#convert').html(document.getElementById('html').innerText);
 
}

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
                setEndOfContenteditable($('.editor')[0]); 
            }

        }
 });
 });
 
//randomizeeeeee
var words;
 function RandomWord(words,pos, htmlStr) {

              
                if(words[pos].length == 4){
                    console.log(i +" was called");
                    console.log(words[pos]);
                    var re = new RegExp(words[pos], "g");
                    //console.log(html);
                    $.ajax({
                                url: 'http://randomword.setgetgo.com/get.php',
                                data: {
                                    format: 'json'
                                },
                                dataType: 'jsonp',
                                success: function(data) {
                                   // var replace="ere";

                                    htmlStr=$('.editor').html();
                                    $('.editor').html( htmlStr.replace(re , data.Word));

                                    //words[pos]=data.Word;
                                    //$('.editor').text(words.join(" "));
                                },
                                type: 'GET'
                            });
                     
                 }

                 else
                    return;
               
            }

    function RandomWordComplete() {
        var content = $('.editor').text();
       
        
      //  var html_content=$('#text').html();
        words = content.trim().replace(/\s+/g, ' ');
        words = words.replace(/,/g, ' , ');
        words = words.replace(/\./g, ' . ');
        words = words.replace(/\?/g, ' ? ');
       // words = words.replace(/<[abiu]+>/g, ' , ');

        words= words.split(' ');//.length;
       // words2=html_content.trim().replace(/\s+/g, ' ').split(/[\s,.?<>/]+/);//.length;

        ///$('#puraana_text').text(words+"<br>"+words2);
        var html_content;
        console.log(words.length);

        for(i=0; i<words.length; i++){
          if(words[i].length==4)
            {
                html_content=$('.editor').html();
                RandomWord(words,i, html_content);

            }
           
        }

    }

   