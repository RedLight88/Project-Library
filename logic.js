document.addEventListener('DOMContentLoaded', () => {
    let removeMode = false;
    let confirmBtn;

    const removeBtn = document.getElementById('removeBtn');
    const newBtn = document.getElementById('newBtn');
    const gridLayout = document.querySelector('.gridLayout');
    const modalContainer = document.getElementById('modalContainer');
    const cancelBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('newBookForm');

    removeBtn.addEventListener('click', () => {
        removeMode = !removeMode;
        if (removeMode) {
            removeBtn.textContent = "Cancel";
            addConfirmButton();
        } else {
            removeBtn.textContent = "Remove";
            removeConfirmButton();
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('highlight');
            });
        }
    });

    newBtn.addEventListener('click', showModal);

    cancelBtn.addEventListener('click', hideModal);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const author = form.author.value;
        const title = form.title.value;
        const read = form.read.checked;
        const numberOfPages = form.numberOfPages.value;

        createBook(author, title, read, numberOfPages);

        form.reset();
        hideModal();
    });

    function addConfirmButton() {
        confirmBtn = document.createElement('button');
        confirmBtn.textContent = "Confirm";
        confirmBtn.id = "confirmBtn";
        confirmBtn.className = "btns";

        confirmBtn.addEventListener('click', removeHighlightedCards);

        const btnsContainer = document.querySelector('.btns');
        btnsContainer.insertBefore(confirmBtn, newBtn);
    }

    function removeConfirmButton() {
        if (confirmBtn) {
            confirmBtn.remove();
            confirmBtn = null;
        }
    }

    function createBook(author, title, read, numberOfPages) {
        const card = document.createElement('div');
        card.className = 'card';

        const titleElem = document.createElement('h3');
        titleElem.textContent = `Title: ${title}`;
        card.appendChild(titleElem);

        const authorElem = document.createElement('p');
        authorElem.textContent = `Author: ${author}`;
        card.appendChild(authorElem);

        const readElem = document.createElement('p');
        readElem.textContent = `Read: ${read ? "Yes" : "No"}`;
        card.appendChild(readElem);

        const pagesElem = document.createElement('p');
        pagesElem.textContent = `Number of Pages: ${numberOfPages}`;
        card.appendChild(pagesElem);

        card.addEventListener('click', (event) => {
            if (removeMode) {
                card.classList.toggle('highlight');
            }
        });

        gridLayout.appendChild(card);
    }

    function removeHighlightedCards() {
        document.querySelectorAll('.highlight').forEach(card => {
            card.remove();
        });
        removeBtn.textContent = "Remove";
        removeMode = false;
        removeConfirmButton();
    }

    function showModal() {
        modalContainer.classList.add('visible');
    }

    function hideModal() {
        modalContainer.classList.remove('visible');
    }

    createBook("J.K. Rowling", "Harry Potter and the Sorcerer's Stone", true, 309);
    createBook("Morti Tai", "Ala Dam", false, 357);
});
