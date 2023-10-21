
function typeText(_text) {
    $('#vector_textID').empty()
    const txt = _text;
    const outputDiv = document.getElementById('vector_textID');
    const splittedTxt = txt.split('<np>');
    let pElements = [];
    splittedTxt.forEach((item, index) => {
        const p = document.createElement('p');
        outputDiv.appendChild(p);
    });
    const allParas = outputDiv.querySelectorAll('p');
    let i = 0;
    let currentPara = 0;
    const timerId = setInterval(() => {
        allParas[currentPara].innerHTML += splittedTxt[currentPara].charAt(i);
        i++;
        if (i === splittedTxt[currentPara].length) {
            currentPara++;
            i = 0;
            if (currentPara === splittedTxt.length) {
                clearInterval(timerId);
            }
        }
    }, 50);
}

typeText(`Learn from industry experts, gain hands-on experience through interactive projects, and join a thriving
learner community.<np> With flexible schedules and up-to-date content, PractCode is your platform to master
programming.`)