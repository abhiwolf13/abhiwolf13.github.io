var timer=0;
setInterval(function(){timer+=1;},1000);
const webcamElement  = document.getElementById('webcam');
// canvasElement=document.getElementById('output')
// canvasCtx = canvasElement.getContext('2d');
const classifier = knnClassifier.create();

const list = document.createElement("ul");
var reminderlist = document.getElementById('reminderlist');

var lastperson=null;
var lastspeechutterence=0;
var reminderarray=[];

var imagelist=[['faces/rock1.jpg','faces/rock2.jpg','faces/rock3.jpg','faces/rock4.jpg','faces/rock5.jpg'],['faces/dakota1.jpg','faces/dakota2.jpg','faces/dakota3.jpg','faces/dakota4.jpg','faces/dakota5.jpg']]
var imagedata= new Image();
imagedata.height=500;
imagedata.width=500;

var trained=0;


emergencycode=0;



function updatelist(){
  reminderlist.innerHTML="";
  for (let index = 0; index < reminderarray.length; index++) {

    let li = document.createElement('li');
        li.innerHTML = reminderarray[index];
      list.appendChild(li);
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      span.onclick = function() {
        reminderarray.splice(index,1);
        updatelist();
      }
      li.appendChild(span);
      reminderlist.appendChild(li); 
  }
}

function jogmemory(){
  if(reminderarray.length!=0){

    idx=Math.floor(Math.random()*reminderarray.length);
    ask(idx);
  }
}

function sendEmail(position) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "abhiladexperiments@gmail.com",
    Password: "Experiment@1",
    To: 'abhilad1009@gmail.com',
    From: "abhiladexperiments@gmail.com",
    Subject: "Alzhimers Emergency",
    Body: "Location: Lat-"+position.coords.latitude+" Long-"+position.coords.longitude +" Health Metrics"

  })

}

function showPosition(position) {
  console.log(position.coords.latitude,position.coords.longitude);
}
var helpaudio=null;

var speechstate=0;

function Emergency(){
  if(emergencycode==0){
  if(listening){
    speechstate=1;
    toggleBtn();
  }
    document.getElementById("mapholder").style.display='block';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      navigator.geolocation.getCurrentPosition(sendEmail);  
      helpaudio=setInterval(HealthEmergency,2000);
      
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
    emergencycode=1;
  }
  else{
    if(speechstate==1){
      speechstate=0;
      toggleBtn();
    }
    document.getElementById("mapholder").style.display='none';
    emergencycode=0;
    clearInterval(helpaudio);
  }
}
// async function app() {
//   console.log('Loading mobilenet..');

//   // Load the model.
//   net = await mobilenet.load();
//   console.log('Successfully loaded model');

//   // if(trained==0){
//   //   for (let index = 0; index < imagelist.length; index++) {
//   //     for (let index2 = 0; index2 < imagelist[index].length; index2++) {
//   //       // Get the intermediate activation of MobileNet 'conv_preds' and pass that
//   //       // to the KNN classifier.
//   //       console.log(imagelist[index][index2])
//   //       imagedata.src=imagelist[index][index2];
    
//   //       const activation = net.infer(imagedata, true);
    
//   //       // Pass the intermediate activation to the classifier.
//   //       classifier.addExample(activation, index);
        
//   //     }
//   //   }
//   //   trained=1;
//   // }

//   // Create an object from Tensorflow.js data API which could capture image 
//   // from the web camera as Tensor.
//   const webcam = await tf.data.webcam(webcamElement);

//   // Reads an image from the webcam and associates it with a specific class
//   // index.
//   const addExample = async classId => {
//     // Capture an image from the web camera.
//     const img = await webcam.capture();

//     // Get the intermediate activation of MobileNet 'conv_preds' and pass that
//     // to the KNN classifier.
//     const activation = net.infer(img, true);

//     // Pass the intermediate activation to the classifier.
//     classifier.addExample(activation, classId);

//     // Dispose the tensor to release the memory.
//     img.dispose();
//   };

//   // When clicking a button, add an example for that class.
//   document.getElementById('class-a').addEventListener('click', () => addExample(0));
//   document.getElementById('class-b').addEventListener('click', () => addExample(1));
//   document.getElementById('class-c').addEventListener('click', () => addExample(2));

//   while (true) {
//     if (classifier.getNumClasses() > 0) {
//       const img = await webcam.capture();

//       // Get the activation from mobilenet from the webcam.
//       const activation = net.infer(img, 'conv_preds');
//       // Get the most likely class and confidence from the classifier module.
//       const result = await classifier.predictClass(activation);

//       const classes = ['This is Abhi your son', 'This is Dwayne your brother', 'This is Dakota your daughter'];
//       document.getElementById('textFeedback').innerText = `
//         prediction: ${classes[result.label]}\n
//         probability: ${result.confidences[result.label]}
//       `;
//       // console.log(result);
//       if(timer-lastspeechutterence>300 || lastspeechutterence==0 || lastperson!=result.label){
//         lastperson=result.label;
//         if(listening){
//           toggleBtn();
//           stoplistening(recognition);
//         }
//         speechSynthesis.speak(new SpeechSynthesisUtterance(classes[result.label]));
//         lastspeechutterence=timer;

//       }

//       // Dispose the tensor to release the memory.
//       img.dispose();
//     }

//     await tf.nextFrame();
//   }
// }


app();