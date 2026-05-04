/**
 * Hameln Data Converter (Browser Compatible)
 * Centralized logic for merging Google Sheets CSV data into a usable JSON structure.
 */

const HamelnConverter = {
    locationMapping: {
        2: 'loc_1',
        3: 'loc_1a',
        4: 'loc_2',
        5: 'loc_3',
        6: 'loc_4',
        7: 'loc_7',
        8: 'loc_8',
        9: 'loc_10',
        10: 'loc_11'
    },

    parseCSV: function (text) {
        if (typeof Papa !== 'undefined') {
            const result = Papa.parse(text, { skipEmptyLines: true });
            return result.data;
        }
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
    },

    formatTime: function (time) {
        if (!time) return "00:00";
        time = time.trim();
        if (time.match(/^\d{1}:\d{2}$/)) return '0' + time;
        return time;
    },

    addOneHour: function (time) {
        const [h, m] = time.split(':').map(Number);
        return `${String((h + 1) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    },

    extractEventId: function (content) {
        if (!content) return null;
        const idMatch = content.match(/\(W(\d+)\)/);
        return idMatch ? idMatch[0].replace(/[()]/g, '') : null;
    },

    convert: function (timetableCsv, workshopsCsv) {
        const timetableRows = this.parseCSV(timetableCsv);
        const workshopsRows = this.parseCSV(workshopsCsv);

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
            const dateStr = (row[1] && row[1].match(/\d{2}\.\d{2}\.\d{4}/)) ? row[1] : ((row[2] && row[2].match(/\d{2}\.\d{2}\.\d{4}/)) ? row[2] : null);
            if (dateStr) {
                const dateMatch = dateStr.match(/(\d{2})\.(\d{2})\.(\d{4})/);
                if (dateMatch) {
                    currentDayKey = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}`;
                    schedule[currentDayKey] = {
                        dayLabel_de: "",
                        dayLabel_ru: dateStr.split(',')[0].trim(),
                        fullDayDescription_ru: dateStr.trim(),
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
                        const eventId = this.extractEventId(content);
                        const title = content.replace(/\(W\d+\)/, '').trim();

                        const event = {
                            eventId,
                            title_ru: title,
                            eventType: 'workshop',
                            description_ru: "",
                            url: "",
                            locationId: this.locationMapping[colIndex],
                            startTime: this.formatTime(timeStr.split('-')[0].trim()),
                            endTime: timeStr.includes('-') ? this.formatTime(timeStr.split('-')[1].trim()) : this.addOneHour(this.formatTime(timeStr.split('-')[0].trim()))
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

                // Other place (col 11)
                if (row[11] && row[11].trim()) {
                    const content = row[11];
                    const eventId = this.extractEventId(content);
                    const title = content.replace(/\(W\d+\)/, '').trim();
                    const event = {
                        eventId,
                        title_ru: title,
                        eventType: 'workshop',
                        description_ru: "",
                        url: "",
                        locationId: null,
                        startTime: this.formatTime(timeStr.split('-')[0].trim()),
                        endTime: timeStr.includes('-') ? this.formatTime(timeStr.split('-')[1].trim()) : this.addOneHour(this.formatTime(timeStr.split('-')[0].trim()))
                    };
                    if (eventId && workshopDetails[eventId]) {
                        event.description_ru = workshopDetails[eventId].description_ru;
                        event.url = workshopDetails[eventId].url;
                        if (!event.title_ru) event.title_ru = workshopDetails[eventId].title_ru;
                    }
                    schedule[currentDayKey].events.push(event);
                }
            }
        }

        return {
            eventInfo: {
                eventName: "Hameln",
                startDate: "2025-05-28",
                endDate: "2025-06-01",
                mainLanguage: "ru"
            },
            schedule: schedule
        };
    }
};

// Node.js compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HamelnConverter;
}
