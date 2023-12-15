const selectBackground = (background) => {
    const backgrounds = ["dark","light"];

    const buttonsContainer = document.querySelector("#select-background");

    const btn = document.createElement('button');
    btn.innerHTML = background;
    buttonsContainer.appendChild(btn);

    for (let bg of backgrounds) {
        if (bg === background) {
            continue;
        }

        const btn = document.createElement('button');
        btn.innerHTML = bg;

        buttonsContainer.appendChild(btn);
    }

    const buttons = buttonsContainer.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Update the value after # in the URL
            window.location.hash = button.innerHTML;
            document.body.style.backgroundImage = `url('assets/${button.innerHTML}-snowflake-background.jpg')`;
        });
    });

    const header = document.getElementsByClassName("header-container")[0];
    if (header) {
        header.appendChild(buttonsContainer);
    }

    document.body.style.backgroundImage = `url('assets/${background}-snowflake-background.jpg')`;
}

selectBackground(decodeURIComponent(window.location.hash.substring(1)) || "light");
