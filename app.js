
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
