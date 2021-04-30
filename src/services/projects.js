

const Generators = require("./generators")

var projects = {
    "sample01" : {
        "name" : "Testing Project 1",
        "code" : "sample01",
        "users" : 0,
        "components" : [
            {
              componentId: '0172036818-2925091323-5791357689-7281373875',
              name: 'servo1',
              component: 'Pin',
              pins: [5]
            },
            {
              componentId: '8781514029-8131682941-2613260188-3714231627',
              name: 'servo2',
              component: 'Pin',
              pins: [6]
            },
            {
              componentId: '8348247906-7608551895-9997719743-8173093440',
              name: 'potentiometer1',
              component: 'Potentiometer',
              pins: [1]
            },
            {
              componentId: '1143632965-8293499000-6679397779-0243659254',
              name: 'sensor3',
              component: 'Pin',
              pins: [32]
            },
            {
              componentId: '8103221098-3807400756-7024734148-7329529311',
              name: 'sensor4',
              component: 'Pin',
              pins: [33]
            }
        ],
        "owner" : "lgir",
        "workspace" : '<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="x/:IgQm09HJ#41QfyuHy">number</variable><variable id="C1UdTdx%TI@+tl_0}A~7">i</variable><variable id="$F:3w+Xt@NdwN/k5-9VV">counter</variable></variables><block type="variables_set" id="soSyYW%HH#R*T~tFw))!" x="358" y="212"><field name="VAR" id="x/:IgQm09HJ#41QfyuHy">number</field><value name="VALUE"><block type="math_number" id="Msdiyzy$_n@pL^wCpuU"><field name="NUM">50</field></block></value><next><block type="controls_if" id="wSNl.xpiST:Z#J9k=emY"><mutation else="1"/><value name="IF0"><block type="logic_compare" id="9M3=:uS(zaOh##iajr,K"><field name="OP">EQ</field><value name="A"><block type="math_arithmetic" id="Z!{Vj7Cl~T!t$z:5}-2g"><field name="OP">ADD</field><value name="A"><shadow type="math_number" id="dMZv]FhDAT}~H.:R}nYV"><field name="NUM">40</field></shadow><block type="math_number" id="a9W]erGG(x^UPTsi]NMw"><field name="NUM">40</field></block></value><value name="B"><shadow type="math_number" id="PEw2}yUg]GXiks:,)nVj"><field name="NUM">1</field></shadow><block type="math_number" id="k]zUycpyTMuj3sEpDF-4"><field name="NUM">10</field></block></value></block></value><value name="B"><block type="variables_get" id="k7=6~?v]6r.n!HN5mK|2"><field name="VAR" id="x/:IgQm09HJ#41QfyuHy">number</field></block></value></block></value><statement name="DO0"><block type="controls_for" id="}923OGLSV#pg@=@lE%:~"><field name="VAR" id="C1UdTdx%TI@+tl_0}A~7">i</field><value name="FROM"><shadow type="math_number" id="8{Y1T~dk4k?rL?qVNfIj"><field name="NUM">1</field></shadow><block type="math_number" id="8ZvB[5m?xm+=G@oLBR!H"><field name="NUM">0</field></block></value><value name="TO"><shadow type="math_number" id="uAXB^e1+2_1K*nvb)2~."><field name="NUM">10</field></shadow><block type="math_number" id="8LtuL9Waw}J3ox3#}d_8"><field name="NUM">100</field></block></value><value name="BY"><shadow type="math_number" id="hJ2DsI-4L;VZj;zOQ1l1"><field name="NUM">10</field></shadow><block type="math_number" id="-9jmM[jg:+wU3%R$Cp$a"><field name="NUM">10</field></block></value><statement name="DO"><block type="wait" id="%gm06oF[sT1J]0wMFPCx"><field name="WAIT_TIME">0.5</field><next><block type="set" id="${p+4/9?GnJ=x^8U+DI5"><field name="COMPONENT">servo1</field><value name="VALUE"><block type="variables_get" id="z?-J8DZ0+lNB$CbB%jIT"><field name="VAR" id="C1UdTdx%TI@+tl_0}A~7">i</field></block></value><next><block type="set" id="lZskKfLDZ7L0v6-tpk{4"><field name="COMPONENT">servo2</field><value name="VALUE"><block type="variables_get" id="E0z[!P^_Nhe+@fBW}`nC"><field name="VAR" id="C1UdTdx%TI@+tl_0}A~7">i</field></block></value></block></next></block></next></block></statement></block></statement><statement name="ELSE"><block type="variables_set" id="Dg)M$$pLMX*3vywox8Nf"><field name="VAR" id="$F:3w+Xt@NdwN/k5-9VV">counter</field><value name="VALUE"><block type="math_number" id="e5|uuV_KwS@)h_.6lX!-"><field name="NUM">0</field></block></value><next><block type="controls_whileUntil" id="rbIA4swj`{LNvgR^#2Te"><field name="MODE">WHILE</field><value name="BOOL"><block type="logic_compare" id="Dk9K-K3[*y(YO6n)%A{9"><field name="OP">LT</field><value name="A"><block type="variables_get" id="O18~BQP!0ea,8X6F3Lae"><field name="VAR" id="$F:3w+Xt@NdwN/k5-9VV">counter</field></block></value><value name="B"><block type="math_number" id="y!yGbI3I1#r,xahuTAD#"><field name="NUM">100</field></block></value></block></value><statement name="DO"><block type="add" id="m},#C07SfcyXm-+3VY%R"><field name="COMPONENT">potentiometer1</field><value name="BUCKET"><block type="bucket" id="7F.30rhqvdCY8ODy%%98"><field name="BUCKET">1</field></block></value><next><block type="add" id="=A]E+81/x/zv{WR-Ifk2"><field name="COMPONENT">sensor3</field><value name="BUCKET"><block type="bucket" id="(Y,v{PBQun+6+`|LQl@~"><field name="BUCKET">2</field></block></value><next><block type="add" id="/;R1}DFYoAgoj}ZO*n2+"><field name="COMPONENT">sensor4</field><value name="BUCKET"><block type="bucket" id="cShtBmtc.U2AOQ=G,Cm/"><field name="BUCKET">3</field></block></value><next><block type="math_change" id="^_~k[;bYf[C?$^tHW%nD"><field name="VAR" id="$F:3w+Xt@NdwN/k5-9VV">counter</field><value name="DELTA"><shadow type="math_number" id="q+@(iR4oE#iSpsUu(xPZ"><field name="NUM">1</field></shadow><block type="math_number" id="F`tZm$wvCW=`}vm)}piL"><field name="NUM">2</field></block></value></block></next></block></next></block></next></block></statement></block></next></block></statement></block></next></block></xml>',
        "buckets" : {},
        "date" : "19.04.21",
        "timer" : false
    }
}
var mappings = [
    {"lgir" : "sample01"}
]
var editors = {}
var usersOnline = {
    "sample01" : []
}


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

    let previousEditor = editors[code].editor

    editors[code].editor = editors[code].waiting
    editors[code].waiting = ""

    return previousEditor

}

function RemoveSocket(socketId) {

    for (var project in editors) {

        if (project in projects) {  

            if (editors[project].editor == socketId) {
                editors[project].editor = editors[project].waiting
                editors[project].waiting = ""
            }
            else if (editors[project].waiting == socketId) {
                editors[project].waiting = ""
            }

            if (usersOnline[project].includes(socketId)) {
                projects[project].users -= 1
                usersOnline[project].filter(socket => socket != socketId)
            }
        }
    }
}

function EditCheck(code,socketId) {


    if (code == "sample01") {
        return false
    }

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

    if (code == "sample01") {
        return
    }
 
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

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    var currentDayofMonth = currentDate.getDate();
    var currentYear = currentDate.getFullYear();

    projects[code] = {
        "name" : "New Project",
        "code" : code,
        "users" : 0,
        "components" : [],
        "owner" : username,
        "workspace" : "",
        "buckets" : {},
        "date" : currentDayofMonth + "." + (currentMonth + 1) + "." + currentYear,
        "timer" : false
    }

    mappings.push({[username]:code})

    usersOnline[code] = []

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

    if (code == "sample01") {
        return
    }

    projects[code].name = name
}

function ChangeDescription(code,description) {

    if (code == "sample01") {
        return
    }

    projects[code].description = description
}

function CreateComponent(code,componentId) {

    if (code == "sample01") {
        return
    }

    projects[code].components.push({
        "componentId" : componentId,
        "name" : "",
        "component" : "",
        "pins" : [""]
    })
}

function DeleteComponent(code,componentId) {

    if (code == "sample01") {
        return
    }

    for (var i = 0; i < projects[code].components.length; i++) {
   
        if (projects[code].components[i].componentId == componentId) {

            projects[code].components.splice(i,1)
        }
    }
}

function UpdateComponent(code,componentId,property,value) {

    if (code == "sample01") {
        return
    }

    for (var i = 0; i < projects[code].components.length; i++) {
        if (projects[code].components[i].componentId == componentId) {
            projects[code].components[i][property] = value
            break
        }
    }

}

function UpdateWorkspace(code,socketId,workspaceString) {

    if (code == "sample01") {
        return
    }

    if (editors[code].editor == socketId) {
        projects[code].workspace = workspaceString
        return true
    }
    else {
        return false
    }
}

function UpdateBuckets(code,bucketJSON) {

    if (code == "sample01") {
        return
    }

    projects[code].buckets = bucketJSON
}

function GetBuckets(code) {
    return projects[code].buckets
}


function SetTimer(code,timer) {
    if (projects[code].timer != false) {
        clearTimeout(projects[code].timer)
    }
    projects[code].timer = timer
}

function RemoveTimer(code) {

    clearTimeout(projects[code].timer)
    projects[code].timer = false
}

function IncreaseUserCount(socket,code) {
    projects[code].users += 1
    usersOnline[code].push(socket)
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
exports.SetTimer = SetTimer
exports.RemoveTimer = RemoveTimer

exports.IncreaseUserCount = IncreaseUserCount