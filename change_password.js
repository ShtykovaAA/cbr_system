const requestURL = 'https://jsonplaceholder.typicode.com/users'

function sendRequest(method, url, body = null){
    return new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.responseType = 'json'
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = () => {
            if (xhr.status >= 400){
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

const form = document.getElementById('form');
function retrieveFormValue(event){
    event.preventDefault();
    const password = form.querySelector('[name="new_passwd"]'), 
          password_repeat = form.querySelector('[name="new_passwd_repeat"]')

    var value =  {
        password: password.value,
    };
    if(password.value != password_repeat.value){
        form.querySelector('[name="new_passwd_repeat"]').style.border = '1px solid rgb(255, 40, 40)';
        console.log(password.value, password_repeat.value);
    }
    else{
        form.querySelector('[name="new_passwd_repeat"]').style.border = '1px solid rgb(0, 0, 0)';
        sendRequest('POST', requestURL, value)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

}
form.addEventListener('submit', retrieveFormValue);


