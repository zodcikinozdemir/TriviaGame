var totalQuestions = 0;
var currentQuestion = 0;
var correctAnswers = 0;
var currentSel = false;

var questions = 
    [ { Q : 'Which of the following jQuery method get the text contents of an element?',
        options : ['text()','getText()','getContent()','None of the above.'],
        A : 0 },
      { Q : 'Which built-in method returns the string representation of the number\'s value?',
        options : ['toValue()','toNumber()','toString()','None of the above.'],
        A : 2 }, 
      { Q : 'Which built-in method combines the text of two strings and returns a new string?',
        options : ['append()','concat()','attach()','None of the above.'],
        A : 1 },
      { Q : 'Which built-in method returns the character at the specified index?',
        options : ['characterAt()', 'getCharAt()', 'charAt()', 'None of the above.'],
        A : 2 },
      { Q : 'Which of the following jQuery method apply a style on an element?',
        options : ['addStyle(classes)','addClass(classes)','addCSSClass(classes)','None of the above.'],
        A : 1 },
      { Q: 'Which sign does jQuery use as a shortcut for jQuery?',
        options : ['the $ sign','the % sign','the ? sign','None of the above.'],
        A : 0
      },
      { Q: 'What is the correct jQuery code to set the background color of all p elements to red?',
        options : ['$("p").layout("background-color","red");',
                   '$("p").css("background-color","red");',
                   '$("p").style("background-color","red");',
                   '$("p").manipulate("background-color","red");'],
        A : 1
      },
      { Q: 'Which jQuery method is used to hide selected elements?',
        options : ['visible(false)','display(none)','hide()','hidden()'],
        A : 2
      },
       { Q: 'Which of the following jQuery method removes set of matched elements?',
         options : ['ampty()','delete()','remove()','None of the above.'],
         A : 2
       },
       { Q: 'Which of the following is the correct way to create a div element with a link text “Hello” with jQuery?',
         options : ['$(“#idName”).create(“div”).text(“Hello“);',
                    '$(“#idName”).create(“div”).html(“Hello“);',
                    '$(“idName”).css(“div”).html(“Hello“);',
                    '$(“#idName”).append(“Hello“);'],
         A : 3
       }  
    ];

function parseQuestions() {    
    for (var i = 0; i < questions.length; i++) {
        var strBegin = '<div class="Q">' +
            '\n\t<p><span>Q'+ (i+1) +
            '</span> -' + questions[i].Q + '</p>'+
            '\n\t<form>';
        var strMiddle = '';
        var number = questions[i].options.length;
        for(var j =0 ; j < number; j++) {
            strMiddle += '\n\t\t<div class="radio">' ; 
            strMiddle += '\n\t\t\t<label><input type="radio" value=';
            if(questions[i].A == j) {
                strMiddle += 'true';
            }  else {
                strMiddle += 'false';
            }    
            strMiddle += ' name="Opt">';
            strMiddle += questions[i].options[j]+ ' </label>';
            strMiddle += '\n\t\t</div>';
        }
        var strEnd = '\n\t</form>\n</div>';
        $("#main").append(strBegin+strMiddle+strEnd);
    }
    $("#main").append('<input type="Submit" id="next" value="Submit">');
    $("#main").append('<div id="answer"></div>');

}
var stopwatch = {

    time:0,
  
    start: function(t){
        time = t;
        counter = setInterval(stopwatch.count, 1000);
    },
    stop: function(){
        clearInterval(counter);
    },
    count: function(){
        time--;
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;
        
        second = (second < 10) ? '0'+second : second;
        minute = (minute < 10) ? '0'+minute : minute;

        $('div.timer span.second').html(second);
        $('div.timer span.minute').html(minute);
        if(time == 0) { 
            stopwatch.stop();
            $('.Q').hide();
            $('#next').hide();
            
            $('#result').html(correctAnswers + ' of ' + totalQuestions);
            $('#resultScreen').fadeIn();
        }
    }
};


$(document).ready(function() {

    parseQuestions();
    
    $questionDivs = $('.Q');
    $questionDivs.hide();
    $resultScreen = $('#resultScreen');
    $resultScreen.hide();
    $('#next').hide();
    $answer = $('#answer');
    
    $('#start').on('click', function () {

    $('#startScreen').hide();
    totalQuestions = $questionDivs.size();
    $($questionDivs.get(currentQuestion)).fadeIn();
    $('#next').show();

    $questionDivs.on('change', 'input[name=Opt]:radio', function (e) {
        currentSel = this.value;
    });

    stopwatch.start(60);

    $('#next').click(function() {
        if(currentSel == 'true') {
            correctAnswers++;
            $answer.html('<br><br><h1>Correct!</h1>').show();

        } else {
            var correctSel = questions[currentQuestion].A; 
            var answer = questions[currentQuestion].options[correctSel];
            $answer.html('<br><br><h3>Correct answer was : ' +answer+'</h3>').show();
        }
     
        $($questionDivs.get(currentQuestion)).delay(1000).fadeOut(function(){
            $answer.hide();
            currentQuestion = currentQuestion + 1;
            if(currentQuestion == totalQuestions){
                stopwatch.stop();
                $questionDivs.hide();
                $('#next').hide();
                $('#result').html(correctAnswers + ' of ' + totalQuestions);
                $resultScreen.fadeIn();    
            } else {
                $($questionDivs.get(currentQuestion)).fadeIn();
            }
        });
    });
  });
});