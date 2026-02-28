//START button event listener
//create a reference variable for the breakdownbtn - accessing it from HTML by ID
const breakdownButton = document.querySelector('#breakdownbtn')

//add an event listener to watch for a "click" and respond with an async function that will handle message passing
breakdownButton.addEventListener("click", async () => {
    
    //create a reference to the current tab of the browser
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})

    //send a message (an object of structured information ) to the current browser using its ID
    chrome.tabs.sendMessage(tab.id, { action: "breakdown" })
})



//STOP button event listener
//create a reference variable for the calmbtn - accessing it from HTML by ID
const calmButton = document.querySelector('#calmbtn')

//add an event listener to watch for a "click" and respond with an async function that will handle message passing
calmButton.addEventListener("click", async () => {
    //create a reference to the current tab of the browser
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})

    console.log("Tab ID:", tab.id);

    //send a message (an object of structured information ) to the current browser using its ID
    chrome.tabs.sendMessage(tab.id, { action: "reset" })
})




