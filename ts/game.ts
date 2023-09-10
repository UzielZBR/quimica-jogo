class GameC {
    static States = {
        LoadingScreen:  0,
        Start:          1,
        Round1:         2,
        Round2:         3,
        Round3:         4,
        LastQuestion:   5,
        End:            6
    }

    State:              number = GameC.States.LoadingScreen;
    CurrentReward:      number = 0;
    CurrentQuestion:    number = 0;
    UsedQuestions:      number[] = [];
    Buttons:            Button[] = [];

    constructor () {
        this.loadingScreen();
    }

    addButton(button: Button): void {
        this.Buttons.push(button);
    }

    removeButton(button: Button): void {
        this.Buttons.splice(this.Buttons.indexOf(button), 1);
    }

    loadingScreen(): void {
        var button: Button = {
            Text:   "Iniciar",
            Text_Height: 22,
            Width:  250,
            Height: 120,
            X_Pos:  Math.floor((CANVAS_WIDTH  - 250) / 2),
            Y_Pos:  Math.floor((CANVAS_HEIGHT - 120) / 2),
            Callback: () => {this.start()}
        }

        this.addButton(button);
        setTimeout(() => requestAnimationFrame(draw), 660);
    }

    start(): void {
        this.State = GameC.States.Start;
        this.removeButton(this.Buttons[0]);

        requestAnimationFrame(draw);

        this.round1();
    }

    nextQuestion(): void {
        while (true) {
            this.CurrentQuestion = Math.floor(Math.random() * 16);
            if (!this.UsedQuestions.includes(this.CurrentQuestion)) break;
        }

        this.UsedQuestions.push(this.CurrentQuestion);

        if (this.State == 2 && this.CurrentQuestion == 1) firstQuestionAudio();
        else nextQuestionAudio();
    }

    answer1(): void {
        console.log("ans1")
    }
    
    answer2(): void {
        console.log("ans2")
        
    }
    
    answer3(): void {
        console.log("ans3")
        
    }
    
    answer4(): void {
        console.log("ans4")

    }

    stop(): void {
        console.log("stop")
    }

    round1(): void {
        this.State = GameC.States.Round1;
        this.CurrentQuestion = 1;

        var button_1: Button = {
            Text:   "A1",
            Text_Height: 13,
            Width:  216,
            Height: 32,
            X_Pos:  162,
            Y_Pos:  204,
            Callback: () => {this.answer1()},
            Draw:   false
        }

        var button_2: Button = {
            Text:   "A2",
            Text_Height: 13,
            Width:  216,
            Height: 32,
            X_Pos:  162,
            Y_Pos:  246,
            Callback: () => {this.answer2()},
            Draw:   false
        }

        var button_3: Button = {
            Text:   "A3",
            Text_Height: 13,
            Width:  216,
            Height: 32,
            X_Pos:  162,
            Y_Pos:  290,
            Callback: () => {this.answer3()},
            Draw:   false
        }

        var button_4: Button = {
            Text:   "A4",
            Text_Height: 13,
            Width:  216,
            Height: 32,
            X_Pos:  162,
            Y_Pos:  335,
            Callback: () => {this.answer4()},
            Draw:   false
        }

        var button_stop: Button = {
            Text:   "S",
            Text_Height: 10,
            Width:  65,
            Height: 30,
            X_Pos:  217,
            Y_Pos:  395,
            Callback: () => {this.stop()}
        }

        this.addButton(button_1);
        this.addButton(button_2);
        this.addButton(button_3);
        this.addButton(button_4);
        this.addButton(button_stop);

        this.nextQuestion();

        requestAnimationFrame(draw);
    }
}

type Question = {
    Question: string,
    Answers:  string[],
    Answer:   number,
    Filenames: {
        Folder: string,
        Answers: string[]
    }
}

var questions: Question[] = [
    {
        Question: "Ao adicionar um próton a um núcleo de átomo de hidrogênio adquirimos qual elemento químico?",
        Answers:  ["Berílio", "Carbono", "Hélio", "Lítio"],
        Answer:   2,
        Filenames: {
            Folder: "adicionar-proton",
            Answers: ["berilio", "carbono", "helio", "litio"]
        }
    },
    {
        Question: "Quais os gases mais comuns na atmosfera?",
        Answers:  ["Argônio e Oxigênio", "Nitrogênio e Argônio", "Oxigênio e Nitrogênio", "Vapor de água e Argônio"],
        Answer:   2,
        Filenames: {
            Folder:  "gases-atmosfera",
            Answers: ["ao", "na", "on", "va"]
        }
    },
    {
        Question: "Qual das seguintes letras representa o número de massa de um átomo:",
        Answers:  ["A", "n", "p", "Z"],
        Answer:   0,
        Filenames: {
            Folder:  "letra-massa-atomo",
            Answers: ["A", "n", "p", "Z"]
        }
    },
    {
        Question: "Quando um átomo possui mais elétrons que prótons, dizemos que ele é:",
        Answers:  ["Um ânion", "Bivalente", "Um cátion", "Positivo"],
        Answer:   0,
        Filenames: {
            Folder:  "mais-eletrons",
            Answers: ["anion", "bivalente", "cation", "positivo"]
        }
    },
    {
        Question: "Quando um átomo possui menos elétrons que protons, dizemos que ele é:",
        Answers:  ["Um ânion", "Bivalente", "Um cátion", "Negativo"],
        Answer:   2,
        Filenames: {
            Folder:  "menos-eletrons",
            Answers: ["anion", "bivalente", "cation", "negativo"]
        }
    },
    {
        Question: "Qual dos seguintes elementos é um metal alcalino:",
        Answers:  ["Césio", "Polônio", "Rádio", "Silício"],
        Answer:   0,
        Filenames: {
            Folder:  "metal-alcalino",
            Answers: ["cesio", "polonio", "radio", "silicio"]
        }
    },
    {
        Question: "Em qual método de separação de misturas deixa-se a mistura em repouso?",
        Answers:  ["Decantação", "Destilação", "Filtração", "Vaporização"],
        Answer:   0,
        Filenames: {
            Folder:  "mistura-repouso",
            Answers: ["decantacao", "destilacao", "filtracao", "vaporizacao"]
        }
    },
    {
        Question: "O modelo atômico mais atual foi proposto por qual cientista?",
        Answers:  ["Ernest Rutherford", "Erwin Schrodinger", "Joseph Thomson", "Niels Bohr"],
        Answer:   1,
        Filenames: {
            Folder:  "modelo-atuaç",
            Answers: ["ernest-rutherford", "erwin-schrodinger", "joseph-thomson", "niels-bohr"]
        }
    },
    {
        Question: "Qual dos seguintes elementos não é um metal alcalinoterroso",
        Answers:  ["Berílio", "Cálcio", "Germânio", "Magnésio"],
        Answer:   2,
        Filenames: {
            Folder:  "nao-alcalinoterroso",
            Answers: ["berilio", "calcio", "germanio", "magnesio"]
        }
    },
    {
        Question: "Qual dos seguintes elementos químicos é um não metal?",
        Answers:  ["Cálcio", "Iodo", "Potássio", "Sódio"],
        Answer:   1,
        Filenames: {
            Folder:  "nao-metal",
            Answers: ["calcio", "iodo", "potassio", "sodio"]
        }
    },
    {
        Question: "Quantos nêutrons há num átomo de Carbono-12?",
        Answers:  ["4", "6", "8", "12"],
        Answer:   1,
        Filenames: {
            Folder:  "neutrons-carbono",
            Answers: ["4", "6", "8", "12"]
        }
    },
    {
        Question: "Quantos níveis um elétron pode ocupar na eletrosfera de um átomo?",
        Answers:  ["5", "6", "7", "8"],
        Answer:   1,
        Filenames: {
            Folder:  "niveis-eletrosfera",
            Answers: ["5", "6", "7", "8"]
        }
    },
    {
        Question: "O núcleo do átomo contém que partículas?",
        Answers:  ["Elétrons e Prótons", "Nêutrons e Elétrons", "Prótons e Nêutrons", "Somente elétrons"],
        Answer:   2,
        Filenames: {
            Folder:  "nucleo-contem",
            Answers: ["ep", "ne", "pn", "se"]
        }
    },
    {
        Question: "Qual é o símbolo na tabela periódica para o elemento ouro?",
        Answers:  ["Ag", "Au", "Gu", "Ou"],
        Answer:   1,
        Filenames: {
            Folder:  "ouro-simbolo",
            Answers: ["", "", "", ""]
        }
    },
    {
        Question: "O modelo atômico \"Pudim de Passas\" foi proposto por qual físico?",
        Answers:  ["Ernest Rutherford", "John Dalton", "Joseph Thomson", "Niels Bohr"],
        Answer:   2,
        Filenames: {
            Folder:  "pudim-de-passas",
            Answers: ["ernest-rutherford", "john-dalton", "joseph-thomson", "niels-bohr"]
        }
    },
    {
        Question: "A tabela periódica é dividida em um número fixo de colunas e de linhas, respectivamente:",
        Answers:  ["17 e 7", "17 e 9", "18 e 7", "18 e 9"],
        Answer:   2,
        Filenames: {
            Folder:  "tabela-colunas-linhas",
            Answers: ["17-7", "17-9", "18-7", "18-9"]
        }
    },
]
