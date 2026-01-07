// Output format profiles
const OUTPUT_PROFILES = {
    'zoho_campaigns': {
        name: 'Zoho Campaigns',
        fields: [
            'Id', 'Title', 'First Name', 'Last Name', 'Full Name', 'Company',
            'Street', 'City', 'State', 'Postal Code', 'Country', 'Fax', 'Phone',
            'Activity Time', 'Currency', 'Date Of Birth', 'EMail', 'Priority',
            'Private', 'Web page'
        ]
    },
    'zoho_crm': {
        name: 'Zoho CRM (Leads)',
        fields: [
            'First Name', 'Last Name', 'Company', 'Title', 'Email', 'Phone',
            'Mobile', 'Website', 'Lead Source', 'Lead Status', 'Industry',
            'No of Employees', 'Annual Revenue', 'Rating', 'Street', 'City',
            'State', 'Zip Code', 'Country', 'Description'
        ]
    },
    'zoho_crm_contacts': {
        name: 'Zoho CRM (Contacts)',
        fields: [
            'First Name', 'Last Name', 'Account Name', 'Email', 'Phone',
            'Mobile', 'Title', 'Department', 'Fax', 'Date of Birth',
            'Assistant', 'Asst Phone', 'Mailing Street', 'Mailing City',
            'Mailing State', 'Mailing Zip', 'Mailing Country', 'Description'
        ]
    },
    'master_data': {
        name: 'Master Data (Complete)',
        fields: [
            'Contact ID', 'Salutation', 'First Name', 'Middle Name', 'Last Name',
            'Full Name', 'Company', 'Job Title', 'Department', 'Email', 'Email 2',
            'Phone', 'Mobile', 'Fax', 'Website', 'Address Line 1', 'Address Line 2',
            'City', 'State', 'Postal Code', 'Country', 'Date of Birth', 'Gender',
            'Industry', 'Company Size', 'Annual Revenue', 'Tags', 'Source',
            'Created Date', 'Modified Date', 'Notes'
        ]
    },
    'simple': {
        name: 'Simple (Name, Email, Phone)',
        fields: [
            'First Name', 'Last Name', 'Email', 'Phone', 'Company'
        ]
    },
    'meta_ads': {
        name: 'Meta/Facebook Ads Customer List',
        fields: [
            // Main identifiers (at least one required)
            'email', 'phone', 'madid', 'appuid', 'pageuid',
            // Additional identifiers (optional but recommended)
            'fn', 'ln', 'ct', 'st', 'zip', 'country', 'dob', 'doby', 'gen', 'age',
            // Optional fields
            'value', 'add_to_messaging_cb_for_wa',
            // Data processing options (for California privacy)
            'data_processing_options', 'data_processing_options_state', 'data_processing_options_country'
        ]
    }
};

// Current active profile
let currentProfile = 'zoho_campaigns';

// Get current output fields based on selected profile
function getOutputFields() {
    return OUTPUT_PROFILES[currentProfile].fields;
}

const OUTPUT_FIELDS = OUTPUT_PROFILES['zoho_campaigns'].fields;

const AUTO_MAP_RULES = {
    'Full Name': ['name', 'full_name', 'fullname', 'full name', 'contact name'],
    'EMail': ['email', 'e-mail', 'mail', 'email address'],
    'Email': ['email', 'e-mail', 'mail', 'email address'],
    'Email 2': ['email2', 'email_2', 'secondary email', 'alternate email'],
    'Phone': ['phone', 'mobile', 'telephone', 'phone number', 'contact number'],
    'Mobile': ['mobile', 'cell', 'mobile phone', 'cell phone'],
    'Company': ['company', 'organization', 'organisation', 'business'],
    'Account Name': ['account', 'company', 'organization', 'account name'],
    'First Name': ['first_name', 'firstname', 'first name', 'fname'],
    'Last Name': ['last_name', 'lastname', 'last name', 'lname', 'surname'],
    'Middle Name': ['middle_name', 'middlename', 'middle name'],
    'Street': ['street', 'address', 'address1', 'street address'],
    'Address Line 1': ['address', 'address1', 'address_1', 'street'],
    'Address Line 2': ['address2', 'address_2', 'suite', 'apt'],
    'Mailing Street': ['street', 'address', 'mailing street'],
    'City': ['city', 'town'],
    'Mailing City': ['city', 'town', 'mailing city'],
    'State': ['state', 'province', 'region'],
    'Mailing State': ['state', 'province', 'mailing state'],
    'Postal Code': ['postal_code', 'postalcode', 'zip', 'zipcode', 'postcode', 'postal code', 'zip code'],
    'Zip Code': ['zip', 'zipcode', 'postal_code', 'postal code', 'zip code'],
    'Mailing Zip': ['zip', 'postal_code', 'mailing zip'],
    'Country': ['country', 'nation'],
    'Mailing Country': ['country', 'nation', 'mailing country'],
    'Title': ['title', 'salutation', 'prefix'],
    'Job Title': ['title', 'job_title', 'jobtitle', 'job title', 'position'],
    'Salutation': ['salutation', 'title', 'prefix'],
    'Department': ['department', 'dept', 'division'],
    'Date Of Birth': ['dob', 'date_of_birth', 'birthdate', 'birth_date', 'date of birth'],
    'Date of Birth': ['dob', 'date_of_birth', 'birthdate', 'birth_date', 'date of birth'],
    'Web page': ['website', 'web_page', 'webpage', 'url', 'web page', 'web site'],
    'Website': ['website', 'web_page', 'webpage', 'url', 'web page', 'web site'],
    'Fax': ['fax', 'fax number'],
    'Lead Source': ['source', 'lead_source', 'lead source', 'origin'],
    'Lead Status': ['status', 'lead_status', 'lead status'],
    'Industry': ['industry', 'sector'],
    'Description': ['description', 'notes', 'comments'],
    'Notes': ['notes', 'description', 'comments'],
    'Gender': ['gender', 'sex'],
    'Tags': ['tags', 'labels', 'categories'],
    'Source': ['source', 'origin', 'campaign'],
    'Contact ID': ['id', 'contact_id', 'contactid', 'contact id'],
    'Assistant': ['assistant', 'asst'],
    'Asst Phone': ['assistant_phone', 'asst_phone', 'assistant phone'],
    'No of Employees': ['employees', 'no_of_employees', 'employee_count', 'number of employees'],
    'Company Size': ['company_size', 'size', 'employees'],
    'Annual Revenue': ['revenue', 'annual_revenue', 'annual revenue'],
    'Rating': ['rating', 'score', 'rank'],
    'Created Date': ['created', 'created_date', 'date_created'],
    'Modified Date': ['modified', 'modified_date', 'date_modified', 'updated'],
    // Meta/Facebook Ads identifiers
    'email': ['email', 'e-mail', 'mail', 'email address', 'e_mail'],
    'phone': ['phone', 'mobile', 'telephone', 'phone number', 'phone_number', 'phonenumber'],
    'madid': ['madid', 'mobile_advertiser_id', 'advertising_id', 'aaid', 'idfa'],
    'appuid': ['appuid', 'app_user_id', 'facebook_app_user_id', 'fb_app_user_id'],
    'pageuid': ['pageuid', 'page_user_id', 'facebook_page_user_id', 'fb_page_user_id'],
    'fn': ['fn', 'first_name', 'firstname', 'first name', 'fname'],
    'ln': ['ln', 'last_name', 'lastname', 'last name', 'lname', 'surname'],
    'ct': ['ct', 'city', 'town'],
    'st': ['st', 'state', 'province', 'region'],
    'zip': ['zip', 'zipcode', 'postal_code', 'postcode', 'postal code', 'zip code'],
    'country': ['country', 'nation', 'country_code'],
    'dob': ['dob', 'date_of_birth', 'birthdate', 'birth_date', 'date of birth', 'dateofbirth'],
    'doby': ['doby', 'year_of_birth', 'birth_year', 'birthyear', 'yob'],
    'gen': ['gen', 'gender', 'sex'],
    'age': ['age', 'customer_age'],
    'value': ['value', 'customer_value', 'ltv', 'lifetime_value'],
    'add_to_messaging_cb_for_wa': ['add_to_messaging_cb_for_wa', 'whatsapp', 'messaging', 'whatsapp_opt_in'],
    'data_processing_options': ['data_processing_options', 'dpo', 'ldu'],
    'data_processing_options_state': ['data_processing_options_state', 'dpo_state'],
    'data_processing_options_country': ['data_processing_options_country', 'dpo_country']
};

let currentFile = null;
let inputHeaders = [];
let inputData = [];
let fieldMapping = {};

// Preview virtualization state
let previewData = [];
let previewHeaders = [];
let previewMode = 'transformed'; // 'transformed' or 'raw'
const ROW_HEIGHT = 41; // Height of each row in pixels
const BUFFER_SIZE = 20; // Extra rows to render above/below viewport
let virtualState = {
    scrollTop: 0,
    visibleStart: 0,
    visibleEnd: 0,
    totalRows: 0
};

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const clearFileBtn = document.getElementById('clearFile');
const optionsSection = document.getElementById('optionsSection');
const previewSection = document.getElementById('previewSection');
const mappingSection = document.getElementById('mappingSection');
const exportSection = document.getElementById('exportSection');
const mappingBody = document.getElementById('mappingBody');
const globalTagsInput = document.getElementById('globalTags');
const sourceFieldInput = document.getElementById('sourceField');
const includeExtraCheckbox = document.getElementById('includeExtra');
const autoInferCompanyCheckbox = document.getElementById('autoInferCompany');
const autoInferTitleCheckbox = document.getElementById('autoInferTitle');
const classifyContactsCheckbox = document.getElementById('classifyContacts');
const duplicateCountSpan = document.getElementById('duplicateCount');
const outputProfileSelect = document.getElementById('outputProfile');
const profileFieldCount = document.getElementById('profileFieldCount');
const downloadNewBtn = document.getElementById('downloadNew');
const appendExistingBtn = document.getElementById('appendExisting');
const existingFileInput = document.getElementById('existingFile');
const exportFormatSelect = document.getElementById('exportFormat');
const appendGroup = document.getElementById('appendGroup');
const previewRowCount = document.getElementById('previewRowCount');
const previewViewMode = document.getElementById('previewViewMode');
const previewContainer = document.getElementById('previewContainer');
const previewHeaderScroll = document.getElementById('previewHeaderScroll');
const previewScrollContainer = document.getElementById('previewScrollContainer');
const previewHeaderTable = document.getElementById('previewHeaderTable');
const previewBodyTable = document.getElementById('previewBodyTable');
const previewTableHead = document.getElementById('previewTableHead');
const previewTableBody = document.getElementById('previewTableBody');
const previewSpacerTop = document.getElementById('previewSpacerTop');
const previewSpacerBottom = document.getElementById('previewSpacerBottom');
const progressBarContainer = document.getElementById('progressBarContainer');
const progressLabel = document.getElementById('progressLabel');
const progressPercentage = document.getElementById('progressPercentage');
const progressFill = document.getElementById('progressFill');
const darkModeToggle = document.getElementById('darkModeToggle');
const presetSelect = document.getElementById('presetSelect');
const savePresetBtn = document.getElementById('savePresetBtn');
const undoBtn = document.getElementById('undoBtn');
const resetBtn = document.getElementById('resetBtn');

// State history for undo functionality
let stateHistory = [];
const MAX_HISTORY = 50; // Limit history to prevent memory issues

// Initialize dark mode from localStorage
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
    document.body.classList.add('dark-mode');
}

// Load saved presets on page load
loadPresetsDropdown();

// Initialize undo button state
updateUndoButton();

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

browseBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event from bubbling to dropZone
    fileInput.click();
});
fileInput.addEventListener('change', handleFileSelect);
clearFileBtn.addEventListener('click', clearFile);
downloadNewBtn.addEventListener('click', downloadNewCSV);
appendExistingBtn.addEventListener('click', () => existingFileInput.click());
existingFileInput.addEventListener('change', handleAppendFile);

// Preview event listeners
previewViewMode.addEventListener('change', (e) => {
    previewMode = e.target.value;
    refreshPreview();
});

// Debounced preview updates for option changes
globalTagsInput.addEventListener('input', debounce(refreshPreview, 300));
sourceFieldInput.addEventListener('input', debounce(refreshPreview, 300));
includeExtraCheckbox.addEventListener('change', refreshPreview);

// Intelligence options
autoInferCompanyCheckbox.addEventListener('change', refreshPreview);
autoInferTitleCheckbox.addEventListener('change', refreshPreview);
classifyContactsCheckbox.addEventListener('change', refreshPreview);

// Duplicate handling radio buttons
document.querySelectorAll('input[name="duplicateHandling"]').forEach(radio => {
    radio.addEventListener('change', refreshPreview);
});

// Export format change - hide append option for non-CSV formats
exportFormatSelect.addEventListener('change', (e) => {
    const format = e.target.value;
    if (format === 'csv') {
        appendGroup.style.display = 'block';
    } else {
        appendGroup.style.display = 'none';
    }
});

// Output profile change - re-render mappings and preview
outputProfileSelect.addEventListener('change', (e) => {
    currentProfile = e.target.value;
    updateProfileFieldCount();

    // Re-run auto mapping with new profile
    autoMapFields();
    renderMapping();

    // Update preview if data is loaded
    if (inputData.length > 0) {
        refreshPreview();
    }
});

// Preset controls
savePresetBtn.addEventListener('click', savePreset);
presetSelect.addEventListener('change', loadPreset);

// Undo/Reset controls
undoBtn.addEventListener('click', undoLastChange);
resetBtn.addEventListener('click', resetAllMappings);

/**
 * Update profile field count display
 */
function updateProfileFieldCount() {
    const fieldCount = OUTPUT_PROFILES[currentProfile].fields.length;
    profileFieldCount.textContent = `${fieldCount} field${fieldCount !== 1 ? 's' : ''}`;
}

// ===== UNDO/RESET FUNCTIONS =====

/**
 * Save current mapping state to history
 */
function saveStateToHistory() {
    const state = {
        mapping: JSON.parse(JSON.stringify(fieldMapping)), // Deep copy
        profile: currentProfile,
        timestamp: Date.now()
    };

    stateHistory.push(state);

    // Limit history size to prevent memory issues
    if (stateHistory.length > MAX_HISTORY) {
        stateHistory.shift(); // Remove oldest state
    }

    // Update undo button state
    updateUndoButton();
}

/**
 * Undo last mapping change
 */
function undoLastChange() {
    if (stateHistory.length === 0) {
        return;
    }

    // Pop the last state
    const previousState = stateHistory.pop();

    // Restore the mapping without saving to history
    fieldMapping = JSON.parse(JSON.stringify(previousState.mapping));
    currentProfile = previousState.profile;
    outputProfileSelect.value = currentProfile;
    updateProfileFieldCount();

    // Re-render mapping UI
    renderMapping();

    // Update preview if data is loaded
    if (inputData.length > 0) {
        refreshPreview();
    }

    // Update undo button state
    updateUndoButton();

    // Show success message
    showNotification('✓ Mapping changes undone');
}

/**
 * Reset all mappings to empty state
 */
function resetAllMappings() {
    if (Object.keys(fieldMapping).length === 0) {
        showNotification('No mappings to reset');
        return;
    }

    const shouldReset = confirm('Are you sure you want to reset all field mappings? This cannot be undone.');
    if (!shouldReset) {
        return;
    }

    // Clear state history
    stateHistory = [];
    
    // Clear field mapping
    fieldMapping = {};

    // Re-render mapping UI
    renderMapping();

    // Update preview if data is loaded
    if (inputData.length > 0) {
        refreshPreview();
    }

    // Update undo button state
    updateUndoButton();

    // Show success message
    showNotification('✓ All mappings reset');
}

/**
 * Update undo button enabled/disabled state
 */
function updateUndoButton() {
    undoBtn.disabled = stateHistory.length === 0;
    undoBtn.title = stateHistory.length === 0 
        ? 'No changes to undo' 
        : `Undo (${stateHistory.length} change${stateHistory.length !== 1 ? 's' : ''} available)`;
}

/**
 * Show a temporary notification message
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-success);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px var(--shadow-color);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ===== MAPPING PRESET FUNCTIONS =====

/**
 * Load saved presets from localStorage and populate dropdown
 */
function loadPresetsDropdown() {
    const presets = JSON.parse(localStorage.getItem('mappingPresets') || '[]');

    // Clear existing options except the first one
    presetSelect.innerHTML = '<option value="">-- Load Preset --</option>';

    // Add preset options
    presets.forEach((preset, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${preset.name} (${preset.profile})`;
        presetSelect.appendChild(option);
    });
}

/**
 * Save current mapping as a preset
 */
function savePreset() {
    // Validate that there's at least one mapping
    if (Object.keys(fieldMapping).length === 0) {
        alert('Please create at least one field mapping before saving a preset.');
        return;
    }

    // Prompt for preset name
    const presetName = prompt('Enter a name for this preset:');
    if (!presetName || presetName.trim() === '') {
        return; // User cancelled or entered empty name
    }

    // Create preset object
    const preset = {
        name: presetName.trim(),
        profile: currentProfile,
        profileName: OUTPUT_PROFILES[currentProfile].name,
        mapping: JSON.parse(JSON.stringify(fieldMapping)), // Deep copy
        timestamp: Date.now()
    };

    // Load existing presets
    const presets = JSON.parse(localStorage.getItem('mappingPresets') || '[]');

    // Check if preset with same name already exists
    const existingIndex = presets.findIndex(p => p.name === preset.name && p.profile === preset.profile);
    if (existingIndex >= 0) {
        const shouldOverwrite = confirm(`A preset named "${preset.name}" already exists for ${preset.profileName}. Overwrite it?`);
        if (shouldOverwrite) {
            presets[existingIndex] = preset;
        } else {
            return;
        }
    } else {
        presets.push(preset);
    }

    // Save to localStorage
    try {
        localStorage.setItem('mappingPresets', JSON.stringify(presets));
        alert(`Preset "${preset.name}" saved successfully!`);
        loadPresetsDropdown(); // Refresh dropdown
        presetSelect.value = ''; // Reset selection
    } catch (e) {
        alert('Failed to save preset. LocalStorage may be full.');
        console.error('Failed to save preset:', e);
    }
}

/**
 * Load a preset and apply it to current mapping
 */
function loadPreset() {
    const selectedIndex = presetSelect.value;
    if (selectedIndex === '') {
        return; // No preset selected
    }

    const presets = JSON.parse(localStorage.getItem('mappingPresets') || '[]');
    const preset = presets[selectedIndex];

    if (!preset) {
        alert('Preset not found.');
        return;
    }

    // Check if profile matches
    if (preset.profile !== currentProfile) {
        const shouldSwitch = confirm(
            `This preset was saved for "${preset.profileName}" format. ` +
            `Would you like to switch to that format? ` +
            `(Click Cancel to apply mapping to current format anyway)`
        );

        if (shouldSwitch) {
            currentProfile = preset.profile;
            outputProfileSelect.value = currentProfile;
            updateProfileFieldCount();
        }
    }

    // Save state before applying preset
    if (Object.keys(fieldMapping).length > 0) {
        saveStateToHistory();
    }
    
    // Apply the mapping
    fieldMapping = JSON.parse(JSON.stringify(preset.mapping)); // Deep copy

    // Re-render mapping UI
    renderMapping();

    // Update preview if data is loaded
    if (inputData.length > 0) {
        refreshPreview();
    }

    // Show success message
    const statusMsg = document.createElement('div');
    statusMsg.textContent = `✓ Preset "${preset.name}" loaded`;
    statusMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-success);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px var(--shadow-color);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(statusMsg);
    setTimeout(() => {
        statusMsg.style.opacity = '0';
        statusMsg.style.transition = 'opacity 0.3s';
        setTimeout(() => statusMsg.remove(), 300);
    }, 2000);

    // Reset dropdown selection
    setTimeout(() => {
        presetSelect.value = '';
    }, 100);
}

// ===== END MAPPING PRESET FUNCTIONS =====

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

    // Show progress for file reading
    showProgress('Reading file...', 0, 100);

    const reader = new FileReader();
    reader.onprogress = (e) => {
        if (e.lengthComputable) {
            updateProgress(e.loaded, e.total);
        }
    };
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
    previewSection.style.display = 'none';
    mappingSection.style.display = 'none';
    exportSection.style.display = 'none';

    // Reset preview state
    previewData = [];
    previewHeaders = [];
    previewMode = 'transformed';
    previewViewMode.value = 'transformed';
}

function parseCSV(csv) {
    showProgress('Parsing CSV...', 0, 100);

    const lines = [];
    let currentLine = '';
    let inQuotes = false;
    const csvLength = csv.length;
    let lastProgressUpdate = 0;

    for (let i = 0; i < csv.length; i++) {
        // Update progress every 5% for large files
        if (csvLength > 100000 && i - lastProgressUpdate > csvLength / 20) {
            updateProgress(i, csvLength);
            lastProgressUpdate = i;
        }
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

    if (lines.length === 0) {
        hideProgress();
        return;
    }

    showProgress('Processing rows...', 0, lines.length);

    inputHeaders = parseCSVLine(lines[0]);
    inputData = [];

    for (let i = 1; i < lines.length; i++) {
        // Update progress for large files
        if (lines.length > 1000 && i % Math.floor(lines.length / 20) === 0) {
            updateProgress(i, lines.length);
        }

        const values = parseCSVLine(lines[i]);
        const row = {};
        inputHeaders.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        inputData.push(row);
    }

    showProgress('Mapping fields...', 100, 100);
    autoMapFields();
    renderMapping();

    optionsSection.style.display = 'block';
    mappingSection.style.display = 'block';
    exportSection.style.display = 'block';

    // Initialize preview after auto-mapping
    initializePreview();

    // Hide progress bar after short delay
    setTimeout(hideProgress, 500);
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
    // Save state before auto-mapping (if there are existing mappings)
    if (Object.keys(fieldMapping).length > 0) {
        saveStateToHistory();
    }
    
    fieldMapping = {};
    const outputFields = OUTPUT_PROFILES[currentProfile].fields;

    outputFields.forEach(outputField => {
        const rules = AUTO_MAP_RULES[outputField];
        if (rules) {
            for (let inputHeader of inputHeaders) {
                const normalizedInput = inputHeader.toLowerCase().trim();
                if (rules.some(rule => normalizedInput === rule || normalizedInput.includes(rule))) {
                    fieldMapping[outputField] = {
                        column: inputHeader,
                        source: 'auto' // Track that this was auto-mapped
                    };
                    break;
                }
            }
        }
    });
}

function renderMapping() {
    mappingBody.innerHTML = '';
    const outputFields = OUTPUT_PROFILES[currentProfile].fields;

    outputFields.forEach(outputField => {
        const row = document.createElement('div');
        row.className = 'mapping-row';

        const outputCell = document.createElement('div');
        outputCell.className = 'mapping-output';

        // Add output field name
        const fieldName = document.createElement('span');
        fieldName.textContent = outputField;
        outputCell.appendChild(fieldName);

        // Add confidence badge
        const mapping = fieldMapping[outputField];
        const badge = document.createElement('span');
        badge.className = 'mapping-badge';

        if (mapping) {
            if (mapping.source === 'auto') {
                badge.className = 'mapping-badge badge-auto';
                badge.textContent = 'Auto';
                badge.title = 'Auto-mapped field';
            } else if (mapping.source === 'manual') {
                badge.className = 'mapping-badge badge-manual';
                badge.textContent = 'Manual';
                badge.title = 'Manually mapped field';
            }
            outputCell.appendChild(badge);
        } else {
            badge.className = 'mapping-badge badge-unmapped';
            badge.textContent = 'Unmapped';
            badge.title = 'Not mapped to any input column';
            outputCell.appendChild(badge);
        }

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
            const mappedColumn = mapping ? mapping.column : null;
            if (mappedColumn === header) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            // Save state before changing mapping
            saveStateToHistory();
            
            if (e.target.value) {
                // Mark as manual when user changes it
                const wasAuto = fieldMapping[outputField] && fieldMapping[outputField].source === 'auto';
                fieldMapping[outputField] = {
                    column: e.target.value,
                    source: wasAuto && fieldMapping[outputField].column === e.target.value ? 'auto' : 'manual'
                };
            } else {
                delete fieldMapping[outputField];
            }
            // Re-render to update badges
            renderMapping();
            // Update preview when mapping changes
            refreshPreview();
        });

        inputCell.appendChild(select);
        row.appendChild(outputCell);
        row.appendChild(inputCell);
        mappingBody.appendChild(row);
    });
}

// ===== PREVIEW FUNCTIONS =====

/**
 * Initialize preview - called after auto-mapping completes
 */
function initializePreview() {
    previewSection.style.display = 'block';
    refreshPreview();
}

/**
 * Refresh preview data - called when mappings or options change
 */
function refreshPreview() {
    // Generate data based on preview mode
    if (previewMode === 'raw') {
        previewData = inputData;
        previewHeaders = inputHeaders;
    } else {
        // Transformed mode
        previewData = transformData();
        if (previewData.length > 0) {
            previewHeaders = Object.keys(previewData[0]);
        } else {
            previewHeaders = [];
        }
    }

    if (previewData.length === 0) {
        showEmptyPreview();
        return;
    }

    // Update UI
    updatePreviewInfo();
    renderPreviewHeaders();
    setupVirtualScroll();
}

/**
 * Show empty state when no data
 */
function showEmptyPreview() {
    previewContainer.innerHTML = '<div class="preview-empty">No data to preview</div>';
    previewRowCount.textContent = '0 rows';
}

/**
 * Update preview info bar
 */
function updatePreviewInfo() {
    const rowCount = previewData.length;
    previewRowCount.textContent = `${rowCount.toLocaleString()} row${rowCount !== 1 ? 's' : ''}`;
}

/**
 * Render table headers
 */
function renderPreviewHeaders() {
    const headerRow = document.createElement('tr');

    previewHeaders.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.title = header; // Tooltip for long headers
        headerRow.appendChild(th);
    });

    previewTableHead.innerHTML = '';
    previewTableHead.appendChild(headerRow);
}

/**
 * Setup virtual scrolling infrastructure
 */
function setupVirtualScroll() {
    virtualState.totalRows = previewData.length;
    virtualState.scrollTop = 0;
    virtualState.visibleStart = 0;
    virtualState.visibleEnd = Math.min(
        Math.ceil(400 / ROW_HEIGHT) + BUFFER_SIZE,
        virtualState.totalRows
    );

    // Set spacer heights
    previewSpacerTop.style.height = '0px';
    const totalHeight = virtualState.totalRows * ROW_HEIGHT;
    const renderedHeight = (virtualState.visibleEnd - virtualState.visibleStart) * ROW_HEIGHT;
    previewSpacerBottom.style.height = `${Math.max(0, totalHeight - renderedHeight)}px`;

    // Reset scroll position
    previewScrollContainer.scrollTop = 0;
    previewHeaderScroll.scrollLeft = 0;

    // Render initial visible rows
    renderVisibleRows();

    // Attach scroll listener (with throttling)
    previewScrollContainer.removeEventListener('scroll', handlePreviewScroll);
    previewScrollContainer.addEventListener('scroll', throttle(handlePreviewScroll, 16)); // ~60fps
}

/**
 * Handle scroll events - recalculate visible rows and sync horizontal scroll
 */
function handlePreviewScroll(e) {
    const scrollTop = e.target.scrollTop;
    const scrollLeft = e.target.scrollLeft;
    virtualState.scrollTop = scrollTop;

    // Sync horizontal scroll with header
    if (previewHeaderScroll.scrollLeft !== scrollLeft) {
        previewHeaderScroll.scrollLeft = scrollLeft;
    }

    // Calculate which rows should be visible
    const scrollRow = Math.floor(scrollTop / ROW_HEIGHT);
    const viewportRows = Math.ceil(400 / ROW_HEIGHT);

    const newStart = Math.max(0, scrollRow - BUFFER_SIZE);
    const newEnd = Math.min(
        scrollRow + viewportRows + BUFFER_SIZE,
        virtualState.totalRows
    );

    // Only re-render if visible range changed significantly
    if (newStart !== virtualState.visibleStart || newEnd !== virtualState.visibleEnd) {
        virtualState.visibleStart = newStart;
        virtualState.visibleEnd = newEnd;
        renderVisibleRows();
    }
}

/**
 * Render only visible rows based on virtual scroll state
 */
function renderVisibleRows() {
    // Update spacer heights
    previewSpacerTop.style.height = `${virtualState.visibleStart * ROW_HEIGHT}px`;
    const bottomOffset = (virtualState.totalRows - virtualState.visibleEnd) * ROW_HEIGHT;
    previewSpacerBottom.style.height = `${Math.max(0, bottomOffset)}px`;

    // Clear current rows
    previewTableBody.innerHTML = '';

    // Render visible slice
    const fragment = document.createDocumentFragment();
    for (let i = virtualState.visibleStart; i < virtualState.visibleEnd; i++) {
        const row = previewData[i];
        const tr = document.createElement('tr');
        tr.dataset.rowIndex = i;

        previewHeaders.forEach(header => {
            const td = document.createElement('td');
            const value = row[header] || '';
            td.textContent = value;
            td.title = value; // Tooltip for truncated values
            tr.appendChild(td);
        });

        fragment.appendChild(tr);
    }

    previewTableBody.appendChild(fragment);
    
    // Sync column widths between header and body tables
    syncColumnWidths();
}

/**
 * Sync column widths between header and body tables
 */
function syncColumnWidths() {
    // Get all cells from first body row
    const firstBodyRow = previewTableBody.querySelector('tr');
    if (!firstBodyRow) return;
    
    const bodyCells = firstBodyRow.querySelectorAll('td');
    const headerCells = previewTableHead.querySelectorAll('th');
    
    // Set explicit widths to keep columns aligned
    bodyCells.forEach((td, index) => {
        if (headerCells[index]) {
            const width = Math.max(td.offsetWidth, headerCells[index].offsetWidth);
            td.style.width = `${width}px`;
            headerCells[index].style.width = `${width}px`;
        }
    });
}

/**
 * Throttle function for scroll performance
 */
function throttle(func, delay) {
    let lastCall = 0;
    let timeoutId = null;

    return function(...args) {
        const now = Date.now();
        const timeSinceLastCall = now - lastCall;

        if (timeSinceLastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastCall = Date.now();
                func.apply(this, args);
            }, delay - timeSinceLastCall);
        }
    };
}

/**
 * Debounce function for input performance
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ===== END PREVIEW FUNCTIONS =====

// ===== PROGRESS BAR FUNCTIONS =====

/**
 * Show progress bar with initial state
 * @param {string} stage - Description of current stage
 * @param {number} current - Current progress count
 * @param {number} total - Total count
 */
function showProgress(stage, current = 0, total = 100) {
    progressBarContainer.style.display = 'block';
    progressLabel.textContent = stage;
    updateProgress(current, total);
}

/**
 * Update progress bar
 * @param {number} current - Current progress count
 * @param {number} total - Total count
 */
function updateProgress(current, total) {
    const percent = total > 0 ? Math.round((current / total) * 100) : 0;
    progressPercentage.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;
}

/**
 * Hide progress bar
 */
function hideProgress() {
    progressBarContainer.style.display = 'none';
    progressFill.style.width = '0%';
    progressPercentage.textContent = '0%';
}

// ===== END PROGRESS BAR FUNCTIONS =====

// ===== DATA INTELLIGENCE FUNCTIONS =====

/**
 * Infer company name from email domain
 * @param {string} email - Email address
 * @returns {string} - Inferred company name or empty string
 */
function inferCompany(email) {
    if (!email || typeof email !== 'string') return '';

    const parts = email.toLowerCase().split('@');
    if (parts.length !== 2) return '';

    const domain = parts[1];

    // List of personal email providers
    const personalDomains = [
        'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
        'icloud.com', 'aol.com', 'mail.com', 'protonmail.com',
        'yandex.com', 'zoho.com', 'gmx.com'
    ];

    // Check if it's a personal email
    if (personalDomains.some(p => domain.includes(p))) {
        return '';
    }

    // Extract company name from domain (e.g., acme.io -> ACME)
    const companyPart = domain.split('.')[0];
    return companyPart.charAt(0).toUpperCase() + companyPart.slice(1);
}

/**
 * Classify contact as B2B or Individual based on email domain
 * @param {string} email - Email address
 * @returns {string} - 'Business' or 'Individual'
 */
function classifyContact(email) {
    if (!email || typeof email !== 'string') return '';

    const domain = email.toLowerCase().split('@')[1];
    if (!domain) return '';

    const personalDomains = [
        'gmail', 'yahoo', 'outlook', 'hotmail',
        'icloud', 'aol', 'mail', 'protonmail'
    ];

    const isPersonal = personalDomains.some(p => domain.includes(p));
    return isPersonal ? 'Individual' : 'Business';
}

/**
 * Infer job title from email prefix
 * @param {string} email - Email address
 * @returns {string} - Inferred title or empty string
 */
function inferTitle(email) {
    if (!email || typeof email !== 'string') return '';

    const prefix = email.split('@')[0].toLowerCase();

    const titleKeywords = {
        'ceo': 'CEO',
        'chief executive': 'CEO',
        'founder': 'Founder',
        'cofounder': 'Co-Founder',
        'co-founder': 'Co-Founder',
        'cto': 'CTO',
        'chief technology': 'CTO',
        'cfo': 'CFO',
        'chief financial': 'CFO',
        'coo': 'COO',
        'chief operating': 'COO',
        'cmo': 'CMO',
        'chief marketing': 'CMO',
        'vp': 'Vice President',
        'vice president': 'Vice President',
        'president': 'President',
        'director': 'Director',
        'manager': 'Manager',
        'head': 'Head',
        'lead': 'Lead',
        'senior': 'Senior',
        'engineer': 'Engineer',
        'developer': 'Developer',
        'designer': 'Designer',
        'analyst': 'Analyst'
    };

    for (const [keyword, title] of Object.entries(titleKeywords)) {
        if (prefix.includes(keyword)) {
            return title;
        }
    }

    return '';
}

/**
 * Detect duplicate rows based on email or phone
 * @param {Array} data - Array of data rows
 * @param {string} duplicateHandling - 'keep', 'skip', or 'mark'
 * @returns {Array} - Processed data based on handling method
 */
function handleDuplicates(data, duplicateHandling) {
    if (duplicateHandling === 'keep' || !duplicateHandling) {
        return data;
    }

    const seen = new Map();
    const result = [];

    data.forEach((row, index) => {
        const email = (row.EMail || row.Email || '').toLowerCase().trim();
        const phone = (row.Phone || row.Mobile || '').trim();
        const key = email || phone;

        if (!key) {
            result.push(row);
            return;
        }

        if (seen.has(key)) {
            if (duplicateHandling === 'mark') {
                // Mark as duplicate with tag
                const tags = row.Tags || '';
                row.Tags = tags ? `${tags}, Duplicate` : 'Duplicate';
                result.push(row);
            }
            // If 'skip', don't add to result
        } else {
            seen.set(key, index);
            result.push(row);
        }
    });

    return result;
}

/**
 * Get duplicate statistics
 * @param {Array} data - Array of data rows
 * @returns {Object} - Statistics about duplicates
 */
function getDuplicateStats(data) {
    const emailMap = new Map();
    const phoneMap = new Map();
    let emailDupes = 0;
    let phoneDupes = 0;

    data.forEach(row => {
        const email = (row.EMail || row.Email || '').toLowerCase().trim();
        const phone = (row.Phone || row.Mobile || '').trim();

        if (email) {
            if (emailMap.has(email)) {
                emailDupes++;
            } else {
                emailMap.set(email, true);
            }
        }

        if (phone) {
            if (phoneMap.has(phone)) {
                phoneDupes++;
            } else {
                phoneMap.set(phone, true);
            }
        }
    });

    return {
        emailDuplicates: emailDupes,
        phoneDuplicates: phoneDupes,
        totalDuplicates: Math.max(emailDupes, phoneDupes)
    };
}

// ===== END DATA INTELLIGENCE FUNCTIONS =====

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
    const shouldInferCompany = autoInferCompanyCheckbox.checked;
    const shouldInferTitle = autoInferTitleCheckbox.checked;
    const shouldClassify = classifyContactsCheckbox.checked;
    const duplicateHandling = document.querySelector('input[name="duplicateHandling"]:checked')?.value || 'keep';
    const outputFields = OUTPUT_PROFILES[currentProfile].fields;

    let outputData = inputData.map(inputRow => {
        const outputRow = {};

        outputFields.forEach(field => {
            const mapping = fieldMapping[field];
            const inputField = mapping ? mapping.column : null;
            outputRow[field] = inputField ? inputRow[inputField] || '' : '';
        });

        if (!outputRow['First Name'] && !outputRow['Last Name'] && outputRow['Full Name']) {
            const { firstName, lastName } = splitFullName(outputRow['Full Name']);
            outputRow['First Name'] = firstName;
            outputRow['Last Name'] = lastName;
        }

        // Get email field (different profiles use different field names)
        const email = outputRow['EMail'] || outputRow['Email'] || '';

        // Company Auto-Detection
        if (shouldInferCompany && email) {
            const companyField = outputRow['Company'] || outputRow['Account Name'];
            if (!companyField) {
                const inferredCompany = inferCompany(email);
                if (inferredCompany) {
                    if ('Company' in outputRow) outputRow['Company'] = inferredCompany;
                    if ('Account Name' in outputRow) outputRow['Account Name'] = inferredCompany;
                }
            }
        }

        // Title Inference
        if (shouldInferTitle && email) {
            const titleField = outputRow['Title'] || outputRow['Job Title'];
            if (!titleField) {
                const inferredTitle = inferTitle(email);
                if (inferredTitle) {
                    if ('Title' in outputRow) outputRow['Title'] = inferredTitle;
                    if ('Job Title' in outputRow) outputRow['Job Title'] = inferredTitle;
                }
            }
        }

        const rowTags = [];
        if (globalTags) {
            rowTags.push(globalTags);
        }

        // Contact Classification
        if (shouldClassify && email) {
            const contactType = classifyContact(email);
            if (contactType) {
                rowTags.push(contactType);
            }
        } else if (detectIndividualEmail(email)) {
            // Fallback to old logic if classification is disabled
            rowTags.push('Individual');
        }

        // Add tags if field exists in profile
        if ('Tags' in outputRow) outputRow['Tags'] = mergeTags(...rowTags);
        if ('Source' in outputRow) outputRow['Source'] = source;
        if ('Lead Source' in outputRow && source) outputRow['Lead Source'] = source;

        // Clean email fields
        if ('EMail' in outputRow) outputRow['EMail'] = cleanEmail(outputRow['EMail']);
        if ('Email' in outputRow) outputRow['Email'] = cleanEmail(outputRow['Email']);
        if ('Email 2' in outputRow) outputRow['Email 2'] = cleanEmail(outputRow['Email 2']);

        // Clean phone fields
        if ('Phone' in outputRow) outputRow['Phone'] = cleanPhone(outputRow['Phone']);
        if ('Mobile' in outputRow) outputRow['Mobile'] = cleanPhone(outputRow['Mobile']);
        if ('Fax' in outputRow) outputRow['Fax'] = cleanPhone(outputRow['Fax']);

        // Clean date fields
        if ('Date Of Birth' in outputRow) outputRow['Date Of Birth'] = cleanDateOfBirth(outputRow['Date Of Birth']);
        if ('Date of Birth' in outputRow) outputRow['Date of Birth'] = cleanDateOfBirth(outputRow['Date of Birth']);

        // Clean other fields
        if ('Priority' in outputRow) outputRow['Priority'] = cleanPriority(outputRow['Priority']);
        if ('Private' in outputRow) outputRow['Private'] = cleanPrivate(outputRow['Private']);

        if (includeExtra) {
            const mappedInputFields = Object.values(fieldMapping).map(m => m.column);
            inputHeaders.forEach(header => {
                if (!mappedInputFields.includes(header)) {
                    outputRow[header] = inputRow[header] || '';
                }
            });
        }

        return outputRow;
    });

    // Handle duplicates
    outputData = handleDuplicates(outputData, duplicateHandling);

    // Update duplicate count display
    updateDuplicateCount();

    return outputData;
}

/**
 * Update duplicate count display
 */
function updateDuplicateCount() {
    const stats = getDuplicateStats(inputData);
    if (stats.totalDuplicates > 0) {
        duplicateCountSpan.textContent = `⚠ Found ${stats.emailDuplicates} email duplicate${stats.emailDuplicates !== 1 ? 's' : ''}${stats.phoneDuplicates > 0 ? `, ${stats.phoneDuplicates} phone duplicate${stats.phoneDuplicates !== 1 ? 's' : ''}` : ''}`;
    } else {
        duplicateCountSpan.textContent = '';
    }
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
    const format = exportFormatSelect.value;
    showProgress('Transforming data...', 0, 100);

    // Use setTimeout to allow progress bar to render
    setTimeout(() => {
        const outputData = transformData();
        updateProgress(50, 100);

        if (format === 'csv') {
            showProgress('Generating CSV...', 75, 100);
            const csv = convertToCSV(outputData);
            showProgress('Downloading...', 100, 100);
            const filename = `campaigns_${new Date().getTime()}.csv`;
            downloadFile(csv, filename, 'text/csv;charset=utf-8;');
        } else if (format === 'xlsx') {
            showProgress('Generating XLSX...', 75, 100);
            exportToXLSX(outputData);
        } else if (format === 'json') {
            showProgress('Generating JSON...', 75, 100);
            const json = JSON.stringify(outputData, null, 2);
            showProgress('Downloading...', 100, 100);
            const filename = `campaigns_${new Date().getTime()}.json`;
            downloadFile(json, filename, 'application/json;charset=utf-8;');
        }

        setTimeout(hideProgress, 500);
    }, 50);
}

/**
 * Export data to XLSX format
 */
function exportToXLSX(data) {
    if (typeof XLSX === 'undefined') {
        alert('XLSX library not loaded. Please refresh the page and try again.');
        return;
    }

    showProgress('Creating worksheet...', 80, 100);
    const ws = XLSX.utils.json_to_sheet(data);

    showProgress('Creating workbook...', 90, 100);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Campaigns");

    showProgress('Downloading...', 100, 100);
    const filename = `campaigns_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, filename);
}

/**
 * Generic file download function
 */
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
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
