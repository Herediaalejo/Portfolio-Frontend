document.querySelectorAll('.user').forEach((user) => {
    let imageUrl = user.getAttribute('data-image');
    user.style.backgroundImage = 'url(' + imageUrl + ')';
});