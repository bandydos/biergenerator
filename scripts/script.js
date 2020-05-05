$(document).ready(() => {
    getSelects();
    $('#btn-generate').click(() => {
        generateBeer();
    });
});

// Get options for selects.
const getSelects = () => {
    // Select options for volume.
    let volOptions = [];

    let i = 5;
    volOptions.push(`<option value="v-${i - 1}">< ${i}</option>`);
    while (i < 13) {
        volOptions.push(`<option value="v-${i}">${i} - ${i + 1}</option>`);
        i++;
    }
    volOptions.push(`<option value="v-${i}">> ${i}</option>`);

    $('#select-vol').append(volOptions);


    // Select options for type.
    let typeOptions = [];

    typeOptions.push('<option value="t-1">blonde</option>');
    typeOptions.push('<option value="t-2">brown</option>');

    $('#select-type').append(typeOptions);

    return i;
}

// Get beers.
const getBeers = async () => {
    const url = '../data/bier.json';
    const response = await fetch(url);
    const jsonresponse = await response.json();
    return jsonresponse;
}

// Generate beer.
const generateBeer = async () => {
    const beers = await getBeers();
    const selectedVol = $('#select-vol').val();
    const selectedType = $('#select-type').val();

    // Get volume.
    const bVol = parseInt(selectedVol[(selectedVol.length - 1)]);

    // Filter beers.
    const filteredBeers = beers.filter((b) => {
        return b.vol >= bVol && b.vol < bVol + 1;
    });

    try {
        const randomBeer = Math.floor(Math.random() * filteredBeers.length);
        const generatedBeer = filteredBeers[randomBeer];
        const generatedBeerName = generatedBeer.name;
        const generatedBeerVol = generatedBeer.vol;
        const generatedBeerType = generatedBeer.color;
        const generatedBeerBrewery = generatedBeer.brewery;
        $('#p-bier').text(`Beer found: ${generatedBeerName}, ${generatedBeerVol}° ${generatedBeerType} 
        beer brewed by ${generatedBeerBrewery}.`);
    }
    catch {
        $('#p-bier').text('Beer not found.');
    }
}

