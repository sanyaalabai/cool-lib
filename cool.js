const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard successfully!");
  } catch (error) {
    console.error("Failed to copy text:", error);
    window.prompt(
      "To copy text press: Ctrl+C, Enter",
      text
    );
  }
};
function seconds(t) {return t*1000;}
function minutes(t) {return t*60*1000;}
function hours(t) {return t*3600*1000;}
///Requires time in milliseconds (use 'seconds(t)', 'minutes(t)', etc.).
///Also required to be awaited.
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
///Requires time in milliseconds (use 'seconds(t)', 'minutes(t)', etc.).
async function executeDelayed(func, ms) {
  await delay(ms);
  func();
}