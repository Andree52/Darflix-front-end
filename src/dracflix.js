document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".searchForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const searchInput = document.getElementById("searchInput"); 
        const title = searchInput.value;
        console.log(title)
        try {
            const data = await streamingSearch(title);
            displayResults(data); // event listener is working
        } catch (error) {
            console.error(error);
        }
    });

    function streamingSearch(title) {
        const url = `https://streaming-availability.p.rapidapi.com/search/title?title=${title}&country=us`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '69eca6eff7msh847cc5e173a8950p1bd553jsn13aff9d0096f',
                'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
            },
        };
        return fetch(url, options)
        .then(response => response.json())
        // .then(data => data.result)
        .then(data => {
            console.log(data)
            if (data && data.result) {
                displayResults(data.result)
                return data.result;
            } else {
                throw new Error("Invalid API response");
            }
        }) 
        .catch(error => {
            throw new Error(error);
        });
}

function displayResults(data) {
    const resultsContainer = document.querySelector('.results');
    resultsContainer.innerHTML = "";

    if (data.length === 0) {
        resultsContainer.innerHTML = "<p>No results found</p>";
    } else {
        data.forEach(tvShow => {
            resultsContainer.innerHTML += `<h1>${tvShow.title}</h1>`;
        });
    }
}
});
