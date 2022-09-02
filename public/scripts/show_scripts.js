let ratings = document.getElementById("rating")

function ratingsStars() {
    if(ratings.innerText = "User Rating: 4") {
        ratings.innerText = "User Rating: &#9733 &#9733 &#9733 &#9733 &#9734"
    } else if(ratings.innerText = "User Rating: 3") {
        ratings.innerText = "User Rating: &#9733 &#9733 &#9733 &#9734 &#9734"
    } else if(ratings.innerText = "User Rating: 2") {
        ratings.innerText = "User Rating: &#9733 &#9733 &#9734 &#9734 &#9734"
    } else if(ratings.innerText = "User Rating: 1") {
        ratings.innerText = "User Rating: &#9733 &#9734 &#9734 &#9734 &#9734"
    }
}

ratingsStars()