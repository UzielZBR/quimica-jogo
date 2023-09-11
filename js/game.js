"use strict";
class GameC {
    static States = {
        LoadingScreen: 0,
        Start: 1,
        Round1: 2,
        Round2: 3,
        Round3: 4,
        LastQuestion: 5,
        End: 6
    };
    State = GameC.States.LoadingScreen;
    CurrentReward = 0;
    CurrentQuestion = 0;
    QuestionIndex = 0;
    UsedQuestions = [];
    Buttons = [];
    Lost = false;
    Stopped = false;
    Won = false;
    constructor() {
        this.loadingScreen();
    }
    addButton(button) {
        this.Buttons.push(button);
    }
    removeButton(button) {
        this.Buttons.splice(this.Buttons.indexOf(button), 1);
    }
    loadingScreen() {
        var button = {
            Text: "Iniciar",
            Text_Height: 22,
            Width: 250,
            Height: 120,
            X_Pos: Math.floor((CANVAS_WIDTH - 250) / 2),
            Y_Pos: Math.floor((CANVAS_HEIGHT - 120) / 2),
            Callback: () => { this.start(); }
        };
        this.addButton(button);
        setTimeout(() => requestAnimationFrame(draw), 660);
    }
    start() {
        this.State = GameC.States.Start;
        this.removeButton(this.Buttons[0]);
        requestAnimationFrame(draw);
        setTimeout(() => { }, 1100);
        this.round1();
    }
    lose() {
        for (let button of this.Buttons)
            this.removeButton(button);
        Game.Lost = true;
        requestAnimationFrame(draw);
    }
    stop() {
        for (let button of this.Buttons)
            this.removeButton(button);
        Game.Stopped = true;
        requestAnimationFrame(draw);
    }
    win() {
        for (let button of this.Buttons)
            this.removeButton(button);
        Game.Won = true;
        requestAnimationFrame(draw);
    }
    nextQuestion() {
        while (true) {
            this.QuestionIndex = Math.floor(Math.random() * 16);
            if (!this.UsedQuestions.includes(this.QuestionIndex) || this.UsedQuestions.length == 16)
                break;
        }
        this.UsedQuestions.push(this.QuestionIndex);
        Timer = 0;
        Game.CurrentReward = 1000 * (10 ** (Game.State - 2)) * Game.CurrentQuestion;
        requestAnimationFrame(draw);
    }
    answer1() {
        var question = questions[this.QuestionIndex];
        if (question.Answer + 1 != 1) {
            this.lose();
            return;
        }
        if (this.State == 5) {
            this.State++;
            this.win();
            return;
        }
        this.CurrentQuestion++;
        if (this.CurrentQuestion == 6) {
            this.CurrentQuestion = 1;
            this.State++;
        }
        this.nextQuestion();
    }
    answer2() {
        var question = questions[this.QuestionIndex];
        if (question.Answer + 1 != 2) {
            this.lose();
            return;
        }
        if (this.State == 5) {
            this.State++;
            this.win();
            return;
        }
        this.CurrentQuestion++;
        if (this.CurrentQuestion == 6) {
            this.CurrentQuestion = 1;
            this.State++;
        }
        this.nextQuestion();
    }
    answer3() {
        var question = questions[this.QuestionIndex];
        if (question.Answer + 1 != 3) {
            this.lose();
            return;
        }
        if (this.State == 5) {
            this.State++;
            this.win();
            return;
        }
        this.CurrentQuestion++;
        if (this.CurrentQuestion == 6) {
            this.CurrentQuestion = 1;
            this.State++;
        }
        this.nextQuestion();
    }
    answer4() {
        var question = questions[this.QuestionIndex];
        if (question.Answer + 1 != 4) {
            this.lose();
            return;
        }
        if (this.State == 5) {
            this.State++;
            this.win();
            return;
        }
        this.CurrentQuestion++;
        if (this.CurrentQuestion == 6) {
            this.CurrentQuestion = 1;
            this.State++;
        }
        this.nextQuestion();
    }
    round1() {
        this.State = GameC.States.Round1;
        this.CurrentQuestion = 1;
        var button_1 = {
            Text: "A1",
            Text_Height: 13,
            Width: 216,
            Height: 32,
            X_Pos: 162,
            Y_Pos: 204,
            Callback: () => { this.answer1(); },
            Draw: false
        };
        var button_2 = {
            Text: "A2",
            Text_Height: 13,
            Width: 216,
            Height: 32,
            X_Pos: 162,
            Y_Pos: 246,
            Callback: () => { this.answer2(); },
            Draw: false
        };
        var button_3 = {
            Text: "A3",
            Text_Height: 13,
            Width: 216,
            Height: 32,
            X_Pos: 162,
            Y_Pos: 290,
            Callback: () => { this.answer3(); },
            Draw: false
        };
        var button_4 = {
            Text: "A4",
            Text_Height: 13,
            Width: 216,
            Height: 32,
            X_Pos: 162,
            Y_Pos: 335,
            Callback: () => { this.answer4(); },
            Draw: false
        };
        var button_stop = {
            Text: "S",
            Text_Height: 10,
            Width: 65,
            Height: 30,
            X_Pos: 217,
            Y_Pos: 395,
            Callback: () => { this.stop(); },
            Draw: false
        };
        this.addButton(button_1);
        this.addButton(button_2);
        this.addButton(button_3);
        this.addButton(button_4);
        this.addButton(button_stop);
        this.nextQuestion();
        requestAnimationFrame(draw);
    }
}
var questions = [
    {
        Question: "Ao adicionar um próton a um núcleo de átomo de hidrogênio adquirimos qual elemento químico?",
        Answers: ["Berílio", "Carbono", "Hélio", "Lítio"],
        Answer: 2,
        Filenames: {
            Folder: "adicionar-proton",
            Answers: ["berilio", "carbono", "helio", "litio"]
        }
    },
    {
        Question: "Quais os gases mais comuns na atmosfera?",
        Answers: ["Argônio e Oxigênio", "Nitrogênio e Argônio", "Oxigênio e Nitrogênio", "Vapor de água e Argônio"],
        Answer: 2,
        Filenames: {
            Folder: "gases-atmosfera",
            Answers: ["ao", "na", "on", "va"]
        }
    },
    {
        Question: "Qual das seguintes letras representa o número de massa de um átomo:",
        Answers: ["A", "n", "p", "Z"],
        Answer: 0,
        Filenames: {
            Folder: "letra-massa-atomo",
            Answers: ["A", "n", "p", "Z"]
        }
    },
    {
        Question: "Quando um átomo possui mais elétrons que prótons, dizemos que ele é:",
        Answers: ["Um ânion", "Bivalente", "Um cátion", "Positivo"],
        Answer: 0,
        Filenames: {
            Folder: "mais-eletrons",
            Answers: ["anion", "bivalente", "cation", "positivo"]
        }
    },
    {
        Question: "Quando um átomo possui menos elétrons que prótons, dizemos que ele é:",
        Answers: ["Um ânion", "Bivalente", "Um cátion", "Negativo"],
        Answer: 2,
        Filenames: {
            Folder: "menos-eletrons",
            Answers: ["anion", "bivalente", "cation", "negativo"]
        }
    },
    {
        Question: "Qual dos seguintes elementos é um metal alcalino:",
        Answers: ["Césio", "Polônio", "Rádio", "Silício"],
        Answer: 0,
        Filenames: {
            Folder: "metal-alcalino",
            Answers: ["cesio", "polonio", "radio", "silicio"]
        }
    },
    {
        Question: "Em qual método de separação de misturas deixa-se a mistura em repouso?",
        Answers: ["Decantação", "Destilação", "Filtração", "Vaporização"],
        Answer: 0,
        Filenames: {
            Folder: "mistura-repouso",
            Answers: ["decantacao", "destilacao", "filtracao", "vaporizacao"]
        }
    },
    {
        Question: "O modelo atômico mais atual foi proposto por qual cientista?",
        Answers: ["Ernest Rutherford", "Erwin Schrodinger", "Joseph Thomson", "Niels Bohr"],
        Answer: 1,
        Filenames: {
            Folder: "modelo-atual",
            Answers: ["ernest-rutherford", "erwin-schrodinger", "joseph-thomson", "niels-bohr"]
        }
    },
    {
        Question: "Qual dos seguintes elementos não é um metal alcalinoterroso",
        Answers: ["Berílio", "Cálcio", "Germânio", "Magnésio"],
        Answer: 2,
        Filenames: {
            Folder: "nao-alcalinoterroso",
            Answers: ["berilio", "calcio", "germanio", "magnesio"]
        }
    },
    {
        Question: "Qual dos seguintes elementos químicos é um não metal?",
        Answers: ["Cálcio", "Iodo", "Potássio", "Sódio"],
        Answer: 1,
        Filenames: {
            Folder: "nao-metal",
            Answers: ["calcio", "iodo", "potassio", "sodio"]
        }
    },
    {
        Question: "Quantos nêutrons há num átomo de Carbono-12?",
        Answers: ["4", "6", "8", "12"],
        Answer: 1,
        Filenames: {
            Folder: "neutrons-carbono",
            Answers: ["4", "6", "8", "12"]
        }
    },
    {
        Question: "Quantos níveis um elétron pode ocupar na eletrosfera de um átomo?",
        Answers: ["5", "6", "7", "8"],
        Answer: 2,
        Filenames: {
            Folder: "niveis-eletrosfera",
            Answers: ["5", "6", "7", "8"]
        }
    },
    {
        Question: "O núcleo do átomo contém que partículas?",
        Answers: ["Elétrons e Prótons", "Nêutrons e Elétrons", "Prótons e Nêutrons", "Somente elétrons"],
        Answer: 2,
        Filenames: {
            Folder: "nucleo-contem",
            Answers: ["ep", "ne", "pn", "se"]
        }
    },
    {
        Question: "Qual é o símbolo na tabela periódica para o elemento ouro?",
        Answers: ["Ag", "Au", "Gu", "Ou"],
        Answer: 1,
        Filenames: {
            Folder: "ouro-simbolo",
            Answers: ["Ag", "Au", "Gu", "Ou"]
        }
    },
    {
        Question: "O modelo atômico \"Pudim de Passas\" foi proposto por qual físico?",
        Answers: ["Ernest Rutherford", "John Dalton", "Joseph Thomson", "Niels Bohr"],
        Answer: 2,
        Filenames: {
            Folder: "pudim-de-passas",
            Answers: ["ernest-rutherford", "john-dalton", "joseph-thomson", "niels-bohr"]
        }
    },
    {
        Question: "A tabela periódica é dividida em um número fixo de colunas e de linhas, respectivamente:",
        Answers: ["17 e 7", "17 e 9", "18 e 7", "18 e 9"],
        Answer: 2,
        Filenames: {
            Folder: "tabela-colunas-linhas",
            Answers: ["17e7", "17e9", "18e7", "18e9"]
        }
    },
];
