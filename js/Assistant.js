function Assistant() {
      this.name = 'david@DAVIDWLIANG';
      this.prompt = this.name + ': ';
      this.response = null;
      this.resume = "https://drive.google.com/file/d/0B8RTzcv9knCuaXl2U1RzQlFmSFk/view";
      this.github = "https://github.com/dliangsta";
      this.linkedin = "https://linkedin.com/in/dliangsta";
      this.signedIn = "You are now signed in to guest@DAVIDWLIANG";
}

Assistant.prototype.getName = function () {
      return this.name + ': ';
};

Assistant.prototype.respond = function (query) {
      this.response = this.prompt;
      switch (query) {
            case 'resume':
                  this.response +=  'Here\'s a link to my <a target="_blank" class="glow" href=\'' + this.resume + '\'>' + 'resume' + '</a>!'
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
      var welcome = this.getName() + 'Welcome! You can say "hi", "bye", or "how are you?"';
      return welcome;
};