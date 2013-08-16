/*  JavaScript Document
 	Jordan Weaver
	Week 2 
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
		for (var i=0; i<radios.length; i++);{
			if(radios[i].checked){
				scheduleValue = radios[i].value;
			};
		};
	};
	
	function storeData(){
		var id			= Math.floor(Math.random()*10000001);
		// gather formfield values, store in object
		//object prop. contain array with the form label and input value
		getSelectedRadio();
		var item		= {};
			item.group	=["Goal", $('goalForm').value];
			item.gname	=["Goal Name", $('gname').value];
			item.date	=["Date of Achievment", $('date').value];
			item.typeGoal	=["Goal Type", $('typeGoal').value];
			//item.goalActivity	=["Goal Activity", goalActivityValue];
			item.amount	=["Amount", $('amount').value];
			item.comments	=["Comments", $('comments').value];
			
			//Save Data into Local Storage:
			localStorage.setItem(id, JSON.stringify(item));
			alert("Goal Saved!");
			
		
	}
	
	function getData(){
		//LS to Browser
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubli.appendChild(makeSubli);
				var optSubText =obj[n][0]+" "+obj[n][1]
				makeSubli.innerHTML = optSubText;
			}
		}
		
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is nothing to clear.")
		}else{
			localStorage.clea();
			alert("All Goals are deleted");
			window.location.reload();
			return false;
			}
	}
	
	
	
	//Variable defaults
	var goalType = ["--Choose Type--", "Personal", "Savings", "Workout","Education"],
	scheduleValue
	;
	typeGoal();
	
	//set Link & Submit Click Events
	/*var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);*/
	var save = $('submit');
	save.addEventListener("click", storeData);
	
	
		
/*Var Loop
var runLoop = function(){
	for(i=0, j = allvars.length; i<j; i++);
};

//Value
var getValue = function(){
	console.log(runLoop.value);
};

setItem
var captureData = function(){
localStorage.setItem("GoalName", gname.value);
}

//EventListener
//document.addEventListener("submit", gname);
allVars.addEventListener("click", getValue);

//Key
for(i=0, j=localStorage.length; i<j; i++){
	var theKey = localStorage.key(i);
	var theValue = localStorage.getItem(theKey);
	console.log(theKey, theValue);
}

var theKey = localStorage.key(getValue);
	console.log(theKey);*/
	
});