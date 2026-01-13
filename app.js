async function checkFlight() {

  const from = document.getElementById("from").value.toUpperCase();
  const to = document.getElementById("to").value.toUpperCase();
  const date = document.getElementById("date").value;

  if (!from || !to || !date) {
    alert("Please fill all fields");
    return;
  }

  const list = document.getElementById("flightList");
  list.innerHTML = "Loading flights...";

  const API_KEY = "PASTE_YOUR_API_KEY_HERE";

  const url =
    `https://api.aviationstack.com/v1/flights` +
    `?access_key=${API_KEY}` +
    `&dep_iata=${from}` +
    `&arr_iata=${to}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    list.innerHTML = "";

    if (!data.data || data.data.length === 0) {
      list.innerHTML = "<li>No flights found</li>";
      return;
    }

    data.data.slice(0, 10).forEach(flight => {
      const li = document.createElement("li");
      li.innerHTML = `
        ✈️ <b>${flight.airline.name}</b><br>
        Flight: ${flight.flight.iata}<br>
        Departure: ${flight.departure.scheduled}<br>
        Status: ${flight.flight_status}
      `;
      list.appendChild(li);
    });

  } catch (error) {
    list.innerHTML = "<li>Error loading flights</li>";
  }
}
