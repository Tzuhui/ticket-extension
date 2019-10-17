// Saves options to chrome.storage
function save_options() {
  var ProgramDate = document.getElementById('ProgramDate').value;
  var ProgramSit = document.getElementById('ProgramSit').value;
  var tselect = document.getElementById('TicketNumber');
  var TicketNumber = tselect.options[tselect.selectedIndex].value;

  chrome.storage.local.set({
    'ProgramDate': ProgramDate,
    'TicketNumber': TicketNumber,
    'ProgramSit': ProgramSit,
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}
// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get(['ProgramDate','TicketNumber','ProgramSit'], items => {
    if (items) {
      document.getElementById('ProgramDate').value = items.ProgramDate;
      document.getElementById('ProgramSit').value = items.ProgramSit;
      document.getElementById('TicketNumber').selectedIndex = items.TicketNumber;
    }
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);