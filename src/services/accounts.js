const Generators = require("./generators")

var socketAnticipations = {
   
}

var authenticatedSockets = {

}



function GetToken(username) {
    let token = Generators.Token()
    socketAnticipations[token] = username
    return token
}

function PresentToken(socketId,token) {
    if (token in socketAnticipations) {
        authenticatedSockets[socketId] = socketAnticipations[token]
        delete socketAnticipations[token]
    }
}

function Authenticate(socketId) {
    return socketId in authenticatedSockets
}

function GetUsernameBySocket(socketId) {
    return authenticatedSockets[socketId]
}


function RemoveSocket(socketId) {
    delete authenticatedSockets[socketId]
}


exports.Authenticate = Authenticate
exports.GetUsernameBySocket = GetUsernameBySocket
exports.RemoveSocket = RemoveSocket
exports.PresentToken = PresentToken
exports.GetToken = GetToken