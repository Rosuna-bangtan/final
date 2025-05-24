window.onload = function () {
    const editButtons = document.querySelectorAll('.edit_content_button');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // 1. get parentElement
            const parentElement = event.currentTarget.parentElement;
            const text = parentElement.querySelector('.content_text').innerText;

            // 2. convert the <p> into an <input>
            const inputElement = document.createElement('input');
            inputElement.value = text;

            parentElement.appendChild(inputElement);

            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';

            const id = parentElement.getAttribute('data-id');
            saveButton.addEventListener('click', async () => {
                const body = JSON.stringify({
                    content: inputElement.value,
                })

                const response = await fetch("/posts/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: body,
                });
            })


            parentElement.appendChild(saveButton)
        })
    })

    const deleteButtons = document.querySelectorAll('.delete_button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            const response = await fetch("/posts/" + id, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
            });

            // refresh the page so user can see the latest updates
            location.reload();
        })
    })

    const newPostForm = document.getElementById('new_post_form');
    newPostForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('submitting new post');
        const body = JSON.stringify({
            title: document.getElementById('title_field').value,
            quote: document.getElementById('quote_field').value,
           
        })
        console.log(body);
        const response = await fetch("/posts", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: body,
        });

        // refresh the page so user can see the latest updates
        location.reload();
    });

    const searchForm = document.getElementById('search_form');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchField = document.getElementById('search_field');
        const value = searchField.value;
        
        const response = await fetch('/posts?search=' + value);
        const posts = await response.json();
        console.log(posts);

        // clear out the #posts container
        // write javascript to create new post elements with the json ^
    })
}

