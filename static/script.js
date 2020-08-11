var App = angular.module('NewApp', ['ngMaterial','ngMessages'])
.controller('AppCtrl', function($scope) {});

var colorcode = 0;
var notescardbgTheme = ["w3-theme-d1","w3-theme-d2","w3-theme-d3","w3-theme-d4"];
var notescontbgTheme = ["w3-theme-l4","w3-theme-l3","w3-theme-l2","w3-theme-l1"];
var NewToDoTitle = document.getElementById("title");
var NewToDoContent = document.getElementById("content");
var addbtn = document.getElementById("addnote");

var removeNote = function (){
    var parent = this.parentElement.parentElement.parentElement;
    parent.parentNode.removeChild(parent);
}

var noteComplete = function(){
    var parent = this.parentElement.parentElement.parentElement;
    parent.classList.toggle("complete");
    var icon = parent.firstElementChild.lastElementChild.firstElementChild.innerText;
    if (icon === "check"){
        parent.firstElementChild.lastElementChild.firstElementChild.innerText = "close";
    }
    else{
        parent.firstElementChild.lastElementChild.firstElementChild.innerText = "check";
    }
}

var noteEdit = function (){
    var parent = this.parentElement.parentElement.parentElement;
    var edit_bool = parent.lastElementChild.getAttribute("contentEditable");
    if(edit_bool === "false"){
        parent.lastElementChild.setAttribute("contentEditable","true");
    }
    else{
        parent.lastElementChild.setAttribute("contentEditable","false");
    }
}

function createNote(title, content){
    if(colorcode>3){colorcode = 0;}
    var divNote = document.createElement("div");
    var noteHeader = document.createElement("div");
    var headerTitle = document.createElement("div");
    var headerIcons = document.createElement("i");
    var iconsCheck = document.createElement("button");
    var iconsEdit = document.createElement("button");
    var iconsDelete = document.createElement("button");
    var noteContent = document.createElement("div");

    divNote.className = "flex-20 layout-column note " + notescardbgTheme[colorcode]; 
    
    noteHeader.className = "flex-100 layout-column";

    headerTitle.className = "note-title";
    headerTitle.innerText = title;

    headerIcons.className = "material-icons btn";
    iconsCheck.innerHTML = "check";
    iconsEdit.innerHTML = "edit"
    iconsDelete.innerHTML = "delete";

    noteContent.className = "note-content " + notescontbgTheme[colorcode];
    noteContent.innerHTML = content;
    noteContent.setAttribute("contentEditable","false");
    
    
    iconsDelete.addEventListener('click',removeNote);
    iconsCheck.addEventListener('click',noteComplete);
    iconsEdit.addEventListener('click',noteEdit);

    headerIcons.appendChild(iconsCheck);
    headerIcons.appendChild(iconsEdit);
    headerIcons.appendChild(iconsDelete);

    noteHeader.appendChild(headerTitle);
    noteHeader.appendChild(headerIcons);

    divNote.appendChild(noteHeader);
    divNote.appendChild(noteContent);
    colorcode += 1;
    return divNote;
}

function newtodo(){
    var note = createNote(NewToDoTitle.value,NewToDoContent.value);
    NewToDoTitle.value = "";
    NewToDoContent.value = "";
    document.getElementById("currnotes").appendChild(note);
}