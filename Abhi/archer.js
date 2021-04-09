

var ballradius=0.025*canvasWidth;
var radius=0.05*canvasWidth;
var holdleft=null;
var holdright=null;
var lefthandradius=15;
var righthandradius=15;
var rst=0;
var bump= new Audio('Audio files/Instructions/Gamebump.mp3');
var countaudio=[new Audio('Audio files/Count/1.mp3'),new Audio('Audio files/Count/2.mp3'),new Audio('Audio files/Count/3.mp3')];
var countplayed=0;
var motivation=[new Audio('Audio files/Motivation/come on.mp3'),new Audio('Audio files/Motivation/Good Work.mp3'),new Audio('Audio files/Motivation/Great Going.mp3'),new Audio('Audio files/Motivation/Keep breathing.mp3'),new Audio('Audio files/Motivation/Keep Going.mp3'),new Audio('Audio files/Motivation/Keep Pushing.mp3'),new Audio('Audio files/Motivation/Very Good.mp3'),new Audio('Audio files/Motivation/Very nice Keep going.mp3'),new Audio('Audio files/Motivation/Very Nice.mp3'),new Audio('Audio files/Motivation/you are doing good.mp3')];
var istructaudio=new Audio('Audio files/Instructions/Put balls in the circle of same color.mp3');
var istructplayed=0;
var outlinecolor='black';
var linew=4;
var arrow=0;
var arrowx=0
var arrowyfront=0;
var arrowyback=0;
var release=0;
var gravity=0.05;
var speedy=-0.1;
function Exercise(results) {

    bowstringx=results.poseLandmarks[20].x*canvasWidth+radius
    bowstringupy=results.poseLandmarks[20].y*canvasHeight-2*radius
    bowstringdowny=results.poseLandmarks[20].y*canvasHeight+2*radius

    holdx=results.poseLandmarks[20].x*canvasWidth+radius
    holdy=results.poseLandmarks[20].y*canvasHeight

    ctx1.globalAlpha=1;

    ctx1.beginPath();
    ctx1.strokeStyle='black';
    ctx1.lineWidth=10;
    ctx1.arc(results.poseLandmarks[20].x*canvasWidth+radius, results.poseLandmarks[20].y*canvasHeight-radius, radius,Math.PI, 1.5 * Math.PI);
    ctx1.stroke();


    ctx1.beginPath();
    // ctx1.strokeStyle='black';
    ctx1.arc(results.poseLandmarks[20].x*canvasWidth+radius, results.poseLandmarks[20].y*canvasHeight+radius, radius, 0.5*Math.PI, Math.PI);
    ctx1.stroke();

    if(Math.pow((holdx-results.poseLandmarks[19].x*canvasWidth),2) + Math.pow((holdy-results.poseLandmarks[19].y*canvasHeight),2)<=(0.025*canvasWidth*0.025*canvasWidth)){
        holdright=1;

    }
    if(holdright){
        holdx=results.poseLandmarks[19].x*canvasWidth
        holdy=results.poseLandmarks[19].y*canvasHeight
        arrow=1;
        ctx1.beginPath();
    ctx1.strokeStyle='red';
    ctx1.moveTo(holdx, holdy);
    ctx1.lineTo(holdx-300, (bowstringupy+bowstringdowny)/2);
    ctx1.stroke();  
    }

    if(results.poseLandmarks[19].x>results.poseLandmarks[0].x){
        if(arrow){
            arrowx=holdx;
            arrowback=holdy;
            arrowyfront=results.poseLandmarks[20].y*canvasHeight
            release=1;
            if(arrowyfront<arrowyback){
                speedy=-0.1;

            }
            else{
                speedy=0.1;
            }
        }
        arrow=0;
        holdright=0;
        holdx=results.poseLandmarks[20].x*canvasWidth+radius
        holdy=results.poseLandmarks[20].y*canvasHeight
    }
    if(release){
        if(speedy<=0.1){

            speedy+=gravity;
        }
        for (let index = 0; index < 50; index++) {
            
            
            arrowx-=1;
            arrowyfront+=speedy;
            arrowyback+=speedy;

            ctx1.strokeStyle='red';
            ctx1.moveTo(arrowx, arrowback);
            ctx1.lineTo(arrowx-300, arrowyfront);
            ctx1.stroke(); 
        }
    }
    ctx1.beginPath();
    ctx1.strokeStyle='yellow';
    ctx1.moveTo(bowstringx, bowstringupy);
    ctx1.lineTo(holdx, holdy);
    ctx1.lineTo(bowstringx, bowstringdowny);
    ctx1.stroke();

    // ctx1.endPath();
    // ctx1.beginPath();
    // ctx1.fillStyle='black';
    // ctx1.lineWidth=5;
    // ctx1.arc(0.85*canvasWidth, 0.2*canvasHeight, radius, 0, 2 * Math.PI);
    // ctx1.stroke();

    // ctx1.beginPath();
    // ctx1.fillStyle='black';
    // ctx1.arc(0.15*canvasWidth, 0.2*canvasHeight, radius, 0, 2 * Math.PI);
    // ctx1.stroke();


    

    drawLandmarks(ctx1, [results.poseLandmarks[19]],
                {color: outlinecolor, fillColor:'blue',lineWidth: linew, radius: lefthandradius});

}