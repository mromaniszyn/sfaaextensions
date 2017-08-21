function save_options() {
  var sprintsChatter = document.getElementById('sprints-chatter').checked;
  chrome.storage.sync.set({
    sprintsChatter: sprintsChatter
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    sprintsChatter: true
  }, function(items) {
    document.getElementById('sprints-chatter').checked = items.sprintsChatter;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);