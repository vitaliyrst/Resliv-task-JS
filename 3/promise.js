function request(method, url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();

        xhr.onload = () => (xhr.status === 200) ?
            resolve(JSON.parse(xhr.response)) :
            reject(new Error(`${xhr.status}: ${xhr.statusText}`));

        xhr.onerror = () => reject(new Error('Network Error'));
    })
}

Promise.all([
    request("GET", "https://vitaliyrst.github.io/images.json"),
    request("GET", "https://jsonplaceholder.typicode.com/todos/")
])
    .then(response => console.log(`Оба ответа получены \n \n`, response))
    .catch(error => console.log(error));
