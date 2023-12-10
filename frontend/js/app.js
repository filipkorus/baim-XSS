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
    const li = document.createElement('li');
    const b = document.createElement('b');
    const span = document.createElement('span');
    const small = document.createElement('small');
    small.style.fontSize = '.6rem'

    // adding tag content
    b.innerHTML = `${messageObj.clientId !== socket.id ? messageObj.clientId : 'you'}: `;
    span.innerHTML = messageObj.content;
    small.innerHTML = ` (${formatDate(messageObj.timestamp)})`;

    li.appendChild(b);
    li.appendChild(span);
    li.appendChild(small);

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
