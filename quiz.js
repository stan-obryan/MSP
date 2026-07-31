
(function (window, document) {
  "use strict";

  var QUESTIONS = [
    {
      prompt: "If your main office computer crashed right now, how much business data would you lose forever?",
      answers: [
        { text: "None. Everything backs up automatically to a secure cloud every hour.", points: 0 },
        { text: "Up to a full day's work. We run backups manually at night.", points: 5 },
        { text: "Days or weeks of data. We don't have a reliable backup system.", points: 10 }
      ]
    },
    {
      prompt: "An employee receives an email asking them to urgently update their email password via a link. What happens?",
      answers: [
        { text: "Nothing. Our system blocks phishing emails, and staff are trained to report them.", points: 0 },
        { text: "They might click it. We tell staff to be careful, but we don't do formal training.", points: 5 },
        { text: "They will definitely click it. We have no training or email filtering in place.", points: 10 }
      ]
    },
    {
      prompt: "How do you currently handle computer glitches, slow internet, or software crashes?",
      answers: [
        { text: "We have a team that monitors our systems and fixes bugs before we notice them.", points: 0 },
        { text: "We call an expensive 'break-fix' computer guy whenever something stops working.", points: 5 },
        { text: "The owner or the most 'tech-savvy' employee stops their own work to fix it.", points: 10 }
      ]
    },
    {
      prompt: "How are software updates, Windows/Mac updates, and security patches handled on your company computers?",
      answers: [
        { text: "They are managed and pushed automatically across all devices overnight by a central system.", points: 0 },
        { text: "Employees are prompted to update their own machines, but many click 'Remind Me Later'.", points: 5 },
        { text: "We rarely update our software or operating systems until something stops working entirely.", points: 10 }
      ]
    },
    {
      prompt: "Do your employees use Multi-Factor Authentication (MFA/2-Step verification) to log into company emails and tools?",
      answers: [
        { text: "Yes. MFA is strictly mandatory for every single tool and email account we use.", points: 0 },
        { text: "Only on a couple of important accounts like business banking, but not for everyday emails.", points: 5 },
        { text: "No. We only use standard usernames and passwords to log into our systems.", points: 10 }
      ]
    },
    {
      prompt: "If your physical office suffered a flood, fire, or break-in tonight, how long would it take your business to get back to work?",
      answers: [
        { text: "Less than 24 hours. Our entire infrastructure is cloud-based and staff can work from anywhere instantly.", points: 0 },
        { text: "A few days to a week. We have cloud backups but would need to buy and configure brand new hardware.", points: 5 },
        { text: "Weeks or never. Most of our software and physical server hardware live entirely inside the office building.", points: 10 }
      ]
    }
  ];

  var TAILWIND = {
    shell: "mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-200/60",
    content: "p-6 sm:p-10",
    eyebrow: "mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sky-600",
    title: "text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl",
    muted: "text-sm leading-6 text-slate-500",
    button: "inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-sky-600/20 disabled:cursor-not-allowed disabled:opacity-50",
    field: "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10"
  };

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function icon(type, className) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("class", className || "h-6 w-6");

    var paths = type === "shield"
      ? [["path", { d: "M12 3l7 4v5c0 4.6-2.9 7.9-7 9-4.1-1.1-7-4.4-7-9V7l7-4z" }], ["path", { d: "m9 12 2 2 4-4" }]]
      : type === "warning"
        ? [["path", { d: "M10.3 3.6 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3l-8.1-14.4a2 2 0 0 0-3.4 0z" }], ["path", { d: "M12 9v4" }], ["path", { d: "M12 17h.01" }]]
        : [["circle", { cx: "12", cy: "12", r: "9" }], ["path", { d: "M12 8v5" }], ["path", { d: "M12 16h.01" }]];

    paths.forEach(function (part) {
      var child = document.createElementNS("http://www.w3.org/2000/svg", part[0]);
      Object.keys(part[1]).forEach(function (attribute) {
        child.setAttribute(attribute, part[1][attribute]);
      });
      svg.appendChild(child);
    });
    return svg;
  }

  function fadeIn(node) {
    node.classList.add("opacity-0", "transition-opacity", "duration-300");
    window.requestAnimationFrame(function () {
      node.classList.remove("opacity-0");
    });
  }

  function getRisk(score) {
    if (score <= 15) {
      return {
        label: "LOW RISK",
        tone: "green",
        icon: "shield",
        title: "Your setup is in good shape.",
        description: "You have strong foundational protections in place. Keep reviewing your controls as your business grows.",
        cta: "Optimize Your Infrastructure"
      };
    }

    if (score <= 35) {
      return {
        label: "MEDIUM RISK",
        tone: "yellow",
        icon: "warning",
        title: "There are a few gaps to close.",
        description: "Your business has some protections in place, but a few weak spots could create avoidable downtime or exposure.",
        warnings: [
          "Some security controls may depend on individual employees.",
          "Backups, updates, or recovery plans may not be consistently tested.",
          "A targeted security review could reduce your exposure quickly."
        ],
        cta: "Book a Free 15-Minute Security Gap Audit"
      };
    }

    return {
      label: "HIGH RISK",
      tone: "red",
      icon: "critical",
      title: "Your business faces an urgent security risk.",
      description: "A preventable incident could cause serious data loss, downtime, or disruption. Prioritize a security evaluation as soon as possible.",
      cta: "Schedule an Emergency Security Evaluation"
    };
  }

  function createSecurityQuiz(container) {
    if (!(container instanceof HTMLElement)) {
      throw new TypeError("createSecurityQuiz requires the #quiz-container element.");
    }

    var currentQuestion = 0;
    var score = 0;
    var isSubmitting = false;

    container.className = "security-quiz";
    container.setAttribute("aria-live", "polite");

    function resetState() {
      currentQuestion = 0;
      score = 0;
      isSubmitting = false;
    }

    function renderFrame() {
      container.replaceChildren();
      var frame = element("section", TAILWIND.shell + " " + TAILWIND.content);
      container.appendChild(frame);
      return frame;
    }

    function renderProgress(frame) {
      var header = element("div", "mb-8 flex items-center justify-between gap-4");
      header.appendChild(element("p", TAILWIND.eyebrow + " mb-0", "Tech Health Check"));
      header.appendChild(element("p", "text-xs font-semibold text-slate-500", "Question " + (currentQuestion + 1) + " of 6"));
      frame.appendChild(header);

      var track = element("div", "mb-10 h-2 overflow-hidden rounded-full bg-slate-100");
      var value = element("div", "h-full rounded-full bg-sky-600 transition-all duration-500");
      value.style.width = ((currentQuestion + 1) / QUESTIONS.length) * 100 + "%";
      track.appendChild(value);
      frame.appendChild(track);
    }

    function renderQuestion() {
      var frame = renderFrame();
      renderProgress(frame);
      frame.appendChild(element("h2", TAILWIND.title + " mb-8 max-w-2xl", QUESTIONS[currentQuestion].prompt));

      var answers = element("div", "grid gap-3");
      QUESTIONS[currentQuestion].answers.forEach(function (answer, answerIndex) {
        var button = element("button", "group flex w-full items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-sm leading-6 text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-sky-600/10");
        button.type = "button";
        button.appendChild(element("span", "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-500 transition-all group-hover:border-sky-600 group-hover:bg-sky-600 group-hover:text-white", String.fromCharCode(65 + answerIndex)));
        button.appendChild(element("span", "pt-0.5", answer.text));
        button.addEventListener("click", function () {
          score += answer.points;
          currentQuestion += 1;
          renderQuestionWithTransition();
        });
        answers.appendChild(button);
      });
      frame.appendChild(answers);
      fadeIn(frame);
    }

    function renderQuestionWithTransition() {
      container.classList.add("opacity-0", "transition-opacity", "duration-300");
      window.setTimeout(function () {
        render();
        container.classList.remove("opacity-0");
      }, 150);
    }

    function renderLeadGate() {
      var frame = renderFrame();
      frame.appendChild(element("p", TAILWIND.eyebrow, "One last step"));
      frame.appendChild(element("h2", TAILWIND.title + " mb-3", "Calculating your Risk Score..."));
      frame.appendChild(element("p", TAILWIND.muted + " mb-8 max-w-xl", "Enter your business email to unlock your customized IT security scorecard and risk breakdown."));

      var form = element("form", "grid gap-5");
      var fields = [
        { label: "Full Name", type: "text", name: "fullName", autocomplete: "name" },
        { label: "Company Name", type: "text", name: "companyName", autocomplete: "organization" },
        { label: "Business Email", type: "email", name: "businessEmail", autocomplete: "email" }
      ];

      fields.forEach(function (field) {
        var wrapper = element("label", "grid gap-2 text-sm font-semibold text-slate-700");
        wrapper.appendChild(element("span", "", field.label));
        var input = element("input", TAILWIND.field);
        input.type = field.type;
        input.name = field.name;
        input.autocomplete = field.autocomplete;
        input.required = true;
        input.placeholder = field.label;
        wrapper.appendChild(input);
        form.appendChild(wrapper);
      });

      var submit = element("button", TAILWIND.button + " mt-2 w-full sm:w-auto", "See My Results →");
      submit.type = "submit";
      form.appendChild(submit);
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (isSubmitting || !form.checkValidity()) {
          form.reportValidity();
          return;
        }

        isSubmitting = true;
        submit.disabled = true;
        submit.textContent = "Preparing your scorecard...";
        window.setTimeout(renderResults, 650);
      });

      frame.appendChild(form);
      fadeIn(frame);
    }

    function renderResults() {
      isSubmitting = false;
      var risk = getRisk(score);
      var frame = renderFrame();
      var tone = risk.tone === "green"
        ? { icon: "bg-green-100 text-green-700", border: "border-green-200", label: "text-green-700" }
        : risk.tone === "yellow"
          ? { icon: "bg-yellow-100 text-yellow-700", border: "border-yellow-200", label: "text-yellow-700" }
          : { icon: "bg-red-100 text-red-700", border: "border-red-200", label: "text-red-700" };

      var top = element("div", "mb-8 flex flex-col gap-6 border-b border-slate-100 pb-8 sm:flex-row sm:items-center sm:justify-between");
      var badge = element("div", "flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl " + tone.icon);
      badge.appendChild(icon(risk.icon, "h-10 w-10"));
      top.appendChild(badge);

      var heading = element("div", "sm:flex-1");
      heading.appendChild(element("p", TAILWIND.eyebrow + " mb-2", "Your personalized scorecard"));
      heading.appendChild(element("h2", TAILWIND.title, risk.label));
      top.appendChild(heading);

      var scoreBox = element("div", "rounded-xl bg-slate-50 px-5 py-4 text-center");
      scoreBox.appendChild(element("p", "text-3xl font-bold text-brand-dark", String(score)));
      scoreBox.appendChild(element("p", "text-xs font-semibold uppercase tracking-wider text-slate-500", "out of 60"));
      top.appendChild(scoreBox);
      frame.appendChild(top);

      var summary = element("div", "mb-8 rounded-2xl border " + tone.border + " bg-white p-6");
      summary.appendChild(element("h3", "mb-2 text-xl font-bold text-brand-dark", risk.title));
      summary.appendChild(element("p", TAILWIND.muted, risk.description));
      frame.appendChild(summary);

      if (risk.warnings) {
        var warningList = element("div", "mb-8");
        warningList.appendChild(element("h3", "mb-3 text-sm font-bold uppercase tracking-wider text-slate-500", "Key warning signs"));
        var list = element("ul", "grid gap-3");
        risk.warnings.forEach(function (warning) {
          var item = element("li", "flex gap-3 text-sm leading-6 text-slate-600");
          item.appendChild(element("span", "mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-500"));
          item.appendChild(element("span", "", warning));
          list.appendChild(item);
        });
        warningList.appendChild(list);
        frame.appendChild(warningList);
      }

      var actions = element("div", "flex flex-col gap-3 sm:flex-row sm:items-center");
      var cta = element("button", TAILWIND.button, risk.cta);
      cta.type = "button";
      cta.addEventListener("click", function () {
        if (typeof window.onSecurityQuizCta === "function") {
          window.onSecurityQuizCta(risk, score);
        }
      });
      actions.appendChild(cta);

      var retake = element("button", "rounded-xl px-5 py-3 text-sm font-bold text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900", "Retake Assessment");
      retake.type = "button";
      retake.addEventListener("click", function () {
        resetState();
        renderQuestion();
      });
      actions.appendChild(retake);
      frame.appendChild(actions);
      fadeIn(frame);
    }

    function render() {
      if (currentQuestion < QUESTIONS.length) {
        renderQuestion();
      } else {
        renderLeadGate();
      }
    }

    render();

    return {
      reset: function () {
        resetState();
        render();
      },
      getScore: function () {
        return score;
      }
    };
  }

  window.createSecurityQuiz = createSecurityQuiz;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      var container = document.getElementById("quiz-container");
      if (container) createSecurityQuiz(container);
    });
  } else {
    var container = document.getElementById("quiz-container");
    if (container) createSecurityQuiz(container);
  }
})(window, document);
