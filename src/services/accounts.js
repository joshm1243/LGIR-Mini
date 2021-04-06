const Generators = require("./generators")

var wsBindings = [

]


function AddBinding(username) {
    token = Generators.RandomToken()
    wsBindings.push({[token] : username})
    return token
}

function ClearBindings(username) {
    delete wsBindings[username]
}

function AuthenicateToken(token) {

    for (let i = 0; i < wsBindings.length; i++) {

        if (wsBindings[i][token]) {
            return {
                "auth" : true,
                "username" : wsBindings[i][token]
            }
        }
    }

    return {
        "auth" : false
    }

}


exports.AddBinding = AddBinding
exports.AuthenticateToken = AuthenicateToken


