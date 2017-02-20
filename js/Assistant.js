function Assistant(console) {
      this.guest = guest = new Guest();
      this.brain = brain = new Brain(this);
      this.console = console = new Console(this);
      this.name = 'david@DAVIDWLIANG';
      this.prompt = this.name + ': ';
      this.suggestionIndex = 0;
      this.suggestionDelay = 5000;
      this.recentSuggestionTime = Date.now();
      this.timeout = this.loopSuggestion();
      this.printed = 0;
      this.welcomeDelay = 250;
}

Assistant.prototype.respond = function (query) {
      if (this.showingTetris) {
            this.showingTetris = false;
            this.clear(false);
      }
      query = query.toLowerCase();
      query = query.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      query = query.replace(new RegExp("nbsp", 'g'), " ").trim();
      console.log(query);
      this.printed = 0;
      this.recentSuggestionTime = Date.now();
      if (!this.timeout) {
            this.timeout = this.loopSuggestion();
      }
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
                  return this.clear(true);
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
                  return this.showCats();
            case 'riddles':
            case 'jokes':
                  return this.notYet();
            default:
                  return this.defaultResponse();
      }
};

Assistant.prototype.welcome = function () {
      this.pln('Welcome! I\'m David Liang and I\'ll be helping you get to know me!');
};

Assistant.prototype.loopSuggestion = function () {
      if (this.console.over || this.printed >= this.brain.suggestions.length) {
            clearTimeout(this.timeout);
            this.timeout = null;
            return;
      } else if (Date.now() - this.console.recentInputTime > this.suggestionDelay && Date.now() - this.brain.recentSuggestionTime > this.suggestionDelay) {
            this.suggest();
            this.recentSuggestionTime = Date.now();
      }
      this.timeout = setTimeout(function () {
            this.loopSuggestion();
      }.bind(this), this.suggestionDelay);
};

Assistant.prototype.suggest = function () {
      var text = $("#root")[0].innerHTML;
      var index = text.lastIndexOf("guest@DAVIDWLIANG:");
      var imgIndex = text.lastIndexOf("<img");
      if (imgIndex > index) {
            text = text.slice(0, imgIndex);
      }
      if (text.slice(index + this.console.guest.prompt.length - 1) !== " ") {
            this.printed = 0;
            return;
      }
      this.printed++;
      this.suggestNow = false;
      $("#root")[0].innerHTML = text.slice(0, index);
      this.suggestion = this.brain.suggestions[this.suggestionIndex++];
      this.suggestionIndex %= this.brain.suggestions.length;
      this.pln(this.suggestion);
      this.console.promptGuest();
};

Assistant.prototype.pln = function (str) {
      this.console.pln("<span class=\"green\">" + this.prompt + str + "</span>");
};

Assistant.prototype.randomComment = function () {
      this.pln(this.brain.randomComments[Math.floor(Math.random() * this.brain.randomComments.length)]);
};

Assistant.prototype.showCats = function () {
      $("#root").empty();
      $("#cats").show();
      this.pln('I\'ve found some cats for you to watch. Type \'clear\' to hide the video.');
      return true;
};

Assistant.prototype.clear = function (suggest) {
      this.response = 'clear';
      $("#tetris").hide();
      var url = $('#cats').attr('src');
      $('#cats').attr('src', '');
      $('#cats').attr('src', url);
      $("#cats").hide();
      $("#root").empty();
      this.showingTetris = false;
      GM.stopped = true;
      if (suggest) {
            this.printed++;
            this.pln(this.brain.suggestions[this.suggestionIndex]);
      }
      return true;
};

Assistant.prototype.notYet = function () {
      this.pln('Sorry, I haven\'t actually learned this skill yet. Try again soon!');
      return true;
};

Assistant.prototype.hello = function () {
      this.pln(this.brain.hellos[Math.floor(Math.random() * this.brain.hellos.length)]);
      return true;
};

Assistant.prototype.howAreYou = function () {
      this.pln("I\'m as well as a non-living being can be! And yourself?");
      this.comment = true;
      return true;
};

Assistant.prototype.about = function () {
      this.pln("Here are some basic facts about me!");
      for (var i = 0; i < this.info.length; i++) {
            this.pln(this.brain.info[i]);
      }
      this.pln("How about yourself?");
      this.comment = true;
      return true;
};

Assistant.prototype.quit = function () {
      this.pln("See you sooon!");
      return false;
};

Assistant.prototype.home = function () {
      this.redirectHome = true;
      return false;
};

Assistant.prototype.social = function () {
      this.pln("Here's my information! " + this.brain.socialDivs);
      return true;
};

Assistant.prototype.projects = function () {
      this.pln("Here are the projects that I've done!");
      for (var i = 0; i < this.brain.projectDivs.length; i++) {
            this.pln(this.brain.projectDivs[i]);
      }
      this.pln("Thanks for taking the time to check them out!");
      return true;
};

Assistant.prototype.showResume = function () {
      this.pln('Here\'s the link to my ' + this.brain.resumeDiv.toLowerCase() + '!');
      return true;
};

Assistant.prototype.email = function () {
      this.pln("Here's my " + this.brain.emailDiv.toLowerCase() + "! ");
      return true;
};


Assistant.prototype.github = function () {
      this.pln('Here\'s my ' + this.brain.githubDiv.toLowerCase() + '!');
      return true;
};

Assistant.prototype.linkedIn = function () {
      this.pln('Here\s my ' + this.brain.linkedinDiv + '! Feel free to connect with me!');
      return true;
};

Assistant.prototype.tetris = function () {
      this.showingTetris = true;
      $("#root").empty();
      $("#tetris").show();
      GameManager.setup(GM);
      $("#play-button").click();
      this.printed = this.brain.suggestions.length;
      this.pln('Have fun! Type \'clear\' to hide the game.');
      return true;
};

Assistant.prototype.help = function () {
      this.pln("Let me give you some suggestions.");
      this.printed = this.brain.suggestions.length;
      for (var i = 0; i < this.brain.suggestions.length; i++) {
            this.pln(this.brain.suggestions[i]);
      }
      this.pln("Hope that was helpful!");
      return true;
};

Assistant.prototype.defaultResponse = function () {
      this.pln('I\'m sorry, I didn\'t understand that. Please try again.');
      this.suggestNow = true;
      return true;
};