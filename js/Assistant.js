function Assistant(console) {
      this.console = console;
      this.name = 'david@DAVIDWLIANG';
      this.prompt = this.name + ': ';
      this.response = null;
      this.resume = "https://drive.google.com/file/d/0B8RTzcv9knCuaXl2U1RzQlFmSFk/view";
      this.github = "https://github.com/dliangsta";
      this.linkedin = "https://linkedin.com/in/dliangsta";
      this.signedIn = "You are now signed in to guest@DAVIDWLIANG";
      this.printed = 0;
      this.suggestions = [
            "Try typing 'résumé' 'clear' or 'bye'.",
            // "How about typing 'academics' 'jokes' or 'riddles'?",
            "You can type 'cats' 'hi' or bye'."
      ];
      this.suggestionIndex = 0;
      this.suggestionDelay = 5000;
      this.recentSuggestionTime = Date.now();
      this.timeout = this.loopSuggestion();
}

Assistant.prototype.getName = function () {
      return this.name + ': ';
};

Assistant.prototype.respond = function (query) {
      this.response = "";
      this.printed = 0;
      this.recentSuggestionTime = Date.now();
      if (!this.timeout) {
            this.timeout = this.loopSuggestion();
      }
      switch (query) {
            case 'resume':
                  this.response += 'Here\'s a link to my <a target="_blank" class="glow" href=\'' + this.resume + '\'>' + 'résumé' + '</a>!'
                  break;
            case 'clear':
                  this.clear();
                  return true;
            case 'hi':
                  this.response += 'Hey there.';
                  break;
            case 'bye':
                  this.response += 'Bye!';
                  return false;
            case 'cats':
                  this.showCats();
                  return true;
            case 'riddles':
            case 'jokes':
            this.response += 'Sorry, I haven\'t actually learned this skill yet.';
                  break;
            default:
                  this.response += 'I\'m sorry, I didn\'t understand that. Please try again.';
                  this.suggestNow = true;
      }
      this.pln(this.response);
      return true;
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
      if (text.slice(index + this.console.guest.prompt.length - 1, -1) !== "") {
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
      this.console.pln(this.getName() + str)
};

Assistant.prototype.showCats = function () {
      $("#root").empty();
      $("#cats").toggleClass("hidden");
      $(".ytp-thumbnail-overlay").click();
      this.response += 'I have found some cats for you to watch. Type \'clear\' to hide the video.';
      this.pln(this.response);
};

Assistant.prototype.clear = function () {
      this.response = 'clear';
      $("#cats").hide();
      $("#root").empty();
      this.printed++;
      this.pln(this.suggestion);
};