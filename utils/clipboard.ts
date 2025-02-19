export const copyToClipboard = async (text: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
  } else {
    const body = document.querySelector("body");

    const textarea = document.createElement("textarea");
    body?.appendChild(textarea);

    textarea.value = text;
    textarea.select();
    document.execCommand("copy");

    body?.removeChild(textarea);
  }
};
