/**
* Here we parse one of the key JSON files where we store ID, place and coordinates X and Y
 * for rendering the final path
* */
let coordinates = [];
let captions = [];
$.ajax({
    url: "jsonFiles/coordinates.json",
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function( data) {
        coordinates.push(data.coordinates);
    }
});

$.ajax({
    url: "jsonFiles/captions.json",
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function( data) {
        captions.push(data.caption);
    }
});

