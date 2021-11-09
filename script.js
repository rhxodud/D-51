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

var hunger = new Audio('462087__mar-u02144__hungry-stomach.wav');
var sane = new Audio('579818__mordecai666__old-man-scream.mp3');

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
    gameContainer.style.backgroundImage = "url('YCOINS_1.4.png')";
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
    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/1983/1983164.png')";

    update();
}

function scene15() {
    job = "Scientist";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are a scientist now. You will be able to develop an one time use vaccine.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/2941/2941556.png')";

    update();
}

function scene16() {
    job = "Architect";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are an architect now. You will design shelters for people to live in.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/3270/premium/3270911.png?token=exp=1636420124~hmac=fef108f7ea9817dcd775fc9c0527d242')";

    update();
}

function scene17() {
    job = "Youtuber";
    jobJava.innerHTML = "Job: " + job;
    storyText.innerHTML = "You are a youtuber now. You will make videos that will entertain others.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/4144/4144719.png')";

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
    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/2355/premium/2355692.png?token=exp=1636420228~hmac=c69217e03b1ce807c3bb0075fc2a7c0d')";

    update();
}https://cdn-icons.flaticon.com/png/512/2355/premium/2355692.png?token=exp=1636420228~hmac=c69217e03b1ce807c3bb0075fc2a7c0d

function scene21() {
    storyText.innerHTML = "You have not activated your bunker mode. There is no limit to how much patients you can help.";
    buttonContainer.innerHTML = "<button onclick = 'scene22()'>Sleep</button>";
    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/2355/premium/2355692.png?token=exp=1636420228~hmac=c69217e03b1ce807c3bb0075fc2a7c0d')";

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
    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/2829/premium/2829066.png?token=exp=1636420475~hmac=a11cee800d62ad9d09b17a134d15a61f')";

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
    storyText.innerHTML = "You helped" + helped + " people! The government is honoring you!";
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
    gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/1950/premium/1950269.png?token=exp=1636421118~hmac=547d853c95dd2722f715aee6aeee9c56')";

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
    gameContainer.style.backgroundImage = "url('data:image/jpeg;base64,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')";

    update();
}

function reScene15() {
    storyText.innerHTML = "Will you sacrifice yourself so that the virus can end?";
    buttonContainer.innerHTML = "<button onclick = 'reScene18()'>No. Sleep</button><button onclick = 'reScene16()'>Yes. I will</button>";
    gameContainer.style.backgroundImage = "url('data:image/jpeg;base64,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')";

    update();
}

function reScene16() {
    helped += 1;
    storyText.innerHTML = "CORVARA-94 (the virus) stopped. Everyone is happy and delighted!";
    buttonContainer.innerHTML = "<button onclick = 'reScene17()'>Next</button>";
    gameContainer.style.backgroundImage = "url('data:image/jpeg;base64,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')";

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
        gameContainer.style.backgroundImage = "url('https://cdn-icons.flaticon.com/png/512/2829/premium/2829066.png?token=exp=1636421715~hmac=a44ce90d19eaf83c7e9554ebb2d4e2f9')";
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
    ycoins += 1000000;
    
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
    buttonContainer.innerHTML = "<button onclick = 'gScene5_3()'>Give me the next question</button>";
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
