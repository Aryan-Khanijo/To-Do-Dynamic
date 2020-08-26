var App = angular.module('NewApp', ['ngMaterial','ngMessages'])
.controller('AppCtrl', function($scope) {});

var colorcode = 0;
var notescardbgTheme = ["w3-theme-d1","w3-theme-d2","w3-theme-d3","w3-theme-d4"];
var notescontbgTheme = ["w3-theme-l4","w3-theme-l3","w3-theme-l2","w3-theme-l1"];
var id = 0;
var todoList = [];
var NewToDoTitle = $("#title");
var NewToDoContent = $("#content");
var notesDiv = $("#currnotes");
var alert = $("#Alert")

function todo(title, content){
    if(colorcode>3){colorcode = 0;}
    this.id = ++id;
    this.title = title;
    this.content = content;
    this.colorcode = colorcode++;
    this.status = "incomplete";
    this.editable = false;
    this.error = "hidden";
}

function createDOM(todoListitem){
    var divNote = $("<div></div>");
    var noteHeader = $("<div></div>");
    var headerTitle = $("<div></div>");
    var headerIcons = $("<i></i>");
    var iconsCheck = $("<button></button>");
    var iconsEdit = $("<button></button>");
    var iconsDelete = $("<button></button>");
    var noteError = $("<div></div>");
    var noteContent = $("<div></div>");

    divNote.addClass("flex-90 flex-gt-xs-40 flex-md-30 flex-gt-md-20 layout-column note " + todoListitem["status"] + " " + notescardbgTheme[todoListitem["colorcode"]]); 
    
    noteHeader.addClass("flex-100 layout-column");

    headerTitle.addClass("note-title");
    headerTitle.text(todoListitem["title"]);

    headerIcons.addClass("material-icons btn");
    if(todoListitem["status"]==="incomplete"){
        iconsCheck.text("check");
        iconsCheck.attr('id',todoListitem["id"]);
        iconsCheck.addClass("check");
    }
    else{
        iconsCheck.text("close");
        iconsCheck.attr('id',todoListitem["id"]);
        iconsCheck.addClass("close");
    }
    if(todoListitem["editable"]===false){
        iconsEdit.text("edit");
        noteContent.attr("contentEditable","false");
        iconsEdit.attr('id',todoListitem["id"]);
        iconsEdit.addClass("edit");
    }
    else{
        iconsEdit.text("save");
        noteContent.attr("contentEditable","true");
        iconsEdit.attr('id',todoListitem["id"]);
        iconsEdit.addClass("save");
    }
    iconsDelete.text("delete");
    iconsDelete.attr('id',todoListitem["id"]);
    iconsDelete.addClass("delete");

    noteError.addClass(todoListitem["error"]);
    noteError.text("You Cannot leave the content empty.");

    todoListitem["content"] = todoListitem["content"].replace(/\r?\n/g, '<br />');
    noteContent.addClass("note-content " + notescontbgTheme[todoListitem["colorcode"]]);
    noteContent.html(todoListitem["content"]);

    headerIcons.append(iconsCheck);
    headerIcons.append(iconsEdit);
    headerIcons.append(iconsDelete);

    noteHeader.append(headerTitle);
    noteHeader.append(headerIcons);

    divNote.attr('id',"note-"+todoListitem["id"]);
    divNote.append(noteHeader);
    divNote.append(noteError);
    divNote.append(noteContent);

    return divNote;
}
$("document").ready(function (){
    $(".closebtn").click(function (){
        alert.addClass('hidden');
    })
    $("#addbtn").click(function (){
        if(NewToDoTitle.val() === "" || NewToDoContent.val() === ""){
            alert.removeClass("hidden");
        }
        else{
            title = NewToDoTitle.val();
            content = NewToDoContent.val();
            var newTodo = new todo(title, content);
            todoList.push(newTodo);
            NewToDoTitle.val("");
            NewToDoContent.val("");
            NewToDoTitle.focus();
            NewToDoTitle.blur();
            NewToDoContent.focus();
            NewToDoContent.blur();
            alert.addClass("hidden");
            refreshList(); 
        }
    })
})


function findPosition(getid){
    var item = 0;
    for (item=0;item<todoList.length;item++){
        if(todoList[item]["id"]==getid){
            return item;
        }
    }
}

function refreshList(){
    notesDiv.html("");
    var item = 0;
    for(item=0;item<todoList.length;item++){
        var note = createDOM(todoList[item]);
        notesDiv.append(note);
    }
    $(".save").click(function (){
        var getid = $(this).attr("id");
        var pos = findPosition(getid);
        var newcontent = $(`#note-${getid}`).children('div.note-content').html();
        if(newcontent===""){
            todoList[pos]["error"] = "error-message";
            refreshList();
        }
        else{
            todoList[pos]["editable"] = false;
            todoList[pos]["content"] = newcontent;
            todoList[pos]["error"] = "hidden";
            refreshList();
        }
    })

    $(".edit").click(function (){
        var getid = $(this).attr("id");
        var pos = findPosition(getid);
        todoList[pos]["editable"] = true;
        refreshList();
    })

    $(".close").click(function (){
        var getid = $(this).attr("id");
        var pos = findPosition(getid);
        todoList[pos]["status"] = "incomplete";
        refreshList();
    })

    $(".check").click(function (){
        var getid = $(this).attr("id");
        var pos = findPosition(getid);
        todoList[pos]["status"] = "complete";
        refreshList();
    })

    $(".delete").click(function (){
        var getid = $(this).attr("id");
        var newList = []
        for (var item of todoList){
            if(item['id']!=getid){
                newList.push(item);
            }
        }
        todoList = newList;
        refreshList();
    })
}