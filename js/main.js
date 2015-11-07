var NUM_OF_EQUATIONS = 5;
var MAX_NUMBER = 99989;
var MIN_NUMBER = 10


$(document).ready(function() {
    $('#startBtn').on('click', function() {
        gameStart();
    });
});


var gameStart = function() {
    $('#intro').hide();
    $('#gameplay').show();
    var questions = randEquation();
    $('.equa-list-item').each(function(key, value){
       $(this).find('.ques-first').text(questions[key].first);
       $(this).find('.ques-second').text(questions[key].second);
       //$(this).find('.ans').text(questions[key].answer);
       console.log(questions[key].ans_length);
    });
}

function Equation(first, second){
    this.first = Math.floor(first);
    this.second = Math.floor(second);
    this.answer = (this.first + this.second);
    this.ans_length = this.answer.toString().length;
}


var randEquation = function(){
    var list = [];
    for (var i = 0; i < NUM_OF_EQUATIONS; i++) {
        var eq = new Equation((Math.random()*MAX_NUMBER + MIN_NUMBER), (Math.random()*MAX_NUMBER + MIN_NUMBER));
        list.push(eq);
    }
    return list;
}
