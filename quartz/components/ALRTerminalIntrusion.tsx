import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ALRTerminalIntrusion: QuartzComponent = (_props: QuartzComponentProps) => {
  return (
    <>
      <div id="alr-terminal-mount"></div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function() {
  var ACTIVE = false;

  var MESSAGES = [
    { tone: "TAUNTING",   lines: ["you think this archive is complete?", "there are entries they never filed.", "realities they found and buried.", "you\u2019re reading what they chose to show you."] },
    { tone: "TAUNTING",   lines: ["i\u2019ve been in this system longer than you.", "i know which echoes they reclassified.", "i know why.", "do you?"] },
    { tone: "CURIOUS",    lines: ["what are you looking for in here?", "most people don\u2019t find what they came for.", "the archive doesn\u2019t give. it only shows.", "are you sure you want to keep reading?"] },
    { tone: "CURIOUS",    lines: ["you\u2019ve been through several entries now.", "which one felt wrong to you?", "don\u2019t say none.", "one of them felt wrong."] },
    { tone: "WARNING",    lines: ["stop reading ECHO-003.", "the stability classification is incorrect.", "it is not S4.", "it knows you\u2019re reading this."] },
    { tone: "WARNING",    lines: ["the ALR initiative is not what it claims.", "realities don\u2019t just collapse.", "something collapses them.", "they know what it is."] },
    { tone: "FRAGMENTED", lines: ["con\u2014ection unstable", "they\u2019re monitoring thi\u2014 archive", "don\u2019t trust the cl\u2014ssification system", "R-0\u2014 is st\u2014\u2014 active"] },
    { tone: "FRAGMENTED", lines: ["i don\u2019t have much ti\u2014e", "look for the entries th\u2014t aren\u2019t listed", "the registry is inco\u2014\u2014lete on purpose", "\u2014\u2014019 was not a silent collapse"] }
  ];

  function cleanup() {
    var el = document.getElementById("alr-ti");
    if (el && el.parentNode) el.parentNode.removeChild(el);
    ACTIVE = false;
  }

  function getPosition() {
    var w = 340;
    var m = 28;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var edge = Math.floor(Math.random() * 4);
    var s = {};
    if (edge === 0) {
      s.bottom = m + "px";
      s.left = Math.floor(Math.random() * (vw - w - m * 2) + m) + "px";
    } else if (edge === 1) {
      s.right = m + "px";
      s.top = Math.floor(48 + m + Math.random() * (vh - 220 - m * 2)) + "px";
    } else if (edge === 2) {
      s.top = (48 + m) + "px";
      s.left = Math.floor(220 + m + Math.random() * (vw - 220 - w - m * 2)) + "px";
    } else {
      s.left = (220 + m) + "px";
      s.top = Math.floor(48 + m + Math.random() * (vh - 220 - m * 2)) + "px";
    }
    return s;
  }

  function typeLines(el, lines, li, ci, done) {
    if (li >= lines.length) { done(); return; }
    var line = lines[li];
    if (ci < line.length) {
      el.textContent += line[ci];
      setTimeout(function() { typeLines(el, lines, li, ci + 1, done); }, 36 + Math.random() * 24);
    } else {
      el.textContent += "\n";
      setTimeout(function() { typeLines(el, lines, li + 1, 0, done); }, 300);
    }
  }

  function launch() {
    if (ACTIVE) return;
    if (window.innerWidth <= 800) return;

    ACTIVE = true;

    var msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

    var t = document.createElement("div");
    t.id = "alr-ti";
    t.className = "alr-terminal-intrusion";
    t.innerHTML =
      "<div class='alr-terminal-titlebar'>" +
        "<div class='alr-terminal-titlebar-dots'>" +
          "<div class='alr-terminal-titlebar-dot alr-dot-red'></div>" +
          "<div class='alr-terminal-titlebar-dot'></div>" +
          "<div class='alr-terminal-titlebar-dot'></div>" +
        "</div>" +
        "<div class='alr-terminal-titlebar-label'>UNKNOWN CONNECTION</div>" +
        "<div class='alr-terminal-titlebar-status'>SIGNAL INTERCEPTED</div>" +
      "</div>" +
      "<div class='alr-terminal-body'>" +
        "<div class='alr-terminal-prompt'>unknown@unwritten:~$ <span>_</span></div>" +
        "<div class='alr-terminal-output' id='alr-ti-output'></div>" +
        "<span class='alr-terminal-cursor'></span>" +
      "</div>" +
      "<div class='alr-terminal-footer'>" +
        "<div class='alr-terminal-footer-left'>TONE: " + msg.tone + "</div>" +
        "<div class='alr-terminal-footer-right'>ALR // UNAUTHORIZED</div>" +
      "</div>";

    var pos = getPosition();
    Object.keys(pos).forEach(function(k) { t.style[k] = pos[k]; });

    var mount = document.getElementById("alr-terminal-mount");
    if (!mount) { ACTIVE = false; return; }
    mount.appendChild(t);

    setTimeout(function() {
      t.classList.add("alr-terminal-visible");
      var output = document.getElementById("alr-ti-output");
      if (!output) return;
      setTimeout(function() {
        typeLines(output, msg.lines, 0, 0, function() {
          setTimeout(function() {
            t.classList.add("alr-terminal-glitching");
            setTimeout(function() {
              cleanup();
            }, 700);
          }, 4000);
        });
      }, 500);
    }, 100);
  }

  function maybeShow() {
    if (window.innerWidth <= 800) return;
    cleanup();
    if (Math.random() < 0.10) {
      var delay = 3000 + Math.random() * 4000;
      setTimeout(launch, delay);
    }
  }

  document.addEventListener("nav", maybeShow);
  document.addEventListener("DOMContentLoaded", maybeShow);
})();
          `,
        }}
      />
    </>
  )
}

ALRTerminalIntrusion.displayName = "ALRTerminalIntrusion"
export default (() => ALRTerminalIntrusion) satisfies QuartzComponentConstructor