/*  JavaScript Document
 	Jordan Weaver
	Week 2 
 	0813 	*/
	
// My Vars

var gname = document.getElementById("gname");
var date = document.getElementById("date");
var typeGoal = document.getElementById("typeGoal");
var daily = document.getElementById("daily");
var weekly = document.getElementById("weekly");
var monthly = document.getElementById("monthly");
var amount = document.getElementById("amount");
var comments = document.getElementById("comments");
var allVars = [gname, date, typeGoal, daily, weekly, monthly, amount, comments];

var captureData = function(){
	localStorage.setItem("All Data", runVars);
}

var runVars = function() {
for (i=0, j=allVars.length; i<j; i++);
}

runVars.addEventListener("blur", captureData);