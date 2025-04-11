const num_cupcakes = 5;

const cupcake_data = cupcakes(num_cupcakes);
const tax_percentage = 0.075;

function frosting_error(i) {
    const frosting_elem = document.getElementById('frosting' + i);
    frosting_elem.style.outline = '2px solid red';
}

function frosting_clear(i) {
    const frosting_elem = document.getElementById('frosting' + i);
    frosting_elem.style.outline = 'none';
}

/*
 * STUDENTS SHOULD ADD CODE HERE FOR THE PURCHASE FUNCTIONALITY FOR PART 2 OF THE ASSIGNMENT
 */
function purchase() {
    console.log('purchase button clicked');
}

function make_header(table) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    let th = document.createElement('th');
    th.textContent = 'ID';
    tr.appendChild(th);
    th = document.createElement('th');
    th.textContent = 'Name';
    tr.appendChild(th);
    th = document.createElement('th');
    th.textContent = 'Frosting';
    tr.appendChild(th);

    // Add price column header
    th = document.createElement('th');
    th.textContent = 'Price';
    tr.appendChild(th);

    thead.appendChild(tr);
    table.appendChild(thead);
}

function append_cupcake(td, i) {
    const cupcake = cupcake_data[i];

    // Create container for layered images
    const container = document.createElement('div');
    container.className = 'cupcake_container';

    // Add base cupcake image
    const base_img = document.createElement('img');
    base_img.src = 'images/cupcake_base.png';
    base_img.className = 'cupcake_base';
    container.appendChild(base_img);

    // Add frosting layer
    const frosting_img = document.createElement('img');
    frosting_img.src = 'images/cupcake_frosting.png';
    frosting_img.id = 'cupcake_frosting' + i;
    frosting_img.className = 'cupcake_frosting';
    container.appendChild(frosting_img);

    td.appendChild(container);

    // Add name
    const name_div = document.createElement('div');
    name_div.id = 'cupcake_name' + i;
    name_div.className = 'cupcake_name';
    const p = document.createElement('span');
    p.textContent = cupcake.name;
    name_div.appendChild(p);
    td.appendChild(name_div);
}

function color_frosting(i, frosting_index) {
    const frosting_elem = document.getElementById('cupcake_frosting' + i);
    const frosting = cupcake_data[i].frosting[frosting_index];
    const [r, g, b] = frosting.color;
    frosting_elem.style.filter = `opacity(0.7) drop-shadow(0 0 0 rgb(${r},${g},${b}))`;
}

function make_frosting_cell(i) {
    const td = document.createElement('td');
    const select = document.createElement('select');
    select.id = 'frosting' + i;
    select.form = 'cupcake';
    select.onchange = () => {
        frosting_clear(i);
        const message_elem = document.getElementById('message');
        message_elem.textContent = '';
        message_elem.style.color = 'white';
        const frosting_elem = document.getElementById('frosting' + i);
        const frosting_index = frosting_elem.value;
        if (frosting_index) {
            color_frosting(i, frosting_index);
        }
    };
    const option = document.createElement('option');
    option.value = '';
    option.textContent = '--';
    select.appendChild(option);
    for (let j = 0; j < cupcake_data[i].frosting.length; j++) {
        const option = document.createElement('option');
        option.value = j;
        option.textContent = cupcake_data[i].frosting[j]['name'];
        select.appendChild(option);
    }
    td.appendChild(select);
    return td;
}

function make_row(i, tbody) {
    const tr = document.createElement('tr');

    let td = document.createElement('td');
    td.textContent = cupcake_data[i].id;
    tr.appendChild(td);

    td = document.createElement('td');
    append_cupcake(td, i);
    tr.appendChild(td);

    td = make_frosting_cell(i);
    tr.appendChild(td);

    // TODO: Still need to add quantity cell
    // Add price cell
    td = document.createElement('td');
    td.textContent = '$' + cupcake_data[i].price;
    tr.appendChild(td);

    tbody.appendChild(tr);
}

function display_cupcakes() {
    const table = document.createElement('table');
    make_header(table);

    const tbody = document.createElement('tbody');
    for (let i = 0; i < cupcake_data.length; i++) {
        make_row(i, tbody);
    }
    table.appendChild(tbody);

    // put table in a form
    const form = document.createElement('form');
    form.id = 'cupcake';
    form.appendChild(table);

    // put form in a div separator
    const div = document.createElement('div');
    div.className = 'separator';
    div.appendChild(form);
    document.body.appendChild(div);
}

// Frosting color change
// Color change functionality
// Frosting color change
document.getElementById('frostingType').addEventListener('change', function () {
    const frosting = document.querySelector('.cupcake_frosting');

    // Check if the selected frosting contains "fondant"
    if (this.value.includes('fondant')) {
        // Use blue fondant as base image for all fondant types
        frosting.src = 'images/blue_fondant.png';
        // Lower the fondant image by 20 pixels
        frosting.style.transform = 'translateY(20px)';

        // Apply different hue rotations based on fondant color
        switch (this.value) {
            case 'pinkfondant':
                frosting.style.filter =
                    'hue-rotate(2700deg) saturate(100%) brightness(100%) contrast(100%)';
                break;
            case 'purplefondant':
                frosting.style.filter =
                    'hue-rotate(2600deg) saturate(200%) brightness(70%) contrast(200%)';
                break;
            case 'redfondant':
                frosting.style.filter =
                    'hue-rotate(2700deg) saturate(200%) brightness(70%) contrast(200%)';
                break;
            case 'whitefondant':
                frosting.style.filter = 'brightness(150%) saturate(10%)';
                break;
            case 'bluefondant':
                // Show the original blue fondant without white filter
                frosting.style.filter = 'none';
                break;
            default:
                // Default white fondant (apply white filter to blue fondant)
                frosting.style.filter = 'brightness(150%) saturate(10%)';
                break;
        }
    } else if (this.value === 'buttercream') {
        // Swap to buttercream frosting image
        frosting.src = 'images/buttercream_frosting.png';
        // Adjust position for buttercream
        frosting.style.transform = 'translateY(10px)';
        // Reset any filters
        frosting.style.filter = 'none';
    } else if (this.value === 'chocolate') {
        // Swap to chocolate frosting image
        frosting.src = 'images/chocolate_frosting.png';
        // Adjust position if needed
        frosting.style.transform = 'translateY(10px)';
        // Reset any filters since we're using the actual fudge image
        frosting.style.filter = 'none';
    } else if (this.value === 'fudge') {
        // Swap to fudge frosting image
        frosting.src = 'images/fudge_frosting.png';
        // Adjust position if needed
        frosting.style.transform = 'translateY(20px)';
        // Reset any filters since we're using the actual fudge image
        frosting.style.filter = 'none';
    } else if (this.value === 'ganache') {
        // Swap to ganache frosting image
        frosting.src = 'images/ganache_frosting.png';
        // Adjust position if needed
        frosting.style.transform = 'translateY(50px)';
        frosting.style.tranform = 'translateX(70px)';
        // Set the size to 320x320
        frosting.style.width = '320px';
        frosting.style.height = '320px';

        // Reset any filters since we're using the actual image
        frosting.style.filter = 'none';
    } else if (this.value === 'whippedcream') {
        // Swap to whipped cream frosting image
        frosting.src = 'images/whippedcream_frosting.png';
        // Adjust position if needed
        frosting.style.transform = 'translateY(10px)';
        // Reset any filters since we're using the actual whipped cream image
        frosting.style.filter = 'none';
    } else if (this.value === 'creamcheese') {
        // Swap to creamcheese frosting image
        frosting.src = 'images/creamcheese_frosting.png';
        // Adjust position if needed
        frosting.style.transform = 'translateY(30px)';
        // Reset any filters since we're using the actual creamcheese image
        frosting.style.filter = 'none';
    } else if (this.value === 'lemonmeringue') {
        // Swap to lemon meringue frosting image
        frosting.src = 'images/lemonmeringue_frosting.png';
        // Adjust position if needed
        frosting.style.transform = 'translateY(20px)';
        // Reset any filters since we're using the actual lemon meringue image
        frosting.style.filter = 'none';
    } else {
        // Use regular frosting image
        frosting.src = 'images/cupcake_frosting.png';
        // Reset the position
        frosting.style.transform = 'translateY(0)';

        // Apply appropriate color filter based on selection
        switch (this.value) {
            case 'special':
                // Purple Fondant color
                frosting.style.filter = 'hue-rotate(300deg) saturate(200%)';
                break;
        }
    }
});

// Add this near the top with other constants
const breadSubTypes = {
    fruitcake: [
        'Chups',
        'Caramels',
        'Candy',
        'Soufflé',
        'Muffin',
        'Chocolate',
        'Chupa',
        'Bar',
        'Biscuit',
        'Halvah',
        'Plum',
        'Tart',
        'Claw',
        'Bear',
        'Beans',
        'Macaroon',
        'Jelly',
        'Tiramisu',
        'Canes',
        'Shortbread',
        'Lemon',
        'Dragée',
        'Sweet',
        'Carrot',
        'Bonbon',
        'Pastry',
        'Toffee'
    ],
    chocolate: [
        'Truffle',
        'Fudge',
        'Dark',
        'Milk',
        'White',
        'Ganache',
        'Mousse',
        'Cocoa',
        "Devil's Food",
        'German',
        'Swiss',
        'Belgian',
        'Dutch',
        'Rocky Road',
        'Triple Chocolate',
        'Death by Chocolate'
    ],
    vanilla: [
        'Classic',
        'French',
        'Madagascar',
        'Tahitian',
        'Mexican',
        'Bean',
        'Cream',
        'Sweet Cream',
        'Royal',
        'Imperial',
        'Golden',
        'White',
        'Yellow',
        'Butter'
    ],
    berry: [
        'Strawberry',
        'Blueberry',
        'Raspberry',
        'Blackberry',
        'Mixed Berry',
        'Wild Berry',
        'Forest Fruits',
        'Berry Blast',
        'Berry Medley'
    ],
    brownie: [
        'Tootsie',
        'Danish',
        'Jellyo',
        'Bears',
        'Apple',
        'Sesame',
        'Wafer',
        'Marzipan',
        'Drops',
        'Gummi',
        'Marshmallow',
        'Sugar',
        'Cotton',
        'Jujubes',
        'Pudding',
        'Lollipop',
        'Cookie',
        'Roll',
        'Liquorice',
        'Snaps',
        'Powder'
    ]
};

// Add this function to update the bread sub-type dropdown
function updateBreadSubType() {
    const breadType = document.getElementById('breadType').value;
    const subTypeSelect = document.getElementById('breadSubType');

    // Clear existing options
    subTypeSelect.innerHTML = '';

    if (breadType && breadSubTypes[breadType]) {
        // Enable select and add default option
        subTypeSelect.disabled = false;
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select variety';
        subTypeSelect.appendChild(defaultOption);

        // Add sub-types for selected bread type
        breadSubTypes[breadType].forEach((subType) => {
            const option = document.createElement('option');
            option.value = subType.toLowerCase().replace(/\s+/g, '_');
            option.textContent = subType;
            subTypeSelect.appendChild(option);
        });
    } else {
        // Disable select if no bread type selected
        subTypeSelect.disabled = true;
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Select bread type first';
        subTypeSelect.appendChild(option);
    }
}

// Update the bread type event listener
document.getElementById('breadType').addEventListener('change', function () {
    const base = document.querySelector('.cupcake_base');
    switch (this.value) {
        case 'fruitcake':
            // Reddish brown
            base.style.filter =
                'hue-rotate(30deg) saturate(150%) brightness(70%)';
            break;
        case 'chocolate':
            // Dark brown
            base.style.filter =
                'hue-rotate(20deg) saturate(120%) brightness(40%)';
            break;
        case 'vanilla':
            // Light cream
            base.style.filter =
                'hue-rotate(60deg) saturate(20%) brightness(150%)';
            break;
        case 'berry':
            // Deep purple-red
            base.style.filter =
                'hue-rotate(320deg) saturate(180%) brightness(80%)';
            break;
        case 'brownie':
            // Dark chocolate brown
            base.style.filter =
                'hue-rotate(30deg) saturate(140%) brightness(30%)';
            break;
    }

    // Update sub-type dropdown
    updateBreadSubType();
});

// Add event listener for bread sub-type
document.getElementById('breadSubType').addEventListener('change', function () {
    // Apply subtle variations to the base color based on sub-type
    const base = document.querySelector('.cupcake_base');
    const breadType = document.getElementById('breadType').value;

    // Add a slight variation to the base color
    if (this.value) {
        // Get the index of the selected option
        const index = this.selectedIndex;
        // Use the index to create a subtle variation
        const brightnessAdjust = (index % 5) * 5 - 10; // Range from -10% to +10%
        const saturationAdjust = (index % 3) * 10 - 10; // Range from -10% to +20%

        // Apply the base filter from bread type, then add the variation
        switch (breadType) {
            case 'fruitcake':
                base.style.filter = `hue-rotate(30deg) saturate(${
                    150 + saturationAdjust
                }%) brightness(${70 + brightnessAdjust}%)`;
                break;
            case 'chocolate':
                base.style.filter = `hue-rotate(20deg) saturate(${
                    120 + saturationAdjust
                }%) brightness(${40 + brightnessAdjust}%)`;
                break;
            case 'vanilla':
                base.style.filter = `hue-rotate(60deg) saturate(${
                    20 + saturationAdjust
                }%) brightness(${150 + brightnessAdjust}%)`;
                break;
            case 'berry':
                base.style.filter = `hue-rotate(${
                    320 + (index % 40) - 20
                }deg) saturate(${180 + saturationAdjust}%) brightness(${
                    80 + brightnessAdjust
                }%)`;
                break;
            case 'brownie':
                base.style.filter = `hue-rotate(30deg) saturate(${
                    140 + saturationAdjust
                }%) brightness(${30 + brightnessAdjust}%)`;
                break;
        }
    }
});

// Wrapper color change
document.getElementById('wrapperType').addEventListener('change', function () {
    const wrapper = document.querySelector('.cupcake_wrapper');
    switch (this.value) {
        case 'red':
            wrapper.style.filter =
                'hue-rotate(345deg) saturate(450%) brightness(65%) contrast(130%)';
            break;
        case 'orange':
            wrapper.style.filter =
                'hue-rotate(15deg) saturate(400%) brightness(95%) contrast(140%)';
            break;
        case 'yellow':
            wrapper.style.filter =
                'hue-rotate(25deg) saturate(400%) brightness(115%) contrast(130%)';
            break;
        case 'green':
            wrapper.style.filter =
                'hue-rotate(85deg) saturate(200%) brightness(90%)';
            break;
        case 'blue':
            wrapper.style.filter =
                'hue-rotate(180deg) saturate(200%) brightness(100%)';
            break;
        case 'purple':
            wrapper.style.filter =
                'hue-rotate(260deg) saturate(200%) brightness(90%)';
            break;
        case 'white':
            wrapper.style.filter =
                'brightness(150%) saturate(0%) contrast(90%)';
            break;
        case 'black':
            wrapper.style.filter =
                'brightness(40%) saturate(0%) contrast(150%)';
            break;
        case 'lightpink':
            wrapper.style.filter =
                'hue-rotate(320deg) saturate(200%) brightness(115%) contrast(110%)';
            break;
        case 'darkpurple':
            wrapper.style.filter =
                'hue-rotate(280deg) saturate(300%) brightness(60%) contrast(150%)';
            break;
        case 'navyblue':
            wrapper.style.filter =
                'hue-rotate(210deg) saturate(400%) brightness(55%) contrast(140%)';
            break;
        case 'darkmagenta':
            wrapper.style.filter =
                'hue-rotate(290deg) saturate(400%) brightness(75%) contrast(130%)';
            break;
    }
});

// Add near the top of the file
function displayRandomCupcake() {
    const randomIndex = Math.floor(Math.random() * cupcake_data.length);
    const cupcake = cupcake_data[randomIndex];
    const nameElement = document.getElementById('randomCupcakeName');
    nameElement.textContent = `Today's Special: ${cupcake.name} (ID: ${cupcake.id}) - $${cupcake.price}`;
    
    // Apply the cupcake's color to the base
    const base = document.querySelector('.cupcake_base');
    const [r, g, b] = cupcake.color;
    base.style.filter = `opacity(0.7) drop-shadow(0 0 0 rgb(${r},${g},${b}))`;
}

// Add this line after your existing window.onload or at the bottom of the file
document.addEventListener('DOMContentLoaded', displayRandomCupcake);
