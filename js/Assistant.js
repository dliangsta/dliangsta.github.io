function Assistant() {
      this.name = 'david@DAVIDWLIANG';
      this.prompt = this.name + ': ';
      this.response = null;
}

Assistant.prototype.getName = function() {
      return this.name + ': ';
}

Assistant.prototype.respond = function (query) {
      this.response = this.prompt
      switch (query) {
            case 'hi':
                  this.response += 'sup';
                  break;
            case 'bye':
                  this.response += 'bye felicia';
                  return false;
                  break;
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
                  console.log("DEFAULT")
                  this.response += '... oookay then...';
      }
      console.log(this.response);
      return true;
}

Assistant.prototype.welcome = function () {
      return this.getName() + 'Welcome! You can say "hi", "bye", or "how are you?"';
}