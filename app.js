function isPersonAlreadyInBox(personId, box) {
    return box.querySelector(`#person-${personId}`) !== null;
}

fetch('data.json')
    .then(response => response.json())
    .then(data => {

        f(data);
    })
// .catch(error => console.error('Error fetching data:', error));


function f(data) {
    const container = document.getElementById('data');


    for (let category in data) {
        data[category].forEach(person => {
            const card = `
                <div class="card-user user-card m-3">
                    <div class="card-header">
                        <h5>${person.fonction}</h5>
                         <div class="user-image">
                            <img src="${person.image}" class="img-radius" alt="User Profile Image">
                        </div>
                         
                    </div>
                      
                    <div class="card-block">
                      
                        <h6 class="f-w-600 m-t-25 m-b-10">${person.nom} ${person.prenom}</h6>
                        <p class="text-white">Born: ${person.dateNaissance}</p>
                        <p class="text-white">Level: ${person.niveau || 'N/A'}</p>
                    </div>
                </div>
            `;
            
            const cardElement = document.createElement('div');
            cardElement.id = `person-${person.id}`;
            cardElement.className = "card user-card m-3";
            cardElement.draggable = true;
            cardElement.dataset.type = person.fonction;


            cardElement.innerHTML = `
                <div class="card-user user-card m-3">
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
    </div>
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




