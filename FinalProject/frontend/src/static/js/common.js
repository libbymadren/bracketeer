export let currentUser = await getCurrentUser();
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    fetch('/api/users/current').then(response => {
      if (response.status == 200) {
        return response.json();
      }
    }).then(json => {
      resolve(json);
    }).catch(err => {
      console.error(err);
      window.location = "/error";
    });
  })
}

function registerServiceWorker() {
  if (!navigator.serviceWorker) { // Are SWs supported?
    return;
  }
  console.log("service workers are supported");

  navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
    if (!navigator.serviceWorker.controller) {
      //Our page is not yet controlled by anything. It's a new SW
      console.log("new service worker");
      return;
    }

    if (registration.installing) {
      console.log('Service worker installing');
    } else if (registration.waiting) {
      console.log('Service worker installed, but waiting');
    } else if (registration.active) {
      console.log('Service worker active');
    }

    // add event listener to check for updates
    registration.addEventListener('updatefound', () => {
      console.log("SW update found", registration, navigator.serviceWorker.controller);
      newServiceWorkerReady(registration.installing);
    });

  }).catch(error => {
    console.error(`Registration failed with error: ${error}`);
  });

  navigator.serviceWorker.addEventListener('message', event => {
    console.log('SW message', event.data);
  })

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload" in dev tools.
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if(refreshing) return;
    window.location.reload();
    refreshing = true;
  });

}
  
registerServiceWorker();
  
  
//This method is used to notify the user of a new version
function newServiceWorkerReady(worker) {
  const popup =  document.createElement('div');
  popup.className = "popup";
  popup.innerHTML = '<div>New Version Available</div>';

  const buttonOk = document.createElement('button');
  buttonOk.innerHTML = 'Update';
  buttonOk.addEventListener('click', e => {
    worker.postMessage({action: 'skipWaiting'});
  });
  popup.appendChild(buttonOk);

  const buttonCancel = document.createElement('button');
  buttonCancel.innerHTML = 'Dismiss';
  buttonCancel.addEventListener('click', e => {
    document.body.removeChild(popup);
  });
  popup.appendChild(buttonCancel);

  document.body.appendChild(popup);
}