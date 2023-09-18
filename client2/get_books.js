const books_url = "http://127.0.0.1:3872/books";
const mainDiv = document.getElementById("root");
mainDiv.innerHTML = "<h2>My list of books</h2><button onclick='openNav()'>Add Book</button><hr>";

mainDiv.appendChild(add_form());

let thisId= "";

(async ()=>{
    const gotBooks = await get_books();
    const tab = document.createElement("table");

    let txt = "<tr><th>Author</th><th>Title</th><th>Read?</th><th></th></tr>";

    for (let idx=0;idx < gotBooks.length; idx++){
        txt += `<tr><td>${gotBooks[idx]['author']}</td><td>${gotBooks[idx]['title']}</td><td>${gotBooks[idx]['read']}</td><td><button onclick="edit_book('${gotBooks[idx]['id']}')">Update</button><button class="delete" onclick="del_book('${gotBooks[idx]['id']}')">Delete</button></td></tr>`;
    }

    tab.innerHTML = txt;
    mainDiv.appendChild(tab);
    //remove_item();
})();

async function get_books(){
    const response = await fetch(books_url);
    const data = await response.json();
    console.log("got data",data);
    return data.books;
}

function add_book(this_author,this_title,this_bool){
    fetch(books_url,{
        method: "POST",
        body: JSON.stringify({
            'title': this_title,
            'author': this_author,
            'read': this_bool
        }),
        headers:{
            "Content-type": "application/json;charset=UTF-8"
        }
    })
    .then((response)=>response.json())
    .then((json)=>console.log(json));
}

function del_book(bookId){
    /* */
    const path = `${books_url}/${bookId}`;
    fetch(path, {
        method: "DELETE",
        body: '',
        headers: { "Content-Type": "application/json; charset=UTF-8"}
    });
    // disp_books();
}

async function edit_book(bookId){
    const data = await get_books();
    mainDiv.appendChild(add_form());
    //openNav();
    let idx = 0;
    // must find the index of book
    for (let jdx = 0; jdx < data.length; jdx++){
        /*if (Object.hasOwnProperty(key)){}*/
        if (data[jdx]['id'] == bookId){
            idx = jdx;
            console.log("thisIdx",idx);
            break;
        }
    }
    // console.log("thisData",data[idx]);
    document.getElementById('ftitle').value = data[idx]['title'];
    document.getElementById('fauthor').value = data[idx]['author'];
    document.getElementById('book_read').checked = data[idx]['read'];
    openNav();
    thisId = bookId; //Updated id
}

function putData(){
    let bookId = thisId;
    const putData = {
        title: document.getElementById('ftitle').value,
        author: document.getElementById('fauthor').value,
        read: document.getElementById('book_read').checked,
    };
    const path = `${books_url}/${bookId}`;
    fetch(path, {
        method: "PUT",
        body: JSON.stringify(putData),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then((response)=>response.json())
    .then((json)=>console.log(json));
    closeNav()
}

function add_form(){
    const formDiv = document.createElement("section");
    formDiv.id = "addBook";
    formDiv.classList.add("modal");
    //formDiv.innerHTML = "<h3>Add a new book</h3>";
    //let txt = "";
    formDiv.innerHTML = "<div class='modal-content'><div><h3>Add a new book</h3><span class='close' onclick=closeNav()>&times;</span></div><div><form><label for='fauthor'>Author</label><br><input type='text' id='fauthor' name='fauthor'><br>" +
    "<label for='ftitle'>Title</label><br><input type='text' id='ftitle' name='ftitle'><br><input type='checkbox' id='book_read' name='book_read' value='Read?'><label for='book_read'>Read?</label><br><input type='button' value='Submit' onclick='get_form()'><input type='button' value='Edit' onclick='putData()'></form></div></div>";
    window.onclick = function(ev){
        if (ev.target == formDiv){
            formDiv.style.display = "none";
        }
    }
    return formDiv;
}

function get_form(){
    const title = document.getElementById("ftitle").value;
    const author = document.getElementById("fauthor").value;
    const read = document.getElementById("book_read").checked;
    console.log(title,author,read);
    add_book(title,author,read);
    closeNav();
}

function closeNav(){
    document.getElementById('addBook').style.display = "none";    
}

function openNav(){
    const thisDiv = document.getElementById('addBook');    
    thisDiv.style.display = "block";
}
