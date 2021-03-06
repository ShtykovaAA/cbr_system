const requestURL = 'https://jsonplaceholder.typicode.com/users'


function sendRequest(method, url, body = null){
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.responseType = 'json'
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = () => {
            if (xhr.status != 201){
                reject(xhr.response)
                document.location.href = "./log_error.html";
            }
            else{
                resolve(xhr.response)
                document.location.href = "./check_email.html"; 
            }
        }
        xhr.onerror = () => {
            reject(xhr.response)
        }
        xhr.send(JSON.stringify(body))
    })
}

function  Processing(){
    return new Promise((resolve, reject) =>{
        const form = document.getElementById('form');
        function retrieveFormValue(event){
            event.preventDefault();
        
            const email = form.querySelector('[name="email"]'),
                 username =  form.querySelector('[name="uname"]')
                 password = form.querySelector('[name="passwd"]');

            var values =  {
                email: email.value,
                username: username.value,
                password: password.value
            };
            resolve(values)
        }
        form.addEventListener('submit', retrieveFormValue);
    })
}

Processing().then(values => sendRequest('POST', requestURL, values))




