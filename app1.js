const canvas=document.querySelector("#jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.querySelectorAll(".jsColor");
const range=document.querySelector("#jsRange");
const mode=document.querySelector("#jsMode");
const save=document.querySelector("#jsSave");

const INITIAL_COLOR="black";
const CANVAS_SIZE=700;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;

let painting=false;
let filling=false;

function StartPainting(){
    painting=true;
}

function StopPainting(){
    painting=false;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting=true;
}

function onChangeColor(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function onChangeRange(event){
    const size=event.target.value;
    ctx.lineWidth=size;
}

function onChangeMode(){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    } else{
        filling=true;
        mode.innerText="Paint";
    }
}

function onClickCanvas(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function onCM(event){
    event.preventDefault();
}

function onClickSave(){
    const image=canvas.toDataURL("image/png");
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",StartPainting);
    canvas.addEventListener("mouseup",StopPainting);
    canvas.addEventListener("mouseleave",StopPainting);
    canvas.addEventListener("click",onClickCanvas);
    canvas.addEventListener("contextmenu",onCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", onChangeColor));

if(range){
    range.addEventListener("input", onChangeRange)
}

if(mode){
    mode.addEventListener("click", onChangeMode)
}

if(save){
    save.addEventListener("click",onClickSave)
}