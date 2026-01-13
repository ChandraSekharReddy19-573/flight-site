async function checkFlight() {

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;

  if (!from || !to || !date) {
    alert("Please fill all fields");
    return;
  }

  const result = document.getElementById("result");
  result.innerHTML = "Checking reality...";

  const lat = 40.64;   // New York JFK
  const lon = -73.78;

  const url =
    "https://api.open-meteo.com/v1/forecast?" +
    "latitude=" + lat +
    "&longitude=" + lon +
    "&hourly=precipitation,windspeed_10m" +
    "&start_date=" + date +
    "&end_date=" + date;

  const response = await fetch(url);
  const data = await response.json();

  const rain = data.hourly.precipitation.reduce((a,b)=>a+b,0);
  const wind = Math.max(...data.hourly.windspeed_10m);

  let weatherRisk = "Low";
  if (rain > 5 || wind > 25) weatherRisk = "Medium";
  if (rain > 15 || wind > 40) weatherRisk = "High";

  let delayRisk = "Low";
  const day = new Date(date).getDay(); 
  if (day === 5) delayRisk = "Medium"; // Friday
  if (weatherRisk === "High") delayRisk = "High";

  result.innerHTML = `
    <h3>Reality Report</h3>
    <p><b>Route:</b> ${from} → ${to}</p>
    <p><b>Weather risk:</b> ${weatherRisk}</p>
    <p><b>Delay chance:</b> ${delayRisk}</p>
    <p>${delayRisk === "High" ?
      "This one loves drama. Bring snacks and patience." :
      "Looks decent. Sky seems calm."}
    </p>
  `;
}