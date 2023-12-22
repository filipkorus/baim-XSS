# Odpowiedzi do zadań

## Zad 1.

```typescript
import sanitizeHtml from 'sanitize-html';

const sanitizeMessage = (input: string): string => {
	const sanitizedInput = sanitizeHtml(input, {
		allowedTags: ['b', 'i', 'em', 'strong', 'a'],
		allowedAttributes: {
			'a': ['href'] // allow attribute 'href' in 'a' tag
		}
	});
	return sanitizedInput;
}
```


## Zad 2.

```html
<ul class="unordered" id="messages">
    <% messages.forEach(msg => { %>
    <li class="msg-item">
        <div class="msg-author"><%= msg.clientId %></div> <!-- <%- zamienione na <%= -->
        <div class="msg-content"><%= msg.content %></div> <!-- <%- zamienione na <%= -->
        <div class="msg-timestamp"><%= formatDate(msg.timestamp) %></div> <!-- <%- zamienione na <%= -->
    </li>
    <% }); %>
</ul>

<tbody>
    <% queryParams.forEach(param => { %>
        <tr>
            <td><%= param.name %></td> <!-- <%- zamienione na <%= -->
            <td><%= param.value %></td> <!-- <%- zamienione na <%=-->
        </tr>
    <% }); %>
</tbody>
```


## Zad 3.
```javascript
// goal of this task is to use textContent/innerText method instead of innerHTML

// app.js file
msgAuthorDiv.textContent = `${messageObj.clientId !== socket.id ? messageObj.clientId : 'you'}:`; 
msgContentDiv.textContent = messageObj.content;
msgTimestampDiv.textContent = formatDate(messageObj.timestamp);

// queryParams.js
nameTd.textContent = name;
valueTd.textContent = value;
```


## Zad 4.
Link, który pozwoli na przeprowadzenie ataku XSS typu DOM to np `http://localhost:9000/#<img src='1' onerror=alert()>`, ale może być to inny URL, który pokaże komunikat. Dla tej podatności nie zadziała `http://localhost:9000/#<script>alert()</script>`
