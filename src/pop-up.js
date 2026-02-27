//BREAK DOWN BUTTON
//create an HTML element that will serve as our breakdown button 
const startButton = document.createElement("button")
//give the button an id so we can reference it in CSS file
startButton.id = "breakdown"
//populate the button with some text
startButton.innerText = "Break Down Imminent"
//append the element to the document - ARE WE APPENDING TO DOCUMENT OR SOMETHING ELSE
document.body.append(startButton)


//EXIT BUTTON
//create an HTML element that will serve as our breakdown button 
const endButton = document.createElement("button")
//give the button an id so we can reference it in CSS file
endButton.id = "calm"
//populate the button with some text
endButton.innerText = "Cleared Feelings Cache"
//append the element to the document - ARE WE APPENDING TO DOCUMENT OR SOMETHING ELSE
document.body.append(endButton)



//what do we want to do when the start button is pressed?
//change the wed browsers appearance to be calmer (maybe even rain calming emojis)
//play a soothing song/sound (need to access an API?)
//randomly generate an encouraging/calming quote (definitely need an API)

//


//add an event listener to the button element calling all functions pertaining to the event


