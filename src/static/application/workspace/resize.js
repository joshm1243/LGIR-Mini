
//Calling resize functions to fire when the page is refreshed
ResizeChat()
ResizeBlockly()
ResizeMonitor()
ResizeUploadArea()


//Calling resize functions to fire when the page size is changed
window.addEventListener("resize", function(){
    ResizeChat()
    ResizeBlockly()
    ResizeMonitor()
    ResizeUploadArea()
})

function ResizeBlockly() {
    var blockly = document.getElementById("blockly-container")
    blockly.style.height = (window.innerHeight - 58) + "px";
}

function ResizeChat() {
    var chat = document.getElementById("chat-display-container")
    document.getElementById("blockly-wrapper").style.right = chat.offsetWidth + "px"
    chat.style.height = (window.innerHeight - 151) + "px";
    chat.style.right = chat.offsetWidth;
}


function ResizeUploadArea() {
    var resultsUploadArea = document.getElementById("monitor-results")
    resultsUploadArea.style.width = window.innerWidth

}

document.getElementById("blockly-wrapper").style.right = "0px";

var chatOpen = false;
document.getElementById("chat-container").style.display = "none";
let chatContainer = document.getElementById("chat-container")
document.getElementById("toggle-chat").addEventListener("click", function(){
if (chatOpen) {
    document.getElementById("blockly-wrapper").style.right = "0px";
    document.getElementById("chat-container").style.display = "none";
    chatOpen = false;
}
else {
    chatContainer.style.display = "";
    document.getElementById("blockly-wrapper").style.right = chatContainer.offsetWidth + "px";
    chatOpen = true;
}
});


var showMonitor = false;
document.getElementById("monitor-container").style.display = "none";
document.getElementById("toggle-monitor").addEventListener("click", function(){
    if(showMonitor) {
        
        


        document.getElementById("review-button").style.display = "none"
        
        document.getElementById("toggle-monitor").textContent = "Monitor"

        document.getElementById("blockly-container").style.display = "";
        //document.getElementById("blocklyDiv").style.display = "";
        document.getElementById("monitor-container").style.display = "none";
        showMonitor = false;
    }
    else {

        document.getElementById("review-button").style.display = "block"

        document.getElementById("toggle-monitor").textContent = "Workspace"

        document.getElementById("blockly-container").style.display = "none";
        //document.getElementById("blocklyDiv").style.display = "none";
        document.getElementById("monitor-container").style.display = "";
        showMonitor = true;
    }
})


function ResizeMonitor() {
    var monitor = document.getElementById("monitor-inception-container")
    monitor.style.height = (window.innerHeight - 58) + "px"
    monitor.style.width = (window.innerWidth - 278) + "px"

    var textArea = document.getElementsByTagName("textarea")[0]

    textArea.style.height = (window.innerHeight - 62) + "px"
    textArea.style.width = (window.innerWidth - 380) + "px"
    
}