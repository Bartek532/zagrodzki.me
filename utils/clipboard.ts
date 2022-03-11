export const copyToClipboard = async (text: string) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
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
