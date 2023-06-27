let start = document.querySelector('.start');
let main=document.querySelector('main');
let modal=document.querySelector('.modal');
let endModal=document.querySelector('.modal_end')
let timer=document.querySelector('#timer');
let cont=document.querySelector('.main_container');
let countRound=document.querySelector('.round');
let countScore=document.querySelector('.score');
const circles=document.querySelectorAll('.circles')

let score=0;
let time=50,reStart=time;
let round=1;

let numBlocks = 4;
let colors = [];
let pickedColor;
let Step;

//Начало игры
function Start(){
    main.classList.remove('blur');
    modal.style.display='none';
    Step= setInterval(timeStep,100)
    countRound.innerHTML=round;
    countScore.innerHTML=score;
    setupSquares()
    reset()
}
start.addEventListener('click', ()=>{
        Start()
    });



//Создание цвета
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

//Создание списка цветов
function generateRandomColors(num) {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(randomColor())
    }
    return arr;
}

//Цвет для большого окна
function pickColor() {
    let rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
}

//Цвета для кружков
function changeColors(color) {
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.background = color;
    }
}

//
function setupSquares() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].addEventListener("click", function() {
            let clickedColor = this.style.background;//цвет кружка
            if(clickedColor == pickedColor) {
                score+=10;
                // changeColors(clickedColor)
                plusRound()  
                reset();  
                Restart();
            } else {
                cont.style.border='1vw solid red'
                setTimeout(function(){
                    cont.style.border='none'
                },400)
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numBlocks);
    pickedColor = pickColor();
    cont.style.background = pickedColor;
    for (let i = 0; i < circles.length; i++) {
        if (colors[i]) {
            circles[i].style.display = "block"
            circles[i].style.background = colors[i];
        } else {
            circles[i].style.display = "none";
        }
    }
}


//счетчик времени
function timeStep(){
    if(reStart>0 ){
        reStart--;
        timer.innerHTML=`${reStart}`
    }else if(reStart==0){
        setupSquares()
        reset()
        plusRound()
        Restart()
    }
}

function plusRound(){
    if(round<10){
        round++;
        countRound.innerHTML=round
        countScore.innerHTML=score
        Restart()
      }else{
        endGame()
      }
}



//Конец игры
function endGame(){
    clearInterval(Step)
    endModal.style.display='flex'
    main.classList.add('blur');
    document.querySelector('.end_score').innerHTML=score
        document.querySelector('.again').addEventListener('click',()=>{
            playAgain()
        })
}

function playAgain(){
    // reset()
    // setupSquares()
    // reStart=50
    // round=1
    // score=0
    // countRound.innerHTML=round;
    // countScore.innerHTML=score;
    // endModal.style.display='none'
    // main.classList.remove('blur');
    // Start()
    location.reload()
}

//Обновление таймера
function Restart(){
    reStart=50
}


//при загрузке
window.addEventListener('load',()=>{
    reset()
})
//цвета кружков


