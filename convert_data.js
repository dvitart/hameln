/**
 * Hameln Data Converter
 * This script fetches data from two Google Sheets (Timetable and Workshop Details),
 * merges them using unique IDs, and outputs a JSON file suitable for the Hameln App.
 * 
 * Usage: node convert_data.js
 */

const fs = require('fs');

const TIMETABLE_CSV_URL = 'https://docs.google.com/spreadsheets/d/1N01z67kji_lReyBoVn0Uh18q5FOa5x2mLclceq1WtjI/export?format=csv&gid=1812892397';
const WORKSHOPS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSY24UZ5yWEh5zmtL5y_kyEbgpRJFTiE8ZgonH6XurZViY_gmZFWPnayGP9dGnheCT5N2EjjPUUtG3a/pub?gid=1187319932&single=true&output=csv';

const locationMapping = {
    2: 'loc_1',
    3: 'loc_1a',
    4: 'loc_2',
    5: 'loc_3',
    6: 'loc_4',
    7: 'loc_7',
    8: 'loc_8',
    9: 'loc_10',
    10: 'loc_11'
};

function parseCSV(text) {
    // Simple CSV parser for Node.js without dependencies
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentCell += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentCell.trim());
            currentCell = '';
        } else if (char === '\n' && !inQuotes) {
            currentRow.push(currentCell.trim());
            rows.push(currentRow);
            currentRow = [];
            currentCell = '';
        } else if (char === '\r' && !inQuotes) {
            // skip
        } else {
            currentCell += char;
        }
    }
    if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
    }
    return rows;
}

function formatTime(time) {
    if (!time) return "00:00";
    time = time.trim();
    if (time.match(/^\d{1}:\d{2}$/)) return '0' + time;
    return time;
}

function addOneHour(time) {
    const [h, m] = time.split(':').map(Number);
    return `${String((h + 1) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function extractEventId(content) {
    const idMatch = content.match(/\(W(\d+)\)/);
    return idMatch ? idMatch[0].replace(/[()]/g, '') : null;
}

async function convert() {
    console.log("Fetching data...");

    try {
        const [timetableRes, workshopsRes] = await Promise.all([
            fetch(TIMETABLE_CSV_URL).then(r => r.text()),
            fetch(WORKSHOPS_CSV_URL).then(r => r.text())
        ]);

        const timetableRows = parseCSV(timetableRes);
        const workshopsRows = parseCSV(workshopsRes);

        // Map Workshop Details by ID
        const workshopDetails = {};
        for (let i = 1; i < workshopsRows.length; i++) {
            const row = workshopsRows[i];
            const id = row[0]; // ID column
            if (id && id.startsWith('W')) {
                workshopDetails[id] = {
                    title_ru: row[2],
                    description_ru: row[5],
                    url: row[11]
                };
            }
        }

        const schedule = {};
        let currentDayKey = null;

        for (let i = 3; i < timetableRows.length; i++) {
            const row = timetableRows[i];
            
            // Date detection
            if (row[2] && row[2].includes('.')) {
                const dateMatch = row[2].match(/(\d{2})\.(\d{2})\.(\d{4})/);
                if (dateMatch) {
                    currentDayKey = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
                    schedule[currentDayKey] = {
                        dayLabel_de: "",
                        dayLabel_ru: row[2].split(',')[0].trim(),
                        fullDayDescription_ru: row[2],
                        events: []
                    };
                    continue;
                }
            }

            const timeStr = row[1];
            if (timeStr && timeStr.includes(':') && currentDayKey) {
                // Location columns
                for (let colIndex = 2; colIndex <= 10; colIndex++) {
                    const content = row[colIndex];
                    if (content && content.trim()) {
                        const eventId = extractEventId(content);
                        const title = content.replace(/\(W\d+\)/, '').trim();
                        
                        const event = {
                            eventId,
                            title_ru: title,
                            eventType: 'workshop',
                            description_ru: "",
                            url: "",
                            locationId: locationMapping[colIndex],
                            startTime: formatTime(timeStr.split('-')[0].trim()),
                            endTime: timeStr.includes('-') ? formatTime(timeStr.split('-')[1].trim()) : addOneHour(formatTime(timeStr.split('-')[0].trim()))
                        };

                        // Merge with details if ID matches
                        if (eventId && workshopDetails[eventId]) {
                            event.description_ru = workshopDetails[eventId].description_ru;
                            event.url = workshopDetails[eventId].url;
                            if (!event.title_ru) event.title_ru = workshopDetails[eventId].title_ru;
                        }

                        schedule[currentDayKey].events.push(event);
                    }
                }

                // Other place
                if (row[11] && row[11].trim()) {
                    const content = row[11];
                    const eventId = extractEventId(content);
                    const title = content.replace(/\(W\d+\)/, '').trim();
                    const event = {
                        eventId,
                        title_ru: title,
                        eventType: 'workshop',
                        description_ru: "",
                        url: "",
                        locationId: null,
                        startTime: formatTime(timeStr.split('-')[0].trim()),
                        endTime: timeStr.includes('-') ? formatTime(timeStr.split('-')[1].trim()) : addOneHour(formatTime(timeStr.split('-')[0].trim()))
                    };
                    if (eventId && workshopDetails[eventId]) {
                        event.description_ru = workshopDetails[eventId].description_ru;
                        event.url = workshopDetails[eventId].url;
                    }
                    schedule[currentDayKey].events.push(event);
                }
            }
        }

        const output = {
            eventInfo: {
                eventName: "Hameln",
                startDate: "2026-05-13",
                endDate: "2026-05-17",
                mainLanguage: "ru"
            },
            schedule: schedule
        };

        fs.writeFileSync('timetable.json', JSON.stringify(output, null, 2));
        console.log("Conversion complete! timetable.json has been updated.");

    } catch (err) {
        console.error("Conversion failed:", err);
    }
}

convert();
