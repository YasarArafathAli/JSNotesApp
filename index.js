// getting add notes button
const addBtn = document.getElementById('add')


// geting notes item from local storage and parsing into JSON
const notes = JSON.parse(localStorage.getItem('notes'))


// addings fetched notes into the document
if(notes) {
    notes.forEach(note => addNewNote(note))
}

// Event on button to create a new note
addBtn.addEventListener('click', () => addNewNote())



// creating a new note function
// params : text:String default: emptyString
function addNewNote(text = '') {
    // creating a note div
    const note = document.createElement('div')
    note.classList.add('note')  // adding a class 'note' to the div

    
    // creating a node and inserting it into heml using innerHTML
    note.innerHTML = `  

    <!-- heading buttons for editing and dividing -->
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    

    <!-- div to display the written note  -->

    <div class="main ${text ? "" : "hidden"}">
    
    </div>
    
    <!-- text area to explain the existing div  -->

    <textarea class="${text ? "hidden" : ""}"></textarea>

    <!-- Button to save edited content -->

    <button class="edit ${text? "hidden": ""} done"><i class="fas fa-check"></i> Done</button>`


    // selecting the buttons, div and textarea inserted into the note
    const editBtn = note.querySelector('.edit')
    const doneBtn = note.querySelector('.done')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')


    // textarea's value same as the text recieved
    textArea.value = text
   // main.innerHTML = marked(text) // calling marked function to create markup for existing file- optional 
    main.innerHTML = text


    // deleting the note
    deleteBtn.addEventListener('click', () => {
        note.remove()
        updateLS()
    })

    // toggling between edit and display of the note generated
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
        doneBtn.classList.toggle('hidden')

    })
    
    // toggling between saving the file and displaying the file
    doneBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
        doneBtn.classList.toggle('hidden')
    })


    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        // main.innerHTML = marked(value) // markup for new created file
        main.innerHTML = value

        updateLS()
    })

    document.body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))
}

