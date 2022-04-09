
var select = document.getElementById('langSelect');
var value = 'en-IN';
onchangeLang();
function onchangeLang(){
    value = select.options[select.selectedIndex].value;
    console.log(value);

    if ("webkitSpeechRecognition" in window) {
      let speechRecognition = new webkitSpeechRecognition();
      let final_transcript = "";
    
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
     
      speechRecognition.lang = value;
      console.log(speechRecognition.lang);
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
    
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
    
        document.querySelector("#queryID").innerHTML = final_transcript;
        //document.querySelector("#interim").innerHTML = interim_transcript;
      };
    
      var Image_Id = document.getElementById('getImage');

      /*if (Image_Id.src.match("../img/mic.png")){
        document.querySelector("#getImage").onclick = () => {
          speechRecognition.start();
          Image_Id.src = "../img/red-mic.png";
          onchangeLang();
          Image_Id.setAttribute('id','stop')
          console.log(Image_Id.getAttribute('id'))
          speechRecognition.continuous = false;
          Image_Id.src = "../img/mic.png";
        };
      }else{
        document.getElementsByClassName("#stop").onclick = () => {
          Image_Id.src = "../img/mic.png";
          speechRecognition.stop();

      };}*/

      document.querySelector("#start").onclick = () => {
        speechRecognition.start();
      };
      document.querySelector("#stop").onclick = () => {
        speechRecognition.stop();
      };


    } else {
      console.log("Speech Recognition Not Available");
    }
}

