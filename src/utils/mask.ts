export const Mask = {
  formatCurrency: (value: number) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatter.format(value);
  },
  formatCurrencyFromCents: (cents: number) => {
    if (cents === 0) {
      return Mask.formatCurrency(0);
    }
    const valueInReais = cents / 100.0;
    return Mask.formatCurrency(valueInReais);
  },
  maskString: (value: string, pattern: string) => {
    if (!value || !pattern) {
      return "";
    }
    let i = 0;
    let masked = "";
    const v = value.toString();
    for (let j = 0; j < pattern.length; j++) {
      if (i >= v.length) break;
      if (pattern[j] === "#") {
        masked += v[i++];
      } else {
        masked += pattern[j];
      }
    }
    return masked;
  },

  maskCpf: (value: string) => {
    const cleanedText = value.replace(/\D/g, "");

    let maskedText = "";
    for (let i = 0; i < cleanedText.length; i++) {
      if (i === 3 || i === 6) {
        maskedText += ".";
      }
      if (i === 9) {
        maskedText += "-";
      }
      if (i === 11) {
        break;
      }
      maskedText += cleanedText[i];
    }

    return maskedText;
  },
  maskPhone: (value: string) => {
    if (!value) {
      return "";
    }
    const v = value.replace(/\D/g, "");
    return Mask.maskString(v, "(##) #####-####");
  },
  maskBirthday: (value: string) => {
    if (!value) {
      return "";
    }
    const v = value.replace(/\D/g, "");
    return Mask.maskString(v, "##/##/####");
  },
  tranformMaskBirthdayInUs: (value: string) => {
    if (!value) {
      return "";
    }
    const v = value.replace(/\D/g, "");
    return `${v.substring(4, 8)}-${v.substring(2, 4)}-${v.substring(0, 2)}`;
  },
  clearMask: (value: string) => {
    if (!value) {
      return "";
    }
    const v = value.replace(/\D/g, "");
    return v;
  },
};
