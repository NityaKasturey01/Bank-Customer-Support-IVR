if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();
    let final_transcript = "";
  
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
   
    speechRecognition.lang = 'hi-IN' 
    speechRecognition.maxAlternatives = 3;
    console.log(speechRecognition.lang)
  
    speechRecognition.onstart = () => {
      document.querySelector("#listentingText").style.display = "block";
    };
    speechRecognition.onerror = () => {
      document.querySelector("#listentingText").style.display = "none";
    };
    speechRecognition.onend = () => {
      document.querySelector("#listentingText").style.display = "none";
    };
  
    speechRecognition.onresult = (event) => {
      let interim_transcript = "";
     console.log(event.results.transcript)
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
  
      document.querySelector("#final").innerHTML = final_transcript;
      document.querySelector("#interim").innerHTML = interim_transcript;
    };
  
    document.querySelector("#start").onclick = () => {
      speechRecognition.start();
    };
    document.querySelector("#stop").onclick = () => {
      speechRecognition.stop();
    };
  } else {
    console.log("Speech Recognition Not Available");
  }
  
