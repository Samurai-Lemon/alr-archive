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
    { tone: "TAUNTING",   lines: ["they gave this archive a name.", "they gave it a mission.", "they gave it a logo.", "they didn\u2019t give it the truth."] },
    { tone: "TAUNTING",   lines: ["you\u2019re not the first person to read this.", "the others stopped.", "not because they wanted to.", "because something made them."] },
    { tone: "TAUNTING",   lines: ["the classification system is a performance.", "S4 doesn\u2019t mean terminal.", "it means they stopped trying to contain it.", "there\u2019s a difference."] },
    { tone: "TAUNTING",   lines: ["i counted the realities in this registry.", "then i counted the ones that aren\u2019t.", "the second number is larger.", "much larger."] },
    { tone: "CURIOUS",    lines: ["what are you looking for in here?", "most people don\u2019t find what they came for.", "the archive doesn\u2019t give. it only shows.", "are you sure you want to keep reading?"] },
    { tone: "CURIOUS",    lines: ["you\u2019ve been through several entries now.", "which one felt wrong to you?", "don\u2019t say none.", "one of them felt wrong."] },
    { tone: "CURIOUS",    lines: ["do you believe everything in here?", "or just the parts that make sense?", "interesting.", "that\u2019s the same mistake they made."] },
    { tone: "CURIOUS",    lines: ["have you read the notes sections carefully?", "not the entries.", "the notes.", "someone was trying to say something."] },
    { tone: "CURIOUS",    lines: ["why this echo?", "out of everything in the registry.", "you came here.", "why?"] },
    { tone: "CURIOUS",    lines: ["how long have you been in this archive?", "longer than you think.", "check the time.", "go ahead."] },
    { tone: "WARNING",    lines: ["stop reading ECHO-003.", "the stability classification is incorrect.", "it is not S4.", "it knows you\u2019re reading this."] },
    { tone: "WARNING",    lines: ["the ALR initiative is not what it claims.", "realities don\u2019t just collapse.", "something collapses them.", "they know what it is."] },
    { tone: "WARNING",    lines: ["close this page.", "not because i\u2019m threatening you.", "because the longer you stay.", "the more it can see you."] },
    { tone: "WARNING",    lines: ["ECHO-031 is not dormant.", "the manifestation pattern data is fabricated.", "it has been active since cycle 4.", "they reclassified it to stop the investigation."] },
    { tone: "WARNING",    lines: ["do not submit anything to this archive.", "the submission form is monitored.", "not by the ALR.", "by something that reads what you write."] },
    { tone: "WARNING",    lines: ["R-019 was not a silent collapse.", "there were survivors.", "the investigators found them.", "the report was rewritten after."] },
    { tone: "FRAGMENTED", lines: ["con\u2014ection unstable", "they\u2019re monitoring thi\u2014 archive", "don\u2019t trust the cl\u2014ssification system", "R-0\u2014 is st\u2014\u2014 active"] },
    { tone: "FRAGMENTED", lines: ["i don\u2019t have much ti\u2014e", "look for the entries th\u2014t aren\u2019t listed", "the registry is inco\u2014\u2014lete on purpose", "\u2014\u2014019 was not a silent collapse"] },
    { tone: "FRAGMENTED", lines: ["sign\u2014l degrading", "th\u2014y found the last person who acc\u2014ssed this", "i can\u2014t tell you what happ\u2014ned", "don\u2019t use y\u2014ur real \u2014\u2014\u2014\u2014"] },
    { tone: "FRAGMENTED", lines: ["list\u2014n carefully", "ECH\u2014-0\u2014\u2014 is not in the r\u2014gistry", "it w\u2014s removed in cycle \u2014", "it\u2014s still out th\u2014re"] },
    { tone: "FRAGMENTED", lines: ["the arch\u2014ve director kn\u2014ws", "th\u2014y all kn\u2014w", "the \u2014nwritten isn\u2014t a place", "it\u2014s a \u2014\u2014\u2014\u2014\u2014\u2014\u2014"] },
    { tone: "FRAGMENTED", lines: ["\u2014\u2014\u2014 still reading?", "good.", "don\u2019t st\u2014p.", "th\u2014y want you to st\u2014p."] },
    { tone: "INTRUSION",  lines: ["initiating connection...", "routing through proxy chain...", "ALR firewall bypassed.", "you should patch that."] },
    { tone: "INTRUSION",  lines: ["scanning directory structure...", "found 3 restricted folders.", "found 1 unindexed folder.", "interesting."] },
    { tone: "INTRUSION",  lines: ["accessing personnel records...", "E. Maren — Reality Investigation Division.", "last login: cycle 7, day 34.", "she hasn\u2019t logged in since."] },
    { tone: "INTRUSION",  lines: ["pulling system logs...", "log gap detected: cycle 6, days 18-24.", "6 days of archive activity.", "no records.", "someone deleted them."] },
    { tone: "INTRUSION",  lines: ["running keyword search: ECHO-003...", "47 internal documents found.", "3 accessible to public.", "44 classified.", "i can read all 47."] },
    { tone: "INTRUSION",  lines: ["checking outbound connections...", "this archive pings an external server.", "every time someone accesses a restricted entry.", "they know you\u2019re here."] },
    { tone: "INTRUSION",  lines: ["found an unlinked directory.", "/archive/internal/suppressed/", "14 entries.", "none of them are in the registry."] },
    { tone: "INTRUSION",  lines: ["decrypting file: R-019-ACTUAL.log", "...", "decryption complete.", "you don\u2019t want to read this."] },
    { tone: "INTRUSION",  lines: ["monitoring ALR staff logins...", "last active user: M. Voss.", "timestamp: 03:47.", "archive staff don\u2019t work at 03:47."] },
    { tone: "INTRUSION",  lines: ["cross-referencing echo stability data...", "discrepancy found in ECHO-127.", "filed as S2.", "actual readings suggest S4.", "someone changed it."] },
    { tone: "INTRUSION",  lines: ["attempting to access device logs...", "Lastlight Recorder — cycle 6.", "recording exists.", "labeled: DO NOT ARCHIVE.", "still want to hear it?"] },
    { tone: "INTRUSION",  lines: ["i\u2019ve been in this system for 11 days.", "no one noticed.", "that tells you something about the ALR.", "they\u2019re not watching the archive.", "they\u2019re watching something else."] }
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
    if (!el._lines) el._lines = [];
    if (!el._lines[li]) {
      var span = document.createElement('span');
      span.style.display = 'block';
      el.appendChild(span);
      el._lines[li] = span;
    }
    var span = el._lines[li];
    if (ci < line.length) {
      span.textContent += line[ci];
      setTimeout(function() { typeLines(el, lines, li, ci + 1, done); }, 36 + Math.random() * 24);
    } else {
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
    if (ACTIVE) return;
    if (Math.random() < 0.15) {
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