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

var accounts = [
    {
        "username" : "team102",
        "password" : "team102"
    },

    {
        "username" : "team29",
        "password" : "team29"
    },

    {
        "username" : "team40",
        "password" : "team40"
    },

    {
        "username" : "team144",
        "password" : "team144"
    },

    {
        "username" : "team295",
        "password" : "team295"
    },

    {
        "username" : "team420",
        "password" : "team420"
    },

    {
        "username" : "test1",
        "password" : "172839"
    },

    {
        "username" : "test2",
        "password" : "102837"
    },

    {
        "username" : "test3",
        "password" : "192037"
    },

    {
        "username" : "test4",
        "password" : "172837"
    },

    {
        "username" : "test5",
        "password" : "192837"
    },

    {
        "username" : "test6",
        "password" : "125323"
    },
  
    {
        "username" : "test7",
        "password" : "662331"
    },

    
    {
        "username" : "test8",
        "password" : "192039"
    },

    {
        "username" : "test9",
        "password" : "192168"
    },

    {
        "username" : "test10",
        "password" : "182712"
    },

    {
        "username" : "test11",
        "password" : "125323"
    },
    
    {
        "username" : "test12",
        "password" : "182738"
    },
    
    {
        "username" : "test13",
        "password" : "991882"
    },

    
    {
        "username" : "test14",
        "password" : "115225"
    },

    {
        "username" : "test15",
        "password" : "776771"
    },

    {
        "username" : "test16",
        "password" : "188233"
    },

    
    {
        "username" : "test17",
        "password" : "909090"
    },

    
    {
        "username" : "test18",
        "password" : "076767"
    },

    
    {
        "username" : "test19",
        "password" : "003001"
    },

    {
        "username" : "test20",
        "password" : "288312"
    },

    
    {
        "username" : "test21",
        "password" : "177223"
    },

    
    {
        "username" : "test22",
        "password" : "228228"
    },
    
    {
        "username" : "test23",
        "password" : "331332"
    },

    {
        "username" : "test24",
        "password" : "199312"
    },

    {
        "username" : "test25",
        "password" : "192873"
    },
    
    {
        "username" : "test26",
        "password" : "194412"
    },

    {
        "username" : "test27",
        "password" : "399182"
    },

    {
        "username" : "test28",
        "password" : "162736"
    },
    
    {
        "username" : "test29",
        "password" : "293829"
    },
    
    {
        "username" : "test30",
        "password" : "949494"
    },

    {
        "username" : "supervisor",
        "password" : "172948"
    }
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

                res.render("workspace",{
                    token : authToken,
                    code : req.params.code,
                    username : session.username,
                    name : projectInfo.name,
                    description : projectInfo.description,
                    users : projectUsers,
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
    console.log("----------------------------- SERVER RESTART -------------------------------")
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



    socket.on("edit_check", (msg) => {

        if (ProjectSecurityStack(socket.id,msg.code)) {

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
        if (ProjectSecurityStack(socket.id,msg.code)) {
            
            
            let editRequestResut = Projects.EditRequest(msg.code,socket.id)

            if (editRequestResut.edit == "true") {
                io.to(socket.id).emit("edit_request",{
                    "edit" : true
                })
            }
            else {
                if (editRequestResut.reason == "currentEditor") {
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
        }
    })

    socket.on("blockly_update_workspace", (msg) => {

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
        console.log("# # # # # # # # # # # # # FEEDBACK # # # # # # # # # # # # #")
        console.log("User: " + Accounts.GetUsernameBySocket(socket.id))
        console.log("Timestamp: " + (Math.floor(Date.now()/1000)))
        console.log("Page: " + msg.page)
        console.log("Question 1: " + msg.question1)
        console.log("Question 2: " + msg.question2)
        console.log("Question 3: " + msg.question3)
        console.log("Written Feedback: " + msg.question4)
        console.log("# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #")
    })

    socket.on("disconnect", (msg) => {
        if (Accounts.Authenticate(socket.id)) {
            Projects.RemoveSocket(socket.id)
        }
    })

})
