const reviews = [
    { name: "John Doe", text: "Great experience! The insurance process was smooth and hassle-free." },
    { name: "Jane Smith", text: "Excellent service! The team was very responsive and helpful." },
    { name: "Michael Johnson", text: "I'm really satisfied with how everything was handled. Highly recommend!" },
    { name: "Emily Davis", text: "Fantastic customer support. They made the entire process easy and stress-free!" },
    { name: "William Brown", text: "The coverage options were great, and they tailored everything to my needs." },
    { name: "Olivia Wilson", text: "Highly professional and easy to deal with. Would definitely recommend them!" },
    { name: "Sophia Martinez", text: "Fast service and great communication. Truly satisfied with my experience!" },
    { name: "Liam Anderson", text: "The claims process was straightforward, and they were very accommodating." },
    { name: "Isabella Thomas", text: "Great value for the coverage provided. I feel well protected!" },
    { name: "Mason White", text: "A friend recommended this company, and I couldn't be happier with my choice!" },
    { name: "Ava Taylor", text: "Excellent follow-up and support throughout my claim process." },
    { name: "Ethan Harris", text: "I appreciate the transparency in the services offered. Highly recommended!" }
];

const itemsPerPage = 6;
let currentPage = 1;

function loadReviews(page) {
    currentPage = page;
    const reviewContainer = document.getElementById("review-container");
    reviewContainer.innerHTML = "";

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, reviews.length);
    const reviewsToDisplay = reviews.slice(startIndex, endIndex);

    reviewsToDisplay.forEach(review => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "col-12 col-md-6 col-lg-4 review-card";
        reviewCard.innerHTML = `
            <div class="card">
                <div class="card-header">${review.name}</div>
                <div class="card-body">
                    <p class="card-text">${review.text}</p>
                </div>
            </div>
        `;
        reviewContainer.appendChild(reviewCard);
    });

    updatePagination();
}

function updatePagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(reviews.length / itemsPerPage);

    const prevButton = document.createElement("li");
    prevButton.className = "page-item" + (currentPage === 1 ? " disabled" : "");
    prevButton.innerHTML = `<a class="page-link" href="#" onclick="${currentPage > 1 ? `loadReviews(${currentPage - 1})` : ''}">Previous</a>`;
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.className = "page-item" + (i === currentPage ? " active" : "");
        pageItem.innerHTML = `<a class="page-link" href="#" onclick="loadReviews(${i})">${i}</a>`;
        pagination.appendChild(pageItem);
    }

    const nextButton = document.createElement("li");
    nextButton.className = "page-item" + (currentPage === totalPages ? " disabled" : "");
    nextButton.innerHTML = `<a class="page-link" href="#" onclick="${currentPage < totalPages ? `loadReviews(${currentPage + 1})` : ''}">Next</a>`;
    pagination.appendChild(nextButton);
}

loadReviews(1);

document.addEventListener('DOMContentLoaded', function () {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl, {
            html: true // Enable HTML for line breaks and bold text
        });
    });
});

    document.getElementById('show-toast').addEventListener('click', function () {
        var toast = new bootstrap.Toast(document.getElementById('benefitsToast'));
        toast.show();
    });