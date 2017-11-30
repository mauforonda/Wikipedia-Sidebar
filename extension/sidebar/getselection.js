var selected = window.getSelection().toString();
browser.runtime.sendMessage({"selected" : selected});
