Canvas.addEventListener("click", handleClick);

function handleClick(evt: MouseEvent): void {
    evt.preventDefault();
    evt.stopPropagation();

    var x_pos = Math.floor(evt.clientX - BOUNDING_BOX.x);
    var y_pos = Math.floor(evt.clientY - BOUNDING_BOX.y);

    for (let button of Game.Buttons) {
        if (x_pos < button.X_Pos || x_pos > (button.X_Pos + button.Width )) continue;
        if (y_pos < button.Y_Pos || y_pos > (button.Y_Pos + button.Height)) continue;

        button.Callback();
    }
}
