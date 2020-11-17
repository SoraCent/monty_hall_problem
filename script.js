var my_door = 0;
var second_choose = 0;
var moderator_choose = 0;
var zahlen_liste = ["1", "2", "3"];
var preis_liste = ["auto", "ziege", "ziege"];
var moderator_span = $('#game_moderator');

var door1 = $('#door1');
var door1_img = $('#door1_img');
var door2 = $('#door2');
var door2_img = $('#door2_img');
var door3 = $('#door3');
var door3_img = $('#door3_img');

var tada_sound = new Audio('resourcen/tada.mp3');
var fail_sound = new Audio('resourcen/fail.mp3');

// Language

var en_us = {
    game_moderator_default: "Choose a Door!",
    game_moderator_choosing: "The Moderator is choosing",
    game_moderator_second: "Keep or Switch?",
    game_moderator_won: "You Won!",
    game_moderator_fail: "You lost!",
    new_game_button: "New try?",

    settings_title: "Settings",
    settings_language_title: "Language: "
}

var de_de = {
    game_moderator_default: "Wähle eine Tür!",
    game_moderator_choosing: "Der Moderator Wählt jetzt",
    game_moderator_second: "Behalten oder Wechseln?",
    game_moderator_won: "Du hast Gewonnen!",
    game_moderator_fail: "Du hast Verloren!",
    new_game_button: "Neuer Versuch?",

    settings_title: "Einstellungen",
    settings_language_title: "Sprache: "
}

var lang;
var setLang = {
    value: ""
}

if(localStorage["montyhall.lang"]) {
  setLang.value = localStorage["montyhall.lang"];
  $('#settings_language_select').val(setLang.value);
  ChangeLang(setLang);
} else {
  localStorage["montyhall.lang"] = "English";
  setLang.value = "English";
  $('#settings_language_select').val(setLang.value);
  ChangeLang(setLang);
}

function ChangeLang(language) {
  if(language.value == "English") {
    lang = en_us;
    localStorage["montyhall.lang"] = language.value;
    ChangeLanguage();
  } else if (language.value == "German") {
    lang = de_de;
    localStorage["montyhall.lang"] = language.value;
    ChangeLanguage();
  }
}

function ChangeLanguage() {
  $('#game_moderator').html(lang.game_moderator_default);
  $("#new_game_button").html(lang.new_game_button);
  $("#settings_title").html(lang.settings_title);
  $("#settings_language_title").html(lang.settings_language_title);
}

function moderator() {
    shuffle(preis_liste);
    if (my_door == 1 || my_door == 2 || my_door == 3) {
        my_door = my_door - 1;
        while (true) {
            moderator_choose = Math.floor(Math.random() * 3);
            if (preis_liste[moderator_choose] != "auto" && moderator_choose != my_door) {
                moderator_span.text(lang.game_moderator_second);

                door1.attr("onclick", "Zweite_Wahl_Eins()");
                door2.attr("onclick", "Zweite_Wahl_Zwei()");
                door3.attr("onclick", "Zweite_Wahl_Drei()");

                if (moderator_choose == 0) {
                    door1.prop("onclick", null).off("click");
                    door1_img.attr("src", "resourcen/goat.jpg");
                    door2.attr("onclick", "Zweite_Wahl_Zwei()");
                    door3.attr("onclick", "Zweite_Wahl_Drei()");
                    break;
                }
                else if(moderator_choose == 1) {
                    door1.attr("onclick", "Zweite_Wahl_Eins()");
                    door2.prop("onclick", null).off("click");
                    door2_img.attr("src", "resourcen/goat.jpg");
                    door3.attr("onclick", "Zweite_Wahl_Drei()");
                    break;
                } else if(moderator_choose == 2) {
                    door1.attr("onclick", "Zweite_Wahl_Eins()");
                    door2.attr("onclick", "Zweite_Wahl_Zwei()");
                    door3.prop("onclick", null).off("click");
                    door3_img.attr("src", "resourcen/goat.jpg");
                    break;
                } else {

                }
            }

        }
    }
}

function Letzte_Runde() {
    if (preis_liste[second_choose] == "auto") {
        moderator_span.text(lang.game_moderator_won);
        tada_sound.play();
        if(second_choose != moderator_choose && zahlen_liste[second_choose] != "1" && zahlen_liste[moderator_choose] != "1") {
          door1.attr("onclick", "Neuer_Versuch()");
          door1_img.attr("src", "resourcen/goat.jpg");
        } else if(second_choose != moderator_choose && zahlen_liste[second_choose] != "2" && zahlen_liste[moderator_choose] != "2") {
          door2.attr("onclick", "Neuer_Versuch()");
          door2_img.attr("src", "resourcen/goat.jpg");
        } else if(second_choose != moderator_choose && zahlen_liste[second_choose] != "3" && zahlen_liste[moderator_choose] != "3") {
          door3.attr("onclick", "Neuer_Versuch()");
          door3_img.attr("src", "resourcen/goat.jpg");
        }
        if(second_choose == 0) {
          door1.attr("onclick", "Neuer_Versuch()");
          door1_img.attr("src", "resourcen/car.jpg");
          door2.attr("onclick", "Neuer_Versuch()");
          door3.attr("onclick", "Neuer_Versuch()");
        } else if(second_choose == 1) {
          door1.attr("onclick", "Neuer_Versuch()");
          door2.attr("onclick", "Neuer_Versuch()");
          door2_img.attr("src", "resourcen/car.jpg");
          door3.attr("onclick", "Neuer_Versuch()");
        } else if(second_choose == 2) {
          door1.attr("onclick", "Neuer_Versuch()");
          door2.attr("onclick", "Neuer_Versuch()");
          door3.attr("onclick", "Neuer_Versuch()");
          door3_img.attr("src", "resourcen/car.jpg");
        }
    }
    else if (preis_liste[second_choose] == "ziege") {
        moderator_span.text(lang.game_moderator_fail);
        fail_sound.play();
        if(second_choose != moderator_choose && preis_liste[second_choose] != "auto" && zahlen_liste[second_choose] != "1" && zahlen_liste[moderator_choose] != "1") {
          door1.attr("onclick", "Neuer_Versuch()");
          door1_img.attr("src", "resourcen/car.jpg");
        } else if(second_choose != moderator_choose && preis_liste[second_choose] != "auto" && zahlen_liste[second_choose] != "2" && zahlen_liste[moderator_choose] != "2") {
          door2.attr("onclick", "Neuer_Versuch()");
          door2_img.attr("src", "resourcen/car.jpg");
        } else if(second_choose != moderator_choose && preis_liste[second_choose] != "auto" && zahlen_liste[second_choose] != "3" && zahlen_liste[moderator_choose] != "3") {
          door3.attr("onclick", "Neuer_Versuch()");
          door3_img.attr("src", "resourcen/car.jpg");
        }
        if(second_choose == 0) {
          door1.attr("onclick", "Neuer_Versuch()");
          door1_img.attr("src", "resourcen/goat.jpg");
          door2.attr("onclick", "Neuer_Versuch()");
          door3.attr("onclick", "Neuer_Versuch()");
        } else if(second_choose == 1) {
          door1.attr("onclick", "Neuer_Versuch()");
          door2.attr("onclick", "Neuer_Versuch()");
          door2_img.attr("src", "resourcen/goat.jpg");
          door3.attr("onclick", "Neuer_Versuch()");
        } else if(second_choose == 2) {
          door1.attr("onclick", "Neuer_Versuch()");
          door2.attr("onclick", "Neuer_Versuch()");
          door3.attr("onclick", "Neuer_Versuch()");
          door3_img.attr("src", "resourcen/goat.jpg");
        }
    }
}

function Neuer_Versuch() {
    my_door = 0;
    second_choose = 0;
    moderator_span.text(lang.game_moderator_default);
    door1.attr("onclick", "Wahl_Eins()");
    door1_img.attr("src", "resourcen/door1.png");
    door2.attr("onclick", "Wahl_Zwei()");
    door2_img.attr("src", "resourcen/door2.png");
    door3.attr("onclick", "Wahl_Drei()");
    door3_img.attr("src", "resourcen/door3.png");
}

function Wahl_Eins() {
    moderator_span.text(lang.game_moderator_choosing);
    my_door = 0;
    my_door = my_door + 1;
    door1.prop("onclick", null).off("click");
    moderator();
}

function Wahl_Zwei() {
    moderator_span.text(lang.game_moderator_choosing);
    my_door = 0;
    my_door = my_door + 2;
    door2.prop("onclick", null).off("click");
    moderator();
}

function Wahl_Drei() {
    moderator_span.text(lang.game_moderator_choosing);
    my_door = 0;
    my_door = my_door + 3;
    door3.prop("onclick", null).off("click");
    moderator();
}

function Zweite_Wahl_Eins() {
    second_choose = 0;
    Letzte_Runde();
}

function Zweite_Wahl_Zwei() {
    second_choose = 1;
    Letzte_Runde();
}

function Zweite_Wahl_Drei() {
    second_choose = 2;
    Letzte_Runde();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}
