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
var slider1 = document.getElementById("lhl");
var output1 = document.getElementById("lhldemo");
output1.innerHTML = slider1.value;

var slider2 = document.getElementById("lshoulder");
var output2 = document.getElementById("lshoulderdemo");
output2.innerHTML = slider2.value;

var slider3 = document.getElementById("rshoulder");
var output3 = document.getElementById("rshoulderdemo");
output3.innerHTML = slider3.value;

slider1.oninput = function() {
  output1.innerHTML = this.value;
}
slider2.oninput = function() {
    output2.innerHTML = this.value;
}
slider3.oninput = function() {
  output3.innerHTML = this.value;
}

var athletelandmarks=null;
var hitradius=0.05*canvasWidth;
var leftcolor='#00d2ff';
var rightcolor='#00d2ff';


function Exercise(results) {
    ctx2.globalAlpha=1;
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);

        // results.poseLandmarks.push(slider.value);
    msgtosend=new Paho.MQTT.Message(JSON.stringify([slider.value]));
    msgtosend.destinationName='coach';
    mqtt.send(msgtosend);
    mqtt.onMessageArrived=function(msg){
        msg=msg.payloadString;
        msg=JSON.parse(msg);
        athletelandmarks=msg;
        // console.log(typeof msg);
        // console.log(msg[0]);
    }

    // if(athletelandmarks!=null){
        // drawConnectors(ctx2, athletelandmarks, [[0,1],[0,2],[2,4],[1,3],[3,5],[5,7],[7,9],[9,11],[4,6],[6,8],],
        //     {color: 'blue'});
        ctx2.font = Math.floor((canvasWidth*20)/720) + "px Arial";
        ctx2.textAlign = "left";
        ctx2.globalAlpha=0.6;
        ctx2.fillStyle='black';
        ctx2.fillRect(0,canvasHeight*0.3,0.24*canvasWidth,canvasHeight*0.3);
        ctx2.globalAlpha=1;
        ctx2.fillStyle='#FFC107';
        // ctx2.fillText(Math.floor(athletelandmarks[2]), 0.12*canvasWidth, 0.38*canvasHeight);
        // ctx2.fillText(Math.floor(athletelandmarks[2]), 0.12*canvasWidth, 0.48*canvasHeight);
        // ctx2.fillText(Math.floor(athletelandmarks[2]), 0.12*canvasWidth, 0.58*canvasHeight);
        ctx2.fillText('Leg-Hip-Leg: 100', 0.12*canvasWidth, 0.38*canvasHeight);
        ctx2.fillText('Left Shoulder: 100', 0.12*canvasWidth, 0.48*canvasHeight);
        ctx2.fillText('Leg-Hip-Leg: 100', 0.12*canvasWidth, 0.58*canvasHeight);
        
    // }
    

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
    drawLandmarks(ctx2, [results.poseLandmarks[20]],
                    {color: 'white', fillColor:leftcolor,lineWidth: 5, radius: hitradius});

}