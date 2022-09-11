// Adding a note 
shownotes()
let addbtn = document.getElementById("addbtn")
let addtxt = document.getElementById("addtxt")
addbtn.addEventListener("click", function () {
    console.log("You added a note");
    let text = localStorage.getItem("text")
    if (text == null) {
        note = []
    }
    else {
        note = JSON.parse(text)
    }
    note.push(addtxt.value)
    localStorage.setItem("text", JSON.stringify(note))
    addtxt.value = ""
    shownotes()
})
//Displaying my notes-
function shownotes() {
    let text = localStorage.getItem("text")
    if (text == null) {
        note = []
    }
    else {
        note = JSON.parse(text)
    }
    let html = ""
    note.forEach(function (element, index) {
        html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p id="abc" class="card-text"> ${element}</p>
            <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div> `
    })
    notes = document.getElementById("notes")
    if (note!= 0) {
        notes.innerHTML = html
    }
    else {
        console.log("Nothing to Show!");
        notes.innerHTML=`<h2 style=color:#0d6efd;margin-top:20px;margin-left:190px> Nothing to show! Add a note above... </h2>`
    }
}
//Deleting a note
function deletenote(index){
    console.log("I am deleting",index);
    let text = localStorage.getItem("text")
    if (text == null) {
        note = []
    }
    else {
        note = JSON.parse(text)
    }
    note.splice(index,1)
    localStorage.setItem("text", JSON.stringify(note))
    shownotes()

}
let searchtxt=document.getElementById("searchtxt");
searchtxt.addEventListener("input",()=>{
    // console.log("Input event fired");
    let inputVal=searchtxt.value.toLowerCase();
    console.log(inputVal);
    let notecards=document.getElementsByClassName("noteCard");
    Array.from(notecards).forEach((element)=>{
        let cardtxt=element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardtxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        // console.log(cardtxt);
    })
})

