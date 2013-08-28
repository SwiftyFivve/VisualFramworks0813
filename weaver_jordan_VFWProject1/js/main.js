/*  JavaScript Document
 	Jordan Weaver
	Week 3
 	0813 	*/
	
//DOM loaded	
window.addEventListener("DOMContentLoaded", function(){
	
	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Create Select field element
	function typeGoal(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('typeGoal'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "types");
		for(var i=0, j=goalType.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = goalType[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);	
		}
		selectLi.appendChild(makeSelect);
	}
	
	//radio button
	function getSelectedRadio(){
		var radios = document.forms[0].schedule;
		for (var i=0; i<radios.length; i++){
			if(radios[i].checked){
				scheduleValue = radios[i].value;
			}
		}
		
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('goalForm').style.display = "none";
				$('clear').style.display =  "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break
			case "off":
				$('goalForm').style.display = "block";
				$('clear').style.display =  "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;	
		}
	}
	
	function storeData(key){
		//If there is no key this means this is a brand new item and we need a new key
		if(!key){
			var id			= Math.floor(Math.random()*10000001);
		}else{
			id = key;
		};
		// gather formfield values, store in object
		//object prop. contain array with the form label and input value
		getSelectedRadio();
		var item				= {};
			item.gname			=["Goal Name", $('gname').value];
			item.date			=["Date of Achievment", $('date').value];
			item.typeGoal		=["Goal Type", $('types').value];
			item.schedule		=["Goal Activity", scheduleValue];
			item.amount			=["Amount", $('amount').value];
			item.comments		=["Comments", $('comments').value];
			
			//Save Data into Local Storage:
			localStorage.setItem(id, JSON.stringify(item));
			alert("Goal Saved!");
			
		
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage, so default data was added.");
			autoFillData();
		}
		//LS to Browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.typeGoal[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText =obj[n][0]+" "+obj[n][1]
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // create edit/delete links
		}
		
		
	}
	
	//Get the image for the correct category
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src","images/" + catName + ".png")
		imageLi.appendChild(newImg);
	}
	
	
	//Auto Populate Local Storage
	function autoFillData(){
		//Actual JSON OBJECT data required for this to work is coming from my json.js page from html
		for(var n in json){
			var id 	= Math.floor(Math.random()*10000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//Make Item Links
	//create edit and delete links
	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Goal";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		
		//Line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
		
		
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Goal";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grab data from item from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls("off");	
		
		//populate form fields with current LS values
		$('gname').value = item.gname[1];
		$('date').value = item.date[1];
		$('types').value = item.types[1];
		var radios = document.forms[0].schedule;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Daily" && item.schedule[1] == "Daily"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Weekly" && item.schedule[1] == "Weekly"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Monthly" && item.schedule[1] == "Monthly"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$('amount').value = item.amount[1];
		$('comments').value = item.comments[1];
		
		//Remove the initial listener from the input ' save goal' button
		save.removeEventListener("click", storeData);
		//Change sumbit button value to edit button
		$('submit').value = "Edit Contact";
		var editSubmit = $('submit');
		//save the key value established in this function as a property of the editSubmit event
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm('Are you sure you want to delete this goal?');
		if (ask){
			localStorage.removeItem(this.key);	
			window.location.reload();
		}else{
			alert("Goal was NOT deleted.");
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is nothing to clear.")
		}else{
			localStorage.clear();
			alert("All Goals are deleted");
			window.location.reload();
			return false;
			}
	}
	
	function validate(e){
		//define the elemts we want to check
		var getGname = $('gname');
			getDate = $('date');
			
			//Reset Error Messages
			errMsg.innerHTML = "";
			getGname.style.border = "1px solid black";
			getDate.style.border = "1px solid black";
			
			//Get Error Messages
			var messageAry = [];
			//Goal name validation
			if(getGname.value===""){
				var gnameError = "Please enter a goal name.";
				getGname.style.border = "1px solid red";
				messageAry.push(gnameError);	
			}
			
			if(getDate.value === ""){
				var dateError = "Please choose a date.";
				getDate.style.border = "1px solid red";
				messageAry.push(dateError);
				
			}
			
			//If there were errors, display on screen.
			if (messageAry.length >= 1){
				for(var i=0, j=messageAry.length; i<j; i++){
					var txt = document.createElement('li');
					txt.innerHTML = messageAry[i];
					errMsg.appendChild(txt);	
				}
					e.preventDefault();
				return false;
			}else{
				//store data
				//Send the key value ( which came from the editData function).
				//Remember this key value was passed through the editSubmit event Listener as a property.
				storeData(this.key);
			}
			
		}
	
	
	
	//Variable defaults
	var goalType = ["--Choose Type--", "Personal", "Savings", "Workout","Education"],
	scheduleValue
	errMsg =$('errors');
	;
	
	typeGoal();
	
	//set Link & Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", validate);
	
	

	
});