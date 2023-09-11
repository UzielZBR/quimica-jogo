for (let i = 0; i < 16; i++) {
    // questions
    let question = questions[i];
    var elem = document.createElement("audio");
    elem.id  = `${question.Filenames.Folder}-pergunta`;
    elem.src = `audios/questoes/${question.Filenames.Folder}/pergunta.mp3`;

    document.head.appendChild(elem);
    
    for (let j = 0; j < 4; j++) {
        var elem2 = document.createElement("audio");
        elem2.id  = `${question.Filenames.Folder}-${question.Filenames.Answers[j]}`;
        elem2.src = `audios/questoes/${question.Filenames.Folder}/${question.Filenames.Answers[j]}.mp3`;

        document.head.appendChild(elem2);
    }

    // valendo
    var pot = Math.floor(i / 5);
    var mult = (i % 5) + 1;

    var elem3 = document.createElement("audio");
    var num = (1000 * (10 ** pot) * mult).toString();
    elem3.id  = num;
    elem3.src = `audios/outros/${num}.mp3`;
    document.head.appendChild(elem3);
}

(function () {
    var proxima = document.createElement("audio");
    proxima.id = "primeira-pergunta";
    proxima.src = "audios/outros/primeira-pergunta.mp3";
    document.head.appendChild(proxima);

    var proxima = document.createElement("audio");
    proxima.id = "proxima-pergunta";
    proxima.src = "audios/outros/proxima-pergunta.mp3";
    document.head.appendChild(proxima);
})();


function introductionAudio(): void {
    
}

function firstQuestionAudio(): void {
    (<HTMLAudioElement>document.getElementById("primeira-pergunta")).play();
}

function nextQuestionAudio(): void {
    (<HTMLAudioElement>document.getElementById("proxima-pergunta")).play();
}

function rewardAudio(): void {
    (<HTMLAudioElement>document.getElementById(Game.CurrentReward.toString())).play();
}

function questionAudio(): void {
    var question = questions[Game.QuestionIndex];
    var id = `${question.Filenames.Folder}-pergunta`;

    (<HTMLAudioElement>document.getElementById(id)).play();
}

var Timer = 0;

var audio_loop = setInterval(() => {
    Timer++;

    if (Timer == 1) {
        if (Game.State == 2 && Game.CurrentQuestion == 1) firstQuestionAudio();
        else nextQuestionAudio();
    }

    if (Game.State >= 2 && Timer == 7) {
        rewardAudio();
    }

    if (Game.State >= 2 && Timer == 13) {
        questionAudio();
    }
}, 300);
