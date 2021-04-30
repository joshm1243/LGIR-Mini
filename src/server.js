const ssn = require("express-session")
const express = require("express")
const app = express()
const http = require("http").createServer(app)

var io = require("socket.io")(http)

app.set("view engine","ejs")
app.use("/static",express.static("static"))

app.use(express.urlencoded({
    "extended":true
}))

app.use(ssn({secret:"JA9L1Z2F",resave:true,saveUninitialized:true}))

const Projects = require("./services/projects")
const Accounts = require("./services/accounts")
const Log = require("./services/log")
const { render } = require("ejs")

var session;

//Usernames and password
var accounts = [

    {
        "username" : "lgir",
        "password" : "182637"
    },

    {
        "username" : "team1",
        "password" : "371823"
    },

    {
        "username" : "team2",
        "password" : "192839"
    },

    {
        "username" : "team3",
        "password" : "172837"
    },

    {
        "username" : "team4",
        "password" : "773773"
    },

    {
        "username" : "team5",
        "password" : "881728"
    },

    {
        "username" : "team6",
        "password" : "182938"
    },

    {
        "username" : "team7",
        "password" : "172637"
    },

    {
        "username" : "supervisor",
        "password" : "162736"
    },

    {'username' : 'test11','password' : '920059'},{'username' : 'test12','password' : '968706'},{'username' : 'test13','password' : '305916'},{'username' : 'test14','password' : '425105'},{'username' : 'test15','password' : '603816'},{'username' : 'test16','password' : '174946'},{'username' : 'test17','password' : '041618'},{'username' : 'test18','password' : '379638'},{'username' : 'test19','password' : '660863'},{'username' : 'test110','password' : '612054'},{'username' : 'test111','password' : '394540'},{'username' : 'test112','password' : '435204'},{'username' : 'test113','password' : '029566'},{'username' : 'test114','password' : '092810'},
    {'username' : 'test21','password' : '272048'},{'username' : 'test22','password' : '412606'},{'username' : 'test23','password' : '138725'},{'username' : 'test24','password' : '861560'},{'username' : 'test25','password' : '821975'},{'username' : 'test26','password' : '381505'},{'username' : 'test27','password' : '916972'},{'username' : 'test28','password' : '841790'},{'username' : 'test29','password' : '882977'},{'username' : 'test210','password' : '620024'},{'username' : 'test211','password' : '318148'},{'username' : 'test212','password' : '734356'},{'username' : 'test213','password' : '260380'},{'username' : 'test214','password' : '132842'},
    {'username' : 'test31','password' : '034048'},{'username' : 'test32','password' : '346241'},{'username' : 'test33','password' : '957702'},{'username' : 'test34','password' : '178448'},{'username' : 'test35','password' : '022053'},{'username' : 'test36','password' : '124573'},{'username' : 'test37','password' : '523274'},{'username' : 'test38','password' : '151234'},{'username' : 'test39','password' : '127476'},{'username' : 'test310','password' : '783329'},{'username' : 'test311','password' : '158773'},{'username' : 'test312','password' : '336703'},{'username' : 'test313','password' : '369692'},{'username' : 'test314','password' : '181326'},
    {'username' : 'test41','password' : '701306'},{'username' : 'test42','password' : '610491'},{'username' : 'test43','password' : '042861'},{'username' : 'test44','password' : '683792'},{'username' : 'test45','password' : '400245'},{'username' : 'test46','password' : '382420'},{'username' : 'test47','password' : '947680'},{'username' : 'test48','password' : '911063'},{'username' : 'test49','password' : '181195'},{'username' : 'test410','password' : '708740'},{'username' : 'test411','password' : '800654'},{'username' : 'test412','password' : '199533'},{'username' : 'test413','password' : '053016'},{'username' : 'test414','password' : '892533'},
    {'username' : 'test51','password' : '509337'},{'username' : 'test52','password' : '415470'},{'username' : 'test53','password' : '431893'},{'username' : 'test54','password' : '796319'},{'username' : 'test55','password' : '853033'},{'username' : 'test56','password' : '931163'},{'username' : 'test57','password' : '106338'},{'username' : 'test58','password' : '159401'},{'username' : 'test59','password' : '849026'},{'username' : 'test510','password' : '309492'},{'username' : 'test511','password' : '510219'},{'username' : 'test512','password' : '228927'},{'username' : 'test513','password' : '925438'},{'username' : 'test514','password' : '219122'},
    {'username' : 'test61','password' : '359038'},{'username' : 'test62','password' : '842941'},{'username' : 'test63','password' : '279169'},{'username' : 'test64','password' : '051260'},{'username' : 'test65','password' : '819478'},{'username' : 'test66','password' : '528229'},{'username' : 'test67','password' : '363673'},{'username' : 'test68','password' : '030553'},{'username' : 'test69','password' : '291577'},{'username' : 'test610','password' : '013471'},{'username' : 'test611','password' : '372491'},{'username' : 'test612','password' : '132181'},{'username' : 'test613','password' : '423211'},{'username' : 'test614','password' : '507751'},
    {'username' : 'test71','password' : '965723'},{'username' : 'test72','password' : '987707'},{'username' : 'test73','password' : '821588'},{'username' : 'test74','password' : '104968'},{'username' : 'test75','password' : '137547'},{'username' : 'test76','password' : '208989'},{'username' : 'test77','password' : '369675'},{'username' : 'test78','password' : '988449'},{'username' : 'test79','password' : '753633'},{'username' : 'test710','password' : '220221'},{'username' : 'test711','password' : '837804'},{'username' : 'test712','password' : '668200'},{'username' : 'test713','password' : '444127'},{'username' : 'test714','password' : '844223'},
    {'username' : 'test81','password' : '154006'},{'username' : 'test82','password' : '925341'},{'username' : 'test83','password' : '931613'},{'username' : 'test84','password' : '319209'},{'username' : 'test85','password' : '234667'},{'username' : 'test86','password' : '620157'},{'username' : 'test87','password' : '620358'},{'username' : 'test88','password' : '014081'},{'username' : 'test89','password' : '512818'},{'username' : 'test810','password' : '317808'},{'username' : 'test811','password' : '209912'},{'username' : 'test812','password' : '348238'},{'username' : 'test813','password' : '540674'},{'username' : 'test814','password' : '461399'},
    {'username' : 'test91','password' : '410412'},{'username' : 'test92','password' : '450648'},{'username' : 'test93','password' : '379236'},{'username' : 'test94','password' : '897258'},{'username' : 'test95','password' : '330735'},{'username' : 'test96','password' : '260001'},{'username' : 'test97','password' : '018615'},{'username' : 'test98','password' : '719931'},{'username' : 'test99','password' : '135212'},{'username' : 'test910','password' : '801534'},{'username' : 'test911','password' : '405883'},{'username' : 'test912','password' : '852161'},{'username' : 'test913','password' : '693739'},{'username' : 'test914','password' : '003065'},
    {'username' : 'test101','password' : '951648'},{'username' : 'test102','password' : '846310'},{'username' : 'test103','password' : '521406'},{'username' : 'test104','password' : '840301'},{'username' : 'test105','password' : '852428'},{'username' : 'test106','password' : '430313'},{'username' : 'test107','password' : '146269'},{'username' : 'test108','password' : '916194'},{'username' : 'test109','password' : '259499'},{'username' : 'test1010','password' : '631852'},{'username' : 'test1011','password' : '130086'},{'username' : 'test1012','password' : '268449'},{'username' : 'test1013','password' : '881577'},{'username' : 'test1014','password' : '921576'},
    {'username' : 'test111','password' : '792829'},{'username' : 'test112','password' : '853344'},{'username' : 'test113','password' : '692042'},{'username' : 'test114','password' : '889830'},{'username' : 'test115','password' : '972746'},{'username' : 'test116','password' : '984432'},{'username' : 'test117','password' : '296409'},{'username' : 'test118','password' : '885005'},{'username' : 'test119','password' : '386909'},{'username' : 'test1110','password' : '772796'},{'username' : 'test1111','password' : '606334'},{'username' : 'test1112','password' : '802137'},{'username' : 'test1113','password' : '005676'},{'username' : 'test1114','password' : '427955'},
    {'username' : 'test121','password' : '505014'},{'username' : 'test122','password' : '821535'},{'username' : 'test123','password' : '143202'},{'username' : 'test124','password' : '667928'},{'username' : 'test125','password' : '201159'},{'username' : 'test126','password' : '253164'},{'username' : 'test127','password' : '523496'},{'username' : 'test128','password' : '072146'},{'username' : 'test129','password' : '109686'},{'username' : 'test1210','password' : '631128'},{'username' : 'test1211','password' : '753508'},{'username' : 'test1212','password' : '252691'},{'username' : 'test1213','password' : '185145'},{'username' : 'test1214','password' : '905939'},
    {'username' : 'test131','password' : '714376'},{'username' : 'test132','password' : '200449'},{'username' : 'test133','password' : '724744'},{'username' : 'test134','password' : '371800'},{'username' : 'test135','password' : '964420'},{'username' : 'test136','password' : '363098'},{'username' : 'test137','password' : '927075'},{'username' : 'test138','password' : '546094'},{'username' : 'test139','password' : '774518'},{'username' : 'test1310','password' : '368298'},{'username' : 'test1311','password' : '680196'},{'username' : 'test1312','password' : '385841'},{'username' : 'test1313','password' : '997839'},{'username' : 'test1314','password' : '126541'},
    {'username' : 'test141','password' : '124015'},{'username' : 'test142','password' : '702084'},{'username' : 'test143','password' : '338243'},{'username' : 'test144','password' : '463903'},{'username' : 'test145','password' : '662032'},{'username' : 'test146','password' : '252804'},{'username' : 'test147','password' : '568449'},{'username' : 'test148','password' : '251015'},{'username' : 'test149','password' : '104533'},{'username' : 'test1410','password' : '882866'},{'username' : 'test1411','password' : '931357'},{'username' : 'test1412','password' : '033372'},{'username' : 'test1413','password' : '433847'},{'username' : 'test1414','password' : '805809'},
    {'username' : 'test151','password' : '806857'},{'username' : 'test152','password' : '561273'},{'username' : 'test153','password' : '559588'},{'username' : 'test154','password' : '573118'},{'username' : 'test155','password' : '661342'},{'username' : 'test156','password' : '708976'},{'username' : 'test157','password' : '253675'},{'username' : 'test158','password' : '022902'},{'username' : 'test159','password' : '671659'},{'username' : 'test1510','password' : '058817'},{'username' : 'test1511','password' : '739660'},{'username' : 'test1512','password' : '205430'},{'username' : 'test1513','password' : '592203'},{'username' : 'test1514','password' : '495871'},
    {'username' : 'test161','password' : '208676'},{'username' : 'test162','password' : '233634'},{'username' : 'test163','password' : '567594'},{'username' : 'test164','password' : '116002'},{'username' : 'test165','password' : '900799'},{'username' : 'test166','password' : '423842'},{'username' : 'test167','password' : '809147'},{'username' : 'test168','password' : '936895'},{'username' : 'test169','password' : '121023'},{'username' : 'test1610','password' : '550333'},{'username' : 'test1611','password' : '780784'},{'username' : 'test1612','password' : '154454'},{'username' : 'test1613','password' : '604906'},{'username' : 'test1614','password' : '251053'},
    {'username' : 'test171','password' : '500587'},{'username' : 'test172','password' : '827993'},{'username' : 'test173','password' : '233167'},{'username' : 'test174','password' : '855602'},{'username' : 'test175','password' : '841155'},{'username' : 'test176','password' : '705190'},{'username' : 'test177','password' : '898006'},{'username' : 'test178','password' : '501016'},{'username' : 'test179','password' : '829871'},{'username' : 'test1710','password' : '713537'},{'username' : 'test1711','password' : '229302'},{'username' : 'test1712','password' : '492516'},{'username' : 'test1713','password' : '727032'},{'username' : 'test1714','password' : '621194'},
    {'username' : 'test181','password' : '809835'},{'username' : 'test182','password' : '243047'},{'username' : 'test183','password' : '256752'},{'username' : 'test184','password' : '280698'},{'username' : 'test185','password' : '502730'},{'username' : 'test186','password' : '466666'},{'username' : 'test187','password' : '508695'},{'username' : 'test188','password' : '326312'},{'username' : 'test189','password' : '079014'},{'username' : 'test1810','password' : '157610'},{'username' : 'test1811','password' : '394058'},{'username' : 'test1812','password' : '093168'},{'username' : 'test1813','password' : '904809'},{'username' : 'test1814','password' : '521332'},
    {'username' : 'test191','password' : '672595'},{'username' : 'test192','password' : '766926'},{'username' : 'test193','password' : '622131'},{'username' : 'test194','password' : '145989'},{'username' : 'test195','password' : '900921'},{'username' : 'test196','password' : '440452'},{'username' : 'test197','password' : '098540'},{'username' : 'test198','password' : '331688'},{'username' : 'test199','password' : '561393'},{'username' : 'test1910','password' : '129667'},{'username' : 'test1911','password' : '315934'},{'username' : 'test1912','password' : '801040'},{'username' : 'test1913','password' : '189353'},{'username' : 'test1914','password' : '619818'},
]

function Authenticate(username,password) {
    return accounts.some(a => a.username == username && a.password == password)
}

app.get("/", (req,res) => { 
    res.redirect("/login")
})

app.get("/login", (req,res) => {
    res.render("login")
})


app.post("/login", (req,res) => {

    let username = req.body.username || ""
    let password = req.body.password || ""

    if (Authenticate(username,password)) {
     
        session = req.session
        session.username = username

        res.redirect("/dashboard")
    }
    else {
        res.redirect("/login")
    }
})

app.get("/dashboard", (req,res) => {

    session = req.session

    if (session.username) {

        userProjects = Projects.GetAccountProjects(session.username)

        var authToken = Accounts.GetToken(session.username)

        res.render("dashboard", {
            username : session.username,
            projects : userProjects,
            token : authToken
        })
    }
    else {
        res.redirect("/login")
    }

})

app.get("/app/:code/settings", (req,res) => {
    session = req.session

    if(session.username) {

        if (Projects.Exists(req.params.code)) {

            if (Projects.CanAccess(session.username,req.params.code)) {

                let projectInfo = Projects.GetInfo(req.params.code)

                let projectUsers = Projects.GetUsers(req.params.code)

                var authToken = Accounts.GetToken(session.username)

                res.render("projectsettings",{
                    token : authToken,
                    code : req.params.code,
                    username : session.username,
                    name : projectInfo.name,
                    description : projectInfo.description,
                    users : projectUsers,
                    components : projectInfo.components
                })
            }
            else {
                res.redirect("/dashboard")
            }
        }
        else  {
            res.redirect("/dashboard")
        }
    }
    else {
        res.redirect("/login")
    }
})




app.get("/app/:code", (req,res) => {

    session = req.session

    if(session.username) {

         if (Projects.Exists(req.params.code)) {

            if (Projects.CanAccess(session.username,req.params.code)) {

                let projectInfo = Projects.GetInfo(req.params.code)

                let projectUsers = Projects.GetUsers(req.params.code)
                
                var authToken = Accounts.GetToken(session.username)

                console.log(projectInfo)

                res.render("workspace",{
                    token : authToken,
                    code : req.params.code,
                    username : session.username,
                    name : projectInfo.name,
                    description : projectInfo.description,
                    users : projectUsers,
                    date : projectInfo.date,
                    workspace : projectInfo.workspace,
                    buckets : projectInfo.buckets
                })
            }
            else {
                res.redirect("/dashboard")
            }
        }
        else  {
            res.redirect("/dashboard")
        }
    }

    else {
        res.redirect("/login")
    }


})

app.get("*", (req,res) => {
    res.redirect("/login")
})


app.get("/logout", (req,res) => {
    session = req.session
    session.destroy()
    res.redirect("/login")
})


http.listen("80", () => {
    console.log("\n# # # # # # # # # # Server Restarted # # # # # # # # # #\n")
})


function ProjectSecurityStack(socketId,projectCode) {

    if (Accounts.Authenticate(socketId)) {
        let username = Accounts.GetUsernameBySocket(socketId)
        if (Projects.Exists(projectCode) && Projects.CanAccess(username,projectCode)) {
            return true
        }
    }
    
    return false
}

io.on("connection", (socket) => {

    socket.on("hello", (msg) => {
        socket.emit("hello")
    })

    socket.on("authenticate", (msg) => {
        Accounts.PresentToken(socket.id,msg.token)

        let path = socket.request.headers.referer

        socket.join("socket_" + socket.id)

        if (path.includes("app") && !(path.includes("settings"))) {
            if (ProjectSecurityStack(socket.id,msg.code)) {
                socket.join("project_app_" + msg.code)
            }
        }
        else if (path.includes("app") && path.includes("settings")) {
            
            if (ProjectSecurityStack(socket.id,msg.code)) {
                socket.join("project_settings_" + msg.code)
            }
        }
    })

    socket.on("project_create", () => {
        if (Accounts.Authenticate(socket.id)) {
            let username = Accounts.GetUsernameBySocket(socket.id)
            project = Projects.Create(username)
            socket.emit("project_create_reply",project)
        }
    })

    socket.on("project_join", (msg) => {
        if (Accounts.Authenticate(socket.id)) {
            let username = Accounts.GetUsernameBySocket(socket.id)
            socket.emit("project_join_reply",Projects.Join(username,msg.code))
        }
    })

    socket.on("project_remove", (msg) => {
        if (Accounts.Authenticate(socket.id)) {
            let username = Accounts.GetUsernameBySocket(socket.id)
            Projects.Remove(username,msg.code)   
        }
    })

    socket.on("project_name", (msg) => {
        if (Accounts.Authenticate(socket.id)) {
            let username = Accounts.GetUsernameBySocket(socket.id)
            if (Projects.Exists(msg.code)) {
                if (Projects.CanAccess(username,msg.code)) {
                    Projects.ChangeName(msg.code,msg.name)

                    socket.broadcast.to("project_settings_" + msg.code).emit("project_name_update",{
                        "name" : msg.name
                    })
                }
            }
        }
    })

    socket.on("project_description", (msg) => {
        authResult = Accounts.Authenticate(msg.token)
        if (Accounts.Authenticate(socket.id)) {
            let username = Accounts.GetUsernameBySocket(socket.id)
            if (Projects.Exists(msg.code)) {
                if (Projects.CanAccess(username,msg.code)) {
                    Projects.ChangeDescription(msg.code,msg.description)
                    socket.broadcast.to("project_settings_" + msg.code).emit("project_description_update",{
                        "description" : msg.description
                    })
                }
            }
        }
    })


    socket.on("project_changeusertype", (msg) => {
        if (Accounts.Authenticate(socket.id)) {
            let username = Accounts.GetUsernameBySocket(socket.id)
            Projects.ChangeUserType(username,msg.code,msg.userToChange,msg.permission)
        }
    })

    socket.on("project_deleteuser", (msg) => {
        if (Accounts.Authenticate(socket.id)) {
            let username = Accounts.GetUsernameBySocket(socket.id)
            if (Projects.Exists(msg.code)) {
                if (Projects.CanAccess(username,msg.code)) {
                    Projects.Remove(msg.userToRemove,msg.code)
                }
            }
        }
    })

    socket.on("project_create_component", (msg) => {
        if (Accounts.Authenticate(socket.id)) {
            let username = Accounts.GetUsernameBySocket(socket.id)
            if (Projects.Exists(msg.code)) {
                if (Projects.CanAccess(username,msg.code)) {
                    Projects.CreateComponent(msg.code,msg.componentId)

                    socket.broadcast.to("project_settings_" + msg.code).emit("project_create_component",{
                        "componentId" : msg.componentId
                    })
                }
            }
        }
    })

    socket.on("project_delete_component", (msg) => {
        if (ProjectSecurityStack(socket.id,msg.code)) {

            Projects.DeleteComponent(msg.code,msg.componentId)

            socket.broadcast.to("project_settings_" + msg.code).emit("project_delete_component",{
                "componentId" : msg.componentId
            })
        }
    })

    
    socket.on("project_update_component", (msg) => {
        if (ProjectSecurityStack(socket.id,msg.code)) {
            Projects.UpdateComponent(msg.code,msg.componentId,msg.property,msg.value)

            socket.broadcast.to("project_settings_" + msg.code).emit("project_update_component",{
                "code" : msg.code,
                "componentId" : msg.componentId,
                "property" : msg.property,
                "value" : msg.value
            })
        }
    })


    socket.on("project-delete", (msg) => {
        if (ProjectSecurityStack(socket.id,msg.code )) {
            let username = Accounts.GetUsernameBySocket(socket.id)
            Projects.Remove(username,msg.code)
        }
    })

    socket.on("edit_check", (msg) => {

        if (ProjectSecurityStack(socket.id,msg.code)) {
            
            Projects.IncreaseUserCount(socket.id,msg.code)

            if (Projects.EditCheck(msg.code,socket.id)) {
                
                io.to(socket.id).emit("edit_check",{
                    "edit" : true
                })
            }
            else {

                io.to(socket.id).emit("edit_check",{
                    "edit" : false
                })
            }
        }
    })

    socket.on("edit_request", (msg) => {

        if (msg.code != "sample01") {

            if (ProjectSecurityStack(socket.id,msg.code)) {
                
                let editRequestResut = Projects.EditRequest(msg.code,socket.id)

                if (editRequestResut.edit == "true") {

                    io.to(socket.id).emit("edit_request",{
                        "edit" : true
                    })
                }
                else {

                    if (editRequestResut.reason == "currentEditor") {
                    
                        let autoReplyTimer = setTimeout(function(){

                            let previousEditor = Projects.PromoteWaitingEditor(msg.code)

                            io.to(previousEditor).emit("edit_force_takeover",{})

                            io.to(socket.id).emit("edit_request",{
                                "edit" : true
                            })

                        },5000)

                        Projects.SetTimer(msg.code,autoReplyTimer)
                        
                        io.to(editRequestResut.editorSocketId).emit("edit_takeover")
                        io.to(socket.id).emit("edit_request",{
                            "edit" : false,
                            "reason" : "asking"
                        })
                    }
                    else {
                        io.to(socket.id).emit("edit_request",{
                            "edit" : false,
                            "reason" : "full"
                        })
                    }
                }
            }

        }
    })

    socket.on("edit_takeover", (msg) => {
        if (Accounts.Authenticate(socket.id)) {
            var waitingEditor = Projects.EditReply(socket.id,msg.promote)

            if (msg.promote) {

                io.to(waitingEditor).emit("edit_takeover_reply",{
                    "edit" : true,
                })
            }
            else {

                io.to(waitingEditor).emit("edit_takeover_reply",{
                    "edit" : false,
                })
            }

            Projects.RemoveTimer(msg.code)
        }
    })

    socket.on("blockly_update_workspace", (msg) => {

        console.log(msg)

        if (ProjectSecurityStack(socket.id,msg.code)) {

            if (Projects.UpdateWorkspace(msg.code,socket.id,msg.blocklyWorkspace)) {
                socket.to("project_app_" + msg.code).emit("project_update_workspace",{
                    "blocklyEvent" : msg.blocklyEvent,
                    "blocklyWorkspace" : msg.blocklyWorkspace
                })
            }
        }

    })

    socket.on("buckets", (msg) => {
        if (ProjectSecurityStack(socket.id,msg.code)) {
            Projects.UpdateBuckets(msg.code,msg.buckets)
        }
    })

    socket.on("get_buckets", (msg) => {
        if (ProjectSecurityStack(socket.id,msg.code)) {
            io.to(socket.id).emit("get_buckets", {
                "buckets" : Projects.GetBuckets(msg.code)
            })
        }
    })

    socket.on("get_mappings", (msg) => {
        if (ProjectSecurityStack(socket.id,msg.code)) {
            io.to(socket.id).emit("get_mappings", {
                "mappings" : Projects.GetInfo(msg.code).components
            })
        }
    })

    socket.on("chat", function(msg) {
        if (ProjectSecurityStack(socket.id,msg.code)) {
            socket.to("project_app_" + msg.code).emit("chat", {
                "message" : msg.message
            })
        }
    })

    socket.on("feedback", function(msg) {

    })

    socket.on("disconnect", (msg) => {
        if (Accounts.Authenticate(socket.id)) {
            Projects.RemoveSocket(socket.id)
        }
    })

})
