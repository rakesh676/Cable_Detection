// Mock 15 devices across 10 km
const devices = [];
for (let i = 1; i <= 15; i++) {
    devices.push({
        id: `D${i}`,
        distance: (i * (10 / 15)).toFixed(2),
        status: "Healthy",
        lastUpdate: new Date().toLocaleTimeString()
    });
}

const tableBody = document.getElementById("deviceTableBody");
const cableLine = document.getElementById("cableLine");

function renderDevices() {
    // Clear table and line
    tableBody.innerHTML = "";
    cableLine.innerHTML = "";

    // Count summary
    let healthy = 0, warning = 0, broken = 0;

    devices.forEach((device, index) => {
        // Create table row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${device.id}</td>
            <td>${device.distance}</td>
            <td class="${device.status.toLowerCase()}">${device.status}</td>
            <td>${device.lastUpdate}</td>
        `;
        tableBody.appendChild(row);

        // Create map marker
        const dot = document.createElement("div");
        dot.classList.add("device", device.status.toLowerCase());
        dot.style.left = `${(index / (devices.length - 1)) * 100}%`;
        dot.title = `${device.id}\n${device.distance} km\nStatus: ${device.status}`;
        cableLine.appendChild(dot);

        // Count
        if (device.status === "Healthy") healthy++;
        else if (device.status === "Warning") warning++;
        else broken++;
    });

    // Update summary
    document.getElementById("total-devices").textContent = `Total Devices: ${devices.length}`;
    document.querySelector(".summary-card.healthy").textContent = `Healthy: ${healthy}`;
    document.querySelector(".summary-card.warning").textContent = `Warning: ${warning}`;
    document.querySelector(".summary-card.break").textContent = `Break: ${broken}`;
}

// Randomly change status every few seconds (simulation)
function randomUpdate() {
    const randomIndex = Math.floor(Math.random() * devices.length);
    const rand = Math.random();
    if (rand < 0.7) devices[randomIndex].status = "Healthy";
    else if (rand < 0.9) devices[randomIndex].status = "Warning";
    else devices[randomIndex].status = "Break";
    devices[randomIndex].lastUpdate = new Date().toLocaleTimeString();
    renderDevices();
}

renderDevices();
setInterval(randomUpdate, 3000);
