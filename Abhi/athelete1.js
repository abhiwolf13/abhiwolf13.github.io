function MQTTconnect(){
    console.log('connecting to broker.emqx.io'+" "+8084);
    mqtt=new Paho.MQTT.Client('broker.emqx.io',8084,'atheletejs');
    mqtt.connect({timeout:3,
        useSSL: true,
        onSuccess:function(){mqtt.subscribe("coach");console.log('connected');},
        onFailure:function(){setTimeout(MQTTconnect,500)}});

}
MQTTconnect();
var coachlandmarks=null;
var hitradius=0.05*canvasWidth;

var lefthit=0;
var righthit=0;


function Exercise(results) {
    
    a=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
    b=find_angle(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
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

       if(c>coachlandmarks[0]){
        drawConnectors(ctx2, results.poseLandmarks, POSE_CONNECTIONS,
            {color: '#00ff00'});
       }
       else{
        drawConnectors(ctx2, results.poseLandmarks, POSE_CONNECTIONS,
            {color: 'white'}); 
       }
 

        // drawLandmarks(ctx1, [coachlandmarks[0]],
        //             {color: 'white', fillColor:'blue',lineWidth: 5, radius: 1   });
    }

    

}