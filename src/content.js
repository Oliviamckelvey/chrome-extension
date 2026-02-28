console.log("Loaded in Browser!")


//MESSAGE PASSING LISTENER
//handle receiving any messages sent from the chrome extension pop-up with an event listener that waits for the message and runs functionality based on the message received
chrome.runtime.onMessage.addListener((message) => {
    //if the break down button in the chrome extension is pressed -> the pop-up will send the message "breakdown"
    if (message.action === "breakdown") {
        //perform whatever functionality you want to occur when the breakdown button is pressed
        visualEffect();
        playAudio();
        generateQuote();
    }

    //if the calm down button in the chrome extension is pressed -> the pop up will send the message "reset"
    if (message.action === "reset") {
        //perform whatever functionality you want to occur when the calmdown button is pressed
        resetVisuals();
        stopAudio();
        removeQuote();
  }
});

//SCREEN DIMMING
//create a function that makes visual changes to the web browser
function visualEffect() {
    //make sure the file is loading in the browser
    console.log("visual")

    //prevent duplicate overlays - if an overlay has already been applied don't apply another (for removal purposes)
    if (document.querySelector(".calm-overlay")) return;

    //create a style tag so we can create a specific styling rule set 
    const style = document.createElement("style");

    //add/apply the desired CSS rules to the tag you previously created
    style.textContent = `
        .calm-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            z-index: 999999;
            overflow: hidden;
            pointer-events: none;
        }

        .emoji {
            position: absolute;
            font-size: 24px;
            animation: fall 4s linear infinite;
            top: -50px;
            will-change: transform;
        }

        @keyframes fall {
            from { transform: translateY(-50px); opacity: 1;} 
            to {transform: translateY(100vh); opacity: 0;}
        }`;

    //append thee style tag with the CSS rules to the browser giving it access to the styling
    document.head.appendChild(style);

    //create a div container to apply styling to and cover the entire screen of the current web browser
    const overlay = document.createElement("div");

    //apply the CSS rule we gave the browser to the created div
    overlay.classList.add("calm-overlay");

    //add the styled overlay div to the document body 
    document.body.appendChild(overlay);

    //Raining Functionality
    //create a loop the will iterate 25 times, populating 25 emojis
    for (let i = 0; i < 25; i++) {
        //create an HTML element to hold/display our emoji and save it to a reference variable
        const emoji = document.createElement("span");
        //add a class list to the created HTML 
        emoji.classList.add("emoji");

        // choose your calming emoji
        emoji.textContent = "💧";

        // random horizontal position
        emoji.style.left = Math.random() * 100 + "vw";

        // random animation delay so they don't fall together
        emoji.style.animationDelay = Math.random() * 4 + "s";

        overlay.appendChild(emoji);
    }
}



//create a function that removes the overlay div from the web browser // input
function resetVisuals() {
  const overlay = document.querySelector(".calm-overlay");
  if (overlay) {
    overlay.remove();
  }
}




//AUDIO HANDLING
let audio; // reference variable so we can reuse/stop it later

function playAudio() {
    //test if function is running
    console.log("sound");

    //convert a local extension path into a browser readable URL -> give the browser access to the local audio file
    const url = chrome.runtime.getURL("assets/calmSound.mp3");
    
    //Audio is a built in browser object thats like a class that serves as a template for creating a music player
    //create a new instance of the music player class with the web readable URL
    audio = new Audio(url);

    //invoke the play property on the audio object you just created
    audio.play()
    audio.loop = true;
    audio.volume = 0.5;
}


function stopAudio() {
    //access the pause property on the audio object - built in function that  pauses audio file where it is
    audio.pause()

    //reset the audio file to play from the beginning - use built in currentTime property
    audio.currentTime = 0
}




//QUOTE GENERATION

function requestQuoteFromBackground() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "GET_QUOTE" }, (response) => {
      resolve(response?.quote);
    });
  });
}

async function generateQuote() {
  const quoteText = await requestQuoteFromBackground();
  console.log("Quote received:", quoteText);

  // Create or reuse the quote box
  let box = document.getElementById("calmQuoteBox");

  if (!box) {
    box = document.createElement("div");
    box.id = "calmQuoteBox";

    // POSITIONING (center of screen)
    box.style.position = "fixed";
    box.style.top = "50%";
    box.style.left = "50%";
    box.style.transform = "translate(-50%, -50%)";

    // APPEARANCE
    box.style.background = "rgba(255, 255, 255, 0.95)";
    box.style.padding = "30px";
    box.style.borderRadius = "16px";
    box.style.maxWidth = "500px";
    box.style.width = "80%";

    // TEXT STYLING
    box.style.fontSize = "22px";
    box.style.lineHeight = "1.6";
    box.style.textAlign = "center";
    box.style.color = "#1c3f2e";
    box.style.fontFamily = "Segoe UI, sans-serif";

    // DEPTH (floating effect)
    box.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.3)";
    box.style.zIndex = "9999999";

    // OPTIONAL: subtle fade-in
    box.style.opacity = "0";
    box.style.transition = "opacity 0.5s ease";

    document.body.appendChild(box);

    // trigger fade-in
    requestAnimationFrame(() => {
      box.style.opacity = "1";
    });
  }

  box.textContent = quoteText || "Breathe. You're probably ok!";
}


//create a function that removes the quote from the browser/visual field
function removeQuote() {
  const box = document.getElementById("calmQuoteBox");

  if (box) {
    box.remove();
  }
}








