'use strict';

function Consoul(assistant) {
      this.query = "";
      this.buffer ="";
      this.space = document.createElement("IMG");
      this.space.src = "img/space.png";
      this.imgHTML = "<img src=\"" + this.space.src + "\">";
      this.intervalTime = 500;
      this.recentInputTime = Date.now();
      this.blinking = true;
      this.responseDelay = 250;
      this.timeoutIndex = 0;
      this.timeoutMultiplier = 20;
      this.assistant = assistant;
}


Consoul.prototype.blink = function () {
      if (this.over || !this.blinking) {
            this.clearSpace();
            return;
      }
      var html = consoleRoot[0].innerHTML;
      if (Date.now() - this.recentInputTime < this.intervalTime) {
            this.clearSpace();
            return;
      }
      if (!this.clearSpace()) {
            this.p(this.imgHTML);
      }

};

Consoul.prototype.clearSpace = function () {
      var html = consoleRoot[0].innerHTML;
      if (html.includes(this.imgHTML)) {
            consoleRoot[0].innerHTML = html.replace(this.imgHTML, "");
            return true;
      } else {
            return false;
      }
};

Consoul.prototype.timeout = function (func, arg, arg2, time) {
      var timeout = time || this.timeoutIndex++ * this.timeoutMultiplier;
      setTimeout(function () {
            func(arg, arg2);
      }.bind(this), timeout);
};

Consoul.prototype.print100 = function () {
      for (var i = 0; i < 100; i++) {
            this.p('/');
      }
      this.pln('');
};

Consoul.prototype.welcomepln = function (str, node) {
      this.p("//");
      for (var i = 0; i < 50 - str.length / 2; i++) {
            this.p("&nbsp;");
      }
      if (node) {
            this.p(node);
      } else {
            this.p(str);
      }

      for (var i = 0; i < 50 - (str.length + 1) / 2 - 4; i++) {
            this.p("&nbsp;");
      }
      this.p("//");
      this.pln();
};

Consoul.prototype.pln = function (string) {
      var str = string || "";
      this.p(str + "</br>");
};

Consoul.prototype.p = function (string) {
      if (!this.over) {
            consoleRoot.append(string);
            while (consoleRoot.height() >= 700) {
                  var ind = consoleRoot[0].innerHTML.slice(1).indexOf("<br>");
                  consoleRoot[0].innerHTML = consoleRoot[0].innerHTML.slice(ind + 1);
            }
      }
};

Consoul.prototype.onKeypress = function (event) {
      if (event.key === "Enter") {
            this.blinking = false;
            this.waiting = true;
            setTimeout(function () {
                  this.pln();
                  if (this.query !== "") {
                        if (!this.respond()) {
                              this.end();
                              setTimeout(function () {
                                    if (this.assistant.redirectHome) {
                                          window.location.href = "home.html";
                                    }
                              }.bind(this), 1000);
                              return;
                        }
                  } else {
                        this.promptGuest();
                  }
                  this.query = this.buffer;
                  this.buffer = "";
                  this.blinking = true;
                  this.waiting = false;
            }.bind(this), this.responseDelay);

      } else if (event.key === "") {
            this.recentInputTime = Date.now();
      } else {
            var buffer;
            if (this.waiting) {
                  if (event.key === " ") {
                        this.buffer += "%nbsp;";
                  } else {
                        this.buffer += event.key;
                  }
            } else {
                  this.recentInputTime = Date.now();
                  this.clearSpace();
                  this.p(event.key);
                  if (event.key === " ") {
                        this.query += "%nbsp;";
                  } else {
                        this.query += event.key;
                  }
            }
      }
};

Consoul.prototype.onKeydown = function (event) {
      if (event.key === " ") {
            this.onKeypress(event);
      } else if (event.key == "Backspace") {
            this.backspace();
      }
};

Consoul.prototype.backspace = function () {
      var text = consoleRoot[0].innerHTML;
      var imgIndex = text.lastIndexOf("<img");
      if (imgIndex >= 0) {
            text = text.slice(0, imgIndex);
      }
      if (text.slice(text.length - 2, text.length) !== ": ") {
            text = text.slice(0, text.length - 1);
            consoleRoot[0].innerHTML = text;
            this.query = this.query.slice(0, this.query.length - 1);
      }
};

Consoul.prototype.promptGuest = function () {
      this.p(guest.prompt + this.buffer);
};

Consoul.prototype.respond = function () {
      if (this.assistant.respond(this.query) === false) {
            return false;
      } else {
            this.promptGuest();
            return true;
      }
};

Consoul.prototype.welcome = function () {
      this.print100();
      for (var i = 0; i < 4; i++) {
            if (i == 2) {
                  this.timeout(this.welcomepln.bind(this), brain.signedIn);
            } else {
                  this.timeout(this.welcomepln.bind(this), '');
            }
      }
      this.printInformation(this.welcomepln.bind(this));
      this.timeout(this.welcomepln.bind(this), '');
      this.timeout(this.welcomepln.bind(this), '');
      this.timeout(this.print100.bind(this));
      var listen = function () {
            this.keypress = document.addEventListener("keypress", this.onKeypress.bind(this));
            this.keydown = document.addEventListener("keydown", this.onKeydown.bind(this));
            this.interval = setInterval(this.blink.bind(this), this.intervalTime);
      };
      this.timeout(assistant.pln.bind(assistant), 'Welcome! I\'m David Liang and I\'ll be helping you get to know me!');
      this.timeout(listen.bind(this));
};


Consoul.prototype.end = function () {
      tetris.hide();
      cats.hide();
      cubing.hide();
      consoleRoot.empty();
      this.print100();
      for (var i = 0; i < 4; i++) {
            if (i == 2) {
                  this.timeout(this.welcomepln.bind(this), brain.signedOut);
                  this.timeout(this.welcomepln.bind(this), brain.comeBackSoon);
            } else {
                  this.timeout(this.welcomepln.bind(this), '');
            }
      }
      this.printInformation(this.welcomepln.bind(this));
      this.timeout(this.welcomepln.bind(this), '');
      this.timeout(this.welcomepln.bind(this), '');
      this.timeout(this.print100.bind(this));
      this.timeout(this.pln.bind(this));
      this.timeout(function () {
            this.over = true;
      }.bind(this));
};

Consoul.prototype.printInformation = function (func) {
      this.timeout(func.bind(this), brain.socialStr, brain.socialDivs);
};