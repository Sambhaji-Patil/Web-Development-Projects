let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userscorepara = document.querySelector("#user-score");
const compscorepara = document.querySelector("#comp-score");
const restart = document.querySelector("#restart_button")

 
const gencompchoice = () => {
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
}

const draw = () =>{
    msg.innerText = "Draw!!";
    msg.style.backgroundColor = "#081B31";
}

const showwinner = (userwin,userchoice,compchoice) => {
    if(userwin===true)
    {
        userscore++;
        userscorepara.innerText = userscore;
        msg.innerText = `You win!! Your ${userchoice} beats ${compchoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        compscore++;
        compscorepara.innerText = compscore;
        msg.innerText = `You Lose. ${compchoice} beats ${userchoice}`;
        msg.style.backgroundColor = "red";
    }
};

const Playgame = (userchoice) => {
    const compchoice = gencompchoice();

    if(userchoice===compchoice)
    {
        draw();
    }
    else{
        let userwin = true;
        if(userchoice === "rock")
        {
            userwin = compchoice === "paper" ? false:true;
        }
        else if(userchoice === "paper")
        {
            userwin = compchoice === "scissors" ? false:true;
        }
        else{
            userwin = compchoice === "rock" ? false:true;
        }
        showwinner(userwin,userchoice,compchoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", ()=> {
        const userchoice = choice.getAttribute("id");
        Playgame(userchoice);
    });

restart.addEventListener("click", () => {
    location.reload();
})
});
