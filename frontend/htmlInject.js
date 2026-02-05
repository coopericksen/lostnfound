
async function loadHTML(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

loadHTML("placeholder-nav", "./commonhtml/nav.html");
loadHTML("placeholder-footer", "./commonhtml/footer.html");