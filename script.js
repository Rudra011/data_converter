const OUTPUT_FIELDS = [
    'Id', 'Title', 'First Name', 'Last Name', 'Full Name', 'Company',
    'Street', 'City', 'State', 'Postal Code', 'Country', 'Fax', 'Phone',
    'Activity Time', 'Currency', 'Date Of Birth', 'EMail', 'Priority',
    'Private', 'Web page'
];

const AUTO_MAP_RULES = {
    'Full Name': ['name', 'full_name', 'fullname', 'full name', 'contact name'],
    'EMail': ['email', 'e-mail', 'mail', 'email address'],
    'Phone': ['phone', 'mobile', 'telephone', 'phone number', 'contact number'],
    'Company': ['company', 'organization', 'organisation', 'business'],
    'First Name': ['first_name', 'firstname', 'first name', 'fname'],
    'Last Name': ['last_name', 'lastname', 'last name', 'lname', 'surname'],
    'Street': ['street', 'address', 'address1', 'street address'],
    'City': ['city', 'town'],
    'State': ['state', 'province', 'region'],
    'Postal Code': ['postal_code', 'postalcode', 'zip', 'zipcode', 'postcode', 'postal code', 'zip code'],
    'Country': ['country', 'nation'],
    'Title': ['title', 'salutation', 'prefix'],
    'Date Of Birth': ['dob', 'date_of_birth', 'birthdate', 'birth_date', 'date of birth'],
    'Web page': ['website', 'web_page', 'webpage', 'url', 'web page', 'web site']
};

let currentFile = null;
let inputHeaders = [];
let inputData = [];
let fieldMapping = {};

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const clearFileBtn = document.getElementById('clearFile');
const optionsSection = document.getElementById('optionsSection');
const mappingSection = document.getElementById('mappingSection');
const exportSection = document.getElementById('exportSection');
const mappingBody = document.getElementById('mappingBody');
const globalTagsInput = document.getElementById('globalTags');
const sourceFieldInput = document.getElementById('sourceField');
const includeExtraCheckbox = document.getElementById('includeExtra');
const downloadNewBtn = document.getElementById('downloadNew');
const appendExistingBtn = document.getElementById('appendExisting');
const existingFileInput = document.getElementById('existingFile');

browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);
clearFileBtn.addEventListener('click', clearFile);
downloadNewBtn.addEventListener('click', downloadNewCSV);
appendExistingBtn.addEventListener('click', () => existingFileInput.click());
existingFileInput.addEventListener('change', handleAppendFile);

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith('.csv')) {
        handleFile(files[0]);
    }
});

dropZone.addEventListener('click', () => fileInput.click());

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    currentFile = file;
    fileName.textContent = file.name;
    dropZone.style.display = 'none';
    fileInfo.style.display = 'flex';

    sourceFieldInput.value = file.name.replace('.csv', '');

    const reader = new FileReader();
    reader.onload = (e) => {
        const csv = e.target.result;
        parseCSV(csv);
    };
    reader.readAsText(file);
}

function clearFile() {
    currentFile = null;
    inputHeaders = [];
    inputData = [];
    fieldMapping = {};
    fileInput.value = '';
    dropZone.style.display = 'block';
    fileInfo.style.display = 'none';
    optionsSection.style.display = 'none';
    mappingSection.style.display = 'none';
    exportSection.style.display = 'none';
}

function parseCSV(csv) {
    const lines = [];
    let currentLine = '';
    let inQuotes = false;

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i];
        const nextChar = csv[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentLine += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === '\n' && !inQuotes) {
            if (currentLine.trim()) {
                lines.push(currentLine);
            }
            currentLine = '';
        } else if (char === '\r' && nextChar === '\n' && !inQuotes) {
            if (currentLine.trim()) {
                lines.push(currentLine);
            }
            currentLine = '';
            i++;
        } else {
            currentLine += char;
        }
    }

    if (currentLine.trim()) {
        lines.push(currentLine);
    }

    if (lines.length === 0) return;

    inputHeaders = parseCSVLine(lines[0]);
    inputData = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const row = {};
        inputHeaders.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        inputData.push(row);
    }

    autoMapFields();
    renderMapping();

    optionsSection.style.display = 'block';
    mappingSection.style.display = 'block';
    exportSection.style.display = 'block';
}

function parseCSVLine(line) {
    const values = [];
    let currentValue = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentValue += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(currentValue);
            currentValue = '';
        } else {
            currentValue += char;
        }
    }

    values.push(currentValue);
    return values;
}

function autoMapFields() {
    fieldMapping = {};

    OUTPUT_FIELDS.forEach(outputField => {
        const rules = AUTO_MAP_RULES[outputField];
        if (rules) {
            for (let inputHeader of inputHeaders) {
                const normalizedInput = inputHeader.toLowerCase().trim();
                if (rules.some(rule => normalizedInput === rule || normalizedInput.includes(rule))) {
                    fieldMapping[outputField] = inputHeader;
                    break;
                }
            }
        }
    });
}

function renderMapping() {
    mappingBody.innerHTML = '';

    OUTPUT_FIELDS.forEach(outputField => {
        const row = document.createElement('div');
        row.className = 'mapping-row';

        const outputCell = document.createElement('div');
        outputCell.className = 'mapping-output';
        outputCell.textContent = outputField;

        const inputCell = document.createElement('div');
        inputCell.className = 'mapping-input';

        const select = document.createElement('select');
        select.id = `map_${outputField}`;

        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = '-- Not Mapped --';
        select.appendChild(emptyOption);

        inputHeaders.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            if (fieldMapping[outputField] === header) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            if (e.target.value) {
                fieldMapping[outputField] = e.target.value;
            } else {
                delete fieldMapping[outputField];
            }
        });

        inputCell.appendChild(select);
        row.appendChild(outputCell);
        row.appendChild(inputCell);
        mappingBody.appendChild(row);
    });
}

function splitFullName(fullName) {
    const trimmed = fullName.trim();
    const spaceIndex = trimmed.indexOf(' ');

    if (spaceIndex === -1) {
        return { firstName: trimmed, lastName: '' };
    }

    return {
        firstName: trimmed.substring(0, spaceIndex),
        lastName: trimmed.substring(spaceIndex + 1)
    };
}

function detectIndividualEmail(email) {
    if (!email) return false;
    const lower = email.toLowerCase();
    return lower.includes('gmail') ||
           lower.includes('yahoo') ||
           lower.includes('outlook') ||
           lower.includes('hotmail');
}

function cleanEmail(email) {
    if (!email) return '';
    const cleaned = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(cleaned) ? cleaned : '';
}

function cleanPhone(phone) {
    if (!phone) return '';
    return phone.replace(/[^\d+]/g, '');
}

function cleanDateOfBirth(date) {
    if (!date) return '';

    const dateStr = date.trim();

    const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) {
        return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
    }

    const slashMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (slashMatch) {
        const month = slashMatch[1].padStart(2, '0');
        const day = slashMatch[2].padStart(2, '0');
        return `${slashMatch[3]}-${month}-${day}`;
    }

    const dashMatch = dateStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})/);
    if (dashMatch) {
        const month = dashMatch[1].padStart(2, '0');
        const day = dashMatch[2].padStart(2, '0');
        return `${dashMatch[3]}-${month}-${day}`;
    }

    return '';
}

function cleanPriority(priority) {
    if (!priority) return '';
    const lower = priority.toLowerCase().trim();
    if (lower === 'high' || lower === 'medium' || lower === 'low') {
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return '';
}

function cleanPrivate(privateVal) {
    if (!privateVal) return '';
    const lower = privateVal.toLowerCase().trim();
    if (lower === 'true' || lower === '1' || lower === 'yes') {
        return 'true';
    }
    if (lower === 'false' || lower === '0' || lower === 'no') {
        return 'false';
    }
    return '';
}

function mergeTags(...tagArrays) {
    const allTags = [];
    tagArrays.forEach(tags => {
        if (Array.isArray(tags)) {
            allTags.push(...tags);
        } else if (typeof tags === 'string' && tags.trim()) {
            allTags.push(...tags.split(',').map(t => t.trim()).filter(t => t));
        }
    });

    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.join(', ');
}

function transformData() {
    const globalTags = globalTagsInput.value;
    const source = sourceFieldInput.value;
    const includeExtra = includeExtraCheckbox.checked;

    const outputData = inputData.map(inputRow => {
        const outputRow = {};

        OUTPUT_FIELDS.forEach(field => {
            const inputField = fieldMapping[field];
            outputRow[field] = inputField ? inputRow[inputField] || '' : '';
        });

        if (!outputRow['First Name'] && !outputRow['Last Name'] && outputRow['Full Name']) {
            const { firstName, lastName } = splitFullName(outputRow['Full Name']);
            outputRow['First Name'] = firstName;
            outputRow['Last Name'] = lastName;
        }

        const rowTags = [];
        if (globalTags) {
            rowTags.push(globalTags);
        }

        if (detectIndividualEmail(outputRow['EMail'])) {
            rowTags.push('Individual');
        }

        outputRow['Tags'] = mergeTags(...rowTags);
        outputRow['Source'] = source;

        outputRow['EMail'] = cleanEmail(outputRow['EMail']);
        outputRow['Phone'] = cleanPhone(outputRow['Phone']);
        outputRow['Date Of Birth'] = cleanDateOfBirth(outputRow['Date Of Birth']);
        outputRow['Priority'] = cleanPriority(outputRow['Priority']);
        outputRow['Private'] = cleanPrivate(outputRow['Private']);

        if (includeExtra) {
            const mappedInputFields = Object.values(fieldMapping);
            inputHeaders.forEach(header => {
                if (!mappedInputFields.includes(header)) {
                    outputRow[header] = inputRow[header] || '';
                }
            });
        }

        return outputRow;
    });

    return outputData;
}

function convertToCSV(data) {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);
    const csvLines = [];

    csvLines.push(headers.map(h => escapeCSVValue(h)).join(','));

    data.forEach(row => {
        const values = headers.map(header => escapeCSVValue(row[header] || ''));
        csvLines.push(values.join(','));
    });

    return csvLines.join('\n');
}

function escapeCSVValue(value) {
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

function downloadNewCSV() {
    const outputData = transformData();
    const csv = convertToCSV(outputData);
    const filename = `campaigns_${new Date().getTime()}.csv`;
    downloadCSV(csv, filename);
}

function handleAppendFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const existingCSV = e.target.result;
        appendToExistingCSV(existingCSV);
    };
    reader.readAsText(file);
}

function appendToExistingCSV(existingCSV) {
    const existingLines = [];
    let currentLine = '';
    let inQuotes = false;

    for (let i = 0; i < existingCSV.length; i++) {
        const char = existingCSV[i];
        const nextChar = existingCSV[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentLine += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === '\n' && !inQuotes) {
            if (currentLine.trim()) {
                existingLines.push(currentLine);
            }
            currentLine = '';
        } else if (char === '\r' && nextChar === '\n' && !inQuotes) {
            if (currentLine.trim()) {
                existingLines.push(currentLine);
            }
            currentLine = '';
            i++;
        } else {
            currentLine += char;
        }
    }

    if (currentLine.trim()) {
        existingLines.push(currentLine);
    }

    if (existingLines.length === 0) {
        downloadNewCSV();
        return;
    }

    const existingHeaders = parseCSVLine(existingLines[0]);
    const existingData = [];

    for (let i = 1; i < existingLines.length; i++) {
        const values = parseCSVLine(existingLines[i]);
        const row = {};
        existingHeaders.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        existingData.push(row);
    }

    const newData = transformData();

    const allHeaders = [...new Set([...existingHeaders, ...Object.keys(newData[0] || {})])];

    const mergedData = [...existingData, ...newData].map(row => {
        const normalizedRow = {};
        allHeaders.forEach(header => {
            normalizedRow[header] = row[header] || '';
        });
        return normalizedRow;
    });

    const csv = convertToCSV(mergedData);
    const filename = `campaigns_merged_${new Date().getTime()}.csv`;
    downloadCSV(csv, filename);

    existingFileInput.value = '';
}
