var currDayEl = $("#currentDay");
var rowContainer = $(".row");
currDayEl.text(moment().format("dddd, MMMM Do YYYY"));


var auditTask = function (){
    var currentHr = moment().hour();
    $(".task").each(function(){
        var indexHr = parseInt($(this).parent(".row").attr("id"))

    if (currentHr < indexHr) {
        $(this).addClass("future")
        $(this).removeClass("present")
        $(this).removeClass("past")
    } 
    if (currentHr == indexHr) {
        $(this).removeClass("future")
        $(this).addClass("present")
        $(this).removeClass("past")
    }
    if (currentHr > indexHr) {
        $(this).removeClass("future")
        $(this).removeClass("present")
        $(this).addClass("past")
    }
    })
}

    var timeCheck = 3600000 - (moment().minutes() * 60 * 1000 + moment().seconds()* 1000)
    setTimeout (function() {
        auditTask();
        setInterval (auditTask,1000*60*60);
    }, timeCheck)

console.log(3600000 - moment().minutes() * 60 * 1000 + moment().seconds()* 1000)



var task = {    
    "9": [""],
    "10": [""],
    "11": [""],
    "12": [""],
    "13": [""],
    "14": [""],
    "15": [""],
    "16": [""],
    "17": [""]
};

function loadTask () {
    loadedTasks = JSON.parse(localStorage.getItem("schedule"));  

        if (loadedTasks) {
            task=loadedTasks
            $.each(task, function(index, value){
                var time = $("#"+ index);
                createTask(value, time)
            })
        }

    auditTask()
}
var createTask = function (taskItem, time) {
    var task = time.find(".task");
    var taskP = $("<p>")
        .addClass("description")
        .text(taskItem);
    task.html(taskP)
}

rowContainer.on("click",".task", function(){
    var text = $(this)
        .text()
        .trim();
    var textInput = $("<textarea>")
        .addClass("form-control")
        .attr("style","border: none")
        .val(text);
    $(this).find(".description").replaceWith(textInput);
    textInput.trigger("focus");
})

rowContainer.on("blur","textarea", function(){
    var text = $(this)
    .val()
    .trim();   
    
    var revert = $("<p>")
        .addClass("description")
        .text(text);

    $(this).replaceWith(revert);
})

$(".saveBtn").click(function() {
    var text = $(this)
    .parent(".row")
    .find(".description")
    .text();   

    var status = $(this)
    .closest(".row")
    .attr("id");
    
    task[status]=text
    saveTask()

})

var saveTask = function () {
    localStorage.setItem("schedule", JSON.stringify(task));
}

loadTask()
// refreshInterval()
