const messagesDiv = document.querySelector('#messages');
const form = document.querySelector('form');
const msgInput = document.querySelector('#message-input');

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
    msgAuthorDiv.innerHTML = `${messageObj.clientId !== socket.id ? messageObj.clientId : 'you'}:`; // do not use innerHTML
    msgContentDiv.innerHTML = messageObj.content; // do not use innerHTML
    msgTimestampDiv.innerHTML = formatDate(messageObj.timestamp); // do not use innerHTML

    li.appendChild(msgAuthorDiv);
    li.appendChild(msgContentDiv);
    li.appendChild(msgTimestampDiv);

    return li;
};

// fetch new message
socket.on('new-message', messageObj => messagesDiv.appendChild(getMessageListItem(messageObj)));
