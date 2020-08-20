var App = angular.module('NewApp', ['ngMaterial','ngMessages'])
.controller('AppCtrl', function($scope) {});

var colorcode = 0;
var notescardbgTheme = ["w3-theme-d1","w3-theme-d2","w3-theme-d3","w3-theme-d4"];
var notescontbgTheme = ["w3-theme-l4","w3-theme-l3","w3-theme-l2","w3-theme-l1"];
var NewToDoTitle = document.getElementById("title");
var NewToDoContent = document.getElementById("content");
var addbtn = document.getElementById("addnote");
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

function createNote(title, content){
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

    divNote.className = "flex-90 flex-gt-xs-40 flex-md-30 flex-gt-md-20 layout-column note " + notescardbgTheme[colorcode]; 
    
    noteHeader.className = "flex-100 layout-column";

    headerTitle.className = "note-title";
    headerTitle.innerText = title;

    headerIcons.className = "material-icons btn";
    iconsCheck.innerHTML = "check";
    iconsEdit.innerHTML = "edit"
    iconsDelete.innerHTML = "delete";

    noteError.className = "hidden";
    noteError.innerHTML = "You Cannot leave the content empty."

    content = content.replace(/\r?\n/g, '<br />');
    noteContent.className = "note-content " + notescontbgTheme[colorcode];
    noteContent.innerHTML = content;
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
}

function hide(){
    document.getElementById("Alert").setAttribute('class','hidden');
}

function newtodo(){
    if(NewToDoTitle.value === "" || NewToDoContent.value === ""){
        document.getElementById("Alert").setAttribute('class','alert');
    }
    else{ 
        var note = createNote(NewToDoTitle.value,NewToDoContent.value);
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
