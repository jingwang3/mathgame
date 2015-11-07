var NUM_OF_EQUATIONS = 5;
var MAX_NUMBER = 99989;
var MIN_NUMBER = 10

var answerBoxPosX = 0;
var answerBoxHeight = 50;
var currentQues = 0;


$(document).ready(function() {
    $('#startBtn').click(function() {
        gameStart();
    });
});


var gameStart = function() {
    //initialize game setting and data
    $('#intro').hide();
    $('#gameplay').show();
    var questions = randEquation();
    $('.equa-list-item').each(function(key, value) {
        $(this).find('.ques-first').text(questions[key].first);
        $(this).find('.ques-second').text(questions[key].second);
        //$(this).find('.ans').text(questions[key].answer);
        //console.log(questions[key].ans_length);
    });
    showQuestion(0, questions[0]);
};

function showQuestion(currentQues, question){
    //control display of questions
    $('.ans-field, .equa-list-item').hide();
    $($('.equa-list-item').get(currentQues)).show();
    $('.ans-field').show();
    console.log(question);
    for (var i = question.ans_length; i < 6; i++) {
        $($('.ans-field').get(5-i)).hide();
    }
};

function Equation(first, second) {
    this.first = Math.floor(first);
    this.second = Math.floor(second);
    this.answer = (this.first + this.second);
    this.ans_length = this.answer.toString().length;
    this.user_ans = 0;
};


var randEquation = function() {
    var list = [];
    for (var i = 0; i < NUM_OF_EQUATIONS; i++) {
        var eq = new Equation((Math.random() * MAX_NUMBER + MIN_NUMBER), (Math.random() * MAX_NUMBER + MIN_NUMBER));
        list.push(eq);
    }
    return list;
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
        console.log(orig.changedTouches[0].pageX - offset.x + 'and' + orig.changedTouches[0].pageY);
    };
    this.bind("touchstart", start);
    this.bind("touchmove", moveMe);
    this.bind("touchend", dropMe);
};

$(".draggable").draggable();