var currDayEl = $("#currentDay");
var rowContainer = $(".row");
currDayEl.text(moment().format("dddd, MMMM Do YYYY"));

var refreshInterval = function () {
    setInterval (auditTask(),1000*60*60)
}

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
        .addClass("content")
        .text(taskItem);
    task.html(taskP)
}

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

rowContainer.on("click",".task", function(){
    var text = $(this)
        .text()
        .trim();
    var textInput = $("<textarea>")
        .addClass("col form-contorl")
        .attr("style","border: none")
        .val(text);
    $(this).find(".content").replaceWith(textInput);
    textInput.trigger("focus");
})

rowContainer.on("blur","textarea", function(){
    var text = $(this)
    .val()
    .trim();   
    
    var revert = $("<p>")
        .addClass("content")
        .text(text);

    $(this).replaceWith(revert);
})

$(".saveBtn").click(function() {
    var text = $(this)
    .parent(".row")
    .find(".content")
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
refreshInterval()
