const playerInput = document.getElementById("player");
const clubInput = document.getElementById("club");
const itemList = document.getElementById("item-list");
const addButton = document.getElementById("add");
const clearButton = document.getElementById("clear");

// Initialize the player list from local storage or create an empty array
let playerList = JSON.parse(localStorage.getItem("playerList")) || [];

// Function to update the item list
function updateItemList() {
	// Clear the existing table
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}

	// Create the table header (thead)
	const tableHead = document.createElement("thead");
	const headerRow = document.createElement("tr");

	// Create table header cells (th) for "Name" and "Club"
	const nameHeader = document.createElement("th");
	nameHeader.textContent = "Name";
	const clubHeader = document.createElement("th");
	clubHeader.textContent = "Club";

	// Append header cells to the header row
	headerRow.appendChild(nameHeader);
	headerRow.appendChild(clubHeader);

	// Append the header row to the table header
	tableHead.appendChild(headerRow);

	// Create and append table rows with input fields and buttons for each player
	playerList.forEach((player, index) => {
		const row = document.createElement("tr");

		// Create table cells for name and club
		const nameCell = document.createElement("td");
		const nameInput = document.createElement("input");
		nameInput.type = "text";
		nameInput.value = player.playerName;
		nameCell.appendChild(nameInput);

		const clubCell = document.createElement("td");
		const clubInput = document.createElement("input");
		clubInput.type = "text";
		clubInput.value = player.clubName;
		clubCell.appendChild(clubInput);

		const updateCell = document.createElement("td");
		const updateButton = document.createElement("button");
		updateButton.textContent = "Update";
		updateCell.appendChild(updateButton);

		const deleteCell = document.createElement("td");
		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteCell.appendChild(deleteButton);

		// Add event listeners to the update and delete buttons
		updateButton.addEventListener("click", () => {
			// Update the player's name and club with the values from input fields
			player.playerName = nameInput.value;
			player.clubName = clubInput.value;

			// Save the updated player list to local storage
			localStorage.setItem("playerList", JSON.stringify(playerList));

			// Update the table
			updateItemList();
		});

		deleteButton.addEventListener("click", () => {
			// Remove the player from the array
			playerList.splice(index, 1);

			// Save the updated player list to local storage
			localStorage.setItem("playerList", JSON.stringify(playerList));

			// Update the table
			updateItemList();
		});

		// Append cells to the row
		row.appendChild(nameCell);
		row.appendChild(clubCell);
		row.appendChild(updateCell);
		row.appendChild(deleteCell);

		// Append the row to the table
		itemList.appendChild(row);
	});

	// Append the table header to the table
	itemList.appendChild(tableHead);
}

// Event handler for the "Add" button
addButton.addEventListener("click", () => {
	// Get the values from the input fields
	const playerName = playerInput.value;
	const clubName = clubInput.value;

	// Add the player to the player list
	playerList.push({ playerName, clubName });

	// Save the updated player list to local storage
	localStorage.setItem("playerList", JSON.stringify(playerList));

	// Update the item list
	updateItemList();

	// Clear the input fields
	playerInput.value = "";
	clubInput.value = "";
});

// Event handler for the "Clear" button
clearButton.addEventListener("click", () => {
	// Clear the input fields
	playerInput.value = "";
	clubInput.value = "";

	// Clear the player list and local storage
	playerList = [];
	localStorage.removeItem("playerList");

	// Clear the item list
	itemList.innerHTML = "";
});

// Initial update of the item list
updateItemList();
