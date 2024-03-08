function pingServer() {
    // When testing locally, change the URL to "http://localhost:3000/api/v1/risks"
    fetch("https://healthinsuranceapi.azurewebsites.net/ping")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

pingServer();

document
    .getElementById("riskForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        const age = parseInt(document.getElementById("age").value);
        const feet = parseInt(document.getElementById("feet").value);
        const inches = parseInt(document.getElementById("inches").value);
        const weight = parseInt(document.getElementById("weight").value);
        const systolic = parseInt(document.getElementById("systolic").value);
        const diastolic = parseInt(document.getElementById("diastolic").value);
        const diabetes = document.getElementById("diabetes").value;
        const cancer = document.getElementById("cancer").value;
        const alzheimers = document.getElementById("alzheimers").value;
        const resultElement = document.getElementById("result");

        // When testing locally, change the URL to "http://localhost:3000/api/v1/risks"
        fetch("https://healthinsuranceapi.azurewebsites.net/api/v1/risks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                age,
                feet,
                inches,
                weight,
                systolic,
                diastolic,
                isFamilyHistoryDiabetes: diabetes === "y",
                isFamilyHistoryCancer: cancer === "y",
                isFamilyHistoryAlzheimers: alzheimers === "y",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                resultElement.innerHTML = `
            <h2>Risk Scores</h2>
            <p>Age: ${data.agePoints}</p>
            <p>Body-Mass: ${data.bmiPoints}</p>
            <p>Blood Pressure: ${data.bloodPressurePoints}</p>
            <p>Family History: ${data.familyDiseasePoints}</p>
            <p>Based on these scores, the person is ${data.riskCategory}.</p>
        `;
            })
            .catch((error) => {
                console.error("Error:", error);
                resultElement.innerHTML =
                    "<p>Oops! Something went wrong. Please try again later.</p>";
            });
    });

document.getElementById("resetButton").addEventListener("click", function () {
    // Reset input fields to empty values
    document.getElementById("age").value = "";
    document.getElementById("feet").value = "";
    document.getElementById("inches").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("systolic").value = "";
    document.getElementById("diastolic").value = "";
    document.getElementById("diabetes").value = "n";
    document.getElementById("cancer").value = "n";
    document.getElementById("alzheimers").value = "n";

    // Clear result section
    document.getElementById("result").innerHTML = "";
});
