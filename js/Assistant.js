'use strict';

function Assistant()
{
    this.guest = guest = new Guest();
    this.brain = brain = new Brain(this);
    this.consoul = consoul = new Consoul(this);
    this.name = 'david@DAVIDWLIANG';
    this.prompt = this.name + ': ';
    this.suggestionIndex = 0;
    this.suggestionDelay = 5000;
    this.recentSuggestionTime = Date.now();
    this.timeout = this.suggestionInterval();
    this.printed = 0;
    this.welcomeDelay = 500;
    this.interval = setInterval(this.suggestionInterval.bind(this), this.suggestionDelay);
}

Assistant.prototype.respond = function (query)
{
    query = query.toLowerCase();
    query = query.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    query = query.replace(new RegExp("nbsp", 'g'), " ").trim();
    console.log(query);
    this.printed = 0;
    consoul.timeoutIndex = 0;
    this.recentSuggestionTime = Date.now();
    if (this.comment) {
        this.comment = false;
        return this.randomComment();
    }

    switch (query) {
        case 'home':
            return this.home();
        case 'resume':
            return this.showResume();
        case 'clc':
        case 'clear':
            return consoul.clear(true);
        case 'hi':
        case 'hey':
        case 'yo':
        case 'hello':
        case 'heyo':
            return this.hello();
        case 'how are you':
            return this.howAreYou();
        case 'who are you':
        case 'about':
            return this.about();
        case 'exit':
        case 'quit':
        case 'bye':
            return this.quit();
        case 'info':
        case 'information':
        case 'social':
        case 'social information':
            return this.social();
        case 'project':
        case 'projects':
            return this.projects();
        case 'email':
            return this.email();
        case 'github':
            return this.github();
        case 'linkedin':
            return this.linkedIn();
        case 'tetris':
            return this.tetris();
        case 'help':
            return this.help();
        case 'cats':
            return this.cats();
        case 'hackertype':
            return this.hackerType();
        case 'cubing':
            return this.cubing();
        case 'riddles':
        case 'jokes':
            return this.notYet();
        default:
            return this.defaultResponse();
    }
};

Assistant.prototype.welcome = function ()
{
    consoul.welcome();
    consoul.timeout(this.suggest.bind(this));
    consoul.timeout(consoul.promptGuest.bind(consoul));
};

Assistant.prototype.suggestionInterval = function ()
{
    if (consoul.over || this.printed >= brain.suggestions.length) {
        return;
    } else if (Date.now() - consoul.recentInputTime > this.suggestionDelay && Date.now() - this.recentSuggestionTime > this.suggestionDelay) {
        this.suggest();
        this.recentSuggestionTime = Date.now();
    }
};

Assistant.prototype.suggest = function ()
{
    var text = consoleRoot[0].innerHTML;
    var index = text.lastIndexOf("guest@DAVIDWLIANG:");
    var imgIndex = text.lastIndexOf("<img");
    if (imgIndex > index) {
        text = text.slice(0, imgIndex);
    }
    var slice = text.slice(index + guest.prompt.length - 1);
    if (slice !== " ") {
        this.printed = 0;
        return;
    }
    this.printed++;
    consoleRoot[0].innerHTML = text.slice(0, index);
    this.suggestion = brain.suggestions[this.suggestionIndex++];
    this.suggestionIndex %= brain.suggestions.length;
    this.pln(this.suggestion);
    consoul.promptGuest();
    return true;
};

Assistant.prototype.pln = function (str)
{
    consoul.pln("<span class=\"green\">" + this.prompt + str + "</span>");
};

Assistant.prototype.randomComment = function ()
{
    this.pln(brain.randomComments[Math.floor(Math.random() * brain.randomComments.length)]);
    return true;
};

Assistant.prototype.cats = function ()
{
    consoul.clear(true);
    cats.html('<iframe id="cats" width="560" height="315" src="https://www.youtube.com/embed/0Bmhjf0rKe8" frameborder="0" allowfullscreen></iframe>');
    cats.show();
    this.pln('I\'ve found some cats for you to watch. Type \'clear\' to hide the video.');
    return true;
};

Assistant.prototype.cubing = function ()
{
    consoul.clear(true);
    cubing.html('<iframe width="560" height="315" src="https://www.youtube.com/embed/XFvndxnZxFk" frameborder="0" allowfullscreen></iframe>');
    cubing.show();
    this.pln("Here's a video of me doing an average of twelve. Hope I pique your interest in cubing!");
    this.pln("You can type 'clear' to hide the video when you're done.");
    return true;
};

Assistant.prototype.notYet = function ()
{
    this.pln('Sorry, I haven\'t actually learned this skill yet. Try again soon!');
    return true;
};

Assistant.prototype.hello = function ()
{
    this.pln(brain.hellos[Math.floor(Math.random() * brain.hellos.length)]);
    return true;
};

Assistant.prototype.howAreYou = function ()
{
    this.pln("I\'m as well as a non-living being can be! And yourself?");
    this.comment = true;
    return true;
};

Assistant.prototype.about = function ()
{
    this.pln("Here are some basic facts about me!");
    for (var i = 0; i < this.info.length; i++) {
        this.pln(brain.info[i]);
    }
    this.pln("How about yourself?");
    this.comment = true;
    return true;
};

Assistant.prototype.quit = function ()
{
    this.pln("See you sooon!");
    return false;
};

Assistant.prototype.home = function ()
{
    this.redirectHome = true;
    return false;
};

Assistant.prototype.social = function ()
{
    this.pln("Here's my information! " + brain.socialDivs);
    return true;
};

Assistant.prototype.projects = function ()
{
    this.pln("Here are the projects that I've done!");
    for (var i = 0; i < brain.projectDivs.length; i++) {
        this.pln(brain.projectDivs[i]);
    }
    this.pln("Thanks for taking the time to check them out!");
    return true;
};

Assistant.prototype.showResume = function ()
{
    this.pln('Here\'s the link to my ' + brain.resumeDiv.toLowerCase() + '!');
    return true;
};

Assistant.prototype.email = function ()
{
    this.pln("Here's my " + brain.emailDiv.toLowerCase() + "! ");
    return true;
};


Assistant.prototype.github = function ()
{
    this.pln('Here\'s my ' + brain.githubDiv.toLowerCase() + '!');
    return true;
};

Assistant.prototype.linkedIn = function ()
{
    this.pln('Here\s my ' + brain.linkedinDiv + '! Feel free to connect with me!');
    return true;
};

Assistant.prototype.tetris = function ()
{
    setTimeout(function ()
    {
        consoul.clear(true);
        tetris.html(brain.tetrisDiv);
        GM = new GameManager(false);
        GameManager.setup(GM);
        playbutton.click();
        tetris.show();
        this.pln('Have fun! Type \'clear\' to hide the game.');
        consoul.promptGuest();
    }.bind(this), 1000);
    this.printed = brain.suggestions.length;
    return true;
};

Assistant.prototype.help = function ()
{
    this.pln("Let me give you some suggestions.");
    this.printed = brain.suggestions.length;
    for (var i = 0; i < brain.suggestions.length; i++) {
        this.pln(brain.suggestions[i]);
    }
    this.pln("Hope that was helpful!");
    return true;
};

Assistant.prototype.defaultResponse = function ()
{
    this.pln('I\'m sorry, I didn\'t understand that. Please try again.');
    this.suggestNow = true;
    return true;
};