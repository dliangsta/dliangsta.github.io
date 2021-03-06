'use strict';

function Brain(assistant)
{
      this.signedIn = "You are now signed in to guest@DAVIDWLIANG";
      this.signedOut = "You are now signed out of guest@DAVIDWLIANG";
      this.comeBackSoon = "Come back soon to see my growth!";
      this.assistant = assistant;
      this.emailAddr = "david.liang@wisc.edu";
      this.resumeURL = "https://drive.google.com/file/d/0B8RTzcv9knCuaXl2U1RzQlFmSFk/view?usp=sharing";
      this.githubURL = "https://github.com/dliangsta";
      this.linkedinURL = "https://linkedin.com/in/dliangsta";
      this.emailDiv = hyperlink("Email", this.emailAddr);
      this.resumeDiv = hyperlink("Résumé", this.resumeURL);
      this.githubDiv = hyperlink("GitHub", this.githubURL);
      this.linkedinDiv = hyperlink("LinkedIn", this.linkedinURL);
      this.homeDiv = hyperlink("Home page", "home.html");
      this.socialStr = 'Email Resume GitHub LinkedIn Home page';
      this.socialDivs = this.emailDiv + " " + this.resumeDiv + " " + this.githubDiv + " " + this.linkedinDiv + " " + this.homeDiv;
      this.suggestions = [
            "Try typing 'help' 'tetris' or a bit of basic conversation!",
            "I understand 'information' 'projects' and 'resume'!",
            "How about typing 'clear' 'cats' or 'exit'?",
            "You can ask 'who are you?' 'about' or 'how are you?' if you'd like.",
            "You can visit my homepage by typing 'home' into the console.",
            "Type 'cats' 'hi' or bye' if you want."
      ];
      this.hellos = [
            "Hey there.",
            "Greetings.",
            "Hello."
      ];
      this.info = [
            "I'm a university student at University of Wisconsin-Madison!",
            "My majors are computer science and mathematics.",
            "I have an older brother and two older sisters!",
            "I'm originally from Milwaukee, Wisconsin.",
            "I really enjoy ultimate frisbee, rubiks cube speed-solving, and rock climbing!"
      ];
      this.randomComments = [
            "That's great!",
            "Awesome, very cool!",
            "That's really interesting!"
      ];
      this.projectDivs = [
            hyperlink("Video Style Transfer", "http://dliangsta.github.io/Style-Transfer"),
            hyperlink("Speech Games", "http://aravart.github.io/speech-games"),
            hyperlink("Neural Network Digit Recognition", "https://github.com/dliangsta/Neural-Digit-Recognition"),
            "You can also type '" + hyperlink("Tetris", "http://github.com/dliangsta/Tetris-AI") + "' to play Tetris or to watch my AI!"
      ];
      this.tetrisDiv = '<div id="tetris" display="hididen" class="consola container game-container">'
            + '<canvas id="canvas" class="board sidebyside" width="300px" height="600px"></canvas>'
            + '<div class="sidebyside"> <div class="controls-container"> <div id="score-container" class="score-container"> 0 '
            + '</div><div id="next-container" class="next-container"><canvas id="next-piece-canvas" class="next-canvas" width="80px" height="80px"></canvas>'
            + '</div></div><a id="play-button" class="btn btn-default btn-lg game-btn active" data-toggle="button"> Play </a>'
            + '<a id="AI-button" class="btn btn-default btn-lg game-btn active" data-toggle="button"> AI </a>'
            + '<a id="guiding-button" class="btn btn-default btn-lg game-btn active" data-toggle="button"> Guide </a>'
            + '<a id="reset-button" class="btn btn-default btn-lg game-btn"> Reset </a><p class="instructions"> Instructions: <br/>'
            + '&nbsp;&nbsp;&nbsp;&nbsp;a: left <br/> &nbsp;&nbsp;&nbsp;&nbsp;s: down <br/>&nbsp;&nbsp;&nbsp;&nbsp;d: right <br/> &nbsp;&nbsp;&nbsp;&nbsp;q:'
            + 'rotate ccw <br/> &nbsp;&nbsp;&nbsp;&nbsp;e: rotate cw <br/> space: drop </p></div></div>';
}


function hyperlink(text, url)
{
      return '<a target="_blank" class="glow" href=\'' + url + '\'>' + text + '</a>';
}

function getParameterByName(name, url)
{
      if (!url) {
            url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
}