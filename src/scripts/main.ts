if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  const priceDlg = document.getElementById('priceModal') as HTMLDialogElement | null;
  const priceBtn = document.querySelector<HTMLButtonElement>('[data-open-prices]');
  if (priceDlg && priceBtn) {
    priceBtn.addEventListener('click', () => priceDlg.showModal());
    priceDlg.querySelector<HTMLButtonElement>('.close')
      ?.addEventListener('click', () => priceDlg.close());
  }

  const eyeDlg = document.getElementById('eyeModal') as HTMLDialogElement | null;
  const eyeBtn = document.querySelector<HTMLButtonElement>('[data-open-eye-treatment]');
  if (eyeDlg && eyeBtn) {
    eyeBtn.addEventListener('click', () => eyeDlg.showModal());
    eyeDlg.querySelector<HTMLButtonElement>('.close')
      ?.addEventListener('click', () => eyeDlg.close());
  }

  const form = document.querySelector('.newsletter-form') as HTMLFormElement | null;
  if (!form) return;

  const inputs = Array.from(
    form.querySelectorAll<HTMLInputElement>('input[name]')
  );

  const messageFor = (input: HTMLInputElement): string => {
    if (input.validity.valueMissing) return 'This field is required.';
    if (input.validity.typeMismatch && input.type === 'email') return 'Please enter a valid email address.';
    if (input.validity.tooShort) {
      const min = input.getAttribute('minlength') ?? '2';
      return `Please enter at least ${min} characters.`;
    }
    return input.validationMessage;
  };

  const updateError = (input: HTMLInputElement) => {
    const errorEl = input.nextElementSibling as HTMLElement | null;
    if (!errorEl) return;

    if (input.validity.valid) {
      input.classList.remove('is-invalid');
      errorEl.textContent = '';
    } else {
      input.classList.add('is-invalid');
      errorEl.textContent = messageFor(input);
    }
  };

  inputs.forEach((input) => {
    input.addEventListener('input', () => updateError(input));
    input.addEventListener('blur', () => updateError(input));
  });

  form.addEventListener('submit', (e) => {
    inputs.forEach(updateError);

    const firstInvalid = inputs.find(i => !i.validity.valid);

    if (firstInvalid) {
      e.preventDefault();
      firstInvalid.focus();   
    }
  });
});

window.addEventListener('pageshow', () => {
  (document.querySelector('.newsletter-form') as HTMLFormElement | null)?.reset();
});

export { };
