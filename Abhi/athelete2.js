function MQTTconnect(){
    console.log('connecting to broker.emqx.io'+" "+8083);
    mqtt=new Paho.MQTT.Client('broker.emqx.io',8083,'atheletejs');
    mqtt.connect({timeout:3,
        onSuccess:function(){console.log('connected');},
        onFailure:function(){setTimeout(MQTTconnect,500)}});

}
MQTTconnect();
var coachlandmarks=null;
var hitradius=0.05*canvasWidth;

var lefthit=0;
var righthit=0;

function Exercise(results) {
    
    mqtt.subscribe("coach");
    msgtosend=new Paho.MQTT.Message(JSON.stringify(results.poseLandmarks));
    msgtosend.destinationName='athelete';
    mqtt.send(msgtosend);
    mqtt.onMessageArrived=function(msg){
        msg=msg.payloadString;
        msg=JSON.parse(msg);
        coachlandmarks=msg;
        // console.log(typeof msg);
        
    }
    if(coachlandmarks!=null){

        if(Math.pow(Math.abs((results.poseLandmarks[28].x-coachlandmarks[20].x)*canvasWidth),2)+Math.pow(Math.abs((results.poseLandmarks[28].y-coachlandmarks[20].y)*canvasHeight),2)<=hitradius*hitradius){
            lefthit=1;
        }
        if(Math.pow(Math.abs((results.poseLandmarks[27].x-coachlandmarks[19].x)*canvasWidth),2)+Math.pow(Math.abs((results.poseLandmarks[27].y-coachlandmarks[19].y)*canvasHeight),2)<=hitradius*hitradius){
            righthit=1;
        }



        var gradient3=null;
        ctx2.beginPath();
        if(righthit==0){
            gradient3 = ctx2.createLinearGradient(coachlandmarks[19].x*canvasWidth-hitradius, coachlandmarks[19].y*canvasHeight-hitradius, coachlandmarks[19].x*canvasWidth+hitradius,  coachlandmarks[19].y*canvasHeight+hitradius);
            // Starting colour of gradient for circle
            gradient3.addColorStop(0, '#00d2ff');
            // Ending colour of gradient for circle
            gradient3.addColorStop(1, '#3a7bd5');

        }
        else{
            gradient3='#00FF00';
        }
        ctx2.fillStyle = gradient3;
        ctx2.arc(coachlandmarks[19].x*canvasWidth,coachlandmarks[19].y*canvasHeight,hitradius,0,2*Math.PI);
        ctx2.fill();
        ctx2.closePath();
        ctx2.beginPath();
        // Width of outline
        ctx2.lineWidth=5;
        // Colour of outline
        ctx2.strokeStyle='white';
        ctx2.arc(coachlandmarks[19].x*canvasWidth,coachlandmarks[19].y*canvasHeight,hitradius,0,2*Math.PI);
        ctx2.stroke();
        ctx2.closePath();
 

        ctx2.beginPath();
        if(lefthit){
            gradient3 = ctx2.createLinearGradient(coachlandmarks[20].x*canvasWidth-hitradius, coachlandmarks[20].y*canvasHeight-hitradius, coachlandmarks[20].x*canvasWidth+hitradius,  coachlandmarks[20].y*canvasHeight+hitradius);
            // Starting colour of gradient for circle
            gradient3.addColorStop(0, '#00d2ff');
            // Ending colour of gradient for circle
            gradient3.addColorStop(1, '#3a7bd5');
        }
        else{
            gradient3='#00FF00';
        }

        ctx2.fillStyle = gradient3;
        ctx2.arc(coachlandmarks[20].x*canvasWidth,coachlandmarks[20].y*canvasHeight,hitradius,0,2*Math.PI);
        ctx2.fill();
        ctx2.closePath();
        ctx2.beginPath();
        // Width of outline
        ctx2.lineWidth=5;
        // Colour of outline
        ctx2.strokeStyle='white';
        ctx2.arc(coachlandmarks[20].x*canvasWidth,coachlandmarks[20].y*canvasHeight,hitradius,0,2*Math.PI);
        ctx2.stroke();
        ctx2.closePath();
 

        // drawLandmarks(ctx1, [coachlandmarks[0]],
        //             {color: 'white', fillColor:'blue',lineWidth: 5, radius: 20   });
    }

    

}