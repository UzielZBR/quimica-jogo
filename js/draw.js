"use strict";
var Canvas = document.createElement("canvas");
var Context = Canvas.getContext("2d");
document.getElementsByClassName("game")[0].appendChild(Canvas);
const CANVAS_WIDTH = Canvas.width = 1280;
const CANVAS_HEIGHT = Canvas.height = 480;
const BOUNDING_BOX = Canvas.getBoundingClientRect();
const Colors = {
    Background: "#08081e",
    Button: {
        Background: "#820808",
        Border: "#efefff",
        Text: "#e2e8e2"
    },
    Sidebar: {
        Background: "#"
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
}
function draw() {
    Context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    Context.fillStyle = Colors.Background;
    Context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (Game.State >= 2 && Game.State < 6)
        drawRounds();
    for (let button of Game.Buttons)
        requestAnimationFrame(() => { drawButton(button); });
}
