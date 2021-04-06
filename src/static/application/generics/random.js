function GetRandomColour(colours = ["blue","orange","green","pink","red","teal"]) {
    return colours[Math.floor(Math.random() * colours.length)]
}