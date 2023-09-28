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
        txt += `<tr><td>${gotBooks[idx]['author']}</td><td>${gotBooks[idx]['title']}</td><td>${gotBooks[idx]['read']}</td><td><button class="update" onclick="edit_book('${gotBooks[idx]['id']}')">Update</button><button class="delete" onclick="del_book('${gotBooks[idx]['id']}')">Delete</button></td></tr>`;
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
    /* Post to server side */
    const postData = {
        title: this_title,
        author: this_author,
        read: this_bool
    }
    fetch(books_url,{
        method: "POST",
        body: JSON.stringify(postData),
        headers:{
            "Content-type": "application/json;charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
    /* Update client-side */
    const trEl = document.createElement("TR");
    trEl.innerHTML = `<td>${postData['author']}</td><td>${postData['title']}</td><td>${postData['read']}</td><td><button>Update</button class="update" onclick="edit_book()"><button class="delete" onclick="del_book()">Delete</button></td>`;

    document.getElementsByTagName("tbody")[0].appendChild(trEl);
    //console.log("new item",tab,trEl);
}

function del_book(bookId){
    /* Remove bookId from server */
    const path = `${books_url}/${bookId}`;
    fetch(path, {
        method: "DELETE",
        body: '',
        headers: { "Content-Type": "application/json; charset=UTF-8"}
    });
    /* Update gui by removing bookiD parent*/
    const delBtn = document.getElementsByClassName("delete");
    for (let idx=0;idx < delBtn.length;idx++){
        if (delBtn[idx].outerHTML.includes(bookId)){
            console.log("Bye bye",delBtn[idx].outerHTML);
            const task = delBtn[idx].parentElement.parentElement;
            task.remove();
            // task.style.display = "none";
        }
    }
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
    // Updating the GUI without reloading the page
    const editItem = document.getElementsByClassName("update");

    for(let idx = 0;idx < editItem.length; idx++){
        if (editItem[idx].outerHTML.includes(bookId)){
            console.log(bookId,"Edited");
            const thisAuth = editItem[idx].parentElement.parentElement;
            thisAuth.innerHTML = `<td>${putData.author}</td><td>${putData.title}</td><td>${putData.read}</td><td><button class="update" onclick="edit_book()">Update</button><button class="delete" onclick="del_book()">Delete</button></td>`;
        }
    }
}

function add_form(thisTitle="Add a new book",edit=false){
    const formDiv = document.createElement("section");
    formDiv.id = "addBook";
    formDiv.classList.add("modal");
    //formDiv.innerHTML = "<h3>Add a new book</h3>";
    //let txt = "";
    let buttons = "<input type='button' value='Submit' onclick='get_form()'><input type='button' value='Edit' onclick='putData()' disabled>";
    if (edit){
        buttons = "<input type='button' value='Submit' onclick='get_form()' disabled><input type='button' value='Edit' onclick='putData()'>";
    }
    formDiv.innerHTML = "<div class='modal-content'><div><h3>"+ thisTitle + "</h3><span class='close' onclick=closeNav()>&times;</span></div><div><form><label for='fauthor'>Author</label><br><input type='text' id='fauthor' name='fauthor'><br><br>" +

    "<label for='ftitle'>Title</label><br><input type='text' id='ftitle' name='ftitle'><br><br><input type='checkbox' id='book_read' name='book_read' value='Read?'><label for='book_read'>Read?</label><br><br>" + buttons + "</form></div></div>";
    window.onclick = function(ev){
        if (ev.target == formDiv){
            formDiv.remove();
            // formDiv.style.display = "none";
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
    /*
    openNav creates a new elem (section) every time, by setting
    document.getElementById('addBook').style.display = "none";
    it hides the elem and cannot modify it*/
    document.getElementById('addBook').remove();
}

function openNav(){
    mainDiv.appendChild(add_form());
    const thisDiv = document.getElementById('addBook');    
    thisDiv.style.display = "block";
}

async function remove_item(){
    /*How to remove item without id. Currently not working*/
    const delBtn = document.getElementsByClassName("delete");
    let jdx = 0;
    const data = await get_books();
    for (let idx= 0;idx<delBtn.length;idx++){
        delBtn[idx].onclick = function(){
            const task = this.parentElement.parentElement;
            task.style.display = "none";
            for (let kdx = 0; kdx < data.length; kdx++) {
                if(data[kdx]['author'] == task.childNodes[0].innerHTML){
                    jdx = kdx;
                }
            }
            console.log("Bye bye ",task.childNodes[0].innerHTML);
        }
    }
    del_book(data[jdx]['id']);
}
