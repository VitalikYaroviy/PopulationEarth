const OTHER_THRESHOLD = 1;
let list =[];
let Other = {description: 'Other'};

let Earth = data.reduce(function(sum, data){
    return sum + data.population;
}, 0);

data.forEach(function (data) {
    let obj = {
        description: data.country,
        percentage: data.population / Earth * 100,
        value: data.population
    };
        list.push(obj);
        return list
});

function sorts(list) {
    list.sort((a, b) => b.percentage - a.percentage);
    return list;
}

function other(list) {
    let Less_one = list.filter((a) => a.percentage < OTHER_THRESHOLD);
    let index = list.length - Less_one.length;
        if (Less_one.length >= 2){
            Other.percentage = Less_one.reduce(function(sum, Less_one) {
                return sum + Less_one.percentage;
            }, 0);
        }
    if (Less_one.length >= 2){
        list.splice(index, Less_one.length);
    }
    list.push(Other);
    Other.value = sum_search(Less_one);
    return list;
}

function sum_search(Less_one) {
    if (Less_one.length >= 2){
        Less_one.reduce(function(sum, list){
            return sum + list.value;
            }, 0);
    }
}

other(sorts(list));
console.log(list);

const canvas = document.getElementById('canvas');
canvas.width = 750;
canvas.height = 500;

const ctx = canvas.getContext('2d');
const colors = CSS_COLOR_NAMES.slice(0);

let startAngle = 0;
list.forEach((item, index, list) => {
    // sector
    ctx.beginPath();
    ctx.fillStyle = colors.splice(Math.round(Math.random() * (colors.length - 1)), 1)[0];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 200, startAngle, startAngle -= item.percentage * Math.PI / 50, true);
    ctx.lineTo(250, 250);
    ctx.fill();

    // legend
    const lHeight = 500 / list.length;
    ctx.fillRect(500, lHeight * index + (lHeight - 15) / 2, 15, 15);
    ctx.fillStyle = '#000';
    ctx.fillText(item.description + ' (' + item.percentage.toFixed(2) + '%)', 520, lHeight * index + (lHeight - 15) / 2 + 10);
});