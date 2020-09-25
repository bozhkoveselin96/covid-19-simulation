
function getDataFromBackend() {
    const days = document.getElementById('days').value;
    const requestData = {days: days};
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const humanity = JSON.parse(this.response);
            createSimulation(humanity);
            document.getElementById('window').className = 'none';
            document.getElementById('message').className = 'block';
        } else if (this.readyState === 4 && this.status === 400) {
            const error = JSON.parse(this.response);
            const modal = document.getElementById('my-modal');
            const okButton = document.getElementsByClassName("ok")[0];
            const message = document.getElementById('modal-message');
            message.style.color = 'red';
            modal.style.display = 'block';
            message.appendChild(document.createTextNode(error.message));
            okButton.onclick = function () {
                modal.style.display = "none";
                message.innerHTML = '';
            }
        }
    };
    xmlhttp.open("POST", "index.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(requestData));
}

function createSimulation(humanity) {
    let nextDay = 0;
    const statistics = [];

    for (let day of humanity) {
        let outputHTML = '';
        let section = document.createElement('section');
        section.setAttribute('id', `${nextDay}`);
        section.setAttribute('class', 'fa none');
        document.body.appendChild(section);

        statistics['uninfected'] = 0;
        statistics['infected'] = 0;
        statistics['cured'] = 0;

        switch (nextDay) {
            case 0:
                outputHTML += '<h5>' + '</br>' + 'Тhe day before the virus.' + '</br>' + '</h5>';
                break;
            case 1:
                outputHTML += '<h5>' + 'Day ' + nextDay + '</br>' + 'Placing the first infected.' + '</h5>';
                break;
            default:
                outputHTML += '<h5>' + '</br>' + 'Day ' + nextDay + '</br>' + '</h5>';
        }
        outputHTML += '<table>';
        for (let row of day) {
            outputHTML += '<tr>';
            for (let column of row) {
                switch (column) {
                    case 'u':
                        const divUninfected = '<div class="uninfected">';
                        const uninfectedPerson = document.getElementsByClassName('uninfected');
                        outputHTML = createColumnWithEmoji(outputHTML, divUninfected, uninfectedPerson, 'uninfected', "&#xf11a;");
                        statistics['uninfected']++;
                        break;
                    case 'i':
                        const divInfected = '<div class="infected">';
                        const infectedPerson = document.getElementsByClassName('infected');
                        outputHTML = createColumnWithEmoji(outputHTML, divInfected, infectedPerson, 'infected', "&#xf119;");
                        statistics['infected']++;
                        break;
                    case 'c':
                        let divCured = '<div class="cured">';
                        let curedPerson = document.getElementsByClassName('cured');
                        outputHTML = createColumnWithEmoji(outputHTML, divCured, curedPerson, 'cured', "&#xf118;");
                        statistics['cured']++;
                        break;
                }
            }
            outputHTML += '</tr>';
        }
        outputHTML += '</table>';
        outputHTML += '<p class="cured">' + 'cured - ' + statistics['cured'] + '</p>';
        outputHTML += '<p class="infected">' + 'infected - ' + statistics['infected'] + '</p>';
        outputHTML += '<p class="uninfected">' + 'uninfected - ' + statistics['uninfected'] + '</p>';
        document.getElementById(`${nextDay}`).innerHTML = outputHTML;
        nextDay++;
    }
    slideshowDays(nextDay);
}

function slideshowDays(days) {
    let day = 0;
    let next = setInterval(function(){
        if (day > 0) {
            document.getElementById(`${day - 1}`).className = 'none';
        }
        document.getElementById(`${day}`).className = 'fa block';
        day++;
        if(day === days) {
            clearInterval(next);
            document.getElementById('new-simulation').className = 'block';
            document.getElementById('message').className = 'none';
        }
    }, 2000);
}

function createColumnWithEmoji(html, divWithClass, person, status, emojiCode) {
    html += '<td>';
    html += divWithClass;
    person = emojiCode;
    html += person;
    html += '</div>';
    html += '</td>';
    return html;
}

function createNewSimulation() {
    let table = document.getElementsByTagName("section"), index;
    for (index = table.length - 1; index >= 0; index--) {
        table[index].parentNode.removeChild(table[index]);
    }
    document.getElementById('window').className = 'block';
    document.getElementById('new-simulation').className = 'none';
    document.getElementById('message').className = 'none';
    document.getElementById('days').value = '';
}

