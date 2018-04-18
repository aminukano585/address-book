var contacts;

window.onload = function() {
	if (!localStorage["contacts"] || localStorage["contacts"] === "[]") {
		contacts = [];
		showMainUI();
		var addBtn = document.querySelector("#add");
		addBtn.addEventListener("click", function() {
			addContact();
		});
	} else {
		contacts = JSON.parse(localStorage["contacts"]);
		showContacts();
		showNextUI(contacts[0]);

		var lis = document.querySelectorAll(".contacts-list>ul>li");
		lis.forEach(function(li, i) {
			li.addEventListener("click", function() {
				showNextUI(contacts[i]);
			});
		}); 

		var addBtn = document.querySelector("#add");
		addBtn.addEventListener("click", function() {
			addContact();
		});

		var editBtn = document.querySelector("#edit");
		editBtn.addEventListener("click", function() {
			editContact();
		});

		var delBtn = document.querySelector("#delete");
		delBtn.addEventListener("click", function() {
			deleteContact();
		});
	}
}

function Contact(name, phone_no, email) {
	this.name = name;
	this.phone_no = phone_no;
	this.email = email;
}

function addContact() {
	var dialog = document.querySelector("#contact-info");
	dialog.showModal();
	var submitBtn = document.querySelector("#submit");
	submitBtn.addEventListener("click", function(e) {
		e.preventDefault();
		var res = document.querySelectorAll("input")
		var obj = new Contact(res[0].value, res[1].value, res[2].value);
		contacts.push(obj);
		localStorage["contacts"] = JSON.stringify(contacts);
		clearForm();
		dialog.close();
		location.reload();
		// showContacts();
		// showNextUI();
	});
}

function editContact() {
	var dialog = document.querySelector("#edit-info");
	dialog.showModal(); 
}

function deleteContact() {
	var dialog = document.querySelector("#delete-info");
	dialog.showModal(); 
}

function clearForm() {
	var inputs = document.querySelectorAll(".form-field");
	for (var i in inputs) {
		inputs[i].value = "";
	}
}

function showMainUI() {
	var display = document.querySelector(".display-contact");
	display.style.display = "block";
	display.innerHTML = "";
	display.innerHTML += "<h3 style='text-align: center; margin: 100px 0 10px;'>No Contact Added, Click the Button Below to Add Contact</h3>";
	display.innerHTML += "<button id='add' style='display: block; margin: 0 auto 40px;'><img src='./images/add-icon.png' width=100 height=100 alt='Add Contact Button' title='add contact'></button>";
}

function showNextUI(contact) {
	var display = document.querySelector(".display-contact");
	display.innerHTML = "";

	var btnDiv = document.createElement("div");
	btnDiv.innerHTML += "<button id='add' style='margin: 10px;'><img src='./images/add-icon.png' width=20 height=20 alt='Add Contact Button' title='add contact'></button>";
	btnDiv.innerHTML += "<button id='edit' style='margin: 10px;'><img src='./images/edit-icon.png' width=20 height=20 alt='Edit Contact Button' title='edit contact'></button>";
	btnDiv.innerHTML += "<button id='delete' style='margin: 10px;'><img src='./images/delete-icon.png' width=20 height=20 alt='Delete Contact Button' title='delete contact'></button>";
	display.appendChild(btnDiv);

	var avatarDiv = document.createElement("div");
	avatarDiv.innerHTML += "<div id='avatar'><img src='./images/avatar.png' width=100 height=100 alt='Contact Avatar'></div>";
	display.appendChild(avatarDiv);

	var contactDiv = document.createElement("div");
	contactDiv.innerHTML += "<div id='name'>" + contact.name.toUpperCase() + "</div>";
	contactDiv.innerHTML += "<hr>";
	contactDiv.innerHTML += "PHONE";
	contactDiv.innerHTML += "<div id='phone-no'>" + contact.phone_no + "</div>";
	contactDiv.innerHTML += "<hr>";
	contactDiv.innerHTML += "EMAIL";
	contactDiv.innerHTML += "<div id='email'>" + contact.email + "</div>";
	display.appendChild(contactDiv);

	var addBtn = document.querySelector("#add");
	addBtn.addEventListener("click", function() {
		addContact();
	});

	var editBtn = document.querySelector("#edit");
	editBtn.addEventListener("click", function() {
		editContact();
	});

	var delBtn = document.querySelector("#delete");
	delBtn.addEventListener("click", function() {
		deleteContact();
	});
}

function showContacts() {
	var contactsList = document.querySelector(".contacts-list>ul");
	contacts.forEach(function(contact) {
		var li = document.createElement("li");
		li.innerHTML += contact.name;
		contactsList.appendChild(li);
	});
}