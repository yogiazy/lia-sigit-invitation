function ambilNamaDariURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const nama = urlParams.get("untuk");
    return nama;
}

function gantiTeks() {
    const nama = ambilNamaDariURL();
    if (nama) {
        document.getElementById("namaTamu").textContent = nama;
    }
}

window.addEventListener("load", gantiTeks);

const musicPlayer = document.querySelector('.music-player');
const playButton = document.querySelector('.play-button');
const myaudio = document.querySelector('#my-audio');

let isPlaying = true;

playButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
});

function playAudio() {
    isPlaying = true;
    musicPlayer.classList.add('playing');
    playButton.innerHTML = '<i class="bx bx-headphone"></i>';
    myaudio.play();
}

function pauseAudio() {
    isPlaying = false;
    musicPlayer.classList.remove('playing');
    playButton.innerHTML = '<i class="bx bx-caret-right"></i>';
    myaudio.pause();
}

myaudio.addEventListener('ended', () => {
    pauseAudio();
});

$(document).ready(function () {
    $("#kirim_btn").on("click", function (e) {
        e.preventDefault();
        if ($("#myName").val() === '') {
            return alert('Nama Harus Diisi');
        }
        if ($("#myQuotes").val() === '') {
            return alert('Pesan Harus Diisi');
        }

        $(this).html('Mengirim Pesan...');
        var btn = $(this);
        btn.attr("disabled", "disabled");

        let http = new XMLHttpRequest();
        http.open("GET", "https://icloud.yogiazy.iotflows.com/lia-sigit?nama=" + $('#myName').val() + "&pesan=" + $('#myQuotes').val(), true);

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $("#ucapanTamu").prepend('<div class="wish">' +
                    '<div class="wish-badge">' +
                    '<h6>' + $('#myName').val().substring(0, 1) + '</h6></div>' +
                    '<div class="wish-description">' +
                    '<h6 style="font-size:1.17rem;">' + $('#myName').val() + '</h6>' +
                    '<p>' + $('#myQuotes').val() + '</p></div></div>');

                setTimeout(function () {
                    btn.html('Terima kasih atas doa dan ucapannya');
                    setTimeout(function () {
                        btn.html('Kirim');
                        btn.attr("disabled", false);
                    }, 2000);
                }, 1000);
            }
        };

        http.send();
    });
});


document.addEventListener('DOMContentLoaded', function () {
    var http = new XMLHttpRequest();
    http.open("GET", "https://icloud.yogiazy.iotflows.com/reloadTamu?reload=sukses", true);
    http.send();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var len = data.length;
            for (var i = 0; i < len; i++) {
                $("#ucapanTamu").prepend('<div class="wish">' +
                    '<div class="wish-badge">' +
                    '<h6>' + data[i].nama.substring(0, 1) + '</h6></div>' +
                    '<div class="wish-description">' +
                    '<h6 style="font-size:1.17rem;">' + data[i].nama + '</h6>' +
                    '<p>' + data[i].pesan + '</p></div></div>');
            }
        }
    }
});

document.getElementById('salin_btn').addEventListener('click', function () {
    var noRekening = document.getElementById('no_rekening');
    var range = document.createRange();
    range.selectNodeContents(noRekening);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    document.getElementById('salin_btn').textContent = 'Nomor Tersalin!'
});