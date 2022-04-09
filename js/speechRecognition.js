
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
			let interim_transcript = ''

			for (let i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					final_transcript += event.results[i][0].transcript
				} else {
					interim_transcript += event.results[i][0].transcript
				}
			}

			document.querySelector('#queryID').innerHTML = final_transcript

			// Convertering string into lower case
			final_transcript = final_transcript.toLowerCase()
			// Checking the type
			console.log(typeof final_transcript)
			// Printing the recognised text
			console.log(final_transcript)

			// function for intent detection
			function queryRespone(final_transcript) {
				var words = final_transcript.split(' ')
        console.log(words);
				for (var i = 0; i < words.length; i += 1) {
					// Account Balance
					if (words.includes('balance' || 'account')) {
						console.log('Recognized: Account Balance');
            document.querySelector('#responseID').innerHTML = "Recognized: Account Balance";
            break;
					}
					// Last 5 transactions
					else if (words.includes('last' && 'transactions')) {
						console.log('Recognized: Last 5 transactions');
            document.querySelector('#responseID').innerHTML =
				'Recognized: Last 5 transactions'
            break;
					}
					// Block Debit Card
					else if (words.includes('block' && ('debit' || 'credit' || 'card'))) {
						console.log('Recognized: Block Debit Card');
            document.querySelector('#responseID').innerHTML =
				'Recognized: Block Debit Card';
            break;
					}
					// Request Cheque Book
					else if (words.includes('request' || 'Cheque' || 'book')) {
						console.log('Recognized: Block Debit Card');
            document.querySelector('#responseID').innerHTML =
				'Recognized: Request Cheque Book'
            break;
					}
					// Transfer to Operator
					else if (words.includes('transfer' || 'operator' || 'call' || 'talk')) {
						console.log('Recognized: Transfer to Operator');
            document.querySelector('#responseID').innerHTML =
				'Recognized: Transfer to Operator';
            break;
					} else {
						console.log('Not Recognized: Invalid Query');
            break;
					}
				}
			}
      // Invoking the function
			queryRespone(final_transcript)
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


