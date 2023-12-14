const messagesDiv = document.querySelector('#messages');
const form = document.querySelector('form');
const msgInput = document.querySelector('#message-input');
const nightModeBtn = document.getElementById('nightModeBtn');

// form submit handler
form.onsubmit = event => {
    event.preventDefault(); // prevent browser refresh after form submit

    const msg = msgInput.value; // get input value

    if (msg.length === 0) return; // do not send empty messages

    socket.emit('message', msg); // emit message to socket.io server

    const messageObj = {
        clientId: socket.id,
        content: msg,
        timestamp: new Date()
    }; // create message object

    messagesDiv.appendChild(getMessageListItem(messageObj)); // add message element (li) to the DOM

    msgInput.value = ''; // clear input value
};

/**
 * @param messageObj Message object. Consists of clientId, content, timestamp.
 * @return {HTMLLIElement} ListItem (li) HTML element with message.
 */
const getMessageListItem = messageObj => {
    const li = document.createElement('li'); li.classList.add('msg-item');
    const msgAuthorDiv = document.createElement('div'); msgAuthorDiv.classList.add('msg-author');
    const msgContentDiv = document.createElement('div'); msgContentDiv.classList.add('msg-content');
    const msgTimestampDiv = document.createElement('div'); msgTimestampDiv.classList.add('msg-timestamp');

    // adding tag content
    msgAuthorDiv.innerHTML = `${messageObj.clientId !== socket.id ? messageObj.clientId : 'you'}:`;
    msgContentDiv.innerHTML = messageObj.content;
    msgTimestampDiv.innerHTML = formatDate(messageObj.timestamp);

    li.appendChild(msgAuthorDiv);
    li.appendChild(msgContentDiv);
    li.appendChild(msgTimestampDiv);

    return li;
};

const renderMessages = (messages) => {
    messagesDiv.innerHTML = ''; // clear message div
    messages.forEach(messageObj => messagesDiv.appendChild(getMessageListItem(messageObj))); // append each list item with message structure
};

// fetch all messages
socket.on('messages', messages => renderMessages(messages));

// fetch new message
socket.on('new-message', messageObj => messagesDiv.appendChild(getMessageListItem(messageObj)));

const selectBackground = (background) => {
    const backgrounds = ["dark","light"];

    const buttonsContainer = document.querySelector("#select-background");

    buttonsContainer.innerHTML += `<button>${background}</button>`;

    for (var i = 0; i < backgrounds.length; i++) {
        if (backgrounds[i] == background) {
            continue;
        }
        buttonsContainer.innerHTML += `<button>${backgrounds[i]}</button>`;
    }

    const buttons = buttonsContainer.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            // Update the value after # in the URL
            window.location.hash = button.innerHTML;
            document.body.style.backgroundImage = `url('assets/${button.innerHTML}-snowflake-background.jpg')`;
        });
    });

    var header = document.getElementsByClassName("header-container")[0];
    if (header) {
        header.appendChild(buttonsContainer);
    }

    document.body.style.backgroundImage = `url('assets/` + background + `-snowflake-background.jpg')`;
}

selectBackground(decodeURIComponent(window.location.hash.substring(1)) || "light");