//background script -> hidden working behind the scenes to fetch and deliver data

//MESSAGE PASSING
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // We can’t make the listener itself `async`, so we call an async function inside it.
  (async () => {
    if (message.action !== "GET_QUOTE") return;

    try {
      const response = await fetch("https://www.affirmations.dev/");
      const data = await response.json();

      // Send just the text back
      sendResponse({ quote: data.affirmation });
    } catch (err) {
      console.error("Fetch failed:", err);
      // Fallback so your UI still works
      sendResponse({ quote: "You will probably be ok one day!" });
    }
  })();

  // IMPORTANT: tells Chrome “I will respond asynchronously”
  return true;
});