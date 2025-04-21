document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const button = document.querySelector("button");

    button.addEventListener("mouseover", () => {
        button.style.boxShadow = "0 0 20px #00ffc3";
    });

    button.addEventListener("mouseout", () => {
        button.style.boxShadow = "none";
    });

    form.addEventListener("submit", () => {
        alert("🚀 Successfully Submitted! All the best coder 💻");
    });
});
