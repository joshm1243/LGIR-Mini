var customBlocks = {

  "speed" :{
    "type": "speed",
    "message0": "Speed %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VALUE",
        "options": [
          [
            "Slow",
            "20"
          ],
          [
            "Medium",
            "50"
          ],
          [
            "Fast",
            "100"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },

  
  
  "brightness" :{
    "type": "brightness",
    "message0": "Brightness %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VALUE",
        "options": [
          [
            "Dim",
            "20"
          ],
          [
            "Medium",
            "50"
          ],
          [
            "Bright",
            "100"
          ],
        ]
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },



  
  "power" :{
    "type": "power",
    "message0": "Power %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VALUE",
        "options": [
          [
            "Off",
            "0"
          ],
          [
            "On",
            "100"
          ],
        ]
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },




  "wait" :{
    "type": "wait",
    "message0": "Wait %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "WAIT_TIME",
        "options": [
          [
            "Half a second",
            "0.5"
          ],
          [
            "One second",
            "1"
          ],
          [
            "Two Seconds",
            "2"
          ],
          [
            "Five Seconds",
            "5"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },


  
  "add" : {
    "type": "add",
    "message0": "Add %1 to %2",
    "args0": [
      {
        "type": "field_input",
        "name": "COMPONENT",
        "text": ""
      },
      {
        "type": "input_value",
        "name": "BUCKET",
        "check": "bucket"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },


  "set" : {
    "type": "set",
    "message0": "Set %1 to %2",
    "args0": [
      {
        "type": "field_input",
        "name": "COMPONENT",
        "text": ""
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "value"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },

  
  "bucket" : {
    "type": "bucket",
    "message0": "Bucket %1",
    "args0": [
      {
        "type": "field_input",
        "name": "BUCKET",
        "text": ""
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 180,
    "tooltip": "",
    "helpUrl": ""
  },


}