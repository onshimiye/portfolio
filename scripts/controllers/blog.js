function list() {
    db.collection('blogs').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            renderBlogs(doc);
        });
    }).catch(error => {
        console.error("Error adding document: ", error);
    });
}

function create(title, file, description, body, author = 'Olivier') {
    var storageRef = firebase.storage().ref('blog_covers/' + file.name);

    var uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
        function progress(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is " + progress + " done");
        },

        function error(err) {
            console.log(error.message);
        },

        function complete() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downlaodURL) {
                //get your upload image url here...
                console.log(downlaodURL);
                db.collection('blogs').add({
                    title: title,
                    cover_image: downlaodURL,
                    description: description,
                    body: body,
                    created_at: Date.now(),
                    updated_at: Date.now(),
                    views: 0,
                    author: author,
                }).then(docRef => {
                    console.log("Document written with ID: ", docRef.id);
                    return docRef.id;
                }).catch(error => {
                    console.error("Error adding document: ", error);
                });
            });
        }
    );

}

function update(id, title, file, description, body) {
    if (file) {
        var storageRef = firebase.storage().ref('blog_covers/' + file.name);

        var uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',
            function progress(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("upload is " + progress + " done");
            },

            function error(err) {
                console.log(error.message);
            },

            function complete() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(downlaodURL) {
                    //get your upload image url here...
                    console.log(downlaodURL);

                    db.collection('blogs').doc(id).update({
                        title: title,
                        cover_image: downlaodURL,
                        description: description,
                        body: body,
                        updated_at: Date.now(),
                    }).then(() => {
                        console.log("Document successfully updated!");
                    }).catch(error => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                });
            }
        );


    } else {
        db.collection('blogs').doc(id).update({
            title: title,
            description: description,
            body: body,
            updated_at: Date.now(),
        }).then(() => {
            console.log("Document successfully updated!");
        }).catch(error => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }

}

function remove(id) {
    db.collection('blogs').doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        deleteCancel();
    }).catch(error => {
        // The document probably doesn't exist.
        console.error("Error deleting document: ", error);
    });
}

function read(id, method) {
    var docRef = db.collection("blogs").doc(id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            switch (method) {
                case "read":
                    renderBlog(doc);
                    break;
                case "update":
                    let data = doc.data();
                    renderBlogForm(false, doc.id, data.title, data.cover_image, data.description, data.body);
                    break;
                default:
                    break;
            }
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}