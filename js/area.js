// 選座位
$("ul.area-list > li:not(:has(a))").hide();

let actualCode = `
setTimeout(function() {
  document.dispatchEvent(new CustomEvent('connectExtension', {detail: areaUrlList}));
}, 0);
`;
let script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);

// Event listener
var choosed_sit;
chrome.storage.local.get(['ProgramSit', 'eventId'], items => {
  choosed_sit = `${items.eventId}_${items.ProgramSit}`;
});
document.addEventListener('connectExtension', function(e) {
  if (e.detail[choosed_sit]) {
    window.location.href = 'https://tixcraft.com' + e.detail[choosed_sit];
  } else {
    window.location.href = 'https://tixcraft.com' + e.detail[Object.keys(e.detail)[0]];
  }
});