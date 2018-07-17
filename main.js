try {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    console.log('registered', registration);
  }).catch(function(error) {
    console.log('error', error);
  });
} catch (e) {
  //
}
