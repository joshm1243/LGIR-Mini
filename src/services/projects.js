

const Generators = require("./generators")

var projects = {}
var mappings = []
var editors = {}

function EnsureEditorPath(code) {

    if (!(code in editors)) {
        editors[code] = {
            "editor" : "",
            "waiting" : ""
        }
    }
}

function AddWaitingEditor(code,socketId) {
    EnsureEditorPath(code)
    editors[code].waiting = socketId
}

function PromoteWaitingEditor(code) {

    EnsureEditorPath(code)
    editors[code].editor = editors[code].waiting
    editors[code].waiting = ""
}

function RemoveSocket(socketId) {
    for (var project in editors) {

        if (editors[project].editor == socketId) {
            editors[project].editor = editors[project].waiting
            editors[project].waiting = ""
        }
        if (editors[project].waiting == socketId) {
            editors[project].waiting = ""
        }
    }
}

function EditCheck(code,socketId) {

    EnsureEditorPath(code)

    if (editors[code].editor == "") {
        editors[code].editor = socketId
        return true
    }
    else {
        return false
    }
}

function EditRequest(code,socketId) {
    
    if (editors[code].editor == "" && editors[code].waiting == "") {

        

        editors[code].editor = socketId
        

        return {
            "edit" : "true"
        }

    }
    else if (editors[code].waiting == "") {
        AddWaitingEditor(code,socketId)

        return {
            "edit" : "false",
            "reason" : "currentEditor",
            "editorSocketId" : editors[code].editor
        }
    }
    else {

        return {
            "edit" : "false",
            "reason" : "full"
        }
    }
}



function EditReply(socketId, promote) {

    for (var project in editors) {

        if (editors[project].editor == socketId) {
            let waitingEditor = editors[project].waiting


            if (promote) {
                PromoteWaitingEditor(project)
            }
            else {
                editors[project].waiting = ""
            }
            return waitingEditor
        }
    }
}



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

    }

    if (!uniqueCode) {
        console.log("# A fatal error has occured.")
    }

    projects[code] = {
        "name" : "New Project",
        "code" : code,
        "users" : 0,
        "components" : [],
        "owner" : username,
        "workspace" : "",
        "buckets" : {}
    }

    mappings.push({[username]:code})
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

function CreateComponent(code,componentId) {
    projects[code].components.push({
        "componentId" : componentId,
        "name" : "",
        "component" : "",
        "pins" : [""]
    })
}

function DeleteComponent(code,componentId) {

    for (var i = 0; i < projects[code].components.length; i++) {
   
        if (projects[code].components[i].componentId == componentId) {

            projects[code].components.splice(i,1)
        }
    }
}

function UpdateComponent(code,componentId,property,value) {


    for (var i = 0; i < projects[code].components.length; i++) {
        if (projects[code].components[i].componentId == componentId) {
            projects[code].components[i][property] = value
            break
        }
    }

}

function UpdateWorkspace(code,socketId,workspaceString) {
    if (editors[code].editor == socketId) {
        projects[code].workspace = workspaceString
        return true
    }
    else {
        return false
    }
}

function UpdateBuckets(code,bucketJSON) {
    projects[code].buckets = bucketJSON
}

function GetBuckets(code) {
    return projects[code].buckets
}


exports.Exists = Exists
exports.CanAccess = CanAccess
exports.GetInfo = GetInfo
exports.GetAccountProjects = GetAccountProjects
exports.Create = Create
exports.Join = Join
exports.Remove = Remove
exports.GetUsers = GetUsers
exports.ChangeName = ChangeName
exports.ChangeDescription = ChangeDescription

exports.EditCheck = EditCheck
exports.RemoveSocket = RemoveSocket
exports.EditRequest = EditRequest
exports.EditReply = EditReply
exports.AddWaitingEditor = AddWaitingEditor
exports.PromoteWaitingEditor = PromoteWaitingEditor

exports.CreateComponent = CreateComponent
exports.DeleteComponent = DeleteComponent
exports.UpdateComponent = UpdateComponent
exports.UpdateWorkspace = UpdateWorkspace
exports.UpdateBuckets = UpdateBuckets
exports.GetBuckets = GetBuckets