//var canvas = document.getElementById('canvas');
//var ctx = canvas.getContext('2d');

//ctx.rect(20,20,150,100);
//ctx.stroke();
//Tic Tac Toe
var height = parseInt(document.getElementById("canvas"));
var width = parseInt(document.getElementById("canvas"));
var boardSections = 400/3;
var board = [["","",""],
             ["","",""],
             ["","",""]];
var currentPlayer ="X";
var win = false;
var winner = "";
var tie =false;

//returns true when your mouse, or other object is within the space you're checking.
var touchingRect = function(x,y,rectX,rectY,rectHeight,rectLength){
    if(x> rectX && x< rectX + rectLength && y>rectY && y< rectY + rectHeight){
        return true;
    }
};
//sets win to true if someone wins, and sets tie to true if all of the places to play are filled.
var checkIfWon = function(){
    tie=true;
    
    for(var i =0;i<3;i++){
        //checks if there are 3 in a row vertically
        if(board[0][i]===board[1][i] && board[1][i] === board[2][i]&& board[2][i]!==""){
           win=true;
           winner = board[0][i];
        }
        //checks if there are 3 in a row horizontally
        if(board[i][0]===board[i][1] && board[i][1] === board[i][2]&& board[i][2]!==""){
            win=true;
            winner = board[i][0];
        }
        //checks if all spaces are filled
        for (var k =0; k<3;k++){
        if(board[k][i]==="" && board[k][i]===""&&board[k][i]===""){
            tie =false;
        }}
    }
    //checks if there's 3 in a row diagonally
    if(board[0][0]===board[1][1]&&board[1][1]===board[2][2]&& board[2][2]!==""){
        win =true;
        winner= board[0][0];
    }
    if(board[2][0] ===board[1][1]&&board[1][1] ===board[0][2]&&board[0][2]!==""){
        win=true;
        winner = board[2][0];
    }
};
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//ctx.rect(20,20,150,100);
//ctx.stroke();

function draw(){
    var h = parseInt(document.getElementById("canvas").getAttribute("height"));
    var w = parseInt(document.getElementById("canvas").getAttribute("width"));
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(217,207,151)";
    ctx.fillRect(0,0,w,h);        
    ctx.font = "20px Georgia";
    ctx.fillStyle ="rgb(255,0,0)";
    ctx.fillText(h,50,50);
    ctx.strokeStyle = "rgb(8,8,8)";
    ctx.lineWidth =20;
    for(var i =0; i< 3; i++){
        for(var k =0; k< 3; k++){
            ctx.fillStyle = "rgb(100,104,142)";
            ctx.fillRect(i*boardSections+5,k*boardSections+5,boardSections-10,boardSections-10);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.font = "100px Georgia";
            ctx.fillText(board[k][i],i*boardSections+25,k*boardSections+100);
        }
    }
    checkIfWon();
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.font = "80px Georgia";
    if(win){
        ctx.fillText(winner+" wins!",50,220);
    }
    if(tie && !win){
        ctx.fillText("You Tied!", 10,220);
    }

    //draw();
}
document.getElementById("canvas").addEventListener("click", playMove);
document.getElementById("canvas").addEventListener("keydown",restartGame);
function playMove(e){
    var parentPosition = getPosition(e.currentTarget);
    var mouseX = e.clientX - parentPosition.x;
    var mouseY = e.clientY - parentPosition.y;

    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText(mouseY,10,100);
       for(var i =0; i< 3; i++){
        for(var k =0; k< 3; k++){
            if(touchingRect(mouseX,mouseY,i*boardSections,k*boardSections,boardSections,boardSections)){
                if(board[k][i] ===""){
                    board[k][i]=currentPlayer;
                    if(currentPlayer ==="X"){
                        currentPlayer ="O";
                    }
                    else{
                        currentPlayer = "X";
                    }
                }
            }
        }
    }
    if(win ===true||tie===true){
        restartGame();
    }
    else{
        draw();
    }
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function restartGame(){
   // var ctx = document.getElementById("canvas").getContext("2d");
    //ctx.fillStyle = "rgb(255,255,255)";
    //ctx.fillText('cat',10,100);
    //var evtobj = window.event? event: e;
    //var unicode =evtobj.keyCode? evtobj.keyCode : evtobj.charCode
    //var actualKey = String.fromCharCode(unicode);
    //if(actualKey === "p"&&win ===true||tie===true){
        board = [["","",""],
                ["","",""],
                ["","",""]];
        win=false;
        currentPlayer = "X";
        draw();
   // }**/
}
draw();
