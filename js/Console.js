'user strict';

function Console() {
      this.query = "";
      this.space = document.createElement("IMG");
      this.space.src = "img/space.png";
      this.imgHTML = "<img src=\"" + this.space.src + "\">";
      this.intervalTime = 500;
      this.recentInputTime = Date.now();
      this.blinking = true;
      this.welcomeDelay = 250;
      this.responseDelay = 250;
      this.timeoutIndex = 0;
      this.timeoutMultiplier = 20;
      this.david = new Assistant(this);
      this.guest = new User();
      this.emailDiv = '<a target="_blank" class="glow" href=\'' + this.david.emailAddr + '\'>' + 'Email' + '</a>';
      this.resumeDiv = '<a target="_blank" class="glow" href=\'' + this.david.resumeURL + '\'>' + 'Résumé' + '</a>';
      this.githubDiv = '<a target="_blank" class="glow" href=\'' + this.david.githubURL + '\'>' + 'GitHub' + '</a>';
      this.linkedinDiv = '<a target="_blank" class="glow" href=\'' + this.david.linkedinURL + '\'>' + 'LinkedIn' + '</a>';
      this.homeDiv = '<a target="_blank" class="glow" href=\'' + "home.html" + '\'>' + 'Homepage' + '</a>';
      this.socialStr = 'Email Resume GitHub LinkedIn Homepage';
      this.socialDivs = this.emailDiv + " " + this.resumeDiv + " " + this.githubDiv + " " + this.linkedinDiv + " " + this.homeDiv;
}


Console.prototype.blink = function () {
      if (this.over || !this.blinking) {
            this.clearSpace();
            return;
      }
      var html = $("#root")[0].innerHTML;
      if (Date.now() - this.recentInputTime < this.intervalTime) {
            this.clearSpace();
            return;
      }
      if (!this.clearSpace()) {
            this.p(this.imgHTML);
      }

};

Console.prototype.clearSpace = function () {
      var html = $("#root")[0].innerHTML;
      if (html.includes(this.imgHTML)) {
            $("#root")[0].innerHTML = html.replace(this.imgHTML, "");
            return true;
      } else {
            return false;
      }
};

Console.prototype.timeout = function (func, arg, arg2, time) {
      var timeout = time || this.timeoutIndex++ * this.timeoutMultiplier;
      setTimeout(function () {
            func(arg, arg2);
      }.bind(this), timeout);
};

Console.prototype.print100 = function () {
      for (var i = 0; i < 100; i++) {
            this.p('/');
      }
      this.pln('');
};

Console.prototype.welcomepln = function (str, node) {
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
            c.p("&nbsp;");
      }
      this.p("//");
      this.pln();
};

Console.prototype.pln = function (string) {
      var str = string || "";
      this.p(str + "</br>");
};

Console.prototype.p = function (string) {
      if (!this.over) {
            $("#root").append(string);
            while ($("#root").height() >= 700) {
                  var ind = $("#root")[0].innerHTML.slice(1).indexOf("<br>");
                  $("#root")[0].innerHTML = $("#root")[0].innerHTML.slice(ind + 1);
            }
      }
};

Console.prototype.onKeypress = function (event) {
      if (event.key === "Enter") {
            this.blinking = false;
            setTimeout(function () {
                  this.pln();
                  if (this.query !== "") {
                        this.query = this.query.toLowerCase();
                        if (!this.respond()) {
                              this.end();
                              setTimeout(function () {
                                    if (this.david.redirectHome) {
                                          window.location.href = "home.html";
                                    }
                              }.bind(this), 1000);
                              return;
                        }
                  } else {
                        this.promptGuest();
                  }
                  this.query = "";
                  this.blinking = true;
            }.bind(this), this.responseDelay);

      } else if (event.key === "") {
            this.recentInputTime = Date.now();
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
};

Console.prototype.onKeydown = function (event) {
      if (event.key === " ") {
            this.onKeypress(event);
      } else if (event.key == "Backspace") {
            this.backspace();
      }
};

Console.prototype.backspace = function () {
      var text = $("#root")[0].innerHTML;
      var imgIndex = text.lastIndexOf("<img");
      if (imgIndex >= 0) {
            text = text.slice(0, imgIndex);
      }
      if (text.slice(text.length - 2, text.length) !== ": ") {
            text = text.slice(0, text.length - 1);
            $("#root")[0].innerHTML = text;
            this.query = this.query.slice(0, this.query.length - 1);
      }
};

Console.prototype.promptGuest = function () {
      this.p(this.guest.prompt);
};

Console.prototype.respond = function () {
      if (this.david.respond(this.query) === false) {
            return false;
      } else {
            this.promptGuest();
            return true;
      }
};

Console.prototype.welcome = function () {
      this.print100();
      for (var i = 0; i < 4; i++) {
            if (i == 2) {
                  this.timeout(this.welcomepln.bind(this), this.david.signedIn);
            } else {
                  this.timeout(this.welcomepln.bind(this), '');
            }
      }
      this.printInformation(this.welcomepln.bind(this));
      this.timeout(this.welcomepln.bind(this), '');
      this.timeout(this.welcomepln.bind(this), '');
      this.timeout(this.print100.bind(this));
      this.timeout(this.david.welcome.bind(this.david));
      this.timeout(this.promptGuest.bind(this));
      this.timeout(this.david.suggest.bind(this.david));
      var listen = function () {
            this.keypress = document.addEventListener("keypress", this.onKeypress.bind(this));
            this.keydown = document.addEventListener("keydown", this.onKeydown.bind(this));
            this.interval = setInterval(this.blink.bind(this), this.intervalTime);
      };
      this.timeout(listen.bind(this));
      this.timeoutIndex = 0;
};


Console.prototype.end = function () {
      $("#tetris").hide();
      $("#cats").hide();
      $("#root").empty();
      this.print100();
      for (var i = 0; i < 4; i++) {
            if (i == 2) {
                  this.timeout(this.welcomepln.bind(this), "You are now signed out of guest@DAVIDWLIANG")
                  this.timeout(this.welcomepln.bind(this), "Come back soon to see my growth!");
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

Console.prototype.printInformation = function (func) {
      this.timeout(func.bind(this), this.socialStr, this.socialDivs);
}

var c = new Console();

$(document).ready(function () {
      $("#cats").hide();
      $("#tetris").hide();
      setTimeout(function () {
            c.welcome();
      }, c.welcomeDelay);
});