// Handles image preview
const previewImage = e => {
    const preview = document.getElementById('preview');
    preview.src = URL.createObjectURL(e.target.files[0]);
    preview.onload = () => URL.revokeObjectURL(preview.src);
};