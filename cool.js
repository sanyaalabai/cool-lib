export async function copyTextToClipboard(text) {
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
export function seconds(t) {return t*1000;}
export function minutes(t) {return t*60*1000;}
export function hours(t) {return t*60*60*1000;}
/**
 * Requires time in milliseconds (use 'seconds(t)', 'minutes(t)', etc.).
 * 
 * Also required to be awaited.
*/
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/**Requires time in milliseconds (use 'seconds(t)', 'minutes(t)', etc.).*/
export async function executeDelayed(func, ms) {
  await delay(ms);
  func();
}
/**Fetches JSON by URL.*/
export async function getJSON(url, callback) {
  return new Promise((resolve) => {
    var xhr=new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType='json';
    
    xhr.onload=function() {
      var status=xhr.status;
      var result=callback(status===200?status:null, xhr.response);
      resolve(result);
    };
    xhr.onerror=function() {
      resolve(callback(null, null));
    };
    
    xhr.send();
  });
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
export function getRandomFloat(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}