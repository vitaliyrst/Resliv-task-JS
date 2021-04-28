class Receiver {
    constructor(originDomain, container) {
        this.originDomain = originDomain;
        this.storage = localStorage;
        this.container = container;
        this.observe();
        this.canResponse = false;
    }

    observe() {
        window.addEventListener('message', eo => {
            if (eo.origin !== this.originDomain) {
                console.log(eo.origin);
                return null;
            }

            const data = JSON.parse(eo.data);
            const key = Object.keys(data);
            const value = data[key[0]];
            this[key[0]](value);

            eo.source.postMessage(JSON.stringify({color: this.canResponse ? data[key[1]] : 'white'}), eo.origin);
        });
    }

    set(data) {
        if (data[0] && data[1]) {
            this.storage.setItem(data[0], data[1]);
            this.container.innerHTML = `SetItem - [key] = ${data[0]} | [value] = ${data[1]}`;
            console.log('Write');
            this.canResponse = true;
        } else {
            console.log('Write Error');
            this.canResponse = false;
        }
    }

    get(data) {
        const result = this.storage.getItem(data[0]);

        if (result) {
            this.container.innerHTML = `GetItem - [key] = ${data[0]} | [value] = ${result}`;
            console.log(`Read : ${result}`);
            this.canResponse = true;
        } else {
            console.log('Read Error, no key');
            this.canResponse = false;
        }
    }

    remove(data) {
        const result = this.storage.getItem(data[0]);

        if (result) {
            this.storage.removeItem(data[0]);
            this.container.innerHTML = `RemoveItem - [key] = ${data[0]} | [value] = ${result}`;
            console.log('Removed');
            this.canResponse = true;
        } else {
            console.log('Remove Error, no key');
            this.canResponse = false;
        }
    }
}