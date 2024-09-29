function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const imageGrid = document.getElementById('imageGrid');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const newImageItem = document.createElement('div');
            newImageItem.classList.add('image-item');

            newImageItem.innerHTML = `
                <img src="${e.target.result}" alt="New Photo">
                <div class="hover-details">
                    <p>New Photo<br>${new Date().getFullYear()}, Unknown Location</p>
                </div>
            `;

            imageGrid.appendChild(newImageItem);
        };

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Please select an image to upload.');
    }
}
