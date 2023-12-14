const selectBackground = (background) => {
    const backgrounds = ["dark","light"];

    const select = document.querySelector("#select-background");

    select.innerHTML += `<option selected>${background}</option>`;

    for (let bg of backgrounds) {
        if (bg === background) {
            continue;
        }
        select.innerHTML += `<option>${bg}</option>`;
    }

    select.addEventListener("change", () => {
        // Update the value after # in the URL
        window.location.hash = select.value;
        document.body.style.backgroundImage = `url('assets/${select.value}-snowflake-background.jpg')`;
    });

    const header = document.getElementsByClassName("header-container")[0];
    if (header) {
        header.appendChild(select);
    }

    document.body.style.backgroundImage = `url('assets/${select.value}-snowflake-background.jpg')`;
}

selectBackground(decodeURIComponent(window.location.hash.substring(1)) || "light");
