//Defining a standard form for chat messages
class ChatMessage {

    //The currentUser variable stores whether the message was sent by the currently logged in user
    constructor(message, currentUser=false) {
        this.el = document.createElement("div")
        this.el.innerText = message
        if (currentUser) {

            //The current user has sent the message, display on the right
            this.el.classList.add("right")
        }
        else {

            //Another user has sent the message, display on the left
            this.el.classList.add("left") 
        }
    }
}

var chatDisplayContainer = document.getElementById("chat-display-container")

//The web-socket has received a new chat message
function ChatMessageReceive (chatJSON) {

    //Creating a new ChatMessage object
    let newChatMessage = new ChatMessage(chatJSON.message) 

    //Append the new chat message to the DOM
    chatDisplayContainer.appendChild(newChatMessage.el)
}
  
socket.on("chat", function(msg){
  ChatMessageReceive(msg)
})

//Listening to the chat input box to see if the user has entered a character
let chatInput = document.getElementById('chat-input')
  
  chatInput.addEventListener('keypress', function(e){
  
    //Checking if the user has pressed the enter key
    if(e.which == 13){
  
      //Send a new chat message down the web-socket
      socket.emit("chat", {
        "code" : code,
        "message" : chatInput.value //Setting the message as the current value within the input box
      })
  
      //Creating a new ChatMessage and appending it to the DOM
      let chatDisplayContainer = document.getElementById("chat-display-container")
      let newChatMessage = new ChatMessage(chatInput.value,true)
      chatDisplayContainer.appendChild(newChatMessage.el)
  
      chatInput.value = "" //Setting the chat input box back to an empty string
    }
})