fetch('https://cdn-media.brightline.tv/training/demo.json')
    .then(response => response.json())
    .then(data => {
        const movies = data?.streams;
        let moviesHtml = ``;
        (movies ?? [])?.forEach((element, index) => {
            moviesHtml += `<div id="${index + 1}" class="video-item item ${index == 0 ? 'selected' : ''}">
                            <video src="${element?.mediaFile}" controls></video>
                            <h2>${element?.name}</h2>
                        </div>`
        });
        document.getElementById('videoContainer').innerHTML = moviesHtml;
        setTimeout(() => {
            const allVideos = document.querySelectorAll('video');
            allVideos.forEach((element) => {
                element.addEventListener('ended', () => {
                    if(document.fullscreenElement) {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.webkitExitFullscreen) { /* Safari */
                            document.webkitExitFullscreen();
                        } else if (document.msExitFullscreen) { /* IE11 */
                            document.msExitFullscreen();
                        }
                    }
                })
            });
        }, 1000);
    })
    .catch(error => console.error(error));


// event listener for checking if a key was pressed 
// to navigate between the items
document.addEventListener('keydown', function (event) {
    // getting the current selected item id
    const selectedItemId = parseInt(document.getElementsByClassName('selected')[0].id);
    if (event.keyCode === 37) {
        // Left arrow key
        if (selectedItemId && selectedItemId - 1 >= 1) {
            document.getElementById(selectedItemId).classList.remove('selected');
            document.getElementById(selectedItemId - 1).classList.add('selected');
        }
    } else if (event.keyCode === 39) {
        // Right arrow key
        if (selectedItemId && selectedItemId + 1 <= 4) {
            document.getElementById(selectedItemId).classList.remove('selected');
            document.getElementById(selectedItemId + 1).classList.add('selected');
        }
    } else if (event.keyCode === 8) {
        // Backspace key
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    } else if (event.keyCode === 13) {
        // enter key
        const videoElement = document.getElementById(selectedItemId).children[0];

        // Request fullscreen
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) {
            /* Safari */
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) {
            /* IE11 */
            videoElement.msRequestFullscreen();
        }
    }
});