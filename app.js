function isPersonAlreadyInBox(personId, box) {
    return box.querySelector(`#person-${personId}`) !== null;
}

let globalData = {};

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        globalData = data;

        f(data);
    })
.catch(error => console.error('Error fetching data:', error));


function f(data) {
    const container = document.getElementById('data');

    for (let category in data) {
        data[category].forEach(person => {
            const cardElement = document.createElement('div');
            cardElement.className = "card-user m-3";
            cardElement.id = `person-${person.id}`;
            cardElement.draggable = true;
            cardElement.dataset.type = person.fonction;

            cardElement.innerHTML = `
                <div class="card-header">
                    <div class="user-image">
                        <img src="${person.image}" class="img-radius" alt="User Profile Image">
                    </div>
                    <h5 class="fonction-title">${person.fonction}</h5>
                </div>
                <div class="card-block">
                    <h6 class="name-title">${person.nom} ${person.prenom}</h6>
                    <p class="info-text">Born: ${person.dateNaissance}</p>
                    <p class="info-text">Level: ${person.niveau || 'N/A'}</p>
                    <button class="btn btn-sm btn-warning edit-btn" onclick="openEditModal(${person.id})">
                        Edit
                    </button>
                </div>
            `;

            cardElement.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', JSON.stringify(person));
            });

            container.appendChild(cardElement);
        });
    }
}


document.querySelectorAll('.card.d-flex').forEach(box => {

    box.addEventListener('dragover', (event) => {
        event.preventDefault();
    });


    box.addEventListener('drop', (event) => {
        event.preventDefault();
        const personData = JSON.parse(event.dataTransfer.getData('text/plain'));


        if (isPersonAlreadyInBox(personData.id, box)) {
            alert("This Person is Alredy Existing!");
            return;
        }




        const boxType = box.parentElement.querySelector('h2').innerText.toLowerCase();

        if (personData.fonction.toLowerCase() === boxType) {

            box.innerHTML += `
                <div class="person-card">
                    <img src="${personData.image}" class="img-radius" alt="User Profile Image">
                    <h6>${personData.nom} ${personData.prenom}</h6>
                </div>
            `;
        } else {
            alert('You Don t Move this Person here');
        }

        removeCardAfterDrop(personData.id);

    });
});



// 


function addPerson() {
    const type = document.getElementById('type').value;
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const dateNaissance = document.getElementById('dateNaissance').value;
    const niveau = document.getElementById('niveau').value;
    const imageUpload = document.getElementById('imageUpload').files[0];

    if (!nom || !prenom || !dateNaissance || !type) {
        alert("Please fill in all cases ");
        return;}

    let imageSrc = "https://bootdey.com/img/Content/avatar/avatar7.png";
    if (imageUpload) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imageSrc = e.target.result;
            addCard(type, nom, prenom, dateNaissance, niveau, imageSrc);
        };
        reader.readAsDataURL(imageUpload);
    } else {
        addCard(type, nom, prenom, dateNaissance, niveau, imageSrc);
    }


    var modalElement = document.getElementById('addPersonModal');
    var modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}


function addCard(type, nom, prenom, dateNaissance, niveau, imageSrc) {
    const container = document.getElementById('data');
    const card = `<div class="card-user user-card m-3">
                    <div class="card-header">
                        <div class="user-image">
                            <img src="${imageSrc}" class="img-radius" alt="User Profile Image">
                        </div>
                        <p>${type}</p>
                    </div>
                    <div class="card-block">
                        <h6 class="f-w-600 m-t-25 m-b-10">${nom} ${prenom}</h6>
                        <p class="text-dark">Born: ${dateNaissance}</p>
                        <p class="text-dark">Level:  ${niveau}</p>
                        <!-- هنا نضيف زر التعديل -->
                        <button class="btn btn-sm btn-warning edit-btn" onclick="openEditModal('${nom}-${prenom}')">
                            Edit
                        </button>
                    </div>
                </div>`;
    container.innerHTML += card;
}



function removeCardAfterDrop(personId) {
    const cardToRemove = document.getElementById(`person-${personId}`);
    if (cardToRemove) {
        cardToRemove.remove();
    }
}

// 
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {

    });
});

//   drag and drob




cardElement.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', JSON.stringify(person));
});



// Edithing Data Personn

function openEditModal(personId) {
    const person = findPersonById(personId);
    
    if (!person) {
        console.error('Person not found:', personId);
        return;
    }

    
    document.getElementById('editType').value = person.fonction;
    document.getElementById('editNom').value = person.nom;
    document.getElementById('editPrenom').value = person.prenom;
    document.getElementById('editDateNaissance').value = person.dateNaissance;
    document.getElementById('editNiveau').value = person.niveau || '';
    
    
    document.getElementById('editPersonForm').dataset.personId = personId;

    
    const editModal = new bootstrap.Modal(document.getElementById('editPersonModal'));
    editModal.show();
}

function findPersonById(personId) {
    for (let category in globalData) {
        const person = globalData[category].find(p => p.id === personId);
        if (person) return person;
    }
    return null;
}



function saveEditedPerson(event) {
    event.preventDefault();
    
    const personId = document.getElementById('editPersonForm').dataset.personId;
    const updatedPerson = {
        id: parseInt(personId),
        fonction: document.getElementById('editType').value,
        nom: document.getElementById('editNom').value,
        prenom: document.getElementById('editPrenom').value,
        dateNaissance: document.getElementById('editDateNaissance').value,
        niveau: document.getElementById('editNiveau').value,
        image: document.getElementById('editImageUpload').files[0]
            ? URL.createObjectURL(document.getElementById('editImageUpload').files[0])
            : findPersonById(personId).image
    };

    updatePersonInDataArray(updatedPerson);
    
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editPersonModal'));
    editModal.hide();
    
    displayPeople();  
}



function updatePersonInDataArray(updatedPerson) {
    for (let category in globalData) {
        const index = globalData[category].findIndex(p => p.id === updatedPerson.id);
        if (index !== -1) {
            globalData[category][index] = { ...globalData[category][index], ...updatedPerson };
            break;
        }
    }
}


function displayPeople() {
    const container = document.getElementById('data');
    container.innerHTML = '';
    f(globalData);
}



