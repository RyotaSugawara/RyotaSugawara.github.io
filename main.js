function registerServiceWorker() {
  try {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('registered', registration);
    }).catch(function(error) {
      console.log('error', error);
    });
  } catch (e) {
    //
  }
}

function handleAddToHomeScreen() {
  var deferredPrompt;
  var container = document.getElementById('button_container');
  var button = document.createElement('button');
  button.textContent = 'ADD TO HOMESCREEN';
  // get a prompt
  window.addEventListener('beforeinstallprompt', function(e) {
    console.log('beforeinstallprompt fired');
    e.preventDefault();
    deferredPrompt = e;
    container.appendChild(button);
    return false;
  });
  button.addEventListener('click', () => {
    if (deferredPrompt !== undefined) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);

        if (choiceResult.outcome === 'dismissed') {
          console.log('User canceled home screen install');
        } else {
          console.log('User added to home screen');
        }
      });

      deferredPrompt = null;
      button.disabled = true;
    }
  });
}

function main() {
  registerServiceWorker();
  handleAddToHomeScreen();
}

window.onload = function() {
  main();
}

