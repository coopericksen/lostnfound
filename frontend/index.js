const item_container = document.getElementById("item-container");
let ids_loaded = new Set();

const load_items_button = document.getElementById("load-items-button");
load_items_button.addEventListener("click", async () => {

    try {

        const response = await fetch("/api/items");

        if (!response.ok) {
            throw new Error("HTTP error. Status code: ", response.status);
        }

        const data = await response.json();
        renderItems(data.data);

    } catch (error) {
        console.log("Fetch error: ", error);
    }

});

let testObjects = [{
    "id": 1,
    "uuid": "4f32c0ff-0890-411e-9280-41e403590e73",
    "created_at": "2026-01-21T04:09:00.832682+00:00",
    "name": "Inconspicuous Sock",
    "description": "An object to test the backend. Stinky.",
    "category": "clothing",
    "image_url": "https://ahqdsddsjuotjkkqcnbs.supabase.co/storage/v1/object/sign/lostnfound-images/wallet.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jOGIzZDFkMi1hMjEyLTRiZmQtYTU5My05NDYyNzM0NDA4MzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb3N0bmZvdW5kLWltYWdlcy93YWxsZXQucG5nIiwiaWF0IjoxNzY4OTczOTkwLCJleHAiOjE4MDA1MDk5OTB9.1PvRTWdbVoP0nb1tfsGDcsHGLSSfuCt5YMxzxPeOooc",
    "additional_information": "",
    "found_by": "Hu Man",
    "found_where": "Hallway",
    "found_when_date": "2026-01-18",
    "found_when_time": "02:39:02",
    "location_stored": "Counselor Center",
    "claimed": false
}, {
    "id": 2,
    "uuid": "4f32c0ff-0890-411e-9280-41e403590e73",
    "created_at": "2026-01-21T04:09:00.832682+00:00",
    "name": "goon Sock",
    "description": "An object to test the backend. Stinky.",
    "category": "valuable",
    "image_url": "https://ahqdsddsjuotjkkqcnbs.supabase.co/storage/v1/object/sign/lostnfound-images/wallet.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jOGIzZDFkMi1hMjEyLTRiZmQtYTU5My05NDYyNzM0NDA4MzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb3N0bmZvdW5kLWltYWdlcy93YWxsZXQucG5nIiwiaWF0IjoxNzY4OTczOTkwLCJleHAiOjE4MDA1MDk5OTB9.1PvRTWdbVoP0nb1tfsGDcsHGLSSfuCt5YMxzxPeOooc",
    "additional_information": "",
    "found_by": "Hu Man",
    "found_where": "Hallway",
    "found_when_date": "2026-01-18",
    "found_when_time": "02:39:02",
    "location_stored": "Counselor Center",
    "claimed": false
}, {
    "id": 3,
    "uuid": "4f32c0ff-0890-411e-9280-41e403590e73",
    "created_at": "2026-01-21T04:09:00.832682+00:00",
    "name": "Ew Sock",
    "description": "An object to test the backend. Stinky.",
    "category": "clothing",
    "image_url": "https://ahqdsddsjuotjkkqcnbs.supabase.co/storage/v1/object/sign/lostnfound-images/wallet.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jOGIzZDFkMi1hMjEyLTRiZmQtYTU5My05NDYyNzM0NDA4MzUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb3N0bmZvdW5kLWltYWdlcy93YWxsZXQucG5nIiwiaWF0IjoxNzY4OTczOTkwLCJleHAiOjE4MDA1MDk5OTB9.1PvRTWdbVoP0nb1tfsGDcsHGLSSfuCt5YMxzxPeOooc",
    "additional_information": "if yk yk",
    "found_by": "Hu Man",
    "found_where": "Hallway",
    "found_when_date": "2026-01-18",
    "found_when_time": "02:39:02",
    "location_stored": "Counselor Center",
    "claimed": false
}]

function createSubEl(parent_element, type, param="", classes=[]) {

    let element = document.createElement(type);
    element.textContent = param;

    classes.forEach(class_to_add => {
        element.classList.add(class_to_add);
    });

    parent_element.appendChild(element)
    return element;

}

function renderItems(items) {
    items.forEach(item => {
        console.log(item);

        if (ids_loaded.has(item.id)) { // skip item if id already registered as loaded
            return;
        }

        ids_loaded.add(item.id);

        let element = document.createElement("div");
        element.classList.add("item");
        item_container.appendChild(element);

        const id = createSubEl(element, "p", `Item ${item.id}, Category: ${item.category}`);
        const name = createSubEl(element, "h1", item.name, ["item-name"]);

        if (item.image_url != "") {
            const image = createSubEl(element, "img", "", ["item-image"]);
            image.alt = item.name;
            image.src = item.image_url;
        }

        const description = createSubEl(element, "p", item.description);

        if (item.additional_information != "") {
            let note = createSubEl(element, "p", item.additional_information);
        }

        const found_countainer = createSubEl(element, "div", "", ["item-finder-container"]);
        const found_by = createSubEl(found_countainer, "p", `Found by: ${item.found_by}`);
        const found_when_time = createSubEl(found_countainer, "p", `Found at: ${item.found_when_time}`);
        const found_where = createSubEl(found_countainer, "p", `Found in: ${item.found_where}`);
        const found_when_date = createSubEl(found_countainer, "p", `Found on: ${item.found_when_date}`);

        const claimed = createSubEl(element, "p", item.claimed ? "Item has been claimed" : "Item has not been claimed");


    })
}

// renderItems(testObjects);