const axios = require('axios');

exports.handler = async (context, event, callback) => {
  // Create a new voice response object
 
  console.log(context);
  console.log(event);
  const twiml = new Twilio.twiml.VoiceResponse();
  var conversationHistory = [];
  if(event.conversationHistory != ''){
    console.log("event has valid conversationHistory");
    console.log(event.conversationHistory);
    conversationHistory = parseConversationHistory(event.conversationHistory);
    console.log(conversationHistory);
    conversationHistory.push({"role":"user", "content": event.userPrompt});
  } else {
    conversationHistory = [
      {"role":"user", "content": `Act as ${event.persona}. You have just called me on the phone to have a conversation and I answered your call. Keep your responses to 2 sentences maximum.`}
    ]
  }
  console.log(conversationHistory);
  try {
    const body =  JSON.stringify({
            model: 'gpt-3.5-turbo-0125',
            messages: conversationHistory
        });
    const postResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: 'gpt-3.5-turbo-0125',
      messages: conversationHistory
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer <redacted>`
        }
    });

    const completion = postResponse.data;
    const returnedText = completion.choices.pop().message.content;
    conversationHistory.push({"role":"assistant", "content": returnedText});
    console.log(conversationHistory);
    console.log(returnedText);

    const response = {
      returnedText: returnedText,
      conversationHistory: conversationHistory
    }
    return callback(null, response);
  } catch (error) {
    // In the event of an error, return a 500 error and the error message
    console.error(error);
    return error;
  }
};

function parseConversationHistory(historyString){
  var arr = historyString.split("}");
  var finalArr = [];
  for(let i = 0; i < arr.length; i++){
    const role = arr[i].includes("{role=user,") ? "user" : "assistant";
    const content = arr[i].substring(arr[i].indexOf("content=")+8);
    if(role && content){
      finalArr.push({"role": role, "content": content});
    }
  }
  return finalArr;
}
