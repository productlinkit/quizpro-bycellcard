var baseURL = window.location.origin;

function getQuestions()
{
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    quiz_set_id = id;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type : "POST",
        dataType : "json",
        url : baseURL + "/quiz/question",
        data : {
                    id: id,
                },
        success:function(data){
            question = data.data[0];
            listQuestion = data.data;
            maxQuestion = data.length - 1;
        },
        async: false
    });
}

getQuestions();

var qna = [];
var currentQuestion = 0;

$(document).ready(function () {
    timmerCountdown();

    'use strict';

    var swipeContainer = document.querySelector('.swipe');
    var allCards = document.querySelectorAll('.swipe-card');
    var nope = document.getElementById('nope');
    var love = document.getElementById('love');
    var swipeCounter = document.getElementById('swipe-counter');

    function initCards(card, index) {
        var newCards = document.querySelectorAll('.swipe-card:not(.removed)');

        newCards.forEach(function (card, index) {
            card.style.zIndex = allCards.length - index;
            card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 15 * index + 'px)';
            card.style.opacity = (10 - index) / 10;
        });

        swipeContainer.classList.add('loaded');
    }

    initCards();
});

function timmerCountdown(params)
{
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type : "POST",
        dataType : "json",
        url : baseURL + "/quiz_timer",
        data : { quiz_set_id:quiz_set_id },
        success: function (response)
        {
            if (response.success == 1)
            {
                var pair_id = response.pair_id;

                var countdownNumberEl = document.getElementById('countdown-number');
                var countdown = response.time;

                generateQuestion(0,pair_id);

                timer = setInterval(function() {
                    var t = countdown--;
                    var sound = document.getElementById("audio");
                    sound.play();
                    countdownNumberEl.textContent = t;
                    if (countdown === 0) {
                        resultGenarate(qna,pair_id);
                    }
                    else{
                        localStorage.setItem('setTimer', countdown);
                    }
                }, 1000);
            }
        }
    });
}

function generateQuestion(p,pair_id)
{
    $('#current').text(p + 1);
    $('#maxQuestion').text(maxQuestion +1);

    var quiz_image = listQuestion[p].quiz_image;
    var quiz_video = listQuestion[p].quiz_video;
    var game_type = listQuestion[p].game_type;
    var pair_id = pair_id;

    var sound = document.getElementById("audio");
    var sound_click = document.getElementById("audio_click");
    var sound_correct = document.getElementById("audio_correct");
    var sound_wrong = document.getElementById("audio_wrong");

    $('#questionDisplay').empty();
    $('#answerOption').empty();

    $('#multipleQuestionDisplay').empty();
    $('#multipleAnswerDisplay').empty();

    if(game_type != null)
    {
        $("#questionDisplay").hide();
        $("#answerOption").hide();

        $("#multipleQuestionDisplay").show();
        $("#multipleAnswerDisplay").show();


        if(quiz_image != 0)
        {
            $('#multipleQuestionDisplay').append('<div class="multiple-question multiple-question-image">'+
                                            '<img src="'+baseURL+'/images/quiz/'+listQuestion[p].question_id+'/banner/'+listQuestion[p].quiz_image+'" alt="Jakarta">'+
                                            '<div class="multiple-question-content">'+
                                                '<p>'+listQuestion[p].question+'</p>'+
                                             '</div>'+
                                          '</div>');
        }
        else if(quiz_video != null){
            $('#multipleQuestionDisplay').append('<div class="multiple-question multiple-question-image">'+
                                            '<video width="100%" loop="true" autoplay="autoplay" controls >'+
                                                '<source src="'+baseURL+'/theme/video/'+listQuestion[p].question_id+'/'+listQuestion[p].quiz_video+'" type="video/mp4" />'+
                                            '</video>'+
                                            '<div class="multiple-question-content">'+
                                                '<p>'+listQuestion[p].question+'</p>'+
                                             '</div>'+
                                          '</div>');
        }
        else
        {
            $('#multipleQuestionDisplay').append(`<div class="multiple-question" >
                                                <div class="multiple-question-content">
                                                    <p>${listQuestion[p].question}</p>
                                                </div>
                                            </div>
                                        `);
        }

        listQuestion[p].questionChoice.forEach(function (apart, index) {
            $('#multipleAnswerDisplay').append(`<li class="multiple-answer_list choosenAnswer" data-question_id="`+listQuestion[p].question_id+`">
                <div class='d-none' id='idChoice'>${apart.id}</div>
                    <input type="radio" class="${apart.id}" name="answer" id="question${index}">
                            <label class="${apart.id}" for="answer${index}">
                                <span class="bullet">${index+1}.</span>
                                ${apart.choice}
                            </label>
                        </li>
            `);
        });
    }
    else
    {
        $("#multipleQuestionDisplay").hide();
        $("#multipleAnswerDisplay").hide();

        $("#questionDisplay").show();
        $("#answerOption").show();

        if(quiz_image != 0)
        {
            $('#questionDisplay').append('<div class="swipe-card swipe-card-image">'+
                                            '<img src="'+baseURL+'/images/quiz/'+listQuestion[p].question_id+'/banner/'+listQuestion[p].quiz_image+'" alt="Jakarta">'+
                                            '<div class="swipe-card-content">'+
                                                '<p>'+listQuestion[p].question+'</p>'+
                                             '</div>'+
                                          '</div>');
        }
        else if(quiz_video != null)
        {
            $('#questionDisplay').append('<div class="swipe-card swipe-card-image">'+
                                            '<video width="100%" loop="true" autoplay="autoplay" controls >'+
                                                '<source src="'+baseURL+'/theme/video/'+listQuestion[p].question_id+'/'+listQuestion[p].quiz_video+'" type="video/mp4" />'+
                                            '</video>'+
                                            '<div class="swipe-card-content">'+
                                                '<p>'+listQuestion[p].question+'</p>'+
                                             '</div>'+
                                          '</div>');
        }
        else
        {
            $('#questionDisplay').append(`<div class="swipe-card" >
                                            <div class="swipe-card-content">
                                                <p>${listQuestion[p].question}</p>
                                             </div>
                                          </div>
                                        `);
        }

        //thumbs up/down design
        // $('#answerOption').append(`<div class="swipe-status-btn nope">
        // <div class='d-none' id='idChoice'>${listQuestion[p].questionChoice[0].id}</div>
        // <span class="qf-icon-thumbs-down" id="nope"></span>
        // </div>
        // <div class="swipe-status-btn love">
        // <div class='d-none' id='idChoice'>${listQuestion[p].questionChoice[1].id}</div>
        // <span class="qf-icon-thumbs-up" id="love"></span>
        // </div>
        // `);

        //oval yes/no design
        $('#answerOption').append(`<div class="swipe-status-btn oval nope">
                                        <div class='d-none' id='idChoice'>${listQuestion[p].questionChoice[0].id}</div>
                                        <span id="nope">No</span>
                                    </div>
                                    <div class="swipe-status-btn oval love">
                                        <div class='d-none' id='idChoice'>${listQuestion[p].questionChoice[1].id}</div>
                                        <span id="love">Yes</span>
                                    </div>
                                `);
    }

    var correct_answer = {
            background : "green",
            color: "white"
        };
    var wrong_answer = {
        background : "red",
        color: "white"
    };

    // Swipe card elements (14.02.2023)
    const cardElements = document.querySelectorAll('.swipe-card');

    cardElements.forEach(cardElement => {
        const hammertime = new Hammer(cardElement);

        // Implement swipe event handling
        let posX = 0;
        let swipeDirection = '';
        hammertime.on('pan', (event) => {
            posX += event.deltaX;
            // Divide by a larger number for slower movement
            cardElement.style.transform = `translateX(${posX / 10}px)`;

            var setTimer = localStorage.getItem('setTimer');
            var question_id = listQuestion[p].question_id;
            var answerRightFalse = true;

            if (event.isFinal) {
                if (posX < -100) {
                    swipeDirection = 'left';

                    var answer = listQuestion[p].questionChoice[0].id;
                    qna[question_id] = answer;

                    var process_type = "nope";
                    answerChecking(answerRightFalse,question_id,answer,process_type,setTimer);

                } else if (posX > 100) {
                    swipeDirection = 'right';

                    var answer = listQuestion[p].questionChoice[1].id;
                    qna[question_id] = answer;

                    var process_type = "love";
                    answerChecking(answerRightFalse,question_id,answer,process_type,setTimer);

                }
                if (swipeDirection !== '') {
                    cardElement.classList.add('card--swiped-' + swipeDirection);
                    setTimeout(() => {
                        cardElement.remove();
                    }, 300);
                } else {
                    cardElement.style.transform = '';
                }
                posX = 0;
            }
        });
    });

    // Swipe card elements (14.02.2023)

    $('.love').click(function (e) {
        e.preventDefault();

        var setTimer = localStorage.getItem('setTimer');

        var answer = $(this).find('#idChoice').text();
        var question_id = listQuestion[p].question_id;
        var answerRightFalse = true;

        var cards = document.querySelectorAll('.swipe-card:not(.removed)');
        var moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;
        var card = cards[0];
        card.classList.add('removed');
        card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';

        qna[question_id] = answer;

        var process_type = "love";
        answerChecking(answerRightFalse,question_id,answer,process_type,setTimer);
    });

    $('.nope').click(function (e) {
        e.preventDefault();

        var setTimer = localStorage.getItem('setTimer');

        var answer = $(this).find('#idChoice').text();
        var question_id = listQuestion[p].question_id;
        var answerRightFalse = true;

        var cards = document.querySelectorAll('.swipe-card:not(.removed)');
        var moveOutWidth = document.body.clientWidth * 1.5;

        if (!cards.length) return false;
        var card = cards[0];
        card.classList.add('removed');
        card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';

        qna[question_id] = answer;

        var process_type = "nope";
        answerChecking(answerRightFalse,question_id,answer,process_type,setTimer);
    });

    //02.02.2023
    $('.choosenAnswer').click(function (e) {
        e.preventDefault();

        var setTimer = localStorage.getItem('setTimer');

        var answer = $(this).find('#idChoice').text();
        var question_id = $(this).data('question_id');
        var answerRightFalse = true;

        // var cards = document.querySelectorAll('.swipe-card:not(.removed)');
        // var moveOutWidth = document.body.clientWidth * 1.5;

        // if (!cards.length) return false;
        // var card = cards[0];
        // card.classList.add('removed');
        // card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';

        qna[question_id] = answer;

        var process_type = "multiple";
        answerChecking(answerRightFalse,question_id,answer,process_type,setTimer);
    });

    function answerChecking(answerRightFalse,question_id,answer,process_type,setTimer)
    {
        if (answerRightFalse) {
            currentQuestion++;

            if(currentQuestion > maxQuestion){

                // $("circle").css("animation", "countdown 20s linear infinite forwards");
                resultGenarate(qna,pair_id);
            }
            else{

                clearInterval(timer);
                $('#qno').val(currentQuestion);

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                $.ajax({
                    type : "POST",
                    dataType : "json",
                    url : baseURL + "/quiz/play/answer_check",
                    data : {
                                question_id: question_id,
                                answer: answer,
                            },
                    success:function(data){
                        var correct_answer_id =data.correct_answer_id;
                        if (data.success == 1) {

                            if(process_type == "love")
                            {
                                if(data.answer == "wrong"){
                                    sound_wrong.play();
                                    $(".love").css(wrong_answer);
                                    $(".nope").css(correct_answer);
                                }
                                else{
                                    sound_correct.play();
                                    $(".love").css(correct_answer);
                                }
                            }
                            else if (process_type == "nope")
                            {
                                if(data.answer == "wrong"){
                                    sound_wrong.play();
                                    $(".nope").css(wrong_answer);
                                    $(".love").css(correct_answer);
                                }
                                else{
                                    sound_correct.play();
                                    $(".nope").css(correct_answer);
                                }
                            }
                            else if (process_type == "multiple")
                            {
                                var optCorrect = "label." + correct_answer_id;
                                var optClick = "label." + answer;

                                if(data.answer == "wrong"){
                                    sound_wrong.play();
                                    $(optClick).css('background-color', 'red' );
                                    $(optCorrect).css('background-color', 'green' );
                                }
                                else{
                                    sound_correct.play();
                                    $(optClick).css('background-color', 'green' );
                                }
                            }

                            scoreCalculation(answer,question_id,pair_id);
                        } else {
                            alert(data.massage);
                        }
                    }
                });

                // scoreCalculation(answer,question_id,pair_id);
                // changeQuestion(currentQuestion);

                // Counter
                var countdownNumberEl = document.getElementById('countdown-number');
                var countdown = setTimer;

                timer = setInterval(function() {

                    var t = countdown--;
                    sound.play();
                    localStorage.setItem('setTimer', t);
                    countdownNumberEl.textContent = t;

                    if (countdown === 0) {
                       resultGenarate(qna,pair_id);
                    }
                }, 1000);
            }
        }
    }
}

function changeQuestion(currentQuestion,pair_id,fake_user_score,real_user_score) {

    $("#real_score_start").hide();
    $('#real_score_show').text(real_user_score);
    $("#fake_score_start").hide();
    $('#fake_score_show').text(fake_user_score);

    if(currentQuestion > maxQuestion){
        resultGenarate(qna,pair_id);
    }
    else{
        $('#countdown').val('10');
        question = listQuestion[currentQuestion];
        generateQuestion(currentQuestion,pair_id);
    }
}

function scoreCalculation(answer,question_id,pair_id)
{
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type : "POST",
        dataType : "json",
        url : baseURL + "/quiz/play/score_calculation",
        data : {
                    question_id: question_id,
                    answer: answer,
                    quiz_set_id: quiz_set_id,
                    pair_id:pair_id
                },
        success:function(data){
            if (data.success == 1) {

                var fake_user_score = data.fake_user;
                var real_user_score = data.real_user;

                changeQuestion(currentQuestion,pair_id,fake_user_score,real_user_score);

            } else {
                alert(data.massage);
            }
        }
    });
}

function resultGenarate(qna,pair_id)
{
    clearInterval(timer);
    localStorage.removeItem('setTimer');

    if((qna.length > 0) && (qna.length != null)){
        var myObject = Object.assign({}, qna);
    }
    else{
        var myObject = 0;
    }

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        type : "POST",
        dataType : "json",
        url : baseURL + "/quiz/play/result",
        data : {
                    set_id: quiz_set_id,
                    qna: myObject,
                    pair_id:pair_id
                },
        success:function(data){

            if (data.success == 1) {

                $('#countdown').html('<p>0</p>');
                if(data.result == 'Win'){
                    var winURL = baseURL+'/game/result/win/'+data.id;
                    window.location.href = winURL;

                    history.pushState(null, null, winURL);
                        window.addEventListener('popstate', function () {
                        history.pushState(null, null, winURL);
                    });
                }
                else{
                    var loseURL = baseURL+'/game/result/lose/'+data.id;
                    window.location.href = loseURL;

                    history.pushState(null, null, loseURL);
                        window.addEventListener('popstate', function () {
                        history.pushState(null, null, loseURL);
                    });
                }
            } else {
                alert(data.msg);
            }
        }
    });
}
