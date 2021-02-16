// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=06b3af0efd43db0e789cd9059fa64381';


// Event listener for '#generate' button
document.getElementById('generate').addEventListener('click', performAction);

// function called by click event listener
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
        .then(function(data) {
            console.log(data);
            postData('/add', {
                date: d,
                temp: data.list[0].main.temp,
                feel: feelings,
            });
            updateUI();
        })
};

const getWeather = async(baseURL, zip, key) => {
    const response = await fetch(baseURL + zip + key)
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error:', error);
    }
}

// POST data function
const postData = async(url = '', data = {}) => {
    // console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error:', error);
    }
}

// function to GET prohect data
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        let recentEntry = allData.length;
        console.log("allData", allData);
        document.getElementById('date').innerHTML = `Date: ${allData[recentEntry-1].date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData[recentEntry-1].temp}`;
        document.getElementById('content').innerHTML = `I feel: ${allData[recentEntry-1].feel}`;
    } catch (error) {
        console.log('error:', error);
    }
}