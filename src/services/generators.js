function RandomNumeric(length) {
    var numerics = "023456789"
    var string = ""

    for (let i = 0; i < length; i++) {
        string += numerics[Math.floor(Math.random() * numerics.length)]
    }

    return string
}

function RandomAlpha(length) {
    var alphas = "abdeghkmnorvwyz"
    var string = ""

    for (let i = 0; i < length; i++) {
        string += alphas[Math.floor(Math.random() * alphas.length)]
    }

    return string
}

function RandomString(length) {

    var string = ""

    string += RandomAlpha(2)
    string += RandomNumeric(2)
    string += RandomAlpha(3)
    string += RandomNumeric(1)

    return string
}


function RandomToken() {
    var token = ""
    for (let i = 0; i < 8; i++) {
        token += RandomString()
    }
    return token
}

exports.RandomString = RandomString
exports.RandomToken = RandomToken