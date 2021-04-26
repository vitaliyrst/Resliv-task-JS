document.addEventListener('DOMContentLoaded', () => {
    const searched = location.search.substring(1).split('&');
    const form = document.querySelector("#form_filter");

    for (const item of searched) {
        const [key, searchedValue] = item.split('=');
        const group = form.elements[key];

        if (group instanceof RadioNodeList) {
            for (const element of group) {
                if (element.value === searchedValue) {
                    element.checked = true;
                }
            }
        }

        if (group instanceof HTMLSelectElement) {
            for (const element of group) {
                if (element.value === searchedValue) {
                    element.selected = true;
                }
            }
        }
    }

    form.addEventListener('change', (eo) => {
        if (eo.target.name !== 'sale') {
            const formData = new FormData(form);
            const search = new URLSearchParams(formData);
            console.log(location.origin + location.pathname + '?' + search.toString());
        }
    });
});
