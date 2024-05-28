const apiUrl = 'http://localhost:3000/items';

async function fetchItems() {
    const response = await fetch(apiUrl);
    const items = await response.json();
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            ${item.name}
            <button onclick="deleteItem(${item.id})">Delete</button>
        `;
        itemsContainer.appendChild(itemDiv);
    });
}

async function createItem() {
    const name = document.getElementById('name').value;
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
    });
    document.getElementById('name').value = '';
    fetchItems();
}

async function deleteItem(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    fetchItems();
}

window.onload = fetchItems;
