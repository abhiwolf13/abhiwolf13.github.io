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
    ctx2.font = Math.floor((canvasWidth*20)/720) + "px Arial";
    ctx2.fillText('Athelete 1', 0, canvasHeight);

    a=find_angle(results.poseLandmarks[16],results.poseLandmarks[12],results.poseLandmarks[24]);
    b=find_angle(results.poseLandmarks[15],results.poseLandmarks[11],results.poseLandmarks[23]);
    c=find_angle(results.poseLandmarks[25],results.poseLandmarks[23],results.poseLandmarks[26]);


    msgtosend=new Paho.MQTT.Message(JSON.stringify([a,b,c]));
    msgtosend.destinationName='athelete';
    mqtt.send(msgtosend);
    mqtt.onMessageArrived=function(msg){
        msg=msg.payloadString;
        msg=JSON.parse(msg);
        coachlandmarks=msg;
        // console.log(typeof msg);
        
    }
    if(coachlandmarks!=null){

       if(c>coachlandmarks[0] && a>coachlandmarks[1] && b>coachlandmarks[2]){
        drawConnectors(ctx2, results.poseLandmarks, POSE_CONNECTIONS,
            {color: '#00ff00'});
       }
       else{
        drawConnectors(ctx2, results.poseLandmarks, POSE_CONNECTIONS,
            {color: 'white'}); 
        }

        ctx2.font = Math.floor((canvasWidth*20)/720) + "px Arial";
        ctx2.textAlign = "left";
        ctx2.globalAlpha=0.6;
        ctx2.fillStyle='black';
        ctx2.fillRect(0,canvasHeight*0.5,0.24*canvasWidth,canvasHeight*0.3);
        ctx2.globalAlpha=1;
        ctx2.fillStyle='red';
        if(c>=coachlandmarks[0]){
            ctx2.fillStyle='#00ff00';
        }
        ctx2.fillText('Leg-Hip-Leg: '+coachlandmarks[0], 0*canvasWidth, 0.58*canvasHeight);
        ctx2.fillStyle='red';
        if(a>=coachlandmarks[1]){
            ctx2.fillStyle='#00ff00';
        }
        ctx2.fillText('Left Shoulder: '+coachlandmarks[1], 0*canvasWidth, 0.68*canvasHeight);
        ctx2.fillStyle='red';
        if(b>=coachlandmarks[2]){
            ctx2.fillStyle='#00ff00';
        }
        ctx2.fillText('Right Shoulder: '+coachlandmarks[2], 0*canvasWidth, 0.78*canvasHeight);
        

    }

    

}