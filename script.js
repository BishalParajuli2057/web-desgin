document.getElementById('submit-data').addEventListener('click', function() {
    const showName = document.getElementById('input-show').value;
    const showContainer = document.getElementById('show-container');

    showContainer.innerHTML = '';

    fetch(`https://api.tvmaze.com/search/shows?q=${showName}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const show = item.show;
                const showElement = document.createElement('div');
                showElement.classList.add('show-data');
               
                const image = show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
                
                showElement.innerHTML = `
                    <img src="${image}" alt="${show.name}">
                    <div class="show-info">
                        <h1>${show.name}</h1>
                        <p>${show.summary || 'No summary available.'}</p>
                    </div>
                `;

                showContainer.appendChild(showElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
