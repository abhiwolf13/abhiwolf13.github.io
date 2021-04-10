function MQTTconnect(){
    console.log('connecting to broker.emqx.io'+" "+8084);
    mqtt=new Paho.MQTT.Client('broker.emqx.io',8084,'atheletejs');
    mqtt.connect({timeout:3,
        useSSL: true,
        onSuccess:function(){mqtt.subscribe("coach");console.log('connected');},
        onFailure:function(){setTimeout(MQTTconnect,500)}});

}
MQTTconnect();
document.getElementById('formelement').style.display='none';
var coachlandmarks=null;
var hitradius=0.05*canvasWidth;

var lefthit=0;
var righthit=0;

function Exercise(results) {
    ctx2.globalAlpha=1;
    ctx2.globalAlpha=1;
    ctx2.font = Math.floor((canvasWidth*20)/720) + "px Arial 900";
    ctx2.fillText('Athelete 2', 0, canvasHeight);

    msgdata=[[results.poseLandmarks[19].x,results.poseLandmarks[19].y],[results.poseLandmarks[20].x,results.poseLandmarks[20].y],[(results.poseLandmarks[23].x+results.poseLandmarks[24].x)/2,(results.poseLandmarks[23].y+results.poseLandmarks[24].y)/2],[(results.poseLandmarks[11].x+results.poseLandmarks[12].x)/2,(results.poseLandmarks[11].y+results.poseLandmarks[12].y)/2]];
    msgtosend=new Paho.MQTT.Message(JSON.stringify(msgdata));
    msgtosend.destinationName='athelete';
    mqtt.send(msgtosend);
    mqtt.onMessageArrived=function(msg){
        msg=msg.payloadString;
        msg=JSON.parse(msg);
        coachlandmarks=msg;
        // console.log(typeof msg);
        
    }
    if(coachlandmarks!=null){


        lefthit=0;
        righthit=0;
        if(Math.pow(Math.abs((results.poseLandmarks[20].x-coachlandmarks[1][0])*canvasWidth),2)+Math.pow(Math.abs((results.poseLandmarks[20].y-coachlandmarks[1][1])*canvasHeight),2)<=hitradius*hitradius){
            lefthit=1;
        }
        if(Math.pow(Math.abs((results.poseLandmarks[19].x-coachlandmarks[0][0])*canvasWidth),2)+Math.pow(Math.abs((results.poseLandmarks[19].y-coachlandmarks[0][1])*canvasHeight),2)<=hitradius*hitradius){
            righthit=1;
        }



        var gradient3=null;
        ctx2.beginPath();
        if(righthit==0){
            gradient3 = ctx2.createLinearGradient(coachlandmarks[0][0]*canvasWidth-hitradius, coachlandmarks[0][1]*canvasHeight-hitradius, coachlandmarks[0][0]*canvasWidth+hitradius,  coachlandmarks[0][1]*canvasHeight+hitradius);
            // Starting colour of gradient for circle
            gradient3.addColorStop(0, '#00d2ff');
            // Ending colour of gradient for circle
            gradient3.addColorStop(1, '#3a7bd5');

        }
        else{
            gradient3='#00FF00';
        }
        ctx2.fillStyle = gradient3;
        ctx2.arc(coachlandmarks[0][0]*canvasWidth,coachlandmarks[0][1]*canvasHeight,hitradius,0,2*Math.PI);
        ctx2.fill();
        ctx2.closePath();
        ctx2.beginPath();
        // Width of outline
        ctx2.lineWidth=5;
        // Colour of outline
        ctx2.strokeStyle='white';
        ctx2.arc(coachlandmarks[0][0]*canvasWidth,coachlandmarks[0][1]*canvasHeight,hitradius,0,2*Math.PI);
        ctx2.stroke();
        ctx2.closePath();
 

        ctx2.beginPath();
        if(lefthit==0){
            gradient3 = ctx2.createLinearGradient(coachlandmarks[1][0]*canvasWidth-hitradius, coachlandmarks[1][1]*canvasHeight-hitradius, coachlandmarks[1][0]*canvasWidth+hitradius,  coachlandmarks[1][1]*canvasHeight+hitradius);
            // Starting colour of gradient for circle
            gradient3.addColorStop(0, '#00d2ff');
            // Ending colour of gradient for circle
            gradient3.addColorStop(1, '#3a7bd5');
        }
        else{
            gradient3='#00FF00';
        }

        ctx2.fillStyle = gradient3;
        ctx2.arc(coachlandmarks[1][0]*canvasWidth,coachlandmarks[1][1]*canvasHeight,hitradius,0,2*Math.PI);
        ctx2.fill();
        ctx2.closePath();
        ctx2.beginPath();
        // Width of outline
        ctx2.lineWidth=5;
        // Colour of outline
        ctx2.strokeStyle='white';
        ctx2.arc(coachlandmarks[1][0]*canvasWidth,coachlandmarks[1][1]*canvasHeight,hitradius,0,2*Math.PI);
        ctx2.stroke();
        ctx2.closePath();
 

        // drawLandmarks(ctx1, [coachlandmarks[0]],
        //             {color: 'white', fillColor:'blue',lineWidth: 5, radius: 1   });
    }

    

}