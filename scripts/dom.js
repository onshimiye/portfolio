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
    body.textContent = data.description;
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

    let edit = document.createElement('h2');
    let editLink = document.createElement('a');
    setAttributes(editLink, { 'href': 'javascript:void(0)' });
    editLink.textContent = 'Edit';
    editLink.addEventListener('click', () => {
        window.open(`./blog_form.html?id=${id}`, '_self');
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

    let coverImageDiv = document.createElement('div');
    setAttributes(coverImageDiv, { 'class': 'cover-image' });

    let coverImage = document.createElement('img');
    setAttributes(coverImage, { 'src': data.cover_image });

    coverImageDiv.appendChild(coverImage);

    let body = document.createElement('div');
    setAttributes(body, { 'class': 'blog-content' });

    let bodyContent = document.createElement('p');
    bodyContent.textContent = data.body;

    body.appendChild(coverImageDiv);
    body.appendChild(bodyContent);

    container.appendChild(blogHeader);
    container.appendChild(created_at);
    container.appendChild(body);

}

function renderComments() {

}


function loadBlogPage() {
    var url = new URL(window.location.href);

    var search_params = url.searchParams;

    var id = search_params.get('id');

    read(id, "read");
    console.log(id);
}

function renderBlogForm(empty, id = null, title = null, image = null, description = null, body = null) {

    let container = document.getElementsByClassName('blog-form')[0];

    let header = document.createElement('h1');

    let form = document.createElement('form');

    let titleInput = document.createElement('input');
    setAttributes(titleInput, { 'type': 'text', 'name': 'title', 'id': 'title' });

    let progressBar = document.createElement('progress');
    setAttributes(progressBar, { 'value': '0', 'max': '100', 'id': 'upload-progress' });
    progressBar.textContent = '0%';

    let coverImageInput = document.createElement('input');
    setAttributes(coverImageInput, { 'type': 'file', 'name': 'image', 'id': 'image-uploader' });
    let file;
    coverImageInput.addEventListener('change', (e) => {
        file = e.target.files[0];
    });


    let descriptionInput = document.createElement('textarea');
    setAttributes(descriptionInput, { 'name': 'description', 'id': 'description', 'cols': '20', 'rows': '1' });

    let bodyInput = document.createElement('textarea');
    setAttributes(bodyInput, { 'name': 'content', 'id': 'content', 'cols': '20', 'rows': '10' });

    let br = document.createElement('br');

    let actions = document.createElement('div');
    setAttributes(actions, { 'class': 'actions' });

    let cancelButton = document.createElement('button');
    setAttributes(cancelButton, { 'type': 'button' });
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        goBack();
    });

    let saveButton = document.createElement('button');
    setAttributes(saveButton, { 'type': 'button' });


    if (empty === true) {
        header.textContent = 'New Article';
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
            if (file) {
                create(titleInput.value, file, descriptionInput.value, bodyInput.value);
            }

        });
    } else {
        header.textContent = 'Edit Article';
        saveButton.textContent = 'Update';
        setAttributes(titleInput, { 'value': title });
        descriptionInput.defaultValue = description;
        bodyInput.defaultValue = body;

        saveButton.addEventListener('click', () => {
            update(id, form.title.value, file, form.description.value, form.content.value);
        });

    }

    actions.appendChild(cancelButton);
    actions.appendChild(saveButton);

    form.appendChild(titleInput);
    form.appendChild(br);

    form.appendChild(coverImageInput);
    form.appendChild(br);

    form.appendChild(descriptionInput);
    form.appendChild(br);

    form.appendChild(bodyInput);
    form.appendChild(br);

    form.appendChild(actions);

    container.appendChild(header);
    container.appendChild(form);

}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}