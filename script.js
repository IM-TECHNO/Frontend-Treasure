document.addEventListener("DOMContentLoaded", () => {
    const parentDiv = document.getElementById("component-items");
    const rowDiv = document.createElement("div");
    rowDiv.className = "row"; // Create a new row for cards

    fetch("./components.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((component, index) => {
                const newElement = document.createElement("div");
                newElement.className = "col-md-4"; // Add the column class for Bootstrap
                newElement.innerHTML = `
                    <div class="card mb-4"> <!-- Added margin-bottom for spacing -->
                        <img src="${component.imgUrl}" class="card-img-top" alt="${component.name}" />
                        <div class="card-body">
                            <h5 class="card-title">${component.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">By: ${component.authorName}</h6>
                            <a href="components/${component.url}" class="btn btn-custom">View Details</a>
                        </div>
                    </div>`;

                rowDiv.appendChild(newElement);

                // After every 3 cards, append the row to the parent and create a new row
                if ((index + 1) % 3 === 0) {
                    parentDiv.appendChild(rowDiv);
                    rowDiv = document.createElement("div");
                    rowDiv.className = "row"; // Reset row for next set of cards
                }
            });

            // Append any remaining cards that don't fill a row
            if (rowDiv.childElementCount > 0) {
                parentDiv.appendChild(rowDiv);
            }
        });
});

function searchComponents() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        const author = card.querySelector(".card-subtitle").textContent.toLowerCase();

        if (title.includes(searchInput) || author.includes(searchInput)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
