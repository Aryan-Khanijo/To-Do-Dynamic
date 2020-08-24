var App = angular.module('NewApp', ['ngMaterial','ngMessages'])
.controller('AppCtrl', function($scope) {});

var colorcode = 0;
var notescardbgTheme = ["w3-theme-d1","w3-theme-d2","w3-theme-d3","w3-theme-d4"];
var notescontbgTheme = ["w3-theme-l4","w3-theme-l3","w3-theme-l2","w3-theme-l1"];
var NewToDoTitle = document.getElementById("title");
var NewToDoContent = document.getElementById("content");
var addbtn = document.getElementById("addnote");
var notesDiv = document.getElementById("currnotes");
var id = 0;
var todoList = [];


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
    todoList[pos]["editable"] = "false";
    var newcontent = document.getElementById(getid).getElementsByClassName("note-content")[0].innerText;
    todoList[pos]["content"] = newcontent;
    refreshList();
}

function noteEdit(getid){
    var pos = findPosition(getid);
    todoList[pos]["editable"] = "true";
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

function addtolist(){
    if(NewToDoTitle.value === "" || NewToDoContent.value === ""){
        document.getElementById("Alert").setAttribute('class','alert');
    }
    else{
        title = NewToDoTitle.value;
        content = NewToDoContent.value;
        var newTodo = new todo(title, content);
        todoList.push(newTodo);
        NewToDoTitle.value = "";
        NewToDoContent.value = "";
        NewToDoTitle.focus = true;
        NewToDoTitle.focus = false;
        NewToDoContent.focus = true;
        NewToDoContent.focus = false;
        refreshList(); 
    }
    
}

function createDOM(todoListitem){
    var divNote = document.createElement("div");
    var noteHeader = document.createElement("div");
    var headerTitle = document.createElement("div");
    var headerIcons = document.createElement("i");
    var iconsCheck = document.createElement("button");
    var iconsEdit = document.createElement("button");
    var iconsDelete = document.createElement("button");
    var noteError = document.createElement("div");
    var noteContent = document.createElement("div");

    divNote.className = "flex-90 flex-gt-xs-40 flex-md-30 flex-gt-md-20 layout-column note " + todoListitem["status"] + " " + notescardbgTheme[todoListitem["colorcode"]]; 
    
    noteHeader.className = "flex-100 layout-column";

    headerTitle.className = "note-title";
    headerTitle.innerText = todoListitem["title"];

    headerIcons.className = "material-icons btn";
    if(todoListitem["status"]==="incomplete"){
        iconsCheck.innerHTML = "check";
        iconsCheck.setAttribute('onclick',"noteComplete("+todoListitem["id"]+")");
    }
    else{
        iconsCheck.innerHTML = "close";
        iconsCheck.setAttribute('onclick',"noteIncomplete("+todoListitem["id"]+")");
    }
    if(todoListitem["editable"]===false){
        iconsEdit.innerHTML = "edit";
        iconsEdit.setAttribute('onclick',"noteEdit("+todoListitem["id"]+")");
        noteContent.setAttribute("contentEditable","false");
    }
    else{
        iconsEdit.innerHTML = "save";
        iconsEdit.setAttribute('onclick',"noteSave("+todoListitem["id"]+")");
        noteContent.setAttribute("contentEditable","true");
    }
    iconsDelete.innerHTML = "delete";
    iconsDelete.setAttribute('onclick',"removeNote("+todoListitem["id"]+")");

    noteError.className = todoListitem["error"];
    noteError.innerHTML = "You Cannot leave the content empty."

    content = content.replace(/\r?\n/g, '<br />');
    noteContent.className = "note-content " + notescontbgTheme[todoListitem["colorcode"]];
    noteContent.innerHTML = todoListitem["content"];

    headerIcons.appendChild(iconsCheck);
    headerIcons.appendChild(iconsEdit);
    headerIcons.appendChild(iconsDelete);

    noteHeader.appendChild(headerTitle);
    noteHeader.appendChild(headerIcons);

    divNote.id = todoListitem["id"];
    divNote.appendChild(noteHeader);
    divNote.appendChild(noteError);
    divNote.appendChild(noteContent);

    return divNote;
}

function refreshList(){
    notesDiv.innerHTML = "";
    var item = 0;
    for(item=0;item<todoList.length;item++){
        var note = createDOM(todoList[item]);
        notesDiv.appendChild(note);
    }
}