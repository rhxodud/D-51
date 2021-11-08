// To do:
// 2. Give all choices outputs ex. helped += 1;
// 3. Finish coding the last part of the game
// 4. Make leaderboard system
// 5. Add in background

var gameContainer = document.getElementById("game-container");
var storyText = document.getElementById("story-text");
var buttonContainer = document.getElementById("button-container");

var vax = false;
var bunker = false;
var S12 = false;
var S24 = false;
var S32 = false;
var day31 = false;
var day41 = false;
var day51 = false;
var helped = 0;
var game1 = false;
var game2 = false;
var game3 = false;
var patient = 0;
var ask = true;

var day = 1;
var food = 5;
var sanity = 100;
var sickness = 0;
var ycoins = 0;
var job = "None";
var dayJava = document.getElementById("day");
var foodJava = document.getElementById("food");
var sanityJava = document.getElementById("sanity");
var ycoinsJava = document.getElementById("ycoins");
var jobJava = document.getElementById("job");

function saving() {
    if (typeof(Storage) !== "undefined") {
        if (localStorage.money) {
            localStorage.money = ycoins;
        } else {
            localStorage.money = "undefined";
        }
        alert("Information saved.");
    } else {
        alert("Sorry, your browser does not support this function.");
    }
}

function savingSee() {
    document.getElementById("ycoinsSee").innerHTML = "You had " + localStorage.money + " YCOINS.";
}

var hunger = new Audio('/img/781f9c15-7143-4fa2-b246-3ed601f83fc0/462087__mar-u02144__hungry-stomach.wav');
var sane = new Audio('/img/781f9c15-7143-4fa2-b246-3ed601f83fc0/579818__mordecai666__old-man-scream.mp3');

function gameover() {
    if (food < 0) {
        hunger.play();
        storyText.innerHTML = "Game Over due to food: Sorry! Try Again!";
        buttonContainer.innerHTML = "<button onclick = 'location.reload()'>Restart the game</button><button onclick = 'scene40()' type='button'>Save YCOINS Data</button>";
        gameContainer.style.backgroundImage = "url('')";
    } else if (sanity < 20) {

        storyText.innerHTML = "Game Over due to sanity: Sorry! Try Again!";
        buttonContainer.innerHTML = "<button onclick = 'location.reload()'>Restart the game</button><button onclick = 'scene40()' type='button'>Save YCOINS Data</button>";
        gameContainer.style.backgroundImage = "url('')";
    }
}

function daily() {
    ycoins += 100000;
    sanity -= 22;
    food -= 4;
    day += 10;
    dayJava.innerHTML = "Day: " + day + " / ";
    foodJava.innerHTML = "Food: " + food + " / ";
    sanityJava.innerHTML = "Sanity: " + sanity + " / ";
    ycoinsJava.innerHTML = "YCOINS: " + ycoins + " / ";
}

function dailyBunker() {
    ycoins += 100000;
    sanity -= 22;
    food -= 2;
    day += 10;
    dayJava.innerHTML = "Day: " + day + " / ";
    foodJava.innerHTML = "Food: " + food + " / ";
    sanityJava.innerHTML = "Sanity: " + sanity + " / ";
    ycoinsJava.innerHTML = "YCOINS: " + ycoins + " / ";
}

function update() {
    if ((food < 0) || (sanity < 20)) {
        gameover();
    }

    sanity -= 1;

    askingDisplay();
}

function askingDisplay() {
    dayJava.innerHTML = "Day: " + day + " / ";
    foodJava.innerHTML = "Food: " + food + " / ";
    sanityJava.innerHTML = "Sanity: " + sanity + " / ";
    ycoinsJava.innerHTML = "YCOINS: " + ycoins + " / ";
    jobJava.innerHTML = "Job: " + job;

    if (ask == true) {
        asking();
    }
}

function asking() {
    if (food < 3) {
        alert("You currently have" + food + "If you don't want to buy, type in 0 or click cancel. If you never want to see this message again, type in 123456789.");
        var howmuchfood = prompt("How much food will you buy? Answer with a number. One food is 50000 YCOINS.");
        var howmuchfoodnum = parseFloat(howmuchfood);
        if (howmuchfoodnum * 50000 <= ycoins) {
            ycoins -= howmuchfoodnum * 50000;
            food += howmuchfoodnum;
        } else if (howmuchfood == 123456789) {
            ask = false;
        } else if (howmuchfoodnum * 50000 > ycoins) {
            storyText.innerHTML = "You don't have enough YCOINS to buy this much food.";
            buttonContainer.innerHTML = "<button onclick = 'update()'>Try Buying Again</button>";
        }
    } else if (sanity <= 40) {
        alert("You have 20 or less sanity left until game over. Pick a number between 1 and 10. If you get it right, you will get some sanity. If you don't want to pick a number, click cancel in the next message. If you never want to see this message again, type in 123456789.");
        var num10 = prompt("Type in your choice of number between 1 and 10.");
        var num10A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var num10P = Math.floor(Math.random() * num10A.length);
        if (num10 == num10A[num10P]) {
            alert("You picked the correct number. You gained 25 sanity. ");
            sanity += 25;
        } else if (num10 == 123456789) {
            ask = false;
        } else {
            alert("You picked the wrong number. ");
        }
        console.log(num10, num10A[num10P]);
    }
}

function scene1() {
    ycoins += 100000;

    storyText.innerHTML = "In this game, YCOINS is the currency. While playing this game, be sure to keep your food in stock, stay sane, and avoid sickness. If your food stock is under 0, game over. Sanity less than 20, game over.";
    buttonContainer.innerHTML = "<button onclick = 'scene2()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene2() {
    storyText.innerHTML = "You are living in an advanced society where a virus called CORVARA-94 is found just a few days earlier. The government says that they will develop a vaccine 50 days from now. Your goal from now is to survive the 50 days and reach day 51.";
    buttonContainer.innerHTML = "<button onclick = 'scene3()'>Start Pre-game Activities</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene3() {
    storyText.innerHTML = "You have a chance to get some food. You will get food if you get a question right.";
    buttonContainer.innerHTML = "<button onclick = 'scene4()'>Okay</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene4() {
    var minigame = prompt("What is 10+10*2?");
    if (minigame == 30) {
        storyText.innerHTML = "You got the question correct and got 5 foods.";
        buttonContainer.innerHTML = "<button onclick = 'scene7()'>Next</button>";
        food += 5;
        foodJava.innerHTML = "Food: 5";
    } else {
        storyText.innerHTML = "You got the question wrong and got no food.";
        buttonContainer.innerHTML = "<button onclick = 'scene7()'>Next</button>";
    }
    gameContainer.style.backgroundImage = "url('')";
}

// function scene5() {
//     storyText.innerHTML = "scene5";
//     buttonContainer.innerHTML = "<button onclick = 'scene7()'>Return to Home</button>";
//     gameContainer.style.backgroundImage = "url('')";

//     update();
// }

// function scene6() {
//     storyText.innerHTML = "scene6";
//     buttonContainer.innerHTML = "<button onclick = 'scene7()'>Return to Home</button>";
//     gameContainer.style.backgroundImage = "url('')";

//     update();
// }

function scene7() {
    storyText.innerHTML = "Your house has a bunker mode. Bunker mode is a mode that will use less food every 10 days. However, it limits some of your abilities in the game too. Will you activate bunker mode?";
    buttonContainer.innerHTML = "<button onclick = 'scene9()'>Will Not Activate</button><button onclick = 'scene8()'>Will Activate</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene8() {
    bunker = true;
    storyText.innerHTML = "Bunker mode activated. Less food will be used every 10 days, but some of your abilities in the game will be limited. ";
    buttonContainer.innerHTML = "<button onclick = 'scene10()'>Start Game</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene9() {
    bunker = false;
    storyText.innerHTML = "Bunker mode unactivated.";
    buttonContainer.innerHTML = "<button onclick = 'scene10()'>Start Game</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene10() {
    S12 = true;
    storyText.innerHTML = "Day 1";
    buttonContainer.innerHTML = "<button onclick = 'reScene1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

// function scene11() {
// 	storyText.innerHTML = "scene11";
// 	buttonContainer.innerHTML = "<button onclick = 'reScene1()'>Next</button>";
// 	gameContainer.style.backgroundImage = "url('')";

//  update();
// }

function scene12() {
    //     day31 = true;
    storyText.innerHTML = "Day 11";
    buttonContainer.innerHTML = "<button onclick = 'scene13()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    if (bunker == true) {
        dailyBunker();
        update();
    } else {
        daily();
        update();
    }
}

function scene13() {
    storyText.innerHTML = "What job will you choose? Look at the background image to find out more about each job. Click <a href = 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg' target = 'blank_'>HERE</a> for enlarged full image.";
    buttonContainer.innerHTML = "<button onclick = 'scene14()'>Artisit</button><button onclick = 'scene15()'>Scientist</button><button onclick = 'scene16()'>Architect</button><button onclick = 'scene17()'>Youtuber</button><button onclick = 'scene18()'>Doctor</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene14() {
    job = "Artist";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are an artist now. You will give inspiration to others by drawing.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene15() {
    job = "Scientist";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are a scientist now. You will be able to develop an one time use vaccine.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene16() {
    job = "Architect";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are an architect now. You will design shelters for people to live in.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene17() {
    job = "Youtuber";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are a youtuber now. You will make videos that will entertain others.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene18() {
    job = "Doctor";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are a doctor now. You will help patients.";
    buttonContainer.innerHTML = "<button onclick = 'scene19()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene19() {
    if (bunker == true) {
        scene20();
    } else {
        scene21();
    }

    update();
}

function scene20() {
    storyText.innerHTML = "You have activated your bunker mode. You can only help 2 patients.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene21() {
    storyText.innerHTML = "You have not activated your bunker mode. There is no limit to how much patients you can help.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene22() {
    S12 = false;
    S24 = true;
    day31 = true;
    //     day41 = true;
    game1 = true;
    storyText.innerHTML = "Day 21";
    buttonContainer.innerHTML = "<button onclick = 'reScene1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    if (bunker == true) {
        dailyBunker();
    } else {
        daily();
    }
    update();
}

function scene24() {
    if (job == "Artist") {
        reScene21();
    } else if (job == "Scientist") {
        reScene22();
    } else if (job == "Architect") {
        reScene23();
    } else if (job == "Youtuber") {
        reScene24();
    } else if (job == "Doctor") {
        reScene25();
    }

    update();
}

function scene25() {
    day41 = true;
    day31 = false;
    game1 = false;
    game2 = true;
    storyText.innerHTML = "Day 31";
    buttonContainer.innerHTML = "<button onclick = 'scene26()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    if (bunker == true) {
        dailyBunker();
    } else {
        daily();
    }
    update();
}

function scene26() {
    storyText.innerHTML = "You can get a pet. Would you get one?";
    buttonContainer.innerHTML = "<button onclick = 'scene28()'>Don't Get One</button><button onclick = 'scene27()'>Get One</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene27() {
    sanity += 50;
    sanityJava.innerHTML = "Sanity: " + sanity + " / ";
    ycoins -= 100000;
    ycoinsJava.innerHTML = "YCOINS: " + ycoins + " / ";

    storyText.innerHTML = "You got a pet. You used money and food but got sanity. ";
    buttonContainer.innerHTML = "<button onclick = 'scene24()'>Work</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene28() {
    storyText.innerHTML = "You decided to not get a pet. ";
    buttonContainer.innerHTML = "<button onclick = 'scene24()'>Work</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene30() {
    S24 = false;
    S32 = true;
    game2 = false;
    game3 = true;
    day41 = false;
    day51 = true;
    storyText.innerHTML = "Day 41";
    buttonContainer.innerHTML = "<button onclick = 'reScene1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    if (bunker == true) {
        dailyBunker();
    } else {
        daily();
    }
    update();
}

function scene32() {
    storyText.innerHTML = "You survived another 10 days.";
    buttonContainer.innerHTML = "<button onclick = 'scene33()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene33() {
    storyText.innerHTML = "Day 51";
    buttonContainer.innerHTML = "<button onclick = 'scene34()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    if (bunker == true) {
        dailyBunker();
    } else {
        daily();
    }
    update();
}

function scene34() {
    storyText.innerHTML = "The government made a perfect vaccine as promised on day 51! The vaccine is incredible: it made CORVARA-94 go away! Your community becomes healthy again!";
    buttonContainer.innerHTML = "<button onclick = 'scene35()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function scene35() {
    if (helped > 0) {
        scene36();
    } else {
        scene37();
    }

    update();
}

function scene36() {
    storyText.innerHTML = "You helped others! The government is honoring you!";
    buttonContainer.innerHTML = "<button onclick = 'scene38()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene37() {
    storyText.innerHTML = "You didn't help others! When you are sick, no one will help you... You have to suffer alone.";
    buttonContainer.innerHTML = "<button onclick = 'scene39()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene38() {
    storyText.innerHTML = "The End: Helping and Serving is a great way to honor God!";
    buttonContainer.innerHTML = "<button onclick = 'scene40()'>Save YCOINS Data</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene39() {
    storyText.innerHTML = "The End: How about halping and servering others? Wouldn't that be amazing?";
    buttonContainer.innerHTML = "<button onclick = 'location.reload()'>Restart Game</button><button onclick = 'scene40()'>Save YCOINS Data</button>";
    gameContainer.style.backgroundImage = "url('')";
}

function scene40() {
    saving();
}

//repeating scene 1
var helpTime = 0;

function reScene1() {
    storyText.innerHTML = "Will you buy food? Y50000 (50000 ycoins) per food. Reminder: If you have less than 0 food, then it is game over. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene3()'>Will Not Buy</button><button onclick = 'reScene2()'>Will Buy</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene2() {
    sanity += 10;

    storyText.innerHTML = "Purchased";
    buttonContainer.innerHTML = "<button onclick = 'reScene4()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    var howmuchfood = prompt("How much food will you buy? Answer with a number.");
    var howmuchfoodnum = parseFloat(howmuchfood);
    if (howmuchfoodnum * 50000 <= ycoins) {
        ycoins -= howmuchfoodnum * 50000;
        food += howmuchfoodnum;
    } else if (howmuchfoodnum * 50000 > ycoins) {
        storyText.innerHTML = "You don't have enough YCOINS to buy this much food.";
        buttonContainer.innerHTML = "<button onclick = 'reScene2()'>Try Buying Again</button>";
    } else {
        reScene2();
    }

    if (howmuchfood == 0) {
        sanity -= 10;
    }

    update();
}

function reScene3() {
    sanity -= 10;

    storyText.innerHTML = "You didn't buy food. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene4()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene4() {
    storyText.innerHTML = "You see a person that needs help. Will you help?";
    gameContainer.style.backgroundImage = "url('')";

    console.log(helpTime);
    if (bunker == true) {
        console.log("Bunkermode is activated");
    } else {
        console.log("Bunkermode is unactivted");
    }

    var per = Math.random();
    console.log("percentage1 = " + per);
    if (per <= 0.44) {
        buttonContainer.innerHTML = "<button onclick = 'reScene5()'>Will Not Help</button><button onclick = 'reScene7()'>Will Help</button>";
        if (bunker == true && helpTime == 2) {
            buttonContainer.innerHTML = "<button onclick = 'reScene5()'>Cannot Help Anymore Due To Bunker Mode</button>";
        }
    } else if (per <= 1) {
        buttonContainer.innerHTML = "<button onclick = 'reScene5()'>Will Not Help</button><button onclick = 'reScene6()'>Will Help</button>";
        if (bunker == true && helpTime == 2) {
            buttonContainer.innerHTML = "<button onclick = 'reScene5()'>Cannot Help Anymore Due To Bunker Mode</button>";
        }
    }

    update();
}

function reScene5() {
    storyText.innerHTML = "You didn't help the person. ";
    buttonContainer.innerHTML = "<button onclick = 'redirect1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene6() {
    helped += 1;
    helpTime += 1;
    food -= 2;
    sanity += 50;
    ycoins += 100000;

    storyText.innerHTML = "The person you helped has a virus!";
    gameContainer.style.backgroundImage = "url('')";

    if (vax == true) {
        buttonContainer.innerHTML = "<button onclick = 'reScene8()'>You Are Vaccinated. Click To Continue</button>";
    } else if (vax == false) {
        buttonContainer.innerHTML = "<button onclick = 'reScene9()'>You Are Not Vaccinated. Click To Continue</button>";
    }

    update();
}

function reScene7() {
    helped += 1;
    helpTime += 1;
    food -= 2;
    sanity += 50;
    ycoins += 100000;

    storyText.innerHTML = "The person doesn't have the virus! You helped others!";
    buttonContainer.innerHTML = "<button onclick = 'redirect1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene8() {
    storyText.innerHTML = "Fortunately, you are vaccinated. You overcame the virus.";
    buttonContainer.innerHTML = "<button onclick = 'redirect1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene9() {
    storyText.innerHTML = "You got the virus!";
    gameContainer.style.backgroundImage = "url('')";

    var per2 = Math.random();
    console.log("percentage2 = " + per2);
    if (per2 <= 0.33) {
        buttonContainer.innerHTML = "<button onclick = 'reScene10()'>See the result of the virus by clicking</button>";
    } else if (per2 <= 0.95) {
        buttonContainer.innerHTML = "<button onclick = 'reScene11()'>See the result of the virus by clicking</button>";
    } else if (per2 <= 1) {
        buttonContainer.innerHTML = "<button onclick = 'reScene12()'>See the result of the virus by clicking</button>";
    }

    update();
}

function reScene10() {
    storyText.innerHTML = "You died from the virus.";
    buttonContainer.innerHTML = "<button onclick = 'reScene13()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene11() {
    storyText.innerHTML = "You are suffering from the virus.";
    gameContainer.style.backgroundImage = "url('')";

    sanity -= 20;

    var per3 = Math.random();
    console.log("percentage3 = " + per3);
    if (per3 <= 0.33) {
        buttonContainer.innerHTML = "<button onclick = 'reScene13()'>Next</button>";
    } else if (per3 <= 1) {
        buttonContainer.innerHTML = "<button onclick = 'reScene14()'>Next</button>";
    }

    update();
}

function reScene12() {
    storyText.innerHTML = "You are immune to the virus.";
    buttonContainer.innerHTML = "<button onclick = 'reScene15()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene13() {
    storyText.innerHTML = "Game Over: Sorry! Try Again!";
    buttonContainer.innerHTML = "<button onclick = 'location.reload()'>Restart the game</button><button onclick = 'scene40()'>Save YCOINS Data</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene14() {
    sanity += 50;

    storyText.innerHTML = "You survived the virus!";
    buttonContainer.innerHTML = "<button onclick = 'redirect1()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene15() {
    storyText.innerHTML = "Will you sacrifice yourself so that the virus can end?";
    buttonContainer.innerHTML = "<button onclick = 'reScene18()'>No. Sleep</button><button onclick = 'reScene16()'>Yes. I will</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene16() {
    helped += 1;
    storyText.innerHTML = "CORVARA-94 (the virus) stopped. Everyone is happy and delighted!";
    buttonContainer.innerHTML = "<button onclick = 'reScene17()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene17() {
    storyText.innerHTML = "The End: Sacrificing for others is a great way of serving.";
    buttonContainer.innerHTML = "<button onclick = 'location.reload()'>Restart the game</button><button onclick = 'scene40()'>Save YCOINS Data</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function reScene18() {
    storyText.innerHTML = "Nothing interesting happened.";
    buttonContainer.innerHTML = "<button onclick = 'redirect1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('')";

    update();
}

function redirect1() {
    if (S12 == true) {
        gameContainer.style.backgroundColor = "black";
        storyText.innerHTML = "You have survived for 10 days.";
        buttonContainer.innerHTML = "<button onclick = 'scene12()'>Sleep</button>";
    } else if (S24 == true) {
        scene24();
    } else if (S32 == true) {
        scene24();
    }

    update();
}

//repeating scene 2
function reScene21() {
    var perArt = Math.random();
    console.log("percentageArt = " + perArt);

    gameContainer.style.backgroundColor = "yellow";
    storyText.innerHTML = "You are working as an artist. You have a 50/50 chance of drawing something and earning money. ";

    if (perArt <= 0.55) {
        buttonContainer.innerHTML = "<button onclick = 'reScene31()'>Work</button>";
    } else if (perArt <= 1) {
        buttonContainer.innerHTML = "<button onclick = 'reScene32()'>Work</button>";
    }

    update();
}

function reScene22() {
    var perSci = Math.random();
    console.log("percentageSci = " + perSci);

    gameContainer.style.backgroundColor = "orange";
    storyText.innerHTML = "You are working as a scientist. You have a 10/90 chance of developing a vaccine and earning money. ";

    if (perSci <= 0.11) {
        buttonContainer.innerHTML = "<button onclick = 'reScene37()'>Work</button>";
    } else if (perSci <= 1) {
        buttonContainer.innerHTML = "<button onclick = 'reScene38()'>Work</button>";
    }

    update();
}

function reScene23() {
    var perArc = Math.random();
    console.log("percentageArc = " + perArc);

    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "You are working as an architect. You have a 90/10 chance of designing a building and earning money. ";

    if (perArc <= 0.99) {
        buttonContainer.innerHTML = "<button onclick = 'reScene33()'>Work</button>";
    } else if (perArc <= 1) {
        buttonContainer.innerHTML = "<button onclick = 'reScene34()'>Work</button>";
    }

    update();
}

function reScene24() {
    gameContainer.style.backgroundColor = "blue";
    storyText.innerHTML = "You are working as a youtuber. You are going to play a mini game and earn money. ";
    buttonContainer.innerHTML = "<button onclick = 'gameSelect()'>Work</button>";

    update();
}

function reScene25() {
    var perDoc = Math.random();
    console.log("percentageDoc = " + perDoc);

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "You are working as a doctor. You have a 70/30 chance of helping a patient and earning money. ";

    if (perDoc <= 0.77) {
        buttonContainer.innerHTML = "<button onclick = 'reScene35()'>Work</button>";
    } else if (perDoc <= 1) {
        buttonContainer.innerHTML = "<button onclick = 'reScene36()'>Work</button>";
    }

    update();
}

function reScene31() {
    ycoins += 300000;

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Your drawing have been a big inspiration for lots of people. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene32() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "You failed to draw. Try again next time! ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene33() {
    ycoins += 100000;

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "You made a building design for people. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene34() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "You weren't able to make a building design. Try again next time! ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene35() {
    patient += 1;

    if (patient == 3 && bunker == true) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You can't help a patient due to bunker mode. ";
        buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

        update();
    } else if (patient == 3 && bunker == false) {
        ycoins += 200000;

        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You helped a patient. ";
        buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

        update();
    } else {
        ycoins += 200000;

        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You helped a patient. ";
        buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

        update();
    }
}

function reScene36() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "You weren't able to help a patient. Try again next time! ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene37() {
    ycoins += 1000000;

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "You made a vaccine. Will you use it for yourself or another person?";
    buttonContainer.innerHTML = "<button onclick = 'reScene39()'>Myself</button><button onclick = 'reScene40()'>Another Person</button>";

    update();
}

function reScene38() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "You weren't able to develop a vaccine. Try again next time! ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene39() {
    vax = true;
    gameContainer.style.backgroundColor = "orange";
    storyText.innerHTML = "You are vaccinated now. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene40() {
    helped += 1;

    gameContainer.style.backgroundColor = "orange";
    storyText.innerHTML = "Another person is vaccinated now. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene41() {
    ycoins += 500000;

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "You made an amazing video that entertained others! ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene42() {
    ycoins += 300000;

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "You made a great video that entertained others! ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene43() {
    ycoins + 100000;

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "You made a good video that entertained others! ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene44() {
    ycoins += 50000;

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "You made a video that entertained others! ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene46() {
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "You weren't able to make a video. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene45() {
    gameContainer.style.backgroundColor = "black";
    storyText.innerHTML = "You survived for another 10 days. ";
    buttonContainer.innerHTML = "<button onclick = 'redirect2()'>Sleep</button>";

    update();
}

function redirect2() {
    if (day31 == true) {
        scene25();
    } else if (day41 == true) {
        scene30();
    } else if (day51 == true) {
        scene33();
    }
}

//Youtuber Game
var correct = 0;

function gameSelect() {
    if (game1 == true) {
        gScene1();
    } else if (game2 == true) {
        gScene1_2();
    } else if (game3 == true) {
        gScene1_3();
    }
}

function gScene1() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Pick the correct punctuation. ";
    buttonContainer.innerHTML = "<button onclick = 'gScene2()'>Start</button>";

    update();
}

function gScene2() {
    gameContainer.style.backgroundColor = "blue";
    storyText.innerHTML = "I am strong_ bold_ and bald.";
    buttonContainer.innerHTML = "<button onclick = 'gScene3()'>,</button><button onclick = 'gScene4()'>.</button><button onclick = 'gScene5()'>:</button>";

    update();
}

function gScene3() {
    correct += 1;
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Correct. Next Question: Therefore_ I am the best.";
    buttonContainer.innerHTML = "<button onclick = 'gScene6()'>,</button><button onclick = 'gScene7()'>.</button><button onclick = 'gScene8()'>:</button>";

    update();
}

function gScene4() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Next Question: Therefore_ I am the best.";
    buttonContainer.innerHTML = "<button onclick = 'gScene6()'>,</button><button onclick = 'gScene7()'>.</button><button onclick = 'gScene8()'>:</button>";

    update();
}

function gScene5() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Next Question: Therefore_ I am the best.";
    buttonContainer.innerHTML = "<button onclick = 'gScene6()'>,</button><button onclick = 'gScene7()'>.</button><button onclick = 'gScene8()'>:</button>";

    update();
}

function gScene6() {
    correct += 1;
    gameContainer.style.backgroundColor = "blue";
    storyText.innerHTML = "Correct. Next Question: I made a list_ carrot, apple, and potato.";
    buttonContainer.innerHTML = "<button onclick = 'gScene9()'>,</button><button onclick = 'gScene10()'>.</button><button onclick = 'gScene11()'>:</button>";

    update();
}

function gScene7() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Next Question: I made a list_ carrot, apple, and potato.";
    buttonContainer.innerHTML = "<button onclick = 'gScene9()'>,</button><button onclick = 'gScene10()'>.</button><button onclick = 'gScene11()'>:</button>";

    update();
}


function gScene8() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Next Question: I made a list_ carrot, apple, and potato.";
    buttonContainer.innerHTML = "<button onclick = 'gScene9()'>,</button><button onclick = 'gScene10()'>.</button><button onclick = 'gScene11()'>:</button>";

    update();
}

function gScene9() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Next Question: This game is the best_";
    buttonContainer.innerHTML = "<button onclick = 'gScene12()'>,</button><button onclick = 'gScene13()'>.</button><button onclick = 'gScene14()'>:</button>";

    update();
}

function gScene10() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Next Question: This game is the best_";
    buttonContainer.innerHTML = "<button onclick = 'gScene12()'>,</button><button onclick = 'gScene13()'>.</button><button onclick = 'gScene14()'>:</button>";

    update();
}

function gScene11() {
    correct += 1;
    gameContainer.style.backgroundColor = "blue";
    storyText.innerHTML = "Correct. Next Question: This game is the best_";
    buttonContainer.innerHTML = "<button onclick = 'gScene12()'>,</button><button onclick = 'gScene13()'>.</button><button onclick = 'gScene14()'>:</button>";

    update();
}

function gScene12() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Next Question: This game is the best_";
    buttonContainer.innerHTML = "<button onclick = 'gScene15()'>,</button><button onclick = 'gScene16()'>.</button><button onclick = 'gScene17()'>:</button>";

    update();
}

function gScene13() {
    gameContainer.style.backgroundColor = "blue";
    storyText.innerHTML = "Correct. Next Question: This game is the best_";
    buttonContainer.innerHTML = "<button onclick = 'gScene15()'>,</button><button onclick = 'gScene16()'>.</button><button onclick = 'gScene17()'>:</button>";

    update();
}

function gScene14() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Next Question: This game is the best_";
    buttonContainer.innerHTML = "<button onclick = 'gScene15()'>,</button><button onclick = 'gScene16()'>.</button><button onclick = 'gScene17()'>:</button>";

    update();
}

function gScene15() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Click next for your result.";
    buttonContainer.innerHTML = "<button onclick = 'gScene18()'>Next</button>";

    update();
}

function gScene16() {
    correct += 1;
    gameContainer.style.backgroundColor = "blue";
    storyText.innerHTML = "Correct. Click next for your result.";
    buttonContainer.innerHTML = "<button onclick = 'gScene18()'>Next</button>";

    update();
}

function gScene17() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "Incorrect. Click next for your result.";
    buttonContainer.innerHTML = "<button onclick = 'gScene18()'>Next</button>";

    update();
}

function gScene18() {
    if (correct == 0) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 0 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene46()'>Next</button>";

        update();
    } else if (correct == 1) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 1 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene44()'>Next</button>";

        update();
    } else if (correct == 2) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 2 out of 4 right. Click sleep to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene43()'>Next</button>";

        update();
    } else if (correct == 3) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 3 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene42()'>Next</button>";

        update();
    } else if (correct == 4) {
        gameContainer.style.backgroundColor = "green";
        storyText.inn //erHTML = "You got 4 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene41()'>Next</button>";

        update();
    }
}

//Youtuber Game 2
var one = false;
var two = false;
var three = false;
var four = false;

function generator() {
    var num = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    var numPick = Math.floor(Math.random() * num.length);
    var int1 = Math.floor(Math.random() * num[numPick]);
    var int2 = Math.floor(Math.random() * num[numPick]);
    var whatSign = ["+", "-", "x"];
    var signPick = Math.floor(Math.random() * whatSign.length);

    if (whatSign[signPick] == "+") {
        var answer = int1 + int2;
    } else if (whatSign[signPick] == "-") {
        var answer = int1 - int2;
    } else if (whatSign[signPick] == "x") {
        var answer = int1 * int2;
    }

    console.log(int1, int2, whatSign[signPick]);
    var question = prompt(int1 + " " + whatSign[signPick] + " " + int2);

    if (question == answer && one == true) {
        alert("Correct");
        pQuestionRight += 1;
        one = false;
        gScene2_2();
    }
    if (question == answer && two == true) {
        alert("Correct");
        pQuestionRight += 1;
        gScene3_2();
    }
    if (question == answer && three == true) {
        alert("Correct");
        pQuestionRight += 1;
        gScene4_2();
    }
    if (question == answer && four == true) {
        alert("Correct");
        pQuestionRight += 1;
        gScene5_2();
    } else {
        alert("Incorrect");
    }
}

var pQuestionRight = 0;

function gScene1_2() {
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'generator()'>Give me the question</button>";
    one = true;

    update();
}

function gScene2_2() {
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene3_2()'>Give me the next question</button>";
    two = true;

    update();
}

function gScene3_2() {
    var pQuestion2 = prompt("What is 10^2?");
    if (pQuestion2 === "100") {
        pQuestionRight += 1;
    }

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene4_2()'>Give me the next question</button>";

    update();
}

function gScene4_2() {
    var pQuestion3 = prompt("What is 92*3?");
    if (pQuestion3 === "276") {
        pQuestionRight += 1;
    }

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene5_2()'>Give me the next question</button>";

    update();
}

function gScene5_2() {
    var pQuestion4 = prompt("What is 38*7?");
    if (pQuestion4 === "266") {
        pQuestionRight += 1;
    }

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene6_2()'>See my result</button>";

    update();
}

function gScene6_2() {
    if (pQuestionRight == 0) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 0 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene46()'>Next</button>";

        update();
    } else if (pQuestionRight == 1) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 1 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene44()'>Next</button>";

        update();
    } else if (pQuestionRight == 2) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 2 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene43()'>Next</button>";

        update();
    } else if (pQuestionRight == 3) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 3 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene42()'>Next</button>";

        update();
    } else if (pQuestionRight == 4) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 4 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene41()'>Next</button>";

        update();
    }
}

//Youtuber Game 3
var correct2 = 0;

function gScene1_3() {
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Type in the correct answer.";
    buttonContainer.innerHTML = "<button onclick = 'gScene2_3()'>Next</button>";

    update();
}

function gScene2_3() {
    var pQ1 = prompt("Who made this game?");
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene3_3()'>Give me the next question</button>";

    if ((pQ1 == "Brian") || (pQ1 == "brian")) {
        correct2 += 1;
    }

    update();
}

function gScene3_3() {
    var pQ2 = prompt("Is 1 a whole number? Answer with yes or no.");
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene4_3()'>Give me the next question</button>";

    if ((pQ2 == "Yes") || (pQ2 == "yes")) {
        correct2 += 1;
    }

    update();
}

function gScene4_3() {
    var pQ3 = prompt("If you multiply this number with another number, you always get 0. What is the number?");
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene5_3()'>Give me the next question</button>";

    if (pQ3 == 0) {
        correct2 += 1;
    }

    update();
}

function gScene5_3() {
    var pQ4 = prompt("Apple or Samsung. Answer with A or S.");
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene6_3()'>View result</button>";

    if ((pQ4 == "s") || (pQ4 == "S") || (pQ4 == "a") || (pQ4 == "A")) {
        correct2 += 1;
    }

    update();
}

function gScene6_3() {


    if (correct2 == 0) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 0 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene46()'>Next</button>";

        update();
    } else if (correct2 == 1) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 1 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene44()'>Next</button>";

        update();
    } else if (correct2 == 2) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 2 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene43()'>Next</button>";

        update();
    } else if (correct2 == 3) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 3 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene42()'>Next</button>";

        update();
    } else if (correct2 == 4) {
        gameContainer.style.backgroundColor = "green";
        storyText.innerHTML = "You got 4 out of 4 right. Click next to move on.";
        buttonContainer.innerHTML = "<button onclick = 'reScene41()'>Next</button>";

        update();
    }
}
