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

// GLOBAL VARIABLES
let selectedMovie = "";
let selectedTheater = "";

// OPEN SEAT BOOKING
function bookSeat(details) {
    if (details.includes("@")) {
        selectedMovie = details.split(" @ ")[0];
        selectedTheater = details.split(" @ ")[1];
    } else {
        selectedMovie = details;
        selectedTheater = "Not Selected";
    }

    document.getElementById("movieTitle").innerText =
        selectedMovie + " @ " + selectedTheater;

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

// CLOSE SEAT MODAL
function closeModal() {
    document.getElementById("seatModal").style.display = "none";
}

// CONFIRM BOOKING + QR
function confirmBooking() {
    let selectedSeats = document.querySelectorAll(".seat.selected");

    if (selectedSeats.length === 0) {
        alert("Please select seats");
        return;
    }

    let seatNumbers = [];
    selectedSeats.forEach(seat => {
        seatNumbers.push(seat.innerText);
        seat.classList.remove("selected");
        seat.classList.add("booked"); // TURN GREEN
    });

    closeModal();

    let bookingDetails =
        "BINGE MOVIE TICKET\n" +
        "----------------------\n" +
        "Movie: " + selectedMovie + "\n" +
        "Theater: " + selectedTheater + "\n" +
        "Seats: " + seatNumbers.join(", ") + "\n" +
        "Date: " + new Date().toLocaleString();

    document.getElementById("ticketText").innerText = bookingDetails;
    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
        text: bookingDetails,
        width: 200,
        height: 200
    });

    document.getElementById("qrModal").style.display = "block";
}


// CLOSE QR MODAL
function closeQR() {
    document.getElementById("qrModal").style.display = "none";
}

// DOWNLOAD FULL TICKET IMAGE
function downloadTicket() {
    const ticket = document.getElementById("ticket");

    html2canvas(ticket, {
        scale: 1.5,          // LOWER = FASTER
        useCORS: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "Binge_Movie_Ticket.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}


// THEATER → MOVIE REDIRECT
function goToBooking(theater, selectId) {
    let movie = document.getElementById(selectId).value;

    window.location.href =
        "movies.html?movie=" + encodeURIComponent(movie) +
        "&theater=" + encodeURIComponent(theater) +
        "&scroll=true";
}
