$(document).ready(function() {

    //Using moment(), get current day
    var nowDate = moment().format("dddd MMM Do");
    $("#currentDay").text(nowDate);

    // get current hour in 24 hour format
    var nowHour = moment().format('H');

    // create an empty array of size 9
    var messageArray = new Array(9);

    // Use "for" loop to create rows representing business hours and columns representing each hour, event and save button
    for(var i=9; i <=17; i++){
        // create each row
        var divNew = $("<div>");
        divNew.attr("class","row");
        $(".container").append(divNew); 
        
        //1st column - for each hour
        var timeValue = i;
        var colNew1 = $("<div>");
        colNew1.attr("class","col-md-2 time-block");
        // Since time is in 24hour format, change the time value to show in the first column
        if(i > 12){
            timeValue = (i-12);
            colNew1.text(timeValue + " PM");
        }
        else{
            colNew1.text(timeValue + " AM");
        }
        divNew.append(colNew1);


        //2nd column - for entering events
        var colNew2 = $("<div>");
        var colLabel = $("<label>");
        var coltext = $("<textarea>");
        var indexVal = i-9;
        coltext.attr("id",indexVal);
        // call function rowMessageColor for changing each rows color based on present hour
        rowMessageColor(i);
        divNew.append(colNew2).append(colLabel).append(coltext);
   
        // 3rd column - for save button
        var colNew3 = $("<div>");
        colNew3.attr("class","col-md-1 saveBtn");
        var button = $("<button>");
        divNew.append(colNew3);
        button.attr("class","far fa-save buttonIcon");
        button.attr("id",i);
        colNew3.append(button);
    }

    // function rowMessageColor
    function rowMessageColor(i){
        // present hour
        if(nowHour == i){
            coltext.attr("class","col-md-9 present");
        }
        // past hour
        else if(i < nowHour){
            coltext.attr("class","col-md-9 past");
        }
        // future hour
        else{
            coltext.attr("class","col-md-9 future");
        }
    }

    // getting "messageArray" from Local Storage
    var messageArray = JSON.parse(localStorage.getItem("messageArray"));

    // Event listener for On click
    $(".buttonIcon").on("click",function(e){
        e.preventDefault();
        // get the id of clicked button
        var hourValue = $(this).attr("id");
        // since the id of textarea corresponding to the clicked button is lesser by 9
        var newhourValue = (hourValue-9);
        // get the event typed on the corresponding textarea
        var messageValue = document.getElementById(newhourValue).value;
        // store the event to the corresponding index of the array
        messageArray[newhourValue] = messageValue;
        // call saveMessage function to save the array to Local Storage
        saveMessage(messageArray);   
    })

    // saveMessage function to save the array to Local Storage
    function saveMessage(messageArray){
        localStorage.setItem("messageArray", JSON.stringify(messageArray));
    }

    // call renderMessage function to get the array values and display in the textarea
    renderMessage();

    // renderMessage function to get the array values and display in the textarea
    function renderMessage(){
        var messageArray = JSON.parse(localStorage.getItem("messageArray"));
        // coltext.text(messageArray);
        for(var i=0; i< messageArray.length; i++){
            document.getElementById(i).textContent = messageArray[i];
        } 
    }
});