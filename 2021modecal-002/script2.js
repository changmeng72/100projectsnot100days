function selectMenu(){
	alert("menu");
}

function showTouch(){
	alert("touch");
}
function showError(){
	alert("err");
}
let randomMenuURL = "https://www.themealdb.com/api/json/v1/1/random.php"
let randomMenu;


function showMenu(){
	/**/
	 
}
function leapYear(year) {
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0); 
	}
	
	
function generateCalender(year){
	let month =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	let days = [31,28,31,30,31,30,31,31,30,31,30,31];
	let cal = ""
	for(let i=0;i<12;i++){
		
		let monthstr = `<div><table class="monthtable">
		<caption>${month[i]}</caption>
		<tr class="weekday">
		<td>Sun</td>
		<td>Mon</td>
		<td>Tue</td>
		<td>Wed</td>
		<td>Thu</td>
		<td>Fri</td>
		<td>Sat</td>
		</tr>`
		
		let firstDay = new Date(year,i,1);
		let firstWeekDay = firstDay.getDay();
		
		monthstr += '<tr class="monthday">';
		for(let j=0;j<firstWeekDay;j++){
			monthstr += '<td class="weekday"></td>';			
		}
		let date = 1;
		for(let j=firstWeekDay;j<7;j++){
			monthstr += `<td class="weekday"><button data-date="${i}-${date}" class='daybut' style="background-color:#888888"><span>${date}</span></button></td>`
			date += 1;
		}
		monthstr += '</tr>'; //first line finished
		monthDays = (i==1 && leapYear(year))? 29: days[i];
		
		let remainingDays =  monthDays - date + 1;
		 
		
		let weeks = parseInt(remainingDays/7);
		console.log(weeks);
		for(let k=0;k<weeks;k++){
			monthstr += '<tr class="monthday">';
			for(let j=0;j<7;j++){
				monthstr += `<td class="weekday"><button data-date="${i}-${date}" class='daybut' style="background-color:#888888"><span>${date}</span></button></td>`
			    date += 1;
			}
			monthstr += '</tr>';
		}
		remainingDays =  monthDays - date + 1;
		
		//last week ,remainingDays
		if(remainingDays>0){
			monthstr += '<tr class="monthday">';
			for(let j=0;j<7;j++){
				if(date<= monthDays)
					monthstr += `<td class="weekday"><button data-date="${i}-${date}" class='daybut' style="background-color:#888888"><span>${date}</span></button></td>`
				else
					monthstr += `<td class="weekday"></td>`
			    date += 1;
			}
			monthstr += '</tr>';
		}
		
		monthstr += '</table></div>';
		cal += monthstr;
	}
		
	return cal;			
		 
	 
}
let currentMood = 0;
const currentColor = ['#888888','#2d6b5f','#72e3a6','#dff4c7','#edbf98','#ea3d36'];
const moodstring = ['none','laughing','smile','expressionless','frown','angry'];
window.onload = function(){
	//download a random menu	
	
	
	$('#calendar').html(generateCalender(2021)) ;
	 

$('.daybut').click((evt)=>{
	
	
	let btn = evt.currentTarget;
	btn.style.backgroundColor = currentColor[currentMood];
	 
});



function restoreMood(mood){
	if(mood>0 && mood<6){
		
	let node =  $("." + moodstring[mood])[0]
	if(node.style.color!='white') return;
	let t= node.style.backgroundColor
	node.style.backgroundColor = node.style.color;
	node.style.color = t;
	}
}

$(".moodbut").click((evt)=>{
	let btn = evt.currentTarget;
	for(let i=0;i< moodstring.length;i++){
	if(  btn.className.search(moodstring[i])!=-1){
		if(currentMood==i){
			restoreMood(currentMood)
			currentMood = 0;
		}
		else
		{
			restoreMood(currentMood)
			currentMood = i;
			let t= evt.currentTarget.style.backgroundColor
			evt.currentTarget.style.backgroundColor = evt.currentTarget.style.color;
			evt.currentTarget.style.color = t;
		}
	}
	
	
}});

$("#oper_shuffle").click(()=>{
	let buttons = $('.daybut');
	for(let i=0;i<buttons.length;i++){
		let mood = Math.floor((Math.random() * 6));
		buttons[i].style.backgroundColor = currentColor[mood];
		
	}
});

$("#oper_restore").click(()=>{
	let buttons = $('.daybut');
	for(let i =0;i<buttons.length;i++)
		buttons[i].style.backgroundColor = currentColor[0];
	for(let i=1;i<6;i++)
		restoreMood(i) 
	currentMood = 0;
});


}
