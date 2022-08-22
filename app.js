const board=document.querySelector(".board");
const palette =document.querySelector(".palette");
const next =document.querySelector(".next p");
const Score =document.querySelector(".score p");

let colorArray=["yellow","green","red","purple","blue","pink"];
let boardbounds=board.getBoundingClientRect()
let squareVelocity
let score
let choosecolor
let notstarted=false

let drawsquare =()=>{
    setInterval(()=>{
        let square =document.createElement("div");
        square.classList.add("square");
        let x=Math.floor(Math.random()*board.clientWidth);
        square.style.top="-20px";
        square.style.left=x+"px";
        square.style.right=x+20+"px";
        square.style.background=chooserandomcolor();
        board.appendChild(square);

    },600)
};

let chooserandomcolor=()=>{
    let index = Math.floor(Math.random()*colorArray.length);
    return colorArray[index];
};
//drawsquare();
let nextColor=()=>{
    let index = Math.floor(Math.random()*colorArray.length);
    next.style.background=colorArray[index];
    choosecolor=colorArray[index];
  
};



let squaremove=()=>{
    let squares=document.querySelectorAll(".square")
    for(let i=0;i<squares.length;i++){
        let palette1=palette.getBoundingClientRect();
        let presentsquare=squares[i].getBoundingClientRect();
        let squarecolor=squares[i].style.background
        squares[i].style.top=
        parseInt(squares[i].style.top)+1+squareVelocity+"px";

        if(presentsquare.bottom>palette1.top
            && presentsquare.left>palette1.left
            && palette1.right>presentsquare.right
            )
            {
                if(squarecolor===choosecolor){
                    score=score+5
                    Score.textContent=score;
                    board.removeChild(squares[i]);
                    nextColor();
                    //squareVelocity=
                }
                else{
                    initial();
            }

        }
        if(presentsquare.bottom>boardbounds.bottom){
            board.removeChild(squares[i]);
        }

    }
requestAnimationFrame(squaremove);


};


let initial=()=>{
    let squares=document.querySelectorAll(".square")
    squares.forEach(item=>{
        item.remove();
    })
    squareVelocity=0.2;
    score=0;
    Score.textContent=score;
    if(!notstarted){
        drawsquare()
        nextColor()
        squaremove();
        notstarted=true;
    }
}



window.addEventListener("mousemove",(e)=>{
    palette.style.left=e.x+"px";

});
initial();