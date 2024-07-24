 
const btn = document.querySelector('#microphone');
const content = document.querySelector('#write');

function speak(sentence) {
  const text_speak = new SpeechSynthesisUtterance(sentence);
  text_speak.rate = 1.1;
  text_speak.pitch = 3;
  
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const day = new Date();
  const hr = day.getHours();

  let greeting;

  if (hr >= 0 && hr < 12) {
    greeting = "Good morning boss";
  } else if (hr === 12) {
    greeting = "Good noon boss";
  } else if (hr > 12 && hr <= 17) {
    greeting = "Good afternoon boss";
  } else {
    greeting = "Good evening boss";
  }

  speak(greeting);
}

window.addEventListener('load', () => {
  speak("Activating jenni , how can i assist you ");
  wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  
    const transcript = event.results[0][0].transcript;
    console.log(transcript)
    content.textContent = transcript;  
    speakThis(transcript.toLowerCase());
  
};

btn.addEventListener('click', () => {
  recognition.start();
  document.getElementById("k1").innerHTML="recognizing...";
});

function textback(){
  document.getElementById("k1").innerHTML="Click here to speak";
}


function speakThis(message) {
  
  var msg;

  if (message.includes('hey') || message.includes('hello')) 
  {
    msg = "Hello boss, how can i help you";
  } 
  else if (message.includes('how are you')) 
   {
    msg  = "I am fine, thank you.";
  
   } 
  else if (message.includes('name'))
   {
    msg  = "My name is jenni.";
   
  } 
  else if (message.includes('open google'))
   {
    window.open("https://google.com", "_blank");
    msg  = "Opening Google.";
  }
  
  else if (message.includes('open instagram')) 
  {
    window.open('Instagram:///');
    msg  = "Opening Instagram.";
  } 
  else if (message.includes('open facebook')) 
  {
    window.open("facebook:///");
    msg  = "Opening Facebook.";
  } 
  else if (message.includes('open spotify'))
   {
    window.open("Spotify:///");
    msg  = "Opening Spotify.";
  } 

  else if (message.includes('open file')) 
  {
    window.open("FileExplorer:///");
    msg= "Opening File.";
  } 

  else if (message.includes('what is') || message.includes('who is') || message.includes('what are')
  ||message.includes('search')) 
  {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    msg = `This is what I found on the internet regarding ${message}.`;
  } 
 
  else if (message.includes('wikipedia'))
   {
    window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(message.replace("wikipedia", ""))}`, "_blank");
    msg = `This is what I found on Wikipedia regarding ${message}.`;
   }
   else if (message.includes('time'))
    {
    const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    msg = `The current time is ${time}.`;  
    }  
  else if (message.includes('date')) 
    {
    const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
    msg = `Today's date is ${date}.`;
    }
   else if (message.includes('calculator')) 
   {
    window.open('Calculator:///');
    msg = "Opening calculator.";
  } 
  else if (message.includes('play')) 
  {
    const YOUTUBE_API_KEY = "AIzaSyCbzbNBoxHPjjvtrEQMNGYw4CaynrWrlv0";

    const videoName = message.replace('play', '').trim();
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(videoName)}&key=${YOUTUBE_API_KEY}`;


    fetch(url)
      .then(response => response.json())
      .then(data => {
        const videoId = data.items[0].id.videoId;
        window.open(`https://www.youtube.com/watch?v=${videoId}`);
        msg = `Playing ${videoName} on YouTube.`;
        speak(msg);
        //window.speechSynthesis.speak(speech);
      })
      .catch(error => {
        msg = `Sorry, an error occurred while searching for ${videoName} on YouTube.`;
        window.speechSynthesis.speak(speech);
      });
    }
    else if (message.includes('open whatsapp')) 
    {
      window.open('whatsapp:///');
      msg = "Opening WhatsApp";
    }
    else if (message.includes('get battery level') || message.includes('get battery percentage'))
     {
      navigator.getBattery().then(function(battery)
       {
        const level = battery.level * 100;
        msg = `The battery level is ${level} percent.`;
        speak(msg);
      });
    }
    
  else {
    msg = "I did not understand what you said. Please try again.";
}
  textback();
  speak(msg);

}