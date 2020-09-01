// Firebase integration

function renderBlogs(doc) {
    let data = doc.data();
    let id = doc.id;

    let blogsContainer = document.getElementsByClassName('blogs-container')[0];

    let blog = document.createElement('div');
    blog.setAttribute('blog-id', id);

    let header = document.createElement('div');
    setAttributes(header, { 'class': 'blog-header' });

    let title = document.createElement('h2');
    let titleLink = document.createElement('a');
    setAttributes(titleLink, { 'href': 'javascript:void(0)', 'id': id });
    titleLink.textContent = data.title;
    titleLink.addEventListener('click', () => {
        window.open(`./article.html?id=${id}`, '_self');
    })

    title.appendChild(titleLink);

    let deleteButton = document.createElement('h2');
    let deleteLink = document.createElement('a');
    setAttributes(deleteLink, { 'href': 'javascript:void(0)', 'id': 'delete-popup-trigger' });
    deleteLink.textContent = 'Delete';
    deleteLink.addEventListener('click', () => {
        deletePopup(id);
    })

    deleteButton.appendChild(deleteLink);

    header.appendChild(title);
    header.appendChild(deleteButton);


    let created_at = document.createElement('p');
    setAttributes(created_at, { 'class': 'created-at' });
    created_at.textContent = data.created_at;


    let body = document.createElement('p');
    setAttributes(body, { 'id': 'main-highlight' });
    body.textContent = data.body;
    let readmore = document.createElement('a');
    setAttributes(readmore, { 'href': 'javascript:void(0)', 'class': 'readmore' });
    readmore.textContent = 'Read More...';
    readmore.addEventListener('click', () => {
        window.open(`./article.html?id=${id}`, '_self');
    })

    body.appendChild(readmore);
    blog.appendChild(header);
    blog.appendChild(created_at);
    blog.appendChild(body);

    blogsContainer.appendChild(blog);
}

function createBlog() {

    const form = document.querySelector('#new-blog-form');
    create(form.title.value, form.content.value)

}

function renderBlog(doc) {
    let data = doc.data();
    let id = doc.id;

    console.log('open');
    let container = document.getElementsByClassName('main-container')[0];

    let blogHeader = document.createElement('div');
    setAttributes(blogHeader, { 'class': 'blog-header' })

    let title = document.createElement('h1');
    title.textContent = data.title;

    // let headerActions = document.createElement('div');
    // setAttributes(headerActions, {'class':'header-actions'});

    let edit = document.createElement('h2');
    let editLink = document.createElement('a');
    setAttributes(editLink, { 'href': 'javascript:void(0)' });
    editLink.textContent = 'Edit';
    editLink.addEventListener('click', () => {
        window.open(`./edit.html?id=${id}&body=${data.body}&title=${data.title}`, '_self');
    })
    edit.appendChild(editLink);

    let deleteButton = document.createElement('h2');
    let deleteLink = document.createElement('a');
    setAttributes(deleteLink, { 'href': 'javascript:void(0)', 'id': 'delete-popup-trigger' });
    deleteLink.textContent = 'Delete';
    deleteLink.addEventListener('click', () => {
        deletePopup(id);
    });
    deleteButton.appendChild(deleteLink);

    blogHeader.appendChild(title);
    blogHeader.appendChild(edit);
    blogHeader.appendChild(deleteButton);

    let created_at = document.createElement('p');
    setAttributes(created_at, { 'class': 'created-at' });
    created_at.textContent = data.created_at;

    let body = document.createElement('div');
    setAttributes(body, { 'class': 'blog-content' });

    let bodyContent = document.createElement('p');
    bodyContent.textContent = data.body;

    body.appendChild(bodyContent);

    container.appendChild(blogHeader);
    container.appendChild(created_at);
    container.appendChild(body);

}

function renderComments() {

}


function loadBlogPage() {
    var url = new URL(window.location.href);

    // get access to URLSearchParams object
    var search_params = url.searchParams;

    var id = search_params.get('id');

    read(id)
    console.log(id);
}

function loadUpdatePage() {
    var url = new URL(window.location.href);

    // get access to URLSearchParams object
    var search_params = url.searchParams;

    var id = search_params.get('id');
    var title = search_params.get('title');
    var body = search_params.get('body');

    const form = document.querySelector('#edit-blog-form');
    form.title.value = title
    form.content.value = body

    let updateButton = document.getElementById('update-button');
    updateButton.addEventListener('click', () => {
        update(id, form.title.value, form.content.value)
    })

    console.log(id);

}

function updateBlog() {

}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}