const selectBackground = (background) => {
    const backgrounds = ["dark","light"];

    const buttonsContainer = document.querySelector("#select-background");

    backgrounds.forEach(bg => {
        const btn = document.createElement('button');
        btn.innerHTML = bg;

        btn.addEventListener("click", () => {
            // Update the value after # in the URL
            window.location.hash = btn.innerHTML;
            document.body.style.backgroundImage = `url('assets/${btn.innerHTML}-snowflake-background.jpg')`;
        });

        buttonsContainer.appendChild(btn);
    });

    const header = document.getElementsByClassName("header-container")[0];
    if (header) {
        header.appendChild(buttonsContainer);
    }

    document.body.style.backgroundImage = `url('assets/${background}-snowflake-background.jpg')`;
}

selectBackground(decodeURIComponent(window.location.hash.substring(1)) ?? "light");
