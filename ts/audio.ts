function introductionAudio(): void {
    
}

function firstQuestionAudio(): void {
    var path = "../audios/outros/primeira-questao.mp3";
    var pathRes = import(path);
    console.log(pathRes)
    var audio = new Audio(path);
    console.log(audio.canPlayType("audio/mp3"))
    audio.play();
    setTimeout(() => {}, 1100);
}

function nextQuestionAudio(): void {
    var audio = new Audio("../audios/outros/proxima-questao.mp3");
    audio.play();
    setTimeout(() => {}, 1100);
}
