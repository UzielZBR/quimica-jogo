"use strict";
var Canvas = document.createElement("canvas");
var Context = Canvas.getContext("2d");
document.getElementsByClassName("game")[0].appendChild(Canvas);
const CANVAS_WIDTH = Canvas.width = 800;
const CANVAS_HEIGHT = Canvas.height = 480;
const BOUNDING_BOX = Canvas.getBoundingClientRect();
const Colors = {
    Background: "#08081e",
    Button: {
        Background: "#820808",
        Border: "#efefff",
        Text: "#e2e8e2"
    }
};
var BaseImage = new Image();
BaseImage.src = "images/base.png";
function drawButton(button) {
    if (button.Draw === false)
        return;
    Context.strokeStyle = Colors.Button.Border;
    Context.lineWidth = 4;
    Context.strokeRect(button.X_Pos, button.Y_Pos, button.Width, button.Height);
    Context.fillStyle = Colors.Button.Background;
    Context.fillRect(button.X_Pos + 2, button.Y_Pos + 2, button.Width - 4, button.Height - 4);
    Context.font = `normal ${button.Text_Height}pt Oswald`;
    var font_y = button.Y_Pos + Math.floor((button.Height + button.Text_Height) / 2);
    var font_x = button.X_Pos + Math.floor((button.Width - Context.measureText(button.Text).width) / 2);
    Context.fillStyle = Colors.Button.Text;
    Context.fillText(button.Text, font_x, font_y);
}
function drawStart() {
}
function drawRounds() {
    Context.drawImage(BaseImage, 0, 0, 401, 480, 0, 0, 400, 480);
    drawQuestion();
    drawAnswers();
    drawRewards();
}
function drawQuestion() {
    Context.font = "bold 20pt Oswald";
    Context.fillStyle = "aliceblue";
    var question = questions[Game.QuestionIndex];
    Context.fillText(question.Question, 100, 160, 600);
}
function drawAnswers() {
    Context.font = "bold 20pt Oswald";
    Context.fillStyle = "aliceblue";
    var question = questions[Game.QuestionIndex];
    for (let i = 0; i < 4; i++) {
        let answer = question.Answers[i];
        let x_pos = Math.max(165, 270 - Math.floor(Context.measureText(answer).width / 2));
        let y_pos = [204, 246, 290, 335, 395][i] + 28;
        Context.fillText(answer, x_pos, y_pos, 200);
    }
}
function drawRewards() {
    var current = Game.CurrentReward - 1000 * (10 ** (Game.State - 2));
    var lose = current / 2;
    if (Game.State > 2 && Game.CurrentQuestion == 1) {
        current = Game.CurrentReward / 2;
        lose = current / 2;
    }
    Game.Buttons[4].Text = current.toString();
    Context.fillStyle = "red";
    Context.font = "bold 20pt Oswald";
    var y_pos = 420;
    Context.fillText(lose.toString(), 133, y_pos, 66);
    Context.fillText(current.toString(), 221, y_pos, 66);
    Context.fillText(Game.CurrentReward.toString(), 303, y_pos, 66);
}
function drawLost() {
    Context.fillStyle = "white";
    Context.font = "bold 50pt Oswald";
    var reward = (Game.CurrentReward - 1000 * (10 ** (Game.State - 2))) / 2;
    Context.fillText(`Ganhou ${reward.toString()} reais!`, 200, 300);
}
function drawStop() {
    Context.fillStyle = "white";
    Context.font = "bold 50pt Oswald";
    var reward = Game.CurrentReward - 1000 * (10 ** (Game.State - 2));
    Context.fillText(`Ganhou ${reward.toString()} reais!`, 200, 300);
}
function drawWon() {
    Context.fillStyle = "white";
    Context.font = "bold 50pt Oswald";
    Context.fillText(`Parabéns! Ganhou um milhão de reais!`, 100, 300, 600);
}
function draw() {
    Context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    Context.fillStyle = Colors.Background;
    Context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (Game.Lost) {
        drawLost();
        return;
    }
    if (Game.Stopped) {
        drawStop();
        return;
    }
    if (Game.Won) {
        drawWon();
        return;
    }
    if (Game.State >= 2 && Game.State < 6)
        drawRounds();
    for (let button of Game.Buttons)
        requestAnimationFrame(() => { drawButton(button); });
}
