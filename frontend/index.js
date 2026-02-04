const item_container = document.getElementById("item-container");
let ids_loaded = new Set();

const load_items_button = document.getElementById("load-items-button");
load_items_button.addEventListener("click", async () => {

    try {

        const response = await fetch("/api/items", {
            method: "GET",
            headers: {
                "x-admin-username": window.adminUsername,
                "x-admin-password": window.adminPassword,
                "x-fetch-approved": true,
            }
        });

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
    "id": 123,
    "uuid": "4f32c0ff-0890-411e-9280-41e403590e73",
    "created_at": "2026-01-21T04:09:00.832682+00:00",
    "name": "Inconspicuous Sock",
    "description": "An object to test the backendddd.",
    "category": "clothing",
    "image_url": "",
    "additional_information": "",
    "found_by": "Hu Man",
    "found_where": "Hallway",
    "found_when_date": "2026-01-18",
    "found_when_time": "02:39:02",
    "location_stored": "Counselor Center",
    "claimed": false
}, {
    "id": 124,
    "uuid": "4f32c0ff-0890-411e-9280-41e403590e73",
    "created_at": "2026-01-21T04:09:00.832682+00:00",
    "name": "Random thing",
    "description": "An object to test the backend.",
    "category": "valuable",
    "image_url": "",
    "additional_information": "",
    "found_by": "Hu Man",
    "found_where": "Hallway",
    "found_when_date": "2026-01-18",
    "found_when_time": "02:39:02",
    "location_stored": "Counselor Center",
    "claimed": false
}, {
    "id": 125,
    "uuid": "4f32c0ff-0890-411e-9280-41e403590e73",
    "created_at": "2026-01-21T04:09:00.832682+00:00",
    "name": "Other Sock",
    "description": "An object to test the backend. N/A.",
    "category": "clothing",
    "image_url": "",
    "additional_information": "...",
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

        if (ids_loaded.has(item.id)) { // skip item if id already registered as loaded
            return;
        }

        ids_loaded.add(item.id);

        let element = document.createElement("div");
        element.classList.add("item");
        item_container.appendChild(element);

        // const id = createSubEl(element, "p", `Item ${item.id}, Category: ${item.category}`);
        const name = createSubEl(element, "h1", item.name, ["item-name"]);

        if (item.image_url != "") {
            const image = createSubEl(element, "img", "", ["item-image"]);
            image.alt = item.name;
            image.src = item.image_url;
        }

        const description = createSubEl(element, "p", `Description: ${item.description}`);

        if (item.additional_information != "") {
            let note = createSubEl(element, "p", `Additional Information: ${item.additional_information}`);
        }

        const found_countainer = createSubEl(element, "div", "", ["item-finder-container"]);
        const found_by = createSubEl(found_countainer, "p", `Found by: ${item.finder_fname} ${item.finder_lname}`);
        let time_found = item.found_when.split("T").pop();
        let date_found = item.found_when.split("T")[0];
        const found_when_time = createSubEl(found_countainer, "p", `Found when: ${time_found}`);
        const found_where = createSubEl(found_countainer, "p", `Found in: ${item.found_where}`);
        const found_when_date = createSubEl(found_countainer, "p", `Found on: ${date_found}`);

        const claimed = createSubEl(element, "p", item.claimed ? "Item has been claimed" : "Item has not been claimed");


    })

}

// renderItems(testObjects);