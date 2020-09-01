async function list() {
    db.collection('blogs').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            renderBlogs(doc);
        });
    }).catch(error => {
        console.error("Error adding document: ", error);
    });
}

function create(title, body, author = 'Olivier') {
    db.collection('blogs').add({
        title: title,
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
}

function update(id, title, body) {
    db.collection('blogs').doc(id).update({
        title: title,
        body: body,
        updated_at: Date.now(),
    }).then(() => {
        console.log("Document successfully updated!");
    }).catch(error => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
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

function read(id) {
    var docRef = db.collection("blogs").doc(id);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            renderBlog(doc);
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}