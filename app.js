
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
                <div class="card user-card m-3">
                    <div class="card-header">
                        <h5>${person.fonction}</h5>
                    </div>
                    <div class="card-block">
                        <div class="user-image">
                            <img src="${person.image}" class="img-radius" alt="User Profile Image">
                        </div>
                        <h6 class="f-w-600 m-t-25 m-b-10">${person.nom} ${person.prenom}</h6>
                        <p class="text-white">Born: ${person.dateNaissance}</p>
                        <p class="text-white">Level: ${person.niveau || 'N/A'}</p>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    }
}


// 


function addPerson() {
    const type = document.getElementById('type').value;
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const dateNaissance = document.getElementById('dateNaissance').value;
    const niveau = document.getElementById('niveau').value;
    const imageUpload = document.getElementById('imageUpload').files[0];

    //image Check Condition
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
    // image Uplod


    var modalElement = document.getElementById('addPersonModal');
    var modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

}

function addCard(type, nom, prenom, dateNaissance, niveau, imageSrc) {
    const container = document.getElementById('data');
    const card = `
      <div class="card user-card m-3">
          <div class="card-header">
              <h5>${type}</h5>
          </div>
          <div class="card-block">
              <div class="user-image">
                  <img src="${imageSrc}" class="img-radius" alt="User Profile Image">
              </div>
              <h6 class="f-w-600 m-t-25 m-b-10">${nom} ${prenom}</h6>
              <p class="text-white">Born: ${dateNaissance}</p>
              <p class="text-white">Level: ${niveau}</p>
          </div>
      </div>
    `;
    container.innerHTML += card;
}
