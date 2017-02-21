'use strict';

function Consoul(assistant)
{
      this.query = "";
      this.buffer = "";
      this.space = document.createElement("IMG");
      this.space.src = "img/space.png";
      this.imgHTML = "<img src=\"" + this.space.src + "\">";
      this.intervalTime = 500;
      this.recentInputTime = Date.now();
      this.blinking = true;
      this.responseDelay = 250;
      this.timeoutIndex = 0;
      this.timeoutMultiplier = 50;
      assistant = assistant;
}


Consoul.prototype.blink = function ()
{
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

Consoul.prototype.clearSpace = function ()
{
      var html = consoleRoot[0].innerHTML;
      if (html.includes(this.imgHTML)) {
            consoleRoot[0].innerHTML = html.replace(this.imgHTML, "");
            return true;
      } else {
            return false;
      }
};

Consoul.prototype.timeout = function (func, arg, arg2, key)
{
      if (this.timeoutKey !== 0 && key) {
            if (key !== this.timeoutKey) {
                  setTimeout(function ()
                  {
                        this.timeout(func, arg, arg2, key);
                  }.bind(this), this.timeoutMultiplier + 1);
                  return;
            }
      }
      setTimeout(function ()
      {
            func(arg, arg2);
      }.bind(this), this.timeoutIndex++ * this.timeoutMultiplier);
};

Consoul.prototype.welcomeBlock = function (strings, printInformation)
{
      this.timeoutKey = -1;
      this.timeout(this.print100.bind(this), '', '', this.timeoutKey);
      this.timeout(this.welcomepln.bind(this), '', '', this.timeoutKey);
      for (var i = 0; i < strings.length; i++) {
            this.timeout(this.welcomepln.bind(this), strings[i], '', this.timeoutKey);
      }
      this.timeout(this.welcomepln.bind(this), '', '', this.timeoutKey);
      if (printInformation) {
            this.timeout(this.printInformation.bind(this), '', '', this.timeoutKey);
            this.timeout(this.welcomepln.bind(this), '', '', this.timeoutKey);
      }
      this.timeout(this.print100.bind(this), '', '', this.timeoutKey);
      this.timeoutKey = 0;
}

Consoul.prototype.print100 = function ()
{
      var str = '';
      for (var i = 0; i < 100; i++) {
            str += '/';
      }
      this.pln(str);
};

Consoul.prototype.welcomepln = function (str, node)
{
      var out = "//";
      for (var i = 0; i < 50 - str.length / 2; i++) {
            out += "&nbsp;";
      }

      if (node) {
            out += node;
      } else {
            out += str;
      }

      for (var i = 0; i < 50 - (str.length + 1) / 2 - 4; i++) {
            out += "&nbsp;";
      }
      out += "//";
      this.pln(out);
};

Consoul.prototype.pln = function (string)
{
      var str = string || "";
      this.p(str + "</br>");
};

Consoul.prototype.p = function (string)
{
      if (!this.over) {
            consoleRoot.append(string);
            while (consoleRoot.height() >= 700) {
                  var ind = consoleRoot[0].innerHTML.slice(1).indexOf("<br>");
                  consoleRoot[0].innerHTML = consoleRoot[0].innerHTML.slice(ind + 1);
            }
      }
};

Consoul.prototype.clear = function (suggest)
{
      tetris.html("<div id='tetris'></div>");
      cats.html("<div id='cats'></div>");
      cubing.html("<div id='cubing'></div>");
      consoleRoot.empty();
      if (GM) {
            GM.stopped = true;
      }
      if (suggest) {
            assistant.suggest();
      }
      return true;
}

Consoul.prototype.onKeypress = function (event)
{
      if (event.key === "Enter") {
            this.blinking = false;
            this.waiting = true;
            setTimeout(function ()
            {
                  this.pln();
                  if (this.query !== "" && this.query !== " ") {
                        if (this.respond() === false) {
                              this.end();
                              setTimeout(function ()
                              {
                                    if (assistant.redirectHome) {
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

Consoul.prototype.onKeydown = function (event)
{
      if (event.key === " ") {
            this.onKeypress(event);
      } else if (event.key == "Backspace") {
            this.backspace();
      }
};

Consoul.prototype.backspace = function ()
{
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

Consoul.prototype.promptGuest = function ()
{
      this.p(guest.prompt + this.buffer);
};

Consoul.prototype.respond = function ()
{
      if (assistant.respond(this.query) === false) {
            return false;
      } else {
            this.promptGuest();
            return true;
      }
};

Consoul.prototype.welcome = function ()
{
      if (!getParameterByName('quick')) {
            this.welcomeBlock(['Requesting access for guest@DAVIDWLIANG...']);
            this.timeoutIndex = 50;
            this.timeout(this.clear.bind(this));
            this.welcomeBlock(['Access granted! Welcome guest@DAVIDWLIANG.']);
            this.timeoutIndex = 80;
            this.timeout(this.clear.bind(this));
      }
      this.welcomeBlock([brain.signedIn], true);
      var listen = function ()
      {
            this.keypress = document.addEventListener("keypress", this.onKeypress.bind(this));
            this.keydown = document.addEventListener("keydown", this.onKeydown.bind(this));
            this.interval = setInterval(this.blink.bind(this), this.intervalTime);
      };
      this.timeout(assistant.pln.bind(assistant), 'Welcome! I\'m David Liang and I\'ll be helping you get to know me!', '', 0);
      this.timeout(listen.bind(this), '', '', 0);
};

Consoul.prototype.end = function ()
{
      tetris.hide();
      cats.html('<div id="cats"></div>');
      cubing.html('<div id="cubing"></div>');
      consoleRoot.empty();
      this.timeoutIndex = 0;
      var strings = [
            brain.signedOut,
            brain.comeBackSoon
      ];
      this.welcomeBlock(strings, true);
      this.timeout(function ()
      {
            this.over = true;
      }.bind(this));
};

Consoul.prototype.printInformation = function ()
{
      this.welcomepln(brain.socialStr, brain.socialDivs);
};