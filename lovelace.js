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

// Color change functionality
document.getElementById('frostingType').addEventListener('change', function () {
    const frosting = document.querySelector('.cupcake_frosting');
    switch (this.value) {
        case 'fondant':
            // Blue Fondant color
            frosting.style.filter = 'hue-rotate(240deg) saturate(150%)';
            break;
        case 'cream':
            // Buttercream color
            frosting.style.filter = 'hue-rotate(60deg) saturate(90%)';
            break;
        case 'chocolate':
            // Chocolate color
            frosting.style.filter =
                'hue-rotate(30deg) saturate(170%) brightness(40%)';
            break;
        case 'special':
            // Purple Fondant color
            frosting.style.filter = 'hue-rotate(300deg) saturate(200%)';
            break;
    }
});

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
});

document.getElementById('wrapperType').addEventListener('change', function () {
    const wrapper = document.querySelector('.cupcake_wrapper');
    switch (this.value) {
        case 'red':
            wrapper.style.filter =
                'hue-rotate(325deg) saturate(500%) brightness(80%) contrast(100%)';
            break;
        case 'orange':
            wrapper.style.filter =
                'hue-rotate(10deg) saturate(200%) brightness(100%)';
            break;
        case 'yellow':
            wrapper.style.filter =
                'hue-rotate(45deg) saturate(200%) brightness(110%)';
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
    }
});
