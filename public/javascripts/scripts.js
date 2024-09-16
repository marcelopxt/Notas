document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn.btn-primary').addEventListener('click', function() {
        const selectedTag = document.getElementById('filterTag').value;
        window.location.href = '/?tag=' + selectedTag;
    });
});