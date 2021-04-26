
google.charts.load('current', {'packages':['corechart']});

var uploadResultsArea = document.getElementById("upload-results-area")
var uploadAreaState = false;


function RemoveUploadArea() {
    uploadResultsArea.style.display = "none"
    uploadResultsArea.value = ""
}

function ShowUploadArea() {
    uploadResultsArea.style.display = "block"
}

var uploadResultsButton = document.getElementById("upload-results-button")
uploadResultsButton.addEventListener("click",function(){
    HideAllBuckets()
    if (uploadAreaState) {
        RemoveUploadArea()
    }
    else {
        ShowUploadArea()
    }
})

var resultsDropdown = document.getElementById("results-dropdown")

var bucketContainer = document.getElementById("bucket-container")
var buckets = []


class Bucket {

    Populate(bucketValues) {
        
        let currentId = document.createElement("div")
        currentId.textContent = "ID"
        currentId.classList.add("heading-id","heading")
        this.tableContainerInterior.append(currentId)

        let currentTimestamp = document.createElement("div")
        currentTimestamp.textContent = "Timestamp"
        currentTimestamp.classList.add("heading-timestamp","heading")
        this.tableContainerInterior.append(currentTimestamp)

        let currentValue = document.createElement("div")
        currentValue.textContent = "Value"
        currentValue.classList.add("heading-value","heading")
        this.tableContainerInterior.append(currentValue)

        for (let i = 0; i < bucketValues.length; i++) {

            currentId = document.createElement("div")
            currentId.textContent = i + 1
            currentId.classList.add("id")
            this.tableContainerInterior.append(currentId)

            currentTimestamp = document.createElement("div")
            currentTimestamp.textContent = bucketValues[i].timestamp
            currentTimestamp.classList.add("timestamp")
            this.tableContainerInterior.append(currentTimestamp)

            currentValue = document.createElement("div")
            currentValue.textContent = bucketValues[i].value
            currentValue.classList.add("value")
            this.tableContainerInterior.append(currentValue)

        }

        var occurenceArray = {}

        for (let i = 0; i < bucketValues.length; i++) {
            if (bucketValues[i].value in occurenceArray) {
                occurenceArray[bucketValues[i].value] += 1
            }
            else {
                occurenceArray[bucketValues[i].value] = 1
            }
        }

        var chartDataTable = []
        let occurence = ["Value","Occurences"]
        chartDataTable.push(occurence)

        for (let key in occurenceArray) {
            occurence = []
            occurence.push(key,parseInt(occurenceArray[key]))
            chartDataTable.push(occurence)
        }

 
        // Chart Injection
        var data = google.visualization.arrayToDataTable(chartDataTable);

        var options = {
            title: 'Bucket Chart',
            width: 500,
            height: 250,
            backgroundColor: "#DFDFDF",
            slices: [{color:"#005DC7"},{color:"#FF002B"},{color:"#FF9100"},{color:"#FF00D4"},{color:"#00B199"}]
            
        }

        var chart = new google.visualization.PieChart(this.chartContainer);

        chart.draw(data,options)

    }

    
    Delete() {
        this.element.remove()
    }

    Show() {
        this.element.style.display = ""
    }

    Hide() {
        this.element.style.display = "none"
    }

    constructor(number,bucketValues) {
        
        this.element = document.createElement("div")
        this.element.classList.add("bucket")
        
        let tableContainer = document.createElement("div")
        this.tableContainerInterior = document.createElement("div")
        this.tableContainerInterior.classList.add("table-container-interior")

        tableContainer.append(this.tableContainerInterior)
        tableContainer.classList.add("bucket__table")
        this.element.append(tableContainer)

        let nameContainer = document.createElement("div")
        nameContainer.textContent = "Bucket " + number
        nameContainer.classList.add("bucket__name")
        this.element.append(nameContainer)

        this.chartContainer = document.createElement("div")
        this.chartContainer.classList.add("bucket__chart")
        this.element.append(this.chartContainer)

        bucketContainer.appendChild(this.element)

        this.Populate(bucketValues)

    }
}


function CreateBuckets(bucketJSON) {

    for (let i = 0; i < bucketJSON.length; i++) {
        buckets.push(new Bucket(bucketJSON[i].number,bucketJSON[i].bucketValues))
    }

    ShowBucketPage(1)
}

function ShowBucketPage(page) {

    for (let i = 0; i < buckets.length; i++) {

        if (Math.abs(parseInt(i / 4)) == page - 1) {
            buckets[i].Show()
        }
        else {
            buckets[i].Hide()
        }
    }
}

function HideAllBuckets() {
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].Hide()
    }
}

function RemoveAllBuckets() {
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].Delete()
    }

    buckets = []
}

var bucketJSON = {}
var monitorBuckets = ["HHHH"]

uploadResultsArea.addEventListener("input",function(e){

    if (e.key != "Control") {

        try {

            let targetJSON = JSON.parse(e.target.value)
            
        }
        catch(exception) {
            
            RemoveUploadArea()

            Message("show",incorrectJSONMessage,5000,true)

            return
        }
        
        let targetJSON = JSON.parse(e.target.value)
        e.target.value = ""
        RemoveUploadArea()

        var currentDate = new Date();
        var currentSeconds = currentDate.getSeconds();
        var currentMinute = currentDate.getMinutes();
        var currentHour = currentDate.getHours();
        var currentMonth =currentDate.getMonth();
        var currentDayofMonth = currentDate.getDate();
        var currentYear = currentDate.getFullYear();
        var currentTimestamp = currentDayofMonth + "." + (currentMonth + 1) + "." + currentYear + " " + currentHour + ":" + currentMinute + ":" + currentSeconds;

        let option = document.createElement("option")
        option.textContent = currentTimestamp
        option.selected = "true"
        resultsDropdown.append(option)

        monitorBuckets[currentTimestamp] = targetJSON

        RemoveAllBuckets()
        
        CreateBuckets(monitorBuckets[currentTimestamp])     

        socket.emit("buckets",{
            "code" : code,
            "buckets" : monitorBuckets
        })
    }
})



//Creates the first bucket
google.charts.setOnLoadCallback(function(){


    socket.emit("get_buckets",{
        "code" : code,
    })

    socket.on("get_buckets", function(msg){

        monitorBuckets = msg.buckets

        let option;
        for (let key in monitorBuckets) {
            option = document.createElement("option")
            option.textContent = key
            resultsDropdown.append(option)
        }
    
        if (Object.keys(monitorBuckets).length > 0) {
            CreateBuckets(monitorBuckets[Object.keys(monitorBuckets)[0]],Object.keys(monitorBuckets)[0])
        }
    


    })
})


resultsDropdown.addEventListener("change", function(e){

    RemoveAllBuckets()
    CreateBuckets(monitorBuckets[e.target.value])
    
})