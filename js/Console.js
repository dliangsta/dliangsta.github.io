function Console() {
      this.david = new Assistant();
      this.guest = new User();
      this.query = "";
      this.space = document.createElement("IMG");
      this.space.src = "img/space.png"
      this.imgHTML = "<img src=\"" + this.space.src + "\">";
      this.intervalTime = 500;
      this.recentInputTime = Date.now();

      this.interval = setInterval(this.blink.bind(this), this.intervalTime);
}

Console.prototype.println = function (string) {
      var str = string || "";
      this.print(str + "</br>");
};

Console.prototype.print = function (string) {
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
}

Console.prototype.promptGuest = function () {
      this.print(this.guest.prompt);
}

Console.prototype.respond = function () {
      if (this.david.respond(this.query) == false) {
            return false;
      } else {
            this.println(this.david.response);
            return true;
      }
}

Console.prototype.onKeypress = function (event) {
      if (event.code === "Enter") {
            this.println();
            if (this.query != "") {
                  this.query = this.query.toLowerCase();
                  if (!this.respond()) {
                        this.end();
                        return;
                  }
            }
            this.promptGuest();
            this.query = "";
      } else if (event.key = "") {
            this.recentInputTime = Date.now();
      } else {
            this.recentInputTime = Date.now();
            this.clearSpace();
            this.print(event.key);
            this.query += event.key;
      }
}

Console.prototype.onKeydown = function (event) {
      if (event.key == "Backspace") {
            this.backspace();
      }
};

Console.prototype.end = function () {
      console.log("OVER");
      this.over = true;

};

Console.prototype.welcome = function () {
      this.println(this.david.welcome());
      this.print(this.guest.prompt);
      this.keypress = document.addEventListener("keypress", this.onKeypress.bind(this));
      this.keydown = document.addEventListener("keydown", this.onKeydown.bind(this));
};

Console.prototype.blink = function () {
      if (this.over) {
            this.clearSpace();
            return;
      }
      var html = $("#root")[0].innerHTML
      if (Date.now() - this.recentInputTime < this.intervalTime) {
            this.clearSpace();
            return;
      }
      if (!this.clearSpace()) {
            this.print(this.imgHTML);
      }

}

Console.prototype.clearSpace = function () {
      var html = $("#root")[0].innerHTML;
      if (html.includes(this.imgHTML)) {
            $("#root")[0].innerHTML = html.replace(this.imgHTML, "");
            return true;
      } else {
            return false;
      }
}


var Console = new Console();

$(document).ready(function () {
      Console.welcome();
});