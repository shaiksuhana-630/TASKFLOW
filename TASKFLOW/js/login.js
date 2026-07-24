const form = document.querySelector(".login-form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector('input[type ="email"]').value;
    const password = document.querySelector('input[type ="password"]').value;

    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        alert(data.message);

        if (data.success) {
            window.location.href = "dashboard.html";
        }

    } catch (error) {
        console.error(error);
        alert("Failed to connect to the server.");
    }
});