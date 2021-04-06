const Generators = require("./generators")

var projects = {}
var mappings = []

function GetAccountProjects(username) {

    var userMappings = []
    var userProjects = []

    mappings.filter(function(mapping){
        
        if (mapping[username]) {
            userMappings.push(mapping[username])
        }
    })

    userMappings.forEach(function(projectName){
        userProjects.push(projects[projectName])
    })
    
    return userProjects

}

function Create(username) {


    var uniqueCode = false
    var attempts = 0
    while (!uniqueCode && attempts < 3) {
        code = Generators.RandomString(8)

        if (code in projects == false) {
            uniqueCode = true
        }

        attempts += 1

        console.log(code)

    }

    if (!uniqueCode) {
        console.log("A fatal error has occured.")
    }

    projects[code] = {
        "name" : "New Project",
        "code" : code,
        "users" : 0,
        "owner" : username
    }

    mappings.push({[username]:code})

    console.log(mappings)

    return projects[code]
}

function Join(username,code) {

    code = code.toLowerCase()
    if (code in projects) {

        for(let i = 0; i < mappings.length; i++) {
            if (mappings[i][username] == code) {
                return {
                    "joined" : false,
                    "reason" : "already"
                }
            }
        }

        mappings.push({[username] : code})

        return {
            "joined" : true,
            "project" : projects[code]
        }

    }
    else {

        return {
            "joined" : false,
            "reason" : "notExists"
        }
    }
}

function Remove(username,code) {

    for (let i = 0; i < mappings.length; i++) {
        if (mappings[i][username] == code) {

            if (projects[code].owner == username) {

                let indiciesToRemove = []

                for (let i = 0; i < mappings.length; i++) {
                    for (let key in mappings[i]) {

                        if (mappings[i][key] == code) {
                            indiciesToRemove.push(i)
                        }
                    }
                }

                for (let i = indiciesToRemove.length - 1; i >= 0; i--) {
                    mappings.splice(indiciesToRemove[i],1)
                }

                delete projects[code]

            }
            else {
                mappings.splice(i,1)
            }

        }
    }

}


function Exists(code) {
    return code in projects
}

function CanAccess(username,code) {
    for (let i = 0; i < mappings.length; i++) {
        for (let key in mappings[i]) {


            if (key == username && mappings[i][key] == code) {
                return true
            }
        }
    }
    return false
}

function GetInfo(code) {
    return projects[code]
}

function GetUsers(code) {

    var users = []

    for (let i = 0; i < mappings.length; i++) {
        for (let key in mappings[i]) {


            if (mappings[i][key] == code) {

                if (projects[code].owner == key) {
                    users.push({
                        "username" : key,
                        "type" : "owner"
                    })
                }
                else {
                    users.push({
                        "username" : key,
                        "type" : "collaborator"
                    })
                }

            }
        }
    }

    return users
}

function ChangeName(code,name) {
    projects[code].name = name
}

function ChangeDescription(code,description) {
    projects[code].description = description
}

function UpdateComponents(code,components) {
    projects[code].components = components
}


exports.Exists = Exists
exports.CanAccess = CanAccess
exports.GetInfo = GetInfo
exports.GetAccountProjects = GetAccountProjects
exports.Create = Create
exports.Join = Join
exports.Remove = Remove
exports.ChangeName = ChangeName
exports.ChangeDescription = ChangeDescription
exports.UpdateComponents = UpdateComponents
exports.GetUsers = GetUsers