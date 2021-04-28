class Controller {
    constructor(frame, domain) {
        this.frame = frame;
        this.domain = domain;
        this.observe();
    }

    sendMessage(message) {
        this.frame.contentWindow.postMessage(JSON.stringify(message), this.domain);
    }

    setItem(key, value) {
        this.sendMessage({
            set: [key, value],
            color: 'yellow'
        });
    }

    getItem(key) {
        this.sendMessage({
            get: [key],
            color: 'green'
        });
    }

    removeItem(key) {
        this.sendMessage({
            remove: [key],
            color: 'red'
        });
    }

    observe() {
        window.addEventListener('message', eo => {
            const data = JSON.parse(eo.data);
            const key = Object.keys(data);
            const value = data[key];
            this[key](value);
        });
    }

    color(value) {
        document.body.style.backgroundColor = `${value}`;
    }
}