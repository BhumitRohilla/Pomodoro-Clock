let display = document.getElementById("display");
let title = document.getElementById("title");
let startPauseBtn = document.getElementById("start-pause");
let reset = document.getElementById("reset");
let plusSession = document.getElementById("session-time-+")
let minusSession = document.getElementById("session-time--");
let plusBreak = document.getElementById("break-time-+");
let minusBreak = document.getElementById("break-time--");
let sessionDisplay =document.getElementById("session-time");
let breakDisplay = document.getElementById("break-time");

let counter = 0;
let sessionTime = 15;
let breakTime = 1;
let sessionCount = 1;
let r = document.querySelector(":root");
let borderOffset = 0; 
let border = document.getElementById("animate-obj");
let min = 0;
let sec = 0;

let intervalId;
let sessionTimer = true;
// console.log(display,title,startPauseBtn,reset,plusSession,minusSession,plusBreak,minusBreak);

startPauseBtn.addEventListener("click",startCounter);
reset.addEventListener("click",resetFun);

console.log(plusBreak);

function startCounter(){
    intervalId = setInterval(counterFun,1000);
    startPauseBtn.innerHTML = "Pause";
    startPauseBtn.removeEventListener("click",startCounter);
    startPauseBtn.addEventListener("click",pauseCounter);
    plusSession.setAttribute("disabled","true");
    minusSession.setAttribute("disabled",true);
    plusBreak.setAttribute("disabled",true);
    minusBreak.setAttribute("disabled",true);
}

function counterFun(){
    counter++;
    console.log(counter);
    
    if(sessionTimer){
        borderOffset =  parseInt(counter/(sessionTime*60)*600);
    }else{
        borderOffset =  parseInt(counter/(breakTime*60)*600);
    }

    r.style.setProperty('--time',borderOffset);

    if(sessionTimer && sessionTime == parseInt(counter/60)){
        breakTimer();
    }

    if( !sessionTimer && breakTime == parseInt(counter/60)){
        sessionFunc();
    }

    let secString;
    let minString;
    
    sec = counter % 60;
    min = parseInt(counter / 60);
    
    let secToDisp =  59 -sec;
    let minToDisp = sessionTime - min -1 ;

    if(!sessionTimer){
        minToDisp = breakTime - min -1;
    }

    if(sessionTime == 0 && sessionTimer){
        minToDisp = 0;
        secToDisp =0;
    }

    if(!sessionTimer && breakTime == 0){
        minToDisp = 0;
        secToDisp =0;
    }

    if(secToDisp <= 9){
        secString='0'+ secToDisp;
    }else{ 
        secString = secToDisp.toString();
    }


    if(minToDisp < 9){
        minString = '0' + minToDisp;
    }else{
        minString = ''+minToDisp;
    }    
    
    display.innerHTML = `${minString}:${secString}`;

}

function pauseCounter(){
    clearInterval(intervalId);
    startPauseBtn.innerHTML = "Start"
    startPauseBtn.removeEventListener("click",pauseCounter);
    startPauseBtn.addEventListener("click",startCounter);
}

function resetFun(){
    plusSession.removeAttribute("disabled");
    minusSession.removeAttribute("disabled");
    plusBreak.removeAttribute("disabled");
    minusBreak.removeAttribute("disabled");
    console.log(plusSession);
    borderOffset = 600;
    r.style.setProperty("--time",600);
    display.innerHTML = "00:00";

    startPauseBtn.innerHTML = "Start";
    startPauseBtn.removeEventListener("click",pauseCounter);
    startPauseBtn.addEventListener("click",startCounter);

    counter = 0;
    clearInterval(intervalId);
    sessionTime = 15;
    sessionDisplay.innerHTML = "15 min";
    breakDisplay.innerHTML = '1 min';
    breakTime = 1;
    
    sessionCount = 0;
    sessionFunc();


}

function plusSessionPress(){
    sessionTime++;
    sessionDisplay.innerHTML = `${sessionTime} min`
}
function minusSessionPress(){
    if(sessionTime == 0){
        return ;
    }
    sessionTime--;
    sessionDisplay.innerHTML = `${sessionTime} min`
}
function plusBreakPress(){
    breakTime++;
    breakDisplay.innerHTML = `${breakTime} min`;
}
function minusBreakPress(){
    if(breakTime == 0){
        return ;
    }
    breakTime--;
    breakDisplay.innerHTML = `${breakTime} min`;
}


function breakTimer(){
    border.setAttribute("id","animate-obj-break");
    sessionTimer = false;
    borderOffset = 0;
    display.setAttribute("class","breakMode");
    title.innerHTML = "Break!";
    console.log("Break Time");
    counter = 0;
    min  = 0;
    sec = 0;
}

function sessionFunc(){
    borderOffset = 0;
    border.setAttribute("id","animate-obj");
    sessionCount++;
    title.innerHTML = `Session ${sessionCount}`
    sessionTimer = true;
    display.setAttribute("class","sessionMode")
    console.log("Session Time");
    counter = 0;
    min = 0;
    sec = 0;
}