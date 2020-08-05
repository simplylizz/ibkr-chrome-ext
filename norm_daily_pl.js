// we are talking about chrome of course
console.log("CPU cycles destroying machine has been activated!");

dailyPlIdx = -1;
positionIdx = -1;
avgPriceIdx = -1;
initialized = false;


setInterval(function () {
    table = document.getElementById('cp-ptf-positions-table0');

    if (!table) {
        return;
    }
    rows = table.rows;

    if (!initialized) {
        if (rows.length < 2) {
            return;
        }

        tableHeader = rows[0].cells;

        for (i = 0; i < tableHeader.length; i++) {
            if (tableHeader[i].textContent.indexOf("Position") !== -1) {
                positionIdx = i;
                if (dailyPlIdx != -1) { // going to insert a col after P&L
                    positionIdx++;
                }
            } else if (tableHeader[i].textContent.indexOf('Avg Price') !== -1){
                avgPriceIdx = i;
                if (dailyPlIdx != -1) { // going to insert a col after P&L
                    avgPriceIdx++;
                }
            } else if (tableHeader[i].textContent.indexOf('Daily P&L') !== -1) {
                dailyPlIdx = i;
            }
        }

        // console.log(positionIdx, avgPriceIdx, dailyPlIdx);
        if (dailyPlIdx == -1 || avgPriceIdx == -1 || positionIdx == -1) {
            return
        }

        normalizedDailyPlIdx = dailyPlIdx+1;
        normalizedDailyPlIdx = rows[0].cells.length;
        rows[0].insertCell(normalizedDailyPlIdx).outerHTML = '<th><span class="_thc">Daily P&L %</span></th>';
        for (i = 1; i < table.length; i++) {
            rows[dailyPlIdx].insertCell(normalizedDailyPlIdx).outerHTML = '<td><span class="_thc">...</span></td>';
        }

        initialized = true;
    }

    if (initialized) {
        // console.log("setting norm pl");
        for (i = 1; i < rows.length; i++) {
            cells = rows[i].cells;
    
            dailyPl = parseFloat(cells[dailyPlIdx].innerText);
            position = parseInt(cells[positionIdx].innerText);
            avgPrice = parseFloat(cells[avgPriceIdx].innerText);

            console.log("dpl", dailyPl);
            console.log("pos", position);
            console.log("avg", avgPrice);
   
            normalizedDailyPl = dailyPl / (position * avgPrice) * 100;
            
            cells[normalizedDailyPlIdx].innerHTML ='<span>' + normalizedDailyPl.toFixed(2) + '%</span>';
        }
    }

}, 5000);
