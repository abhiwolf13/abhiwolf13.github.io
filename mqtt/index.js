var connected=false;
var connrequest=false;

var publisher=null;

var output=document.getElementById('output');
var mqttinfo=document.getElementById('mqttinfo');

var slider1 = document.getElementById("datatosend");
var output1 = document.getElementById("datatosenddemo");
output1.innerHTML = slider1.value;

slider1.oninput = function() {
    output1.innerHTML = this.value;
    msgtosend=new Paho.MQTT.Message(JSON.stringify(slider1.value));
    msgtosend.destinationName=publisher;
    mqtt.send(msgtosend);
  }

// Mqtt connection to broker
function MQTTconnect(sub,pub){
    console.log('connecting to broker.emqx.io'+" "+8084);
    mqtt=new Paho.MQTT.Client('broker.emqx.io',8084,pub);
    mqtt.connect({timeout:3,
        useSSL: true,
        onSuccess:function(){mqtt.subscribe(sub);     setInterval(
            mqtt.onMessageArrived=function(msg){
            try{
                msg=msg.payloadString;
                msg=JSON.parse(msg);
                output.innerHTML=msg;
            }
            catch(err){

            }
            
        }
        ,500);;publisher=pub;mqttinfo.innerHTML='Subscribed to: '+sub+' Publishing to: '+pub;connected=true ;console.log('connected');},
        onFailure:function(){setTimeout(MQTTconnect,500)}});

}





// app(sub,pub);



    

