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

      this.interval = setInterval(this.blink.bind(this), this.intervalTime);
}

Console.prototype.log = function(str) {
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
      this.pln(this.david.welcome());
      this.p(this.guest.prompt);
      this.keypress = document.addEventListener("keypress", this.onKeypress.bind(this));
      this.keydown = document.addEventListener("keydown", this.onKeydown.bind(this));
};

Console.prototype.blink = function () {
      if (this.over) {
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
      c.welcome();
});