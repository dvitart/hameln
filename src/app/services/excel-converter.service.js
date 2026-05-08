"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelConverterService = void 0;
var core_1 = require("@angular/core");
var XLSX = __importStar(require("xlsx"));
var papaparse_1 = __importDefault(require("papaparse"));
var ExcelConverterService = function () {
    var _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ExcelConverterService = _classThis = /** @class */ (function () {
        function ExcelConverterService_1() {
        }
        ExcelConverterService_1.prototype.formatTime = function (time) {
            if (!time)
                return '00:00';
            time = String(time).trim();
            if (/^\d{1}:\d{2}$/.test(time))
                return '0' + time;
            return time;
        };
        ExcelConverterService_1.prototype.addHours = function (time, hours) {
            var _a = time.split(':').map(Number), h = _a[0], m = _a[1];
            return "".concat(String((h + hours) % 24).padStart(2, '0'), ":").concat(String(m).padStart(2, '0'));
        };
        ExcelConverterService_1.prototype.parseExcelDate = function (serial) {
            var num = Number(serial);
            if (!isNaN(num) && num > 40000 && num < 50000) {
                var date = new Date(Math.round((num - 25569) * 86400 * 1000));
                var yyyy = date.getFullYear();
                var mm = String(date.getMonth() + 1).padStart(2, '0');
                var dd = String(date.getDate()).padStart(2, '0');
                return "".concat(yyyy, "-").concat(mm, "-").concat(dd);
            }
            return null;
        };
        ExcelConverterService_1.prototype.extractEventId = function (content) {
            if (!content)
                return null;
            var match = content.match(/\(W(\d+)\)/);
            return match ? match[0].replace(/[()]/g, '') : null;
        };
        ExcelConverterService_1.prototype.extractInlineTimeRange = function (text) {
            var match = text.match(/^(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\s+(.+)$/);
            if (match) {
                return {
                    start: this.formatTime(match[1]),
                    end: this.formatTime(match[2]),
                    cleanedText: match[3].trim(),
                };
            }
            return null;
        };
        ExcelConverterService_1.prototype.convert = function (timetableBuffer, workshopsCsv) {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            // 1. Parse workshops CSV
            var workshopsRows = papaparse_1.default.parse(workshopsCsv, { skipEmptyLines: false }).data;
            var workshopDetails = {};
            for (var i = 1; i < workshopsRows.length; i++) {
                var row = workshopsRows[i];
                var id = row[0];
                if (id && id.startsWith('W')) {
                    workshopDetails[id] = {
                        title_ru: (_a = row[2]) !== null && _a !== void 0 ? _a : '',
                        description_ru: (_b = row[5]) !== null && _b !== void 0 ? _b : '',
                        url: (_c = row[11]) !== null && _c !== void 0 ? _c : '',
                    };
                }
            }
            // 2. Parse Timetable Excel
            var workbook = XLSX.read(timetableBuffer, { type: 'array' });
            var sheetName = workbook.SheetNames[0];
            var sheet = workbook.Sheets[sheetName];
            // Extract merges
            var merges = sheet['!merges'] || [];
            var getRowSpan = function (r, c) {
                var merge = merges.find(function (m) { return m.s.r === r && m.s.c === c; });
                return merge ? (merge.e.r - merge.s.r) + 1 : 1;
            };
            var data = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '' });
            var schedule = {};
            var currentDayKey = null;
            var currentTime = null;
            var locationColMap = {
                2: 'loc_1', 3: 'loc_1a', 4: 'loc_2', 5: 'loc_3',
                6: 'loc_4', 7: 'loc_7', 8: 'loc_8', 9: 'loc_10', 10: 'loc_11',
            };
            var LOCATION_COLS = [2, 3, 4, 5, 6, 7, 8, 9, 10];
            // Pre-calculate exact start times for each row based on col1 or meals
            var rowTimes = [];
            for (var r = 0; r < data.length; r++) {
                var row = data[r];
                if (!row) {
                    rowTimes[r] = '';
                    continue;
                }
                var col1 = String((_d = row[1]) !== null && _d !== void 0 ? _d : '').trim();
                var col2 = String((_e = row[2]) !== null && _e !== void 0 ? _e : '').trim();
                if (/\d{1,2}:\d{2}/.test(col1)) {
                    var dashIdx = col1.indexOf('-');
                    var startRaw = dashIdx >= 0 ? col1.slice(0, dashIdx).trim() : col1;
                    rowTimes[r] = this.formatTime(startRaw);
                }
                else if (col2 === 'Обед') {
                    rowTimes[r] = '14:00';
                }
                else if (col2 === 'Ужин') {
                    rowTimes[r] = '18:00';
                }
                else {
                    rowTimes[r] = '';
                }
            }
            var _loop_1 = function (r) {
                var row = data[r];
                if (!row || row.length === 0)
                    return "continue";
                var col1 = String((_f = row[1]) !== null && _f !== void 0 ? _f : '').trim();
                var col2 = String((_g = row[2]) !== null && _g !== void 0 ? _g : '').trim();
                var parsedDate = null;
                var dayLabel = '';
                var dateSource = /\d{2}\.\d{2}\.\d{4}/.test(col1) ? col1
                    : /\d{2}\.\d{2}\.\d{4}/.test(col2) ? col2
                        : null;
                if (dateSource) {
                    var dateMatch = dateSource.match(/(\d{2})\.(\d{2})\.(\d{4})/);
                    if (dateMatch) {
                        parsedDate = "".concat(dateMatch[3], "-").concat(dateMatch[2], "-").concat(dateMatch[1]);
                        dayLabel = dateSource.split(',')[0].trim();
                    }
                }
                else {
                    // Try Excel serial date
                    var excelDate1 = this_1.parseExcelDate(col1);
                    var excelDate2 = this_1.parseExcelDate(col2);
                    var validExcelDate = excelDate1 || excelDate2;
                    if (validExcelDate) {
                        parsedDate = validExcelDate;
                        var dateObj = new Date(parsedDate);
                        var weekdays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
                        dayLabel = weekdays[dateObj.getDay()];
                    }
                }
                if (parsedDate) {
                    currentDayKey = parsedDate;
                    schedule[currentDayKey] = {
                        dayLabel_ru: dayLabel,
                        fullDayDescription_ru: dayLabel + ', ' + parsedDate.split('-').reverse().join('.'),
                        events: [],
                    };
                    currentTime = null;
                    return "continue";
                }
                if (!currentDayKey)
                    return "continue";
                if (rowTimes[r]) {
                    currentTime = rowTimes[r];
                }
                if (!currentTime)
                    return "continue";
                var processEvent = function (content, colIdx, locationId) {
                    var _a, _b, _c, _d, _e;
                    if (!content)
                        return;
                    var rowSpan = getRowSpan(r, colIdx);
                    var endTime = '';
                    // Find the time of the row AFTER the merge ends
                    for (var nextR = r + rowSpan; nextR < data.length; nextR++) {
                        var nextRow = data[nextR];
                        if (nextRow) {
                            var c1 = String((_a = nextRow[1]) !== null && _a !== void 0 ? _a : '').trim();
                            var c2 = String((_b = nextRow[2]) !== null && _b !== void 0 ? _b : '').trim();
                            var isDayHeader = /\d{2}\.\d{2}\.\d{4}/.test(c1) || /\d{2}\.\d{2}\.\d{4}/.test(c2) || _this.parseExcelDate(c1) || _this.parseExcelDate(c2);
                            if (isDayHeader) {
                                break;
                            }
                        }
                        if (rowTimes[nextR]) {
                            endTime = rowTimes[nextR];
                            break;
                        }
                    }
                    if (!endTime) {
                        // Fallback if it's the very last event of the day
                        var lastTime = currentTime;
                        for (var prevR = r + rowSpan - 1; prevR >= r; prevR--) {
                            if (rowTimes[prevR]) {
                                lastTime = rowTimes[prevR];
                                break;
                            }
                        }
                        endTime = _this.addHours(lastTime, 1);
                    }
                    var inline = _this.extractInlineTimeRange(content);
                    var eventText = inline ? inline.cleanedText : content;
                    var finalStart = inline ? inline.start : currentTime;
                    var finalEnd = inline ? inline.end : endTime;
                    var eventId = _this.extractEventId(eventText);
                    var title = eventText.replace(/\(W\d+\)/, '').trim();
                    var details = eventId ? workshopDetails[eventId] : null;
                    schedule[currentDayKey].events.push({
                        dateKey: currentDayKey,
                        eventId: eventId,
                        title_ru: title || ((_c = details === null || details === void 0 ? void 0 : details.title_ru) !== null && _c !== void 0 ? _c : ''),
                        eventType: 'workshop',
                        description_ru: (_d = details === null || details === void 0 ? void 0 : details.description_ru) !== null && _d !== void 0 ? _d : '',
                        url: (_e = details === null || details === void 0 ? void 0 : details.url) !== null && _e !== void 0 ? _e : '',
                        locationId: locationId,
                        startTime: finalStart,
                        endTime: finalEnd,
                    });
                };
                for (var _i = 0, LOCATION_COLS_1 = LOCATION_COLS; _i < LOCATION_COLS_1.length; _i++) {
                    var col = LOCATION_COLS_1[_i];
                    processEvent(String((_h = row[col]) !== null && _h !== void 0 ? _h : '').trim(), col, locationColMap[col]);
                }
                // "Other place" columns 11 + 12
                var otherName = String((_j = row[11]) !== null && _j !== void 0 ? _j : '').trim();
                var otherPlace = String((_k = row[12]) !== null && _k !== void 0 ? _k : '').trim();
                if (otherName) {
                    processEvent(otherName, 11, otherPlace || null);
                }
            };
            var this_1 = this;
            // Process actual data
            for (var r = 3; r < data.length; r++) {
                _loop_1(r);
            }
            return {
                eventInfo: {
                    eventName: 'Hameln',
                    startDate: '2026-05-13',
                    endDate: '2026-05-17',
                    mainLanguage: 'ru',
                },
                locations: [],
                schedule: schedule,
            };
        };
        return ExcelConverterService_1;
    }());
    __setFunctionName(_classThis, "ExcelConverterService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExcelConverterService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExcelConverterService = _classThis;
}();
exports.ExcelConverterService = ExcelConverterService;
