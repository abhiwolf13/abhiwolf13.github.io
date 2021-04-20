// UI comp
const startBtn = document.getElementById('startBtn');
const remindBtn = document.getElementById('remindBtn');
// startBtn.innerHTML = "Start listening";
// startBtn.style.zIndex=100;
// startBtn.style.position='absolute';
// startBtn.style.top=0;
const result = document.createElement("div");
const processing = document.createElement("p");

var replytimer=null;
var taskcomplete=null;

document.write("<body><h1>Alzhimers Assitant</h1><p>Give it a try with 'remind something' ... </p></body>");
// document.body.append(startBtn);
document.body.append(result);
document.body.append(processing);
document.body.append(list);

// speech to text
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let toggleBtn = null;
if (typeof SpeechRecognition === "undefined") {
	startBtn.remove();
	result.innerHTML = "<b>Browser does not support Speech API. Please download latest chrome.<b>";
} else {
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.onresult = event => {
		const last = event.results.length - 1;
		const res = event.results[last];
		const text = res[0].transcript;
		if (res.isFinal) {
			processing.innerHTML = "processing ....";

			const response = process(text);
			const p = document.createElement("p");
			p.innerHTML = `You said: ${text} </br>Assistant said: ${response}`;
			processing.innerHTML = "";
			result.appendChild(p);

			// text to speech
			toggleBtn();
			stoplistening(recognition);
			speechSynthesis.speak(new SpeechSynthesisUtterance(response));
			
		} else {
			processing.innerHTML = `listening: ${text}`;
		}
	}
	// recognition.start();
	var listening = false;
	toggleBtn = () => {
		if (listening) {
			recognition.stop();
			startBtn.textContent = "Start listening";
			startBtn.className="btn btn-success";
		} else {
			recognition.start();
			startBtn.textContent = "Stop listening";
			startBtn.className="btn btn-warning";
		}
		listening = !listening;
	};
	startBtn.addEventListener("click", toggleBtn);

}

async function stoplistening(recognition){
	setTimeout(function(){toggleBtn();},3000);
}
// processor
function process(rawText) {
	// let text = rawText.replace(/\s/g, "");
	text = rawText.toLowerCase();
	text = rawText.split(" ");
	check=text.shift();
	// console.log(check);
	let response = null;
	switch(check) {
		case "remind":
			rmd=text.join(" ");
			response=rmd;
			reminderarray.push(rmd);
			updatelist();
			break;
		case "yes":
			response='yes';
			if(replytimer-timer>0){
				reminderarray.splice(taskcomplete,1);
				updatelist();
			}
			break;
		// case "what'syourname":
		// 	response = "My name's Siri.";  break;
		// case "howareyou":
		// 	response = "I'm good."; break;
		// case "whattimeisit":
		// 	response = new Date().toLocaleTimeString(); break;
		// case "stop":
		// 	response = "Bye!!";
		// 	toggleBtn();
	}
	if (!response) {
		window.open(`http://google.com/search?q=${rawText.replace("search", "")}`, "_blank");
		return `I found some information for ${rawText}`;
	}
	return response;
}

function addreminder(topic){
	reminderarray.push(topic);
	updatelist();
	if(listening){
		toggleBtn();
		stoplistening(recognition);

	}
	speechSynthesis.speak(new SpeechSynthesisUtterance(topic));
}

function HealthEmergency(){
	speechSynthesis.speak(new SpeechSynthesisUtterance("Health Emergency"));
}

function ask(idx){
	if(!listening){
		stoplistening(recognition);
	}
	else{
		toggleBtn();
		stoplistening(recognition);
	}
	speechSynthesis.speak(new SpeechSynthesisUtterance("Have you finished your task "+reminderarray[idx]));
	replytimer=timer+8;
	taskcomplete=idx;

}