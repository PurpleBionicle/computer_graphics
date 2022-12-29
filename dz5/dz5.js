let b = document.getElementById("canvasB");
let a = document.getElementById("canvasA");

let ctxB = b.getContext("2d");
let ctxA = a.getContext("2d");

let img = new Image();
img.crossOrigin = "Anonymous";
img.src = "https://cdn23.img.ria.ru/images/148393/85/1483938540_0:252:2844:1863_600x0_80_0_0_f355f2ad2e218a9d5318687557f2c0b3.jpg";
img.onload = getFiltered;

function getFiltered() {
    b.width = a.width = img.naturalWidth;
    b.height = a.height = img.naturalHeight;

    ctxB.drawImage(img, 0, 0);

    let dataB = ctxB.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
    let dataA = ctxA.createImageData(img.naturalWidth, img.naturalHeight);

    // Основная функция фильтра
    function filter(x, y, dataOld, dataNew) {
        if (x === 0 || x === img.naturalWidth - 1 || y === 0 || y === img.naturalHeight - 1) {
            for (let ch = 0; ch < 4; ++ch) {
                let pFst = get(x, y, ch);
                dataNew[pFst] = 0;
            }
            return;
        }

        let matrix = [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ];

        let sumX = [0, 0, 0];
        let sumY = [0, 0, 0];

        for (let ch = 0; ch < 3; ++ch) {
            for (let dy = -1; dy <= 1; ++dy) {
                for (let dx = -1; dx <= 1; ++dx) {
                    let pFst = get(x + dx, y + dy, ch);
                    sumX[ch] += dataOld[pFst] * matrix[dx + 1][dy + 1];
                    sumY[ch] += dataOld[pFst] * matrix[dy + 1][dx + 1];
                }
            }
        }

        // Сумма
        let sumAll =
            Math.sqrt(sumX[0] * sumX[0] + sumY[0] * sumY[0]) +
            Math.sqrt(sumX[1] * sumX[1] + sumY[1] * sumY[1]) +
            Math.sqrt(sumX[2] * sumX[2] + sumY[2] * sumY[2]);
        sumAll = sumAll / 5;

        let pSec = get(x, y, 0);
        dataNew[pSec] = sumAll;
        dataNew[pSec + 1] = sumAll;
        dataNew[pSec + 2] = sumAll;
        dataNew[pSec + 3] = 255;
    }

    for (let y = 0; y < img.naturalHeight; ++y) {
        for (let x = 0; x < img.naturalWidth; ++x) {
            filter(x, y, dataB.data, dataA.data);
        }
    }

    ctxA.putImageData(dataA, 0, 0);

    // Вспомогательная функция get()
    function get(x, y, pFst) {
        return (y * img.naturalWidth + x) * 4 + pFst;
    }
}
