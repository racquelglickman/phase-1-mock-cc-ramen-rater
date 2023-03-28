// write your code here

let ramenMenu = document.getElementById('ramen-menu');
let ramenDetail = document.getElementById('ramen-detail');
let form = document.getElementById('new-ramen');
let updateForm = document.getElementById('edit-ramen');


fetch('http://localhost:3000/ramens')
.then((response) => response.json())
.then((data) => {
    // renders ramen menu with db data
    renderRamen(data);
    
    // sets detail-image to the first ramen
    renderRamenDetails(data[0]);
});

// function that takes in array of objects and loops through each object
function renderRamen(ramens) {
    ramens.forEach((ramen) => {

        // create initial ramen images in ramen-menu
        let ramenImg = document.createElement('img');
        ramenImg.src = ramen.image;
        ramenImg.alt = ramen.name;

        ramenMenu.append(ramenImg);

        // when ramenImg is clicked, put info into ramen-detail div
        ramenImg.addEventListener('click', () => {

            console.log(`${ramen.name} was clicked`);
            renderRamenDetails(ramen);

        });
    });
}; // this is where renderRamen function ends

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

    // post new ramen and then render it on the DOM
    fetch('http://localhost:3000/ramens', {
        method: "POST", 
        headers: {
            "content-type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(newRamen),
    })
    .then((res) => res.json())
    .then((data) => {
        renderRamen([data]);
    });

    //reset the inputs
    e.target.name.value = '';
    e.target.restaurant.value = '';
    e.target.image.value = '';
    e.target.rating.value = '';
    e.target['new-comment'].value = '';

});

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    console.log('i want to be updated');

    let nameOfCurrentRamen = document.querySelector('#ramen-detail .name');
    let ratingOfCurrentRamen = document.getElementById('rating-display');
    let commentOfCurrentRamen = document.getElementById('comment-display');

    let updatedRamen = {
        rating: e.target.rating.value, 
        comment: e.target['new-comment'].value,
    };

    // // i want to patch the db and then set these on the DOM
    fetch(`http://localhost:3000/ramens`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log('just got the data to find the id to update');
            console.log(nameOfCurrentRamen);
            data.forEach((ramen) => {
                if (nameOfCurrentRamen.textContent === ramen.name) {
                    fetch(`http://localhost:3000/ramens/${ramen.id}`, {
                        method: "PATCH", 
                        headers: {
                            "content-type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify(updatedRamen),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        renderRamenDetails(data);
                    });
                };
            });
        });
    
    

    ratingOfCurrentRamen.textContent = e.target.rating.value;
    commentOfCurrentRamen.textContent = e.target['new-comment'].value;

    //reset the inputs
    e.target.rating.value = '';
    e.target['new-comment'].value = '';

});

function renderRamenDetails(ramenObj) {
    let detailImage = document.querySelector('#ramen-detail .detail-image');
    detailImage.src = ramenObj.image;

    let name = document.querySelector('#ramen-detail .name');
    name.textContent = ramenObj.name;

    let restaurant = document.querySelector('#ramen-detail .restaurant');
    restaurant.textContent = ramenObj.restaurant;

    let rating = document.getElementById('rating-display');
    rating.textContent = ramenObj.rating;

    let comment = document.getElementById('comment-display');
    comment.textContent = ramenObj.comment;
};

