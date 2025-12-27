document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletterForm");
    if (!form) return;

    // Inline message div
    let messageDiv = document.getElementById("newsletterMessage");
    if (!messageDiv) {
        messageDiv = document.createElement("div");
        messageDiv.id = "newsletterMessage";
        messageDiv.className = "mt-2 text-sm hidden";
        form.appendChild(messageDiv);
    }

    // Set page URL in hidden input
    let pageInput = form.querySelector('input[name="page_url"]');
    if (!pageInput) {
        pageInput = document.createElement('input');
        pageInput.type = 'hidden';
        pageInput.name = 'page_url';
        form.appendChild(pageInput);
    }
    pageInput.value = window.location.href;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_ncqlhkl",      // Service ID
            "template_jp2uvoa",     // Template ID
            form,                   // Form element
            "Vm6ZSdzYEzOUn0Gtw"     // Public Key
        ).then(
            () => {
                messageDiv.textContent = "Subscribed successfully!";
                messageDiv.classList.remove("hidden", "text-red-600");
                messageDiv.classList.add("text-white");
                form.reset();
            },
            (error) => {
                messageDiv.textContent = "Something went wrong. Please try again.";
                messageDiv.classList.remove("hidden", "text-white");
                messageDiv.classList.add("text-red-600");
                console.error("EmailJS Error:", error);
            }
        );
    });
});
