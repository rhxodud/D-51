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
        sane.play();
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
    
    dayJava.innerHTML = "Day: " + day + " / ";
    foodJava.innerHTML = "Food: " + food + " / ";
    sanityJava.innerHTML = "Sanity: " + sanity + " / ";
    ycoinsJava.innerHTML = "YCOINS: " + ycoins + " / ";
    jobJava.innerHTML = "Job: " + job;
    
    if (ask == true) {
        if ((food < 3)) {
            alert("You have 2 or less food left until game over. You can buy some food after this message. If you don't want to buy, type in 0 or click cancel. If you never want to see this message again, type in 123456789.");
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
            var num10P = Math.floor(Math.random()*num10A.length);
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
}

function scene1() {
    ycoins += 100000;

    storyText.innerHTML = "In this game, YCOINS is the currency. While playing this game, be sure to keep your food in stock, stay sane, and avoid sickness. If your food stock is under 0, game over. Sanity less than 20, game over.";
    buttonContainer.innerHTML = "<button onclick = 'scene2()'>Next</button>";
    gameContainer.style.backgroundImage = "url('/img/781f9c15-7143-4fa2-b246-3ed601f83fc0/YCOINS_1.4.png')";
}

function scene2() {
    storyText.innerHTML = "You are living in an advanced society where a virus called CORVARA-94 is found just a few days earlier. The government says that they will develop a vaccine 50 days from now. Your goal from now is to survive the 50 days and reach day 51.";
    buttonContainer.innerHTML = "<button onclick = 'scene3()'>Start Pre-game Activities</button>";
    gameContainer.style.backgroundImage = "url('https://cdn.cfr.org/sites/default/files/image/2019/03/AirPollutionHP_0.jpg')";
}

function scene3() {
    storyText.innerHTML = "You have a chance to get some food. You will get food if you get a question right.";
    buttonContainer.innerHTML = "<button onclick = 'scene4()'>Okay</button>";
    gameContainer.style.backgroundImage = "url('https://www.pngkit.com/png/detail/395-3951350_healthy-food-clipart-healthy-lunch-lunchclip-art-free.png')";
}

function scene4() {
    gameContainer.style.backgroundImage = "url('https://i0.wp.com/calmatters.org/wp-content/uploads/2021/08/math-curriculum.jpg?fit=1200%2C900&ssl=1')";
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
    gameContainer.style.backgroundImage = "url('https://media.sketchfab.com/models/65ca65a7f4904c69816de1299a890bf1/thumbnails/ce01be52bf624ade828c4316bc78eb25/9188d62974b04a76891d161bd8de0d9c.jpeg')";
}

function scene8() {
    bunker = true;
    storyText.innerHTML = "Bunker mode activated. Less food will be used every 10 days, but some of your abilities in the game will be limited. ";
    buttonContainer.innerHTML = "<button onclick = 'scene10()'>Start Game</button>";
    gameContainer.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/88/Start_%28%D0%BA%D0%B8%D0%BD%D0%BE%D1%82%D0%B5%D0%B0%D1%82%D1%80%29.jpg')";
}

function scene9() {
    bunker = false;
    storyText.innerHTML = "Bunker mode unactivated.";
    buttonContainer.innerHTML = "<button onclick = 'scene10()'>Start Game</button>";
    gameContainer.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/8/88/Start_%28%D0%BA%D0%B8%D0%BD%D0%BE%D1%82%D0%B5%D0%B0%D1%82%D1%80%29.jpg')";
}

function scene10() {
    S12 = true;
    storyText.innerHTML = "Day 1";
    buttonContainer.innerHTML = "<button onclick = 'reScene1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/1200px-Black_colour.jpg')";

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
    gameContainer.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/1200px-Black_colour.jpg')";

    if (bunker == true) {
        dailyBunker();
        update();
    } else {
        daily();
        update();
    }
}

function scene13() {
    storyText.innerHTML = "What job will you choose? Look at the background image to find out more about each job. Click <a href = '/img/781f9c15-7143-4fa2-b246-3ed601f83fc0/job.png' target = 'blank_'>HERE</a> for enlarged full image.";
    buttonContainer.innerHTML = "<button onclick = 'scene14()'>Artisit</button><button onclick = 'scene15()'>Scientist</button><button onclick = 'scene16()'>Architect</button><button onclick = 'scene17()'>Youtuber</button><button onclick = 'scene18()'>Doctor</button>";
    gameContainer.style.backgroundImage = "url('/img/781f9c15-7143-4fa2-b246-3ed601f83fc0/job.png')";

    update();
}

function scene14() {
    job = "Artist";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are an artist now. You will give inspiration to others by drawing.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";

    update();
}

function scene15() {
    job = "Scientist";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are a scientist now. You will be able to develop an one time use vaccine.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";

    update();
}

function scene16() {
    job = "Architect";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are an architect now. You will design shelters for people to live in.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";

    update();
}

function scene17() {
    job = "Youtuber";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are a youtuber now. You will make videos that will entertain others.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";

    update();
}

function scene18() {
    job = "Doctor";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are a doctor now. You will help patients.";
    buttonContainer.innerHTML = "<button onclick = 'scene19()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/3952/3952988.png')";

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
    gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";

    update();
}https://cdn-icons.flaticon.com/png/512/2355/premium/2355692.png?token=exp=1636420228~hmac=c69217e03b1ce807c3bb0075fc2a7c0d

function scene21() {
    storyText.innerHTML = "You have not activated your bunker mode. There is no limit to how much patients you can help.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";

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
    gameContainer.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/1200px-Black_colour.jpg')";

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
    gameContainer.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/1200px-Black_colour.jpg')";

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
    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/489/489399.png')";

    update();
}

function scene27() {
    sanity += 50;
    sanityJava.innerHTML = "Sanity: " + sanity + " / ";
    ycoins -= 100000;
    ycoinsJava.innerHTML = "YCOINS: " + ycoins + " / ";
    food -= 2;
    
    storyText.innerHTML = "You got a pet. You used 100,000 money and 2 food but got 50 sanity. ";
    buttonContainer.innerHTML = "<button onclick = 'scene24()'>Work</button>";
    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/2447/premium/2447831.png?token=exp=1636420367~hmac=46f9472d6b5f070fd710744421754e1c')";

    update();
}

function scene28() {
    storyText.innerHTML = "You decided to not get a pet. ";
    buttonContainer.innerHTML = "<button onclick = 'scene24()'>Work</button>";
    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/2447/premium/2447825.png?token=exp=1636420370~hmac=f8d55632294e42347914088a9f516781')";

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
    gameContainer.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/1200px-Black_colour.jpg')";

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
    gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";

    update();
}

function scene33() {
    storyText.innerHTML = "Day 51";
    buttonContainer.innerHTML = "<button onclick = 'scene34()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Black_colour.jpg/1200px-Black_colour.jpg')";

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
    gameContainer.style.backgroundImage = "url('https://static.toiimg.com/photo/msid-82704156,width-96,height-65.cms')";

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
    storyText.innerHTML = "You helped " + helped + " people! The government is honoring you!";
    buttonContainer.innerHTML = "<button onclick = 'scene38()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://images04.military.com/sites/default/files/undertheradar-thumbnails/2017/07/seagalsalute-copy.jpg')";
}

function scene37() {
    storyText.innerHTML = "You didn't help others! When you are sick, no one will help you... You have to suffer alone.";
    buttonContainer.innerHTML = "<button onclick = 'scene39()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://henrycenter.tiu.edu/wp-content/uploads/2015/03/suffering.jpg')";
}

function scene38() {
    storyText.innerHTML = "The End: Helping and Serving is a great way to honor God!";
    buttonContainer.innerHTML = "<button onclick = 'scene40()'>Save YCOINS Data</button>";
    gameContainer.style.backgroundImage = "url('https://images.squarespace-cdn.com/content/v1/5cb10202e666694a738b4953/1600693598211-9V69W69AK37GA77V56SU/ARTICLE-7ThingsServeJesus-featured.jpg')";
}

function scene39() {
    storyText.innerHTML = "The End: How about halping and servering others? Wouldn't that be amazing?";
    buttonContainer.innerHTML = "<button onclick = 'location.reload()'>Restart Game</button><button onclick = 'scene40()'>Save YCOINS Data</button>";
    gameContainer.style.backgroundImage = "url('https://images.squarespace-cdn.com/content/v1/5cb10202e666694a738b4953/1600693598211-9V69W69AK37GA77V56SU/ARTICLE-7ThingsServeJesus-featured.jpg')";
}

function scene40() {
    saving();
}

//repeating scene 1
var helpTime = 0;

function reScene1() {
    storyText.innerHTML = "Will you buy food? Y50000 (50000 ycoins) per food. Reminder: If you have less than 0 food, then it is game over. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene3()'>Will Not Buy</button><button onclick = 'reScene2()'>Will Buy</button>";
    gameContainer.style.backgroundImage = "url('https://www.pngkit.com/png/detail/395-3951350_healthy-food-clipart-healthy-lunch-lunchclip-art-free.png')";

    update();
}

function reScene2() {
    sanity += 10;
    
    storyText.innerHTML = "Purchased";
    buttonContainer.innerHTML = "<button onclick = 'reScene4()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/1950/premium/1950375.png?token=exp=1636421115~hmac=73000b31feb528c83d3545132f2463a0')";

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
    gameContainer.style.backgroundImage = "url('https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/10482/images/zXrj9GBhQiScTfKgpuWf_hand-792920_1920.jpg')";

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
    gameContainer.style.backgroundImage = "url('https://www.success.com/wp-content/uploads/2016/02/holdontight.jpg')";

    update();
}

function reScene6() {
    helped += 1;
    helpTime += 1;
    food -= 2;
    sanity += 50;
    ycoins += 100000;

    storyText.innerHTML = "The person you helped has a virus!";
    gameContainer.style.backgroundImage = "url('https://d2sslp958cft0.cloudfront.net/wp-content/uploads/2019/01/19152534/Why-Some-Don%E2%80%99t-Ask-for-Help-%E2%80%93-Depression-Taboos.png')";

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
    ycoins += 250000;

    storyText.innerHTML = "The person doesn't have the virus! You helped others! You lost 2 foods, got 50 sanity, and 250000 YCOINS. ";
    buttonContainer.innerHTML = "<button onclick = 'redirect1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://d2sslp958cft0.cloudfront.net/wp-content/uploads/2019/01/19152534/Why-Some-Don%E2%80%99t-Ask-for-Help-%E2%80%93-Depression-Taboos.png')";

    update();
}

function reScene8() {
    storyText.innerHTML = "Fortunately, you are vaccinated. You overcame the virus.";
    buttonContainer.innerHTML = "<button onclick = 'redirect1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://d2sslp958cft0.cloudfront.net/wp-content/uploads/2019/01/19152534/Why-Some-Don%E2%80%99t-Ask-for-Help-%E2%80%93-Depression-Taboos.png')";

    update();
}

function reScene9() {
    storyText.innerHTML = "You got the virus!";
    gameContainer.style.backgroundImage = "url('https://www.paho.org/sites/default/files/styles/max_1500x1500/public/2021-07/covid-variants-1500px.jpg?itok=_xlhehT6')";

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
    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/2641/2641036.png')";

    update();
}

function reScene11() {
    storyText.innerHTML = "You are suffering from the virus.";
    gameContainer.style.backgroundImage = "url('https://media.swncdn.com/via/15513-istockgetty-images-plusspukkato.jpg')";
    
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
    gameContainer.style.backgroundImage = "url('https://images.everydayhealth.com/images/diet-nutrition/10-amazing-facts-about-your-immune-system-722x406.jpg?sfvrsn=bcad85f7_0')";

    update();
}

function reScene13() {
    storyText.innerHTML = "Game Over: Sorry! Try Again!";
    buttonContainer.innerHTML = "<button onclick = 'location.reload()'>Restart the game</button><button onclick = 'scene40()'>Save YCOINS Data</button>";
    gameContainer.style.backgroundImage = "url('https://media-cdn.tripadvisor.com/media/photo-s/17/08/d4/3e/game-over-escape-rooms.jpg')";

    update();
}

function reScene14() {
    sanity += 50;
    
    storyText.innerHTML = "You survived the virus!";
    buttonContainer.innerHTML = "<button onclick = 'redirect1()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";

    update();
}

function reScene15() {
    storyText.innerHTML = "Will you sacrifice yourself so that the virus can end?";
    buttonContainer.innerHTML = "<button onclick = 'reScene18()'>No. Sleep</button><button onclick = 'reScene16()'>Yes. I will</button>";
    gameContainer.style.backgroundImage = "url('https://t1.daumcdn.net/cfile/tistory/2568934554BC5A2D16')";

    update();
}

function reScene16() {
    helped += 1;
    storyText.innerHTML = "CORVARA-94 (the virus) stopped. Everyone is happy and delighted!";
    buttonContainer.innerHTML = "<button onclick = 'reScene17()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";

    update();
}

function reScene17() {
    storyText.innerHTML = "The End: Sacrificing for others is a great way of serving.";
    buttonContainer.innerHTML = "<button onclick = 'location.reload()'>Restart the game</button><button onclick = 'scene40()'>Save YCOINS Data</button>";
    gameContainer.style.backgroundImage = "url('https://miro.medium.com/max/1200/0*bD1Hk6RLKCpSFPWl')";

    update();
}

function reScene18() {
    storyText.innerHTML = "Nothing interesting happened.";
    buttonContainer.innerHTML = "<button onclick = 'redirect1()'>Next</button>";
    gameContainer.style.backgroundImage = "url('https://i.ytimg.com/vi/Fy5GODwNv_c/maxresdefault.jpg')";

    update();
}

function redirect1() {
    if (S12 == true) {
        gameContainer.style.backgroundImage = "url('https://sph.umich.edu/pursuit/2020posts/2020images/Sleep101.jpg')";
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

    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1983/1983164.png')";
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

    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/2941/2941556.png')";
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

    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/3270/premium/3270911.png?token=exp=1636420124~hmac=fef108f7ea9817dcd775fc9c0527d242')";
    storyText.innerHTML = "You are working as an architect. You have a 90/10 chance of designing a building and earning money. ";

    if (perArc <= 0.99) {
        buttonContainer.innerHTML = "<button onclick = 'reScene33()'>Work</button>";
    } else if (perArc <= 1) {
        buttonContainer.innerHTML = "<button onclick = 'reScene34()'>Work</button>";
    }

    update();
}

function reScene24() {
    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/4144/4144719.png')";
    storyText.innerHTML = "You are working as a youtuber. You are going to play a mini game and earn money. ";
    buttonContainer.innerHTML = "<button onclick = 'gameSelect()'>Work</button>";

    update();
}

function reScene25() {
    var perDoc = Math.random();
    console.log("percentageDoc = " + perDoc);

    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/3952/3952988.png')";
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
    
    gameContainer.style.backgroundImage = "url('https://m.media-amazon.com/images/I/71KaNz7a4JL._AC_SL1024_.jpg')";
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
    
    gameContainer.style.backgroundImage = "url('https://miro.medium.com/max/2500/1*LBZu7NiXUb4pq9-FRE9YBQ.jpeg')";
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
        gameContainer.style.backgroundColor = "red";
        storyText.innerHTML = "You can't help a patient due to bunker mode. ";
        buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

        update();
    } else if (patient == 3 && bunker == false) {
        ycoins += 200000;
        
        gameContainer.style.backgroundImage = "url('https://www.clinicaladvisor.com/wp-content/uploads/sites/11/2018/12/communicatingwithpatients_728084.png')";
        storyText.innerHTML = "You helped a patient. ";
        buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

        update();
    } else {
        ycoins += 200000;
        
        gameContainer.style.backgroundImage = "url('https://www.clinicaladvisor.com/wp-content/uploads/sites/11/2018/12/communicatingwithpatients_728084.png')";
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
    ycoins += 700000;
    
    gameContainer.style.backgroundImage = "url('https://cloudfront-us-east-2.images.arcpublishing.com/reuters/VEKSCTM4ERJNFDZX7ZKNEJZP2A.jpg')";
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
    gameContainer.style.backgroundImage = "url('https://image.cnbcfm.com/api/v1/image/106717234-16010338652020-09-25t020728z_2132933524_rc2e5j92ltke_rtrmadp_0_health-coronavirus-usa.jpeg?v=1606163474')";
    storyText.innerHTML = "You are vaccinated now. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene40() {
    helped += 1;
    
    gameContainer.style.backgroundImage = "url('https://image.cnbcfm.com/api/v1/image/106717234-16010338652020-09-25t020728z_2132933524_rc2e5j92ltke_rtrmadp_0_health-coronavirus-usa.jpeg?v=1606163474')";
    storyText.innerHTML = "Another person is vaccinated now. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene41() {
    ycoins += 500000;
    
    gameContainer.style.backgroundImage = "url('')";
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
    
    gameContainer.style.backgroundImage = "url('data:image/jpeg;base64,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')";
    storyText.innerHTML = "You made a video that entertained others! ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene46() {
    gameContainer.style.backgroundColor = "red";
    storyText.innerHTML = "You weren't able to make a video. ";
    buttonContainer.innerHTML = "<button onclick = 'reScene45()'>Next</button>";

    update();
}

function reScene45() {
    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/2829/premium/2829066.png?token=exp=1636421715~hmac=a44ce90d19eaf83c7e9554ebb2d4e2f9')";
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
    gameContainer.style.backgroundImage = "url('https://literacyideas.com/wp-content/uploads/2021/10/how_to_teach_punctuation-2.png')";
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
    var numPick = Math.floor(Math.random()*num.length);
    var int1 = Math.floor(Math.random()*num[numPick]);
    var int2 = Math.floor(Math.random()*num[numPick]);
    var whatSign = ["+", "-", "x"];
    var signPick = Math.floor(Math.random()*whatSign.length);
    
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
    } if (question == answer && two == true) {
        alert("Correct");
        pQuestionRight += 1;
        gScene3_2();
    } if (question == answer && three == true) {
        alert("Correct");
        pQuestionRight += 1;
        gScene4_2();
    } if (question == answer && four == true) {
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
    buttonContainer.innerHTML = "<button onclick = 'generator()'>Give me the next question</button>";
    two = true;

    update();
}

function gScene3_2() {
//     var pQuestion2 = prompt("What is 10^2?");
//     if (pQuestion2 === "100") {
//         pQuestionRight += 1;
//     }

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'generator()'>Give me the next question</button>";
    three = true;

    update();
}

function gScene4_2() {
//     var pQuestion3 = prompt("What is 92*3?");
//     if (pQuestion3 === "276") {
//         pQuestionRight += 1;
//     }

    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'generator()'>Give me the next question</button>";
    four = true;

    update();
}

function gScene5_2() {
//     var pQuestion4 = prompt("What is 38*7?");
//     if (pQuestion4 === "266") {
//         pQuestionRight += 1;
//     }

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
var one2 = false;
var two2 = false;
var three2 = false;
var four2 = false;

function generator() {
    var num2 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    var numPick2 = Math.floor(Math.random()*num.length);
    var int1_2 = Math.floor(Math.random()*num[numPick]);
    var int2_2 = Math.floor(Math.random()*num[numPick]);
    var whatSign2 = ["+", "-", "x"];
    var signPick2 = Math.floor(Math.random()*whatSign.length);
    
    if (whatSign[signPick] == "+") {
        var answer2 = int1 + int2;
    } else if (whatSign[signPick] == "-") {
        var answer2 = int1 - int2;
    } else if (whatSign[signPick] == "x") {
        var answer2 = int1 * int2;
    }

    console.log(int1, int2, whatSign[signPick]);
    var question2 = prompt(int1 + " " + whatSign[signPick] + " " + int2);
    
    if (question2 == answer && one2 == true) {
        alert("Correct");
        correct += 1;
        one2 = false;
        gScene2_3();
    } if (question2 == answer && two2 == true) {
        alert("Correct");
        correct += 1;
        two2 = false;
        gScene3_3();
    } if (question2 == answer && three2 == true) {
        alert("Correct");
        correct += 1;
        three2 = false;
        gScene4_3();
    } if (question2 == answer && four2 == true) {
        alert("Correct");
        correct += 1;
        four2 = false;
        gScene5_3();
    } else {
        alert("Incorrect");
    }
}

function gScene1_3() {
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Type in the correct answer.";
    buttonContainer.innerHTML = "<button onclick = 'generator2()'>Next</button>";
    one2 = true;

    update();
}

function gScene2_3() {
//     var pQ1 = prompt("Who made this game?");
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'generator2()'>Give me the next question</button>";
    two2 = true;

//     if ((pQ1 == "Brian") || (pQ1 == "brian")) {
//         correct2 += 1;
//     }

    update();
}

function gScene3_3() {
//     var pQ2 = prompt("Is 1 a whole number? Answer with yes or no.");
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene4_3()'>Give me the next question</button>";
    three2 = true;

//     if ((pQ2 == "Yes") || (pQ2 == "yes")) {
//         correct2 += 1;
//     }

    update();
}

function gScene4_3() {
//     var pQ3 = prompt("If you multiply this number with another number, you always get 0. What is the number?");
    gameContainer.style.backgroundColor = "green";
    storyText.innerHTML = "Answer correctly to the following prompts.";
    buttonContainer.innerHTML = "<button onclick = 'gScene6_3()'>View result</button>";
    four2 = true;

//     if (pQ3 == 0) {
//         correct2 += 1;
//     }

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
