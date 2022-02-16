export const copyToClipboard = (text: string) =>
  new Promise((resolve, reject) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text).then(resolve).catch(reject);
    } else {
      try {
        const body = document.querySelector("body");

        const textarea = document.createElement("textarea");
        body?.appendChild(textarea);

        textarea.value = text;
        textarea.select();
        document.execCommand("copy");

        body?.removeChild(textarea);

        resolve(text);
      } catch (e) {
        reject(e);
      }
    }
  });
