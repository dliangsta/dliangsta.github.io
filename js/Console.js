'user strict';

function Console() {
      this.david = new Assistant();
      this.guest = new User();
      this.query = "";
      this.space = document.createElement("IMG");
      this.space.src = "img/space.png";
      this.imgHTML = "<img src=\"" + this.space.src + "\">";
      this.intervalTime = 500;
      this.recentInputTime = Date.now();
      this.blinking = true;

}

Console.prototype.log = function (str) {
      c.log(str);
}

Console.prototype.print100 = function () {
      for (var i = 0; i < 100; i++) {
            this.p('/');
      }
      this.pln('');
}
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
}

Console.prototype.pln = function (string) {
      var str = string || "";
      this.p(str + "</br>");
};

Console.prototype.p = function (string) {
      if (!this.over) {
            $("#root").append(string);
      }
};

Console.prototype.backspace = function () {
      var text = $("#root")[0].innerHTML;
      if (text.slice(text.length - 2, text.length) != ": ") {
            $("#root")[0].innerHTML = text.slice(0, text.length - 1);
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
            if (this.david.response === 'clear') {
                  $("#root").empty();
            } else {
                  this.pln(this.david.response);
            }
            return true;
      }
};

Console.prototype.onKeypress = function (event) {
      if (event.code === "Enter") {
            this.blinking = false;
            setTimeout(function () {
                  this.pln();
                  if (this.query !== "") {
                        this.query = this.query.toLowerCase();
                        if (!this.respond()) {
                              this.end();
                              return;
                        }
                  }
                  this.promptGuest();
                  this.query = "";
                  this.blinking = true;
            }.bind(this), 500);
      } else if (event.key === "") {
            this.recentInputTime = Date.now();
      } else {
            this.recentInputTime = Date.now();
            this.clearSpace();
            this.p(event.key);
            this.query += event.key;
      }
};

Console.prototype.onKeydown = function (event) {
      if (event.key == "Backspace") {
            this.backspace();
      }
};

Console.prototype.end = function () {
      this.over = true;

};

Console.prototype.welcome = function () {
      this.print100();
      for (var i = 0; i < 4; i++) {
            if (i == 2) {
                  this.welcomepln(this.david.signedIn);
            } else {
                  this.welcomepln('');
            }
      }
      this.welcomepln('My information: ');
      this.welcomepln('Resume', '<a target="_blank" class="glow" href=\'' + this.david.resume + '\'>' + 'Resume' + '</a>');
      this.welcomepln('GitHub', '<a target="_blank" class="glow" href=\'' + this.david.github + '\'>' + 'GitHub' + '</a>');
      this.welcomepln('LinkedIn', '<a target="_blank" class="glow" href=\'' + this.david.linkedin + '\'>' + 'LinkedIn' + '</a>');
      this.welcomepln('');
      this.welcomepln('');
      this.print100();
      this.pln();

      setTimeout(function () {
            this.pln(this.david.welcome());
      }.bind(this), 500);

      setTimeout(function () {
            this.p(this.guest.prompt);
            this.keypress = document.addEventListener("keypress", this.onKeypress.bind(this));
            this.keydown = document.addEventListener("keydown", this.onKeydown.bind(this));
            this.interval = setInterval(this.blink.bind(this), this.intervalTime);
      }.bind(this), 1000);
};

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

var c = new Console();

$(document).ready(function () {
      setTimeout(function () {
            c.welcome();
      }, 500);
});