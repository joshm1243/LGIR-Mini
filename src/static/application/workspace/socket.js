var socket = io()

var workspace;

//Defining Required Variables
var editButton = document.getElementById('request-edit')
var blocklyWrapper = document.getElementById('blockly-wrapper')
var allowEditButton = document.getElementById('allow-edit')
var blockEditButton = document.getElementById('block-edit')
var allowEditMessage = document.getElementById('allow-edit-message')
var workspaceLoadingMessage = document.getElementById('workspace-loading-message')
var someoneIsEditingMessage = document.getElementById('someone-is-editing-message')
var positiveEditMessage = document.getElementById('positive-edit-message')
var askingForEditMessage = document.getElementById('asking-for-edit-message')
var negativeEditMessage = document.getElementById('negative-edit-message')
var requestEditButton = document.getElementById('request-edit')
var currentEditorMessage = document.getElementById('current-editor-message')
var incorrectJSONMessage = document.getElementById('incorrect-json-message')
var fatalErrorMessage = document.getElementById('fatal-error-message')
var allowTimer = document.getElementById('allow-timer')
var alreadyUsersWaitingMessage = document.getElementById('already-users-waiting')
var incorrectSyntaxMessage = document.getElementById("incorrect-syntax-message")

var wrapperTimer;
var wrapperTimerActive = false

function Message(type,message=false,time=0,releaseAfter=false) {

    if (type == "release") {
        blocklyWrapper.classList.add("hide")
    }
    else if (type == "show") {
        blocklyWrapper.classList.remove("hide")
        blocklyWrapper.classList.remove("transparent")
        workspaceLoadingMessage.style.display = "none"
        someoneIsEditingMessage.style.display = "none"
        positiveEditMessage.style.display = "none"
        askingForEditMessage.style.display = "none"
        negativeEditMessage.style.display = "none"
        currentEditorMessage.style.display = "none"
        allowEditMessage.style.display = "none"
        alreadyUsersWaitingMessage.style.display = "none"
        incorrectJSONMessage.style.display = "none"
        incorrectSyntaxMessage.style.display = "none"

        message.style.display = "block"

        if (time > 0) {

            if (wrapperTimerActive) {
                clearTimeout(wrapperTimer)
            }

            wrapperTimer = setTimeout(function(){

                workspaceLoadingMessage.style.display = "none"
                someoneIsEditingMessage.style.display = "none"
                positiveEditMessage.style.display = "none"
                askingForEditMessage.style.display = "none"
                negativeEditMessage.style.display = "none"
                currentEditorMessage.style.display = "none"
                allowEditMessage.style.display = "none"
                alreadyUsersWaitingMessage.style.display = "none"
                incorrectJSONMessage.style.display = "none"
                incorrectSyntaxMessage.style.display = "none"

                wrapperTimerActive = false

                if (releaseAfter) {
                    blocklyWrapper.classList.add("hide")
                }

                blocklyWrapper.classList.add("transparent")

            },time)
            wrapperTimerActive = true
        
        }
    }
    else if (type == "block") {

        if (wrapperTimerActive) {
            clearTimeout(wrapperTimer)
        }

        blocklyWrapper.classList.add("transparent")
        workspaceLoadingMessage.style.display = "none"
        someoneIsEditingMessage.style.display = "none"
        positiveEditMessage.style.display = "none"
        allowEditMessage.style.display = "none"
        askingForEditMessage.style.display = "none"
        negativeEditMessage.style.display = "none"
        currentEditorMessage.style.display = "none"
        alreadyUsersWaitingMessage.style.display = "none"
    }
}

socket.emit("authenticate",{
    "token" : token,
    "code" : code
})

//Checking if the workspace can be edited
socket.emit("edit_check",{
    "code" : code
})

socket.on("edit_check", function(msg){

    if (msg.edit) {
        workspace = createBlockly({toolbox: document.getElementById('toolbox'), sounds: false})
        Message("release")
        isCurrentEditor = true
    }
    else {
        workspace = createBlockly("create",{readOnly: true, sounds: false})
        Message("show",someoneIsEditingMessage,3000,false)
        isCurrentEditor = false
    }

})

editButton.addEventListener("click", function(){
    if (!isCurrentEditor) {
        socket.emit("edit_request",{
            "code" : code
        })
    }
    else {
        Message("show",currentEditorMessage,3000,true)
    }
})

socket.on("edit_request", function(msg){

    if (msg.edit) {
        Message("show",positiveEditMessage,2000,true)
        deleteBlockly(workspace)
        workspace = createBlockly({toolbox: document.getElementById('toolbox'), sounds: false})
        isCurrentEditor = true
    }
    else {

        if (msg.reason == "asking") {
            Message("show",askingForEditMessage,0,false)
        }
        else {
            Message("show",alreadyUsersWaitingMessage,3000,false)
        }
    }
})

socket.on("edit_takeover", function(){
    Message("show",allowEditMessage,4000,true)
})

allowEditButton.addEventListener("click",function(){

    deleteBlockly(workspace)
    workspace = createBlockly("create",{readOnly: true, sounds: false})
    Message("block")
    isCurrentEditor = false
    socket.emit("edit_takeover", {
        "promote" : true
    })
})

blockEditButton.addEventListener("click", function(){
    socket.emit("edit_takeover", {
        "promote" : false
    })
})

socket.on("edit_takeover_reply", function(msg){

    if (msg.edit) {
        Message("show",positiveEditMessage,2000,true)
        deleteBlockly(workspace)
        workspace = createBlockly({toolbox: document.getElementById('toolbox'), sounds: false})
        isCurrentEditor = true
    }
    else {
        Message("show",negativeEditMessage,3000,false)
        isCurrentEditor = false
    }
})



socket.on("project_update_workspace", function(msg){
    var blocklyEvent = Blockly.Events.fromJson(msg.blocklyEvent, workspace)
    blocklyEvent.run(true)

    workspaceXMLString = msg.blocklyWorkspace
    workspaceXML = parser.parseFromString(msg.blocklyWorkspace,"text/html");
})

socket.emit("get_mappings", {
    "code" : code
})

ProjectMappingJSON = []

socket.on("get_mappings", function(msg) {
    ProjectMappingJSON = msg.mappings
})
