import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ALRSubmitWizard: QuartzComponent = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  function buildWizard(form) {
    if (form.dataset.wizardInit) return;
    form.dataset.wizardInit = '1';

    var sections = Array.prototype.slice.call(form.querySelectorAll(':scope > .alr-submit-section'));
    if (sections.length < 2) return;

    var actions = form.querySelector(':scope > .alr-submit-actions');
    form.classList.add('alr-wizard-active');

    var dots = document.createElement('div');
    dots.className = 'alr-wizard-dots';
    sections.forEach(function() {
      var d = document.createElement('span');
      d.className = 'alr-wizard-dot';
      dots.appendChild(d);
    });
    form.insertBefore(dots, sections[0]);

    var nav = document.createElement('div');
    nav.className = 'alr-wizard-nav';
    var backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'alr-wizard-back';
    backBtn.textContent = 'Back';
    var nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'alr-submit-btn alr-wizard-next';
    nav.appendChild(backBtn);
    nav.appendChild(nextBtn);
    form.appendChild(nav);

    var step = 0;

    function render() {
      sections.forEach(function(sec, i) { sec.classList.toggle('alr-step-active', i === step); });
      Array.prototype.forEach.call(dots.children, function(d, i) {
        d.classList.toggle('alr-wizard-dot-active', i === step);
        d.classList.toggle('alr-wizard-dot-done', i < step);
      });
      backBtn.style.visibility = step === 0 ? 'hidden' : 'visible';
      nextBtn.textContent = step === sections.length - 1 ? 'Submit for Review' : 'Continue';
      sections[step].scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    backBtn.addEventListener('click', function() {
      step = Math.max(0, step - 1);
      render();
    });

    nextBtn.addEventListener('click', function() {
      var fields = sections[step].querySelectorAll('input,select,textarea');
      for (var i = 0; i < fields.length; i++) {
        if (!fields[i].checkValidity()) {
          fields[i].reportValidity();
          return;
        }
      }
      if (step === sections.length - 1) {
        form.requestSubmit ? form.requestSubmit() : form.submit();
        return;
      }
      step++;
      render();
    });

    render();
  }

  function init() {
    if (!window.matchMedia('(max-width: 800px)').matches) return;
    document.querySelectorAll('form.alr-submit-form').forEach(buildWizard);
  }

  init();
  document.addEventListener('nav', init);
})();
        `,
      }}
    />
  )
}

ALRSubmitWizard.displayName = "ALRSubmitWizard"
export default (() => ALRSubmitWizard) satisfies QuartzComponentConstructor
