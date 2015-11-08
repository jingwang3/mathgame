var NUM_OF_EQUATIONS = 5;
var MAX_NUMBER = 99989;
var MIN_NUMBER = 10

var answerBoxPosX = 0;
var answerBoxHeight = 50;
var currentQues = 0;
var questions = [];

function Equation(first, second) {
    this.first = Math.floor(first);
    this.second = Math.floor(second);
    this.answer = (this.first + this.second);
    this.ans_length = this.answer.toString().length;
    this.user_ans = 0;
};


$('#startBtn').click(function() {
    gameStart();
});

$('#restartBtn').click(function() {
    gameStart();
});

$('#mainmenuBtn').click(function() {
    location.reload();
});



var gameStart = function() {
    //initialize game setting and data
    $('#intro').hide();
    $('#ending').hide();
    $('#gameplay').show();
    questions = [];
    questions = randEquation();
    $('.equa-list-item').each(function(key, value) {
        $(this).find('.ques-first').text(questions[key].first);
        $(this).find('.ques-second').text(questions[key].second);
        //$(this).find('.ans').text(questions[key].answer);
        //console.log(questions[key].ans_length);
    });
    showQuestion(0, questions[0]);
};

function showQuestion(currentQues, question) {
    //control display of questions
    $('body').removeClass('correct');
    $('body').removeClass('wrong');
    $('.ans-field, .equa-list-item').hide();
    $($('.equa-list-item').get(currentQues)).show();
    $('.ans-field').text('?').removeClass('updated').show();
    for (var i = question.ans_length; i < 6; i++) {
        $($('.ans-field').get(5 - i)).hide();
    }
};

function nextQuestion() {
    $('body').removeClass('correct');
    $('body').removeClass('wrong');
    if (currentQues < NUM_OF_EQUATIONS - 1) {
        currentQues += 1;
        showQuestion(currentQues, questions[currentQues]);
    }
    else {
        gameOver();
    }
};

var randEquation = function() {
    var list = [];
    for (var i = 0; i < NUM_OF_EQUATIONS; i++) {
        var eq = new Equation((Math.random() * MAX_NUMBER + MIN_NUMBER), (Math.random() * MAX_NUMBER + MIN_NUMBER));
        list.push(eq);
    }
    return list;
};

function checkAnswer() {
    if ($('.ans-field.updated').length !== questions[currentQues].ans_length) {
        //there are still empty fields
    }
    else {
        var ans = '';
        $('.ans-field.updated').each(function(key, value) {
            ans += $(this).text();
        });
        questions[currentQues].user_ans = parseInt(ans);
        if (questions[currentQues].user_ans === questions[currentQues].answer) {
            $('body').addClass('correct');
        }
        else {
            $('body').addClass('wrong');
        }
        //nextQuestion();
        setTimeout(nextQuestion, 1500);
    }
};

function insertNumber(posX, posY, num) {
    var boxWidth = $('#solutionList').width()*0.12;
    if (posY >= $('#solutionList').position().top && posY <= ($('#solutionList').position().top + 50)) {
        $('.ans-field').each(function(key, value) {
            if (posX >= $(this).position().left && posX <= $(this).position().left + boxWidth) {
                $(this).addClass('updated').text(num);
                checkAnswer();
            }
        });
    }
    else {
        //console.log(false);
    }
};

function gameOver() {
    $('#intro').hide();
    $('#gameplay').hide();
    $('.res-list-item').each(function(key, value) {
        $(this).find('.res-first').text(questions[key].first);
        $(this).find('.res-second').text(questions[key].second);
        $(this).find('.res-ans').text(questions[key].answer);
        if (questions[key].user_ans !== questions[key].answer) {
            $(this).find('.res-user-ans').text(questions[key].user_ans);
        }
        else {
            $(this).find('.res-user-ans').hide();
        }
    });

    $('#ending').show();
};


$.fn.draggable = function() {
    var offset = null;
    var start = function(e) {
        var orig = e.originalEvent;
        var pos = $(this).position();
        $(this).css({
            position: 'absolute',
            opacity: .6
        });
        offset = {
            x: orig.changedTouches[0].pageX - pos.left,
            y: orig.changedTouches[0].pageY - pos.top
        };
    };
    var moveMe = function(e) {
        e.preventDefault();
        var orig = e.originalEvent;
        $(this).css({
            top: orig.changedTouches[0].pageY - offset.y,
            left: orig.changedTouches[0].pageX - offset.x
        });
    };
    var dropMe = function(e) {
        var orig = e.originalEvent;
        $(this).css({
            position: 'relative',
            opacity: 1,
            top: '',
            left: ''
        });
        insertNumber(orig.changedTouches[0].pageX - offset.x, orig.changedTouches[0].pageY, $(this).text());
    };
    this.bind("touchstart", start);
    this.bind("touchmove", moveMe);
    this.bind("touchend", dropMe);
};

$(".draggable").draggable();