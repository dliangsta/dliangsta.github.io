function Assistant(console) {
      this.console = console;
      this.name = 'david@DAVIDWLIANG';
      this.prompt = this.name + ': ';
      this.resume = "https://drive.google.com/file/d/0B8RTzcv9knCuaXl2U1RzQlFmSFk/view";
      this.githubURL = "https://github.com/dliangsta";
      this.linkedinURL = "https://linkedin.com/in/dliangsta";
      this.signedIn = "You are now signed in to guest@DAVIDWLIANG";
      this.printed = 0;
      this.suggestions = [
            "Try typing 'help' 'tetris' or a bit of basic conversation!",
            "I understand 'github' 'linkedin' and 'resume'!",
            "How about typing 'clear' 'cats' or 'exit'?",
            "You can ask 'who are you?' 'about' or 'how are you?' if you'd like.",
            "You can visit my homepage by typing 'home' into the console.",
            "Type 'cats' 'hi' or bye' if you want."
      ];
      this.hellos = [
            "Hey there.",
            "Greetings.",
            "Hello."
      ];
      this.info = [
            "I'm a university student at University of Wisconsin-Madison!",
            "My majors are computer science and mathematics.",
            "I have an older brother and two older sisters!",
            "I'm originally from Milwaukee, Wisconsin.",
            "I really enjoy ultimate frisbee, rubiks cube speed-solving, and rock climbing!"
      ];
      this.randomComments = [
            "That's great!",
            "Awesome, very cool!",
            "That's really interesting!"
      ];
      this.suggestionIndex = 0;
      this.suggestionDelay = 5000;
      this.recentSuggestionTime = Date.now();
      this.timeout = this.loopSuggestion();
}

Assistant.prototype.respond = function (query) {
      if (this.showingTetris) {
            this.showingTetris = false;
            this.clear(false);
      }
      query = query.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      query = query.replace(new RegExp("nbsp", 'g'), " ");
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
      if (this.console.over || this.printed >= this.suggestions.length) {
            clearTimeout(this.timeout);
            this.timeout = null;
            return;
      } else if (Date.now() - this.console.recentInputTime > this.suggestionDelay && Date.now() - this.recentSuggestionTime > this.suggestionDelay) {
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
      this.suggestion = this.suggestions[this.suggestionIndex++];
      this.suggestionIndex %= this.suggestions.length;
      this.pln(this.suggestion);
      this.console.promptGuest();
};

Assistant.prototype.pln = function (str) {
      this.console.pln("<span class=\"green\">" + this.prompt + str + "</span>");
};

Assistant.prototype.randomComment = function () {
      this.pln(this.randomComments[Math.floor(Math.random() * this.randomComments.length)]);
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
      $("#cats").hide();
      $("#root").empty();
      this.showingTetris = false;
      GM.stopped = true;
      if (suggest) {
            this.printed++;
            this.pln(this.suggestions[this.suggestionIndex]);
      }
      return true;
};

Assistant.prototype.notYet = function () {
      this.pln('Sorry, I haven\'t actually learned this skill yet. Try again soon!');
      return true;
};

Assistant.prototype.hello = function () {
      this.pln(this.hellos[Math.floor(Math.random() * this.hellos.length)]);
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
            this.pln(this.info[i]);
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

Assistant.prototype.showResume = function () {
      this.pln('Here\'s the link to my <a target="_blank" class="glow" href=\'' + this.resume + '\'> résumé </a>!');
      return true;
};

Assistant.prototype.github = function () {
      this.pln('Here\'s my <a target="_blank" class="glow" href=\'http://dliangsta.github.io\'> GitHub </a>!');
      return true;
};

Assistant.prototype.linkedIn = function () {
      this.pln('Here\s my <a target="_blank" class="glow" href=\'http://linkedin.com/in/dliangsta\'> LinkedIn </a>! Feel free to connect with me!');
      return true;
};

Assistant.prototype.tetris = function () {
      this.showingTetris = true;
      $("#root").empty();
      $("#tetris").show();
      GameManager.setup(GM);
      $("#play-button").click();
      this.printed = this.suggestions.length;
      this.pln('Have fun! Type \'clear\' to hide the game.');
      return true;
};

Assistant.prototype.help = function () {
      this.pln("Let me give you some suggestions.");
      this.printed = this.suggestions.length;
      for (var i = 0; i < this.suggestions.length; i++) {
            this.pln(this.suggestions[i]);
      }
      this.pln("Hope that was helpful!");
      return true;
};

Assistant.prototype.defaultResponse = function () {
      this.pln('I\'m sorry, I didn\'t understand that. Please try again.');
      this.suggestNow = true;
      return true;
};