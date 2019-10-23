// 進入票券詳細頁面

$('body').append(`<div class="h_popup_outbox">
  <a id="h_open" class="h_open" href="#"><i id="h_icon" class="fa fa-times"></i></a>\
  <div class="h_popup">
    <p id="status"></p>
    <p id="eventId"></p>
    <button class="btn btn-next" id="startFight">開始搶票！！</button>
  </div>
</div>`);

// 收合
$('#h_open').on('click', function(e) {
  e.preventDefault();
  $('#h_icon').toggleClass('fa-times').toggleClass('fa-plus');
  $('.h_popup').slideToggle();
});

// 取得 option.html 頁面的設定項目
chrome.storage.local.get(['TicketNumber', 'ProgramDate', 'ProgramSit'], function(result) {
  document.getElementById('status').innerHTML = '所選日期：'+ result.ProgramDate +
  '<br>' +'張數：'+ result.TicketNumber +
  '<br>' +'票區選擇'+ result.ProgramSit;
});

let githubURL = new URL(window.location);
if (githubURL.searchParams.toString() == 'go=1') {
  startLoad()
}

document.getElementById('startFight').addEventListener('click', startLoad);
function startLoad() {
  console.log('call')
  if ($(".activityContent ul.list-inline a").attr("href").match(/activity\/game\//)) {  
    // 當立即購票按鈕點擊後 href 有 activity game
    $.get($(".activityContent ul.list-inline a").attr("href"), function(response) {
        $("#gameListContainer").html(response);

        chrome.storage.local.get(['ProgramDate'], items => {
            let dstr = items.ProgramDate.replace(/-/g, "/");
            let target = $(".normal td:contains('" + dstr + "')").first();
            if (target.length>0) {
              let link = target.parent().find("input:button").attr("data-href");
              if (link) {
                const eventId = link.split("/");
                chrome.storage.local.set({'eventId': eventId[eventId.length-1] }, function() {
                  document.getElementById('eventId').textContent = eventId[eventId.length-1];
                });
                location.href = link;
              } else {
                console.log("not found link!");
              }
            } else {
              console.log("not found program!");
            }
        });
    });
  } else {
    if (githubURL.searchParams.toString() == '') {
      window.location.href = window.location + '?go=1';
    }else {
      window.location.href = window.location;
    }
  }
}
