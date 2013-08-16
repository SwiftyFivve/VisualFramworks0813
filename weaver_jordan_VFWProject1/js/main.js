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
	
	//Variable defaults
	var goalType = ["--Choose Type--", "Personal", "Savings", "Workout","Education"];
	
	//set Link & Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
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