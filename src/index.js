let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const toyCollection = document.getElementById('toy-collection');
  const toyUrl = 'http://localhost:3000/toys';

  // Fetch existing toys and render them
  fetch(toyUrl)
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => renderToy(toy));
    })
    .catch(error => console.error('Error fetching toys:', error));

  // Function to render a single toy card
  function renderToy(toy) {
    const card = document.createElement('div');
    card.className = 'card';

    const h2 = document.createElement('h2');
    h2.textContent = toy.name;
    card.appendChild(h2);

    const img = document.createElement('img');
    img.src = toy.image;
    img.className = 'toy-avatar';
    card.appendChild(img);

    const p = document.createElement('p');
    p.textContent = `${toy.likes} Likes`;
    card.appendChild(p);

    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.id = toy.id;
    likeBtn.textContent = 'Like ❤️';
    likeBtn.addEventListener('click', () => handleLike(toy));
    card.appendChild(likeBtn);

    toyCollection.appendChild(card);
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const toyForm = document.querySelector('.add-toy-form');
  const toyUrl = 'http://localhost:3000/toys';

  toyForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const image = event.target.image.value;
    const likes = 0; // New toy starts with 0 likes

    const newToy = {
      name: name,
      image: image,
      likes: likes
    };

    // Send POST request to add new toy
    fetch(toyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(response => response.json())
      .then(data => renderToy(data)) // Render new toy on success
      .catch(error => console.error('Error adding new toy:', error));

    // Reset form fields after submission
    event.target.reset();
  });

  // Function to render a single toy card (same as before)
  function renderToy(toy) {
    // Render toy card code here
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const toyCollection = document.getElementById('toy-collection');
  const toyUrl = 'http://localhost:3000/toys';

  // Fetch existing toys and render them (same as before)

  // Function to handle like button click
  function handleLike(toy) {
    const newLikes = toy.likes + 1;

    // Send PATCH request to update likes
    fetch(`${toyUrl}/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
      .then(response => response.json())
      .then(updatedToy => {
        const toyCard = document.getElementById(updatedToy.id);
        const p = toyCard.querySelector('p');
        p.textContent = `${updatedToy.likes} Likes`;
      })
      .catch(error => console.error('Error updating likes:', error));
  }

  // Function to render a single toy card (same as before)
  function renderToy(toy) {
    // Render toy card code here
  }
});
