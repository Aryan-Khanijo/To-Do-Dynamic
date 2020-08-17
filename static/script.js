var App = angular.module('NewApp', ['ngMaterial','ngMessages'])
.controller('AppCtrl', function($scope) {});

var colorcode = 0;
var notescardbgTheme = ["w3-theme-d1","w3-theme-d2","w3-theme-d3","w3-theme-d4"];
var notescontbgTheme = ["w3-theme-l4","w3-theme-l3","w3-theme-l2","w3-theme-l1"];
var NewToDoTitle = document.getElementById("title");
var NewToDoContent = document.getElementById("content");
const sleep = ms => new Promise(res => setTimeout(res, ms));

var removeNote = async function (){
    var parent = this.parentElement.parentElement.parentElement;
    parent.parentNode.removeChild(parent);
    var dltbtn = document.getElementsByClassName("prev-dbl-click");
    var order;
    for(order=0; order<dltbtn.length; order++){
        dltbtn[order].disabled = true;
    }
    await sleep(100);
    for(order=0; order<dltbtn.length; order++){
        dltbtn[order].disabled = false;
    }
}

var noteComplete = async function(){
    var parent = this.parentElement.parentElement.parentElement;
    parent.classList.toggle("complete");
    var icon = parent.firstElementChild.lastElementChild.firstElementChild.innerText;
    if (icon === "check"){
        parent.firstElementChild.lastElementChild.firstElementChild.innerText = "close";
        parent.firstElementChild.lastElementChild.childNodes[0].disabled = true;
        await sleep(100);
        parent.firstElementChild.lastElementChild.childNodes[0].disabled = false;
    }
    else{
        parent.firstElementChild.lastElementChild.firstElementChild.innerText = "check";
        parent.firstElementChild.lastElementChild.childNodes[0].disabled = true;
        await sleep(100);
        parent.firstElementChild.lastElementChild.childNodes[0].disabled = false;
    }
}

var noteEdit = async function (){
    var parent = this.parentElement.parentElement.parentElement;
    var edit_bool = parent.lastElementChild.getAttribute("contentEditable");
    if(edit_bool === "false"){
        parent.lastElementChild.setAttribute("contentEditable","true");
        parent.firstElementChild.lastElementChild.childNodes[1].innerText = "save";
        parent.firstElementChild.lastElementChild.childNodes[1].disabled = true;
        await sleep(100);
        parent.firstElementChild.lastElementChild.childNodes[1].disabled = false;
    }
    else{
        if(parent.lastElementChild.innerHTML===""){
            parent.childNodes[1].className = "error-message";
        }
        else{
            parent.childNodes[1].className = "hidden";
            parent.lastElementChild.setAttribute("contentEditable","false");
            parent.firstElementChild.lastElementChild.childNodes[1].innerText = "edit";
            parent.firstElementChild.lastElementChild.childNodes[1].disabled = true;
            await sleep(100);
            parent.firstElementChild.lastElementChild.childNodes[1].disabled = false;
        }
    }
}

var Note = {
    Title: NewToDoTitle,
    Content: NewToDoContent,
    divClasscom: "flex-90 flex-gt-xs-40 flex-md-30 flex-gt-md-20 layout-column note ",
    headClass: "flex-100 layout-column",
    titleClass: "note-title",
    iconClass: "material-icons btn",
    iconCheck: "check",
    iconEdit: "edit",
    iconDelete: "delete",
    noteError: "You Cannot leave the content empty.",
    createNote: function(){
        if(colorcode>3){colorcode = 0;}
        var divNote = document.createElement("div");
        var noteHeader = document.createElement("div");
        var headerTitle = document.createElement("div");
        var headerIcons = document.createElement("i");
        var iconsCheck = document.createElement("button");
        var iconsEdit = document.createElement("button");
        var iconsDelete = document.createElement("button");
        var noteError = document.createElement("div");
        var noteContent = document.createElement("div");

        divNote.className =  this.divClasscom + notescardbgTheme[colorcode]; 
        
        noteHeader.className = this.headClass;

        headerTitle.className = this.titleClass;
        headerTitle.innerText = this.Title.value;

        headerIcons.className = this.iconClass;
        iconsCheck.innerHTML = this.iconCheck;
        iconsEdit.innerHTML = this.iconEdit;
        iconsDelete.innerHTML = this.iconDelete;

        noteError.className = "hidden";
        noteError.innerHTML = this.noteError;

        noteContent.className = "note-content " + notescontbgTheme[colorcode];
        noteContent.innerHTML = this.Content.value.replace(/\r?\n/g, '<br />');
        noteContent.setAttribute("contentEditable","false");
        
        iconsDelete.className = "prev-dbl-click";
        iconsDelete.addEventListener('click',removeNote);
        iconsCheck.addEventListener('click',noteComplete);
        iconsEdit.addEventListener('click',noteEdit);

        headerIcons.appendChild(iconsCheck);
        headerIcons.appendChild(iconsEdit);
        headerIcons.appendChild(iconsDelete);

        noteHeader.appendChild(headerTitle);
        noteHeader.appendChild(headerIcons);

        divNote.appendChild(noteHeader);
        divNote.appendChild(noteError);
        divNote.appendChild(noteContent);
        colorcode += 1;
        return divNote;
    },   
}

function hide(){
    document.getElementById("Alert").setAttribute('class','hidden');
}

function newtodo(){
    if(NewToDoTitle.value === "" || NewToDoContent.value === ""){
        document.getElementById("Alert").setAttribute('class','alert');
    }
    else{ 
        var note = Note.createNote();
        NewToDoTitle.value = "";
        NewToDoContent.value = "";
        NewToDoTitle.focus = true;
        NewToDoTitle.focus = false;
        NewToDoContent.focus = true;
        NewToDoContent.focus = false;
        document.getElementById("currnotes").appendChild(note);
        document.getElementById("Alert").setAttribute('class','hidden'); 
    }
}