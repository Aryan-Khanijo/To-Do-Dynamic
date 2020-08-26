var App = angular.module('NewApp', ['ngMaterial','ngMessages'])
.controller('AppCtrl', function($scope) {});

var colorcode = 0;
var notescardbgTheme = ["w3-theme-d1","w3-theme-d2","w3-theme-d3","w3-theme-d4"];
var notescontbgTheme = ["w3-theme-l4","w3-theme-l3","w3-theme-l2","w3-theme-l1"];
var id = 0;
var todoList = [];
var NewToDoTitle = $("#title");
var NewToDoContent = $("#content");
var addbtn = $("#addnote");
var notesDiv = $("#currnotes");
var alert = $("#Alert")

function findPosition(getid){
    var item = 0;
    for (item=0;item<todoList.length;item++){
        if(todoList[item]["id"]===getid){
            return item;
        }
    }
}

function noteSave(getid){
    var pos = findPosition(getid);
    var newcontent = $(`#${getid}`).children('div.note-content').text();
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
}

function noteEdit(getid){
    var pos = findPosition(getid);
    todoList[pos]["editable"] = true;
    refreshList();
}

function noteIncomplete(getid){
    var pos = findPosition(getid);
    todoList[pos]["status"] = "incomplete";
    refreshList();
}

function noteComplete(getid){
    var pos = findPosition(getid);
    todoList[pos]["status"] = "complete";
    refreshList();
}

function removeNote(getid){
    // var pos = findPosition(getid);
    // todoList.splice(pos, 1);
    var newList = []
    for (var item of todoList){
        if(item['id']!==getid){
            newList.push(item);
        }
    }
    todoList = newList;
    refreshList();
}


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
        iconsCheck.attr('onclick',"noteComplete("+todoListitem["id"]+")");
    }
    else{
        iconsCheck.text("close");
        iconsCheck.attr('onclick',"noteIncomplete("+todoListitem["id"]+")");
    }
    if(todoListitem["editable"]===false){
        iconsEdit.text("edit");
        iconsEdit.attr('onclick',"noteEdit("+todoListitem["id"]+")");
        noteContent.attr("contentEditable","false");
    }
    else{
        iconsEdit.text("save");
        iconsEdit.attr('onclick',"noteSave("+todoListitem["id"]+")");
        noteContent.attr("contentEditable","true");
    }
    iconsDelete.text("delete");
    iconsDelete.attr('onclick',"removeNote("+todoListitem["id"]+")");

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

    divNote.attr('id',todoListitem["id"]);
    divNote.append(noteHeader);
    divNote.append(noteError);
    divNote.append(noteContent);

    return divNote;
}

function hide(){
    alert.addClass('hidden');
}

function addtolist(){
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
    
}

function refreshList(){
    notesDiv.html("");
    var item = 0;
    for(item=0;item<todoList.length;item++){
        var note = createDOM(todoList[item]);
        notesDiv.append(note);
    }
}