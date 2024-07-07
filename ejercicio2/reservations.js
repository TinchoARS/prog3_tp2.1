class Customer {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    get info() {
        return `${this.name} (${this.email})`;
    }
}

class Reservation {
    constructor(id, customer, date, guests) {
        this.id = id;
        this.customer = customer;
        this.date = new Date(date);
        this.guests = guests;
    }

    get info() {
        return `Reserva para ${this.customer.info} el ${this.date.toLocaleString()} para ${this.guests} personas.`;
    }

    static validateReservation(date, guests) {
        const reservationDate = new Date(date);
        const now = new Date();
        return reservationDate > now && guests > 0;
    }
}

class Restaurant {
    constructor(name) {
        this.name = name;
        this.reservations = [];
    }

    addReservation(reservation) {
        this.reservations.push(reservation);
    }

    render() {
        const container = document.getElementById("reservations-list");
        container.innerHTML = "";
        this.reservations.forEach((reservation) => {
            const reservationCard = document.createElement("div");
            reservationCard.className = "box";
            reservationCard.innerHTML = `
                <p class="subtitle has-text-primary">
                    Reserva ${reservation.id} - ${reservation.date.toLocaleString()}
                </p>
                <div class="card-content">
                    <div class="content">
                        <p>${reservation.info}</p>
                    </div>
                </div>
            `;
            container.appendChild(reservationCard);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const navbarBurger = document.querySelector(".navbar-burger");
    const sidebarMenu = document.getElementById("sidebarMenu");
    const addReservationItem = document.querySelector(".navbar-item.add-reservation");
    const reservationForm = document.getElementById("reservation-form");

    navbarBurger.addEventListener("click", () => {
        navbarBurger.classList.toggle("is-active");
        sidebarMenu.classList.toggle("is-active");
        if (sidebarMenu.style.display === "none" || sidebarMenu.style.display === "") {
            sidebarMenu.style.display = "block";
        } else {
            sidebarMenu.style.display = "none";
        }
    });

    addReservationItem.addEventListener("click", () => {
        sidebarMenu.style.display = "block";
        reservationForm.reset(); //resetea el form
    });

    reservationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName = document.getElementById("customer-name").value;
        const customerEmail = document.getElementById("customer-email").value;
        const reservationDate = document.getElementById("reservation-date").value;
        const guests = parseInt(document.getElementById("guests").value);

        if (Reservation.validateReservation(reservationDate, guests)) {
            const customerId = restaurant.reservations.length + 1;
            const reservationId = restaurant.reservations.length + 1;

            const customer = new Customer(customerId, customerName, customerEmail);
            const reservation = new Reservation(reservationId, customer, reservationDate, guests);

            restaurant.addReservation(reservation);
            restaurant.render();

            sidebarMenu.style.display = "none"; // Cierra el panel
        } else {
            alert("Datos de reserva inválidos");
        }
    });

    const restaurant = new Restaurant("El Lojal Kolinar");

    const customer1 = new Customer(1, "Shallan Davar", "shallan@gmail.com");
    const reservation1 = new Reservation(1, customer1, "2024-12-31T20:00:00", 4);

    if (Reservation.validateReservation(reservation1.date, reservation1.guests)) {
        restaurant.addReservation(reservation1);
        restaurant.render();
    } else {
        alert("Datos de reserva inválidos");
    }
});
