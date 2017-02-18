function Assistant(console) {
      this.console = console;
      this.name = 'david@DAVIDWLIANG';
      this.prompt = this.name + ': ';
      this.response = null;
      this.resume = "https://drive.google.com/file/d/0B8RTzcv9knCuaXl2U1RzQlFmSFk/view";
      this.github = "https://github.com/dliangsta";
      this.linkedin = "https://linkedin.com/in/dliangsta";
      this.signedIn = "You are now signed in to guest@DAVIDWLIANG";
      this.suggestions = [
            "Try typing 'resume' 'cats' or 'bye'.",
            "How about typing 'academics' 'jokes' or 'riddles'?",
            "You can type 'clear' 'hi' or bye'"
      ]
      this.suggestionIndex = 0;
      this.suggestionDelay = 3000;
      this.recentSuggestionTime = Date.now();
      this.timeout = this.loopSuggestion();
}

Assistant.prototype.getName = function () {
      return this.name + ': ';
};

Assistant.prototype.respond = function (query) {
      this.response = this.prompt;
      switch (query) {
            case 'resume':
                  this.response += 'Here\'s a link to my <a target="_blank" class="glow" href=\'' + this.resume + '\'>' + 'resume' + '</a>!'
                  break;
            case 'clear':
                  this.response = 'clear';
                  break;
            case 'hi':
                  this.response += 'sup';
                  break;
            case 'bye':
                  this.response += 'bye felicia';
                  return false;
            case 'how are you?':
                  this.response += 'great, becos im great';
                  break;
            case 'where you movin?':
                  this.response += 'on to better things';
                  break;
            case 'what\'s your favorite quote?':
                  this.response += '\'you dont need a bus pass for me to bust yo ass\' - lil wayne';
                  break;
            case 'i\'ll say what i want':
                  this.response += '.... well then....';
                  break;
            default:
                  this.response += '... oookay then...';
      }
      return true;
};

Assistant.prototype.welcome = function () {
      this.pln('Welcome! I\'m David Liang and I\'ll be helping you get to know me!');
      this.suggest();
};

Assistant.prototype.loopSuggestion = function () {
      if (Date.now() - this.console.recentInputTime > this.suggestionDelay && Date.now() - this.recentSuggestionTime > this.suggestionDelay) {
            this.suggest();
            this.recentSuggestionTime = Date.now();
      }
      this.timeout = setTimeout(function () {
            this.loopSuggestion();
      }.bind(this), this.suggestionDelay);
}

Assistant.prototype.suggest = function () {
      var text = $("#root")[0].innerHTML;
      var index = text.lastIndexOf(">");
      console.log(this.console.guest.prompt.length);
      console.log(text.slice(index, -1).length);
      console.log(" ");
      if (this.console.guest.prompt.length < text.slice(index, -1).length) {
            return;
      }
      $("#root")[0].innerHTML = text.slice(0, index + 1);
      this.suggestion = this.suggestions[this.suggestionIndex++];
      this.suggestionIndex %= this.suggestions.length;
      this.pln(this.suggestion);
      this.console.promptGuest();
}

Assistant.prototype.pln = function (str) {
      this.console.pln(this.getName() + str)
}