//      Make a function for translating the data and store it as the variable translateCells to be called when binding the csv.
var translateCellsCsv1 = function (d) {
    return {
        id: parseFloat(d.id),
        name: d.name,
        sex_ed_mandated: parseFloat(d.sex_ed_mandated),
        age_appr: parseFloat(d.age_appr),
        hiv_ed_mandated: parseFloat(d.hiv_ed_mandated),
        med_acc: parseFloat(d.med_acc),
        cult_appr: parseFloat(d.cult_appr),
        anti_religion: parseFloat(d.anti_religion),
        parents: parseFloat(d.parents),
        parents_opt: parseFloat(d.parents_opt),
    };

};

var translateCellsCsv2 = function (d) {
    return {
        id: parseFloat(d.id),
        name: d.name,
        contraception: parseFloat(d.contraception),
        refusal: parseFloat(d.refusal),
        orientation: parseFloat(d.orientation)
    }
}


var colorPos = "#EE8695";
var colorMid = "#A73B8F";
var colorNeg = "#501A73";
var nothing = "#FFF";

//code for responsive window sizing from https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window?noredirect=1&lq=1

var width = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;


var height = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;


//Width and height
var w = width * .97;
var h = w / 1.85;
var w2 = width * .75;

//Define map projection
var projection = d3.geoAlbersUsa()
    .scale([w / 1.2])
    .translate([w / 3, h / 2]);

//colors from https://blog.graphiq.com/finding-the-right-color-palettes-for-data-visualizations-fcd4e707a283 optimized to be okay for color blindness as well as for promoting readability of the map
var colorScale = [colorNeg, colorMid, colorPos];

var reverseColorScale = [colorPos, colorMid, colorNeg];

//        Uses a quantize scale to take the value of the data and make it one of the two colors listed. By making this function its own variable, I can call it later within the function where I bind the data.

var color = d3.scaleQuantize()
    .range(colorScale);

var colorRev = d3.scaleQuantize()
    .range(reverseColorScale);


