
function GetComponent(name) {
  for (let i = 0; i < ProjectMappingJSON.length; i++) {
    if (ProjectMappingJSON[i].name === name) {
      return ProjectMappingJSON[i]
    }
  }
}



// Python Gen Stub - COMPLETE
Blockly.Python["wait"] = function(block) {
  return "time.sleep(" + block.getFieldValue("WAIT_TIME") + ")\n";
};

Blockly.Python["set"] = function(block) {

  let component = GetComponent(block.getFieldValue("COMPONENT"))
  let value = Blockly.Python.valueToCode(block,"VALUE",Blockly.Python.ORDER_NONE)
  let code = "pinwrite("

  if (component.type != "screen") {
    code += component.pins[0] + "," + value + ")"
  }
  else {

  }

  return code + "\n";
};

Blockly.Python["add"] = function(block) {

  let component = GetComponent(block.getFieldValue("COMPONENT"))
  let bucket = Blockly.Python.valueToCode(block,"BUCKET",Blockly.Python.ORDER_NONE)

  let code = "pinread("

  if (component.type != "screen") {
    code += component.pins[0] + "," + bucket + ")"
  }

  return code + "\n";
};

Blockly.Python["speed"] = function(block) {
  return [block.getFieldValue("VALUE"),Blockly.Python.ORDER_NONE]
};

Blockly.Python["brightness"] = function(block) {
  return [block.getFieldValue("VALUE"),Blockly.Python.ORDER_NONE]
};

Blockly.Python["power"] = function(block) {
  return [block.getFieldValue("VALUE"),Blockly.Python.ORDER_NONE]
};

Blockly.Python["bucket"] = function(block) {
  return [block.getFieldValue("BUCKET"),Blockly.Python.ORDER_NONE]
};
