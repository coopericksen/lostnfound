const admin_form = document.getElementById("form-admin-login");
const load_items_button = document.getElementById("load-items-button");
const item_container = document.getElementById("item-container");
const items_main = document.getElementById("items-main");

let ids_loaded = new Set();

admin_form.addEventListener("submit", async (e) => { 
    e.preventDefault(); 

    const form = new FormData(e.target);
    const username = form.get("username");
    const password = form.get("password");

    const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.status === 200) {
        window.adminUsername = username;
        window.adminPassword = password;
        admin_form.style.display = "none";
        items_main.style.visibility = "visible";
    } else {
        alert("Wrong username or password.");
    }
});

load_items_button.addEventListener("click", fetchPendingItems);

async function fetchPendingItems() {
    try {

        const response = await fetch("/api/items", {
            method: "GET",
            headers: {
                "x-admin-username": window.adminUsername,
                "x-admin-password": window.adminPassword,
                "x-fetch-approved": false,
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
}

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

        const found_container = createSubEl(element, "div", "", ["item-finder-container"]);
        const found_by = createSubEl(found_container, "p", `Found by: ${item.finder_fname} ${item.finder_lname}`);
        let time_found = item.found_when.split("T").pop();
        let date_found = item.found_when.split("T")[0];
        const found_when_time = createSubEl(found_container, "p", `Found when: ${time_found}`);
        const found_where = createSubEl(found_container, "p", `Found in: ${item.found_where}`);
        const found_when_date = createSubEl(found_container, "p", `Found on: ${date_found}`);
        const location_stored = createSubEl(element, "p", `Location stored: ${item.location_stored}`);

        const approve_button = createSubEl(element, "button", `Approve Item Listing`, ["item-approve-button"]);
        approve_button.addEventListener("click", async () => {
            const res = await fetch (`/api/admin/approve`, {
                method: "post",
                headers: {
                    "x-admin-username": window.adminUsername,
                    "x-admin-password": window.adminPassword,
                    "x-item-id": item.id
                }
            });

            if (!res.ok) {
                throw new Error("HTTP error. Status code: ", res.status);
            }

            alert("Item listing approved.");
            ids_loaded.clear();
            item_container.innerHTML = "";
            fetchPendingItems();
        });
    })

}