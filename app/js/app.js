function createColumnWithEmoji(html, div_with_class, person, status, emoji_code) {
    html += '<td>';
    html += div_with_class;
    person = emoji_code;
    html += person;
    html += '</div>';
    html += '</td>';
    return html;
}
function createSimulation() {
    let days = document.getElementById('days').value;
    if (days >= 1) {
        let request_data = {days: days};
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const humanity = JSON.parse(this.response);
                let output_HTML = '';

                for (let day of humanity) {
                    output_HTML += '<table>';
                    for (let row of day) {
                        output_HTML += '<tr>';
                        for (let column of row) {
                            switch (column) {
                                case 'u':
                                    output_HTML = createColumnWithEmoji
                                    (
                                        output_HTML,
                                        '<div class="fa uninfected">',
                                        document.getElementsByClassName('uninfected'),
                                        'uninfected',
                                        "&#xf11a;"
                                    );
                                    break;
                                case 'i':

                                    output_HTML = createColumnWithEmoji
                                    (
                                        output_HTML,
                                        '<div class="fa infected">',
                                        document.getElementsByClassName('infected'),
                                        'infected',
                                        "&#xf119;"
                                    );
                                    break;
                                case 'c':
                                    output_HTML = createColumnWithEmoji
                                    (
                                        output_HTML,
                                        '<div class="fa cured">',
                                        document.getElementsByClassName('cured'),
                                        'cured',
                                        "&#xf118;"
                                    );
                                    break;
                            }
                        }
                        output_HTML += '</tr>';
                    }
                    output_HTML += '</table>';
                    output_HTML += '</br>';
                    document.getElementById('world').innerHTML = output_HTML;
                }
            }
        };
        xmlhttp.open("POST", "index.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(JSON.stringify(request_data));
    }
}
