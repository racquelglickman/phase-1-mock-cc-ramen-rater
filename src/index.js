// write your code here

let ramenMenu = document.getElementById('ramen-menu');
let ramenDetail = document.getElementById('ramen-detail');
let form = document.getElementById('new-ramen');

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((data) => {
        renderRamen(data);
    });

    function renderRamen(ramens) {
        ramens.forEach((ramen) => {

            // create initial ramen images in ramen-menu
            let ramenImg = document.createElement('img');
            ramenImg.src = ramen.image;

            ramenMenu.append(ramenImg);

            // when ramenImg is clicked, put info into ramen-detail div
            ramenImg.addEventListener('click', () => {

                console.log(`${ramen.name} was clicked`);

                let detailImage = document.querySelector('#ramen-detail .detail-image');
                detailImage.src = ramen.image;

                let name = document.querySelector('#ramen-detail .name');
                name.textContent = ramen.name;

                let restaurant = document.querySelector('#ramen-detail .restaurant');
                restaurant.textContent = ramen.restaurant;

                let rating = document.getElementById('rating-display');
                rating.textContent = ramen.rating;

                let comment = document.getElementById('comment-display');
                comment.textContent = ramen.comment;

            });
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(`new ramen submitted: ${e.target.name.value}`);

        let newRamen = {
            name: e.target.name.value,
            restaurant: e.target.restaurant.value,
            image: e.target.image.value,
            rating: e.target.rating.value,
            comment: e.target['new-comment'].value,
        };

        renderRamen([newRamen]);

        //reset the inputs
        e.target.name.value = '';
        e.target.restaurant.value = '';
        e.target.image.value = '';
        e.target.rating.value = '';
        e.target['new-comment'].value = '';

    });
});
    