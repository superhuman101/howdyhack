function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const titleInput = document.getElementById('titleInput').value;
    const dateInput = document.getElementById('dateInput').value;
    const locationInput = document.getElementById('locationInput').value;
    const imageGrid = document.querySelector('.scrollable-grid');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const newImageItem = document.createElement('div');
            newImageItem.classList.add('image-item');

            // Format date in MM/DD/YY
            const dateObj = new Date(dateInput);
            const formattedDate = `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')}/${dateObj.getFullYear().toString().slice(-2)}`;

            // Format location (with @ prefix)
            const formattedLocation = `@${locationInput}`;

            // Create new image item with the title, date, and location
            newImageItem.innerHTML = `
                <img src="${e.target.result}" alt="New Photo">
                <div class="hover-details">
                    <p>${titleInput}<br>${formattedDate}, ${formattedLocation}</p>
                </div>
            `;

            imageGrid.appendChild(newImageItem);
        };

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Please select an image to upload.');
    }
}
