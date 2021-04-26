//BLOCKLY_INJECT.JS
//Contains the code used to create a Blockly instance

function createBlockly(options) {
  
  var ableToSend = false

  var blocklyArea = document.getElementById('blockly-container');   //variable blocklyarea that holds the container
  var blocklyDiv = document.getElementById('blocklyDiv');   //blockly div
  var ws = new Blockly.WorkspaceSvg(new Blockly.Options({}))   //variable to hold workspace svg with blockly options
  
  var workspace = Blockly.inject(blocklyDiv, options);
  
  
  if (workspaceString != "") {
    
    var parsedWorkspaceXML = Blockly.Xml.textToDom(workspaceXML.documentElement.textContent)
    // Attempting to clear prior to import due to duplication glitch
    workspace.clear()
    //Imports the xml to the workspace
    Blockly.Xml.domToWorkspace(parsedWorkspaceXML, workspace)

  }
   
  var onresize = function(e) {  
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);

  };
  window.addEventListener('resize', onresize, false);  //window event listener 
  onresize();
  Blockly.svgResize(workspace);   //resizes the workspace

  document.getElementById("toggle-chat").addEventListener("click", function() { //gets chat to open on click 
    onresize();
  });

  document.getElementById("toggle-monitor").addEventListener("click", function() {  //montior to open on click
    onresize();
  });


  setTimeout(function(){
    ableToSend = true
  },1500)

  workspace.addChangeListener(function(event) {

    if (isCurrentEditor && ableToSend) {

      if (event instanceof Blockly.Events.UiBase) {
        return
      }

      var json = event.toJson();

      var XMLSerial = new XMLSerializer()

      socket.emit("blockly_update_workspace",{
        "code" : code,
        "blocklyEvent" : json,
        "blocklyWorkspace" : XMLSerial.serializeToString(Blockly.Xml.workspaceToDom(workspace))
      })
    }
  })

  //Waiting for the download code button to be clicked
  document.getElementById("download-code").addEventListener("click", function(){

    try {

      var element = document.createElement('a');
      let encoding = "data:text/plain;charset=utf-8,"


      var code = "# Lightweight Graphical Interface for Robotics\n"
      code += "# Last LGIR Workspace Update: 0.9.6/12.04.21/23:41\n"
      code += "from random import randint\n"
      code += "from datetime import datetime\n"
      code += "# LGIR Setup\n"
      code += "time = lambda : datetime.now().strftime('%H:%M:%S')\n"
      code += "buckets = []\n"
      code += "for i in range(1,20) : buckets.append({'number':i,'bucketValues':[]})\n"
      code += "pinwrite = lambda pin, value : print('Write: Setting pin',pin,'to',value)\n"
      code += "def pinread(pin,bucket):\n"
      code += "    print('Read: Reading pin',pin,'and placing into bucket',bucket)\n"
      code += "    buckets[bucket - 1]['bucketValues'].append({'timestamp':time(),'value':randint(0,30)})\n"
      code += "def showresults():\n"
      code += "    print()\n"
      code += "    print('==================================== Test Results ===================================')\n"
      code += "    print('You can paste the results in to the workspace monitor page to view them more clearly.')\n"
      code += "    print()\n"
      code += "    print(buckets)\n"
      code += "# Program\n"
      code += Blockly.Python.workspaceToCode(workspace)
      code += "\n# Show Program Results\n"
      code += "showresults()"

      element.setAttribute('href', encoding + encodeURIComponent(code));
      element.download = "filename.py"
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  
    }
    catch (error) {
      Message("show",incorrectSyntaxMessage,4000,true)

    }

  })
  

  return workspace

}

function deleteBlockly(workspace) {
  workspace.dispose()
}




