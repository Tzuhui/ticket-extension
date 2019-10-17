// 填入票數
let scripts = document.getElementsByTagName('script');
document.getElementById('TicketForm_verifyCode').focus();

for (let i = 0; i < scripts.length; i++) {
  let data = scripts[i].innerHTML;
  if (data.includes("TicketForm") && data.includes("mousedown")) {
    console.log("hit script " + i);

    if ($("#TicketForm_agree").length) {
      let agree_regexp = /TicketForm\[agree]\[(.{44})]/;
      let agree = agree_regexp.exec(data)[0];

      console.log("agree: " + agree);
      $("#TicketForm_agree").prop('checked', true).prop('name', agree);
    }

    if ($("#TicketForm_checked").length) {
      let ticketPrice_regexp = /TicketForm\[ticketPrice]\[(.{44})]/;
      let ticketPrice = ticketPrice_regexp.exec(data)[0];
      console.log("ticketPrice: " + ticketPrice);
      $("#TicketForm_checked").prop('name', ticketPrice);
    }
    break;
  }
}

let $ticket_options = $("#TicketForm select option");
if ($ticket_options.length) {
  chrome.storage.local.get({
    TicketNumber: 0
  }, items => {
      let doSelect = false;

      if (items.TicketNumber > 0) {
        $ticket_options.each(function() {
          if ($(this).val() == items.TicketNumber) {
            console.log("hit ticket number " + items.TicketNumber);
            $(this).prop('selected', true);
            doSelect = true;
            return false;
          }
        });
      }
      // if ticket number can't find or last
      if (doSelect == false) {
        $ticket_options.last().prop('selected', true);
        if (items.TicketNumber == 0) {
          console.log("hit last");
        } else {
          console.log("hit failed");
        }
      }
  });
}

