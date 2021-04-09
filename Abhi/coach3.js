function MQTTconnect(){
    console.log('connecting to broker.emqx.io'+" "+8083);
    mqtt=new Paho.MQTT.Client('broker.emqx.io',8083,'coachjs');
    mqtt.connect({timeout:3,
        onSuccess:function(){console.log('connected');},
        onFailure:function(){setTimeout(MQTTconnect,500)}});

}
MQTTconnect();

document.getElementById('formelement').style.display='block';
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

var athletelandmarks=null;
var hitradius=0.05*canvasWidth;
var leftcolor='#00d2ff';
var rightcolor='#00d2ff';
function Exercise(results) {
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        mqtt.subscribe("athelete");
        results.poseLandmarks.push(slider.value);
    msgtosend=new Paho.MQTT.Message(JSON.stringify(results.poseLandmarks));
    msgtosend.destinationName='coach';
    mqtt.send(msgtosend);
    mqtt.onMessageArrived=function(msg){
        msg=msg.payloadString;
        msg=JSON.parse(msg);
        athletelandmarks=msg;
        // console.log(typeof msg);
        // console.log(msg[0]);
    }

    if(athletelandmarks!=null){
        drawConnectors(ctx2, athletelandmarks, POSE_CONNECTIONS,
            {color: 'blue'});
    }
    

    leftcolor='#00d2ff';
    rightcolor='#00d2ff';
    if(Math.pow(Math.abs((results.poseLandmarks[20].x-athletelandmarks[28].x)*canvasWidth),2)+Math.pow(Math.abs((results.poseLandmarks[20].y-athletelandmarks[28].y)*canvasHeight),2)<=hitradius*hitradius){
        leftcolor='#00FF00';
    }
    if(Math.pow(Math.abs((results.poseLandmarks[19].x-athletelandmarks[27].x)*canvasWidth),2)+Math.pow(Math.abs((results.poseLandmarks[19].y-athletelandmarks[27].y)*canvasHeight),2)<=hitradius*hitradius){
        rightcolor='#00FF00';
    }
    drawLandmarks(ctx2, [results.poseLandmarks[19]],
                {color: 'white', fillColor:rightcolor,lineWidth: 5, radius: hitradius});
    drawLandmarks(ctx2, [results.poseLandmarks[19]],
                    {color: 'white', fillColor:leftcolor,lineWidth: 5, radius: hitradius});

}