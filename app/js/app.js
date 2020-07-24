
function getDataFromBackend() {
    let days = document.getElementById('days').value;
    let request_data = {days: days};
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const humanity = JSON.parse(this.response);
            createSimulation(humanity);
            document.getElementById('window').className = 'none';
            document.getElementById('message').className = 'block';
        } else if (this.readyState === 4 && this.status === 400) {
            const error = JSON.parse(this.response);
            let modal = document.getElementById('my-modal');
            let ok_button = document.getElementsByClassName("ok")[0];
            let message = document.getElementById('modal-message');
            message.style.color = 'red';

            modal.style.display = 'block';
            message.appendChild(document.createTextNode(error.message));
            ok_button.onclick = function () {
                modal.style.display = "none";
                message.innerHTML = '';
            }
        }
    };
    xmlhttp.open("POST", "index.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify(request_data));
}

function createSimulation(humanity) {
    let next_day = 0;
    let statistics = [];

    for (let day of humanity) {
        let output_HTML = '';
        let section = document.createElement('section');
        section.setAttribute('id', next_day);
        section.setAttribute('class', 'fa none');
        document.body.appendChild(section);

        statistics['uninfected'] = 0;
        statistics['infected'] = 0;
        statistics['cured'] = 0;

        switch (next_day) {
            case 0:
                output_HTML += '<h5>' + '</br>' + 'Тhe day before the virus.' + '</br>' + '</h5>';
                break;
            case 1:
                output_HTML += '<h5>' + 'Day ' + next_day + '</br>' + 'Placing the first infected.' + '</h5>';
                break;
            default:
                output_HTML += '<h5>' + '</br>' + 'Day ' + next_day + '</br>' + '</h5>';
        }
        output_HTML += '<table>';
        for (let row of day) {
            output_HTML += '<tr>';
            for (let column of row) {
                switch (column) {
                    case 'u':
                        let div_uninfected = '<div class="uninfected">';
                        let uninfected_person = document.getElementsByClassName('uninfected');
                        output_HTML = createColumnWithEmoji(output_HTML, div_uninfected, uninfected_person, 'uninfected', "&#xf11a;");
                        statistics['uninfected']++;
                        break;
                    case 'i':
                        let div_infected = '<div class="infected">';
                        let infected_person = document.getElementsByClassName('infected');
                        output_HTML = createColumnWithEmoji(output_HTML, div_infected, infected_person, 'infected', "&#xf119;");
                        statistics['infected']++;
                        break;
                    case 'c':
                        let div_cured = '<div class="cured">';
                        let cured_person = document.getElementsByClassName('cured');
                        output_HTML = createColumnWithEmoji(output_HTML, div_cured, cured_person, 'cured', "&#xf118;");
                        statistics['cured']++;
                        break;
                }
            }
            output_HTML += '</tr>';
        }
        output_HTML += '</table>';
        output_HTML += '<p class="cured">' + 'cured - ' + statistics['cured'] + '</p>';
        output_HTML += '<p class="infected">' + 'infected - ' + statistics['infected'] + '</p>';
        output_HTML += '<p class="uninfected">' + 'uninfected - ' + statistics['uninfected'] + '</p>';
        document.getElementById(next_day).innerHTML = output_HTML;
        next_day++;
    }
    slideshowDays(next_day);
}

function slideshowDays(days) {
    let day = 0;
    let next = setInterval(function(){
        if (day > 0) {
            document.getElementById(day - 1).className = 'none';
        }
        document.getElementById(day).className = 'fa block';
        day++;
        if(day === days) {
            clearInterval(next);
            document.getElementById('new-simulation').className = 'block';
            document.getElementById('message').className = 'none';
        }
    }, 2000);
}

function createColumnWithEmoji(html, div_with_class, person, status, emoji_code) {
    html += '<td>';
    html += div_with_class;
    person = emoji_code;
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
    document.getElementById('days').value = "";
}

