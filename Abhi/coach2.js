function MQTTconnect(){
    console.log('connecting to broker.emqx.io'+" "+8084);
    mqtt=new Paho.MQTT.Client('broker.emqx.io',8084,'coachjs');
    mqtt.connect({timeout:3,
        useSSL: true,
        onSuccess:function(){mqtt.subscribe("athelete");console.log('connected');},
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
    ctx2.globalAlpha=1;
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    msgdata=[[results.poseLandmarks[19].x,results.poseLandmarks[19].y],[results.poseLandmarks[20].x,results.poseLandmarks[20].y]];
    msgtosend=new Paho.MQTT.Message(JSON.stringify(msgdata));
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
        ctx2.beginPath();
        ctx2.strokeStyle='red';
        ctx2.lineWidth=30;
        ctx2.beginPath();
        ctx2.moveTo(athletelandmarks[3][0]*canvasWidth, athletelandmarks[3][1]*canvasHeight);
        ctx2.lineTo(athletelandmarks[2][0]*canvasWidth, athletelandmarks[2][1]*canvasHeight);
        ctx2.stroke();
        ctx2.closePath();
        ctx2.beginPath();
        ctx2.moveTo(athletelandmarks[2][0]*canvasWidth, athletelandmarks[2][1]*canvasHeight);
        ctx2.lineTo(athletelandmarks[0][0]*canvasWidth, athletelandmarks[0][1]*canvasHeight);
        ctx2.stroke();
        ctx2.closePath();
        ctx2.beginPath();
        ctx2.moveTo(athletelandmarks[2][0]*canvasWidth, athletelandmarks[2][1]*canvasHeight);
        ctx2.lineTo(athletelandmarks[1][0]*canvasWidth, athletelandmarks[1][1]*canvasHeight);
        ctx2.stroke();
        ctx2.closePath();
    }
    

    leftcolor='#00d2ff';
    rightcolor='#00d2ff';
    if(Math.pow(Math.abs((results.poseLandmarks[20].x-athletelandmarks[1][0])*canvasWidth),2)+Math.pow(Math.abs((results.poseLandmarks[20].y-athletelandmarks[1][1])*canvasHeight),2)<=hitradius*hitradius){
        leftcolor='#00FF00';
    }
    if(Math.pow(Math.abs((results.poseLandmarks[19].x-athletelandmarks[0][0])*canvasWidth),2)+Math.pow(Math.abs((results.poseLandmarks[19].y-athletelandmarks[0][1])*canvasHeight),2)<=hitradius*hitradius){
        rightcolor='#00FF00';
    }
    drawLandmarks(ctx2, [results.poseLandmarks[19]],
                {color: 'white', fillColor:rightcolor,lineWidth: 5, radius: hitradius});
    drawLandmarks(ctx2, [results.poseLandmarks[20]],
                    {color: 'white', fillColor:leftcolor,lineWidth: 5, radius: hitradius});

}