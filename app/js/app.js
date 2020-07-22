
function getDataFromBackend() {
    let days = document.getElementById('days').value;
    if (days >= 1) {
        let request_data = {days: days};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const humanity = JSON.parse(this.response);
                createSimulation(humanity);
                document.getElementById('window').className = 'none';
                document.getElementById('message').className = 'block';
                document.getElementById('new-simulation').className = 'block';
            }
        };
        xmlhttp.open("POST", "index.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(JSON.stringify(request_data));
    }
}

function createSimulation(humanity) {
    let output_HTML = '';
    let next_day = 0;
    let statistics = [];

    for (let day of humanity) {
        statistics['uninfected'] = 0;
        statistics['infected'] = 0;
        statistics['cured'] = 0;
        if (next_day === 0) {
            output_HTML += '<h5>' + 'Тhe day before the virus.' + '</h5>';
        } else {
            output_HTML += '<h5>' + 'Day ' + next_day + '</h5>';
        }
        output_HTML += '<table>';
        for (let row of day) {
            output_HTML += '<tr>';
            for (let column of row) {
                switch (column) {
                    case 'u':
                        let div_uninfected = '<div class="uninfected">';
                        let uninfected_person = document.getElementsByClassName('uninfected');
                        output_HTML = createColumnWithEmoji(output_HTML, div_uninfected, uninfected_person,'uninfected',"&#xf11a;");
                        statistics['uninfected']++;
                        break;
                    case 'i':
                        let div_infected = '<div class="infected">';
                        let infected_person = document.getElementsByClassName('infected');
                        output_HTML = createColumnWithEmoji(output_HTML, div_infected, infected_person,'infected',"&#xf119;");
                        statistics['infected']++;
                        break;
                    case 'c':
                        let div_cured = '<div class="cured">';
                        let cured_person = document.getElementsByClassName('cured');
                        output_HTML = createColumnWithEmoji(output_HTML, div_cured, cured_person,'cured',"&#xf118;");
                        statistics['cured']++;
                        break;
                }
            }
            output_HTML += '</tr>';
        };
        output_HTML += '</table>';
        output_HTML +=  '<p class="cured">' + 'cured - ' + statistics['cured'] + '</p>';
        output_HTML +=  '<p class="infected">' + 'infected - ' + statistics['infected'] + '</p>';
        output_HTML +=  '<p class="uninfected">' + 'uninfected - ' + statistics['uninfected'] + '</p>';
        output_HTML += '</br>';
        next_day++;
        console.log(statistics);
        document.getElementById('world').innerHTML = output_HTML;
    }
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
    let tables = document.getElementById("world");
    tables.parentNode.removeChild(tables);
    let new_div = document.createElement("div");
    document.body.appendChild(new_div);
    new_div.className = 'fa';
    new_div.id = 'world';
    document.getElementById('window').className = 'block';
    document.getElementById('new-simulation').className = 'none';
    document.getElementById('message').className = 'none';
    document.getElementById('days').value = "";
}

