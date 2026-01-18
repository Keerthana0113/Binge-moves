// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "vikee" && pass === "7777") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "movies.html";
    } else {
        alert("Invalid Login Credentials");
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// MOVIE BOOKING
let selectedMovie = "";

function bookSeat(movie) {
    selectedMovie = movie;
    document.getElementById("movieTitle").innerText = movie;

    let grid = document.getElementById("seatsGrid");
    grid.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        let seat = document.createElement("div");
        seat.className = "seat";
        seat.innerText = i;
        seat.onclick = () => seat.classList.toggle("selected");
        grid.appendChild(seat);
    }

    document.getElementById("seatModal").style.display = "block";
}

function closeModal() {
    document.getElementById("seatModal").style.display = "none";
}

function confirmBooking() {
    alert("Seats booked for " + selectedMovie);
    closeModal();
}
