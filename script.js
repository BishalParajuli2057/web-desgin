window.onload = function () {
    const defaultMunicipalityCode = 'SSS'; 
    const years = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"];
    let chart;


    function fetchPopulationData(municipalityCode) {
        fetch('https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: [
                    {
                        code: 'Vuosi',
                        selection: {
                            filter: 'item',
                            values: years
                        }
                    },
                    {
                        code: 'Alue',
                        selection: {
                            filter: 'item',
                            values: [municipalityCode]
                        }
                    },
                    {
                        code: 'Tiedot',
                        selection: {
                            filter: 'item',
                            values: ['vaesto']
                        }
                    }
                ],
                response: {
                    format: 'json-stat2'
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            const populationData = data.value;

            if (!chart) {
                
                chart = new frappe.Chart("#chart", {
                    title: "Population Growth (2000 - 2021)",
                    data: {
                        labels: years,
                        datasets: [
                            {
                                name: "Population",
                                chartType: 'line',
                                values: populationData
                            }
                        ]
                    },
                    type: 'line',
                    height: 450,
                    colors: ['#eb5146']
                });
            } else {
               
                chart.update({
                    labels: years,
                    datasets: [
                        {
                            name: "Population",
                            chartType: 'line',
                            values: populationData
                        }
                    ]
                });
            }
        })
        .catch(error => console.error('Error fetching population data:', error));
    }

  
    fetchPopulationData(defaultMunicipalityCode);

    
    function fetchMunicipalityCode(municipalityName) {
        return fetch('https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px')
            .then(response => response.json())
            .then(data => {
                const municipalityCodes = data.variables[1].values;
                const municipalityNames = data.variables[1].valueTexts;
                
                
                const index = municipalityNames.findIndex(name => name.toLowerCase() === municipalityName.toLowerCase());

                if (index !== -1) {
                    return municipalityCodes[index];
                } else {
                    alert("Municipality not found. Please check your input.");
                    throw new Error("Municipality not found");
                }
            });
    }

    
    document.getElementById("municipality-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const municipalityName = document.getElementById("input-area").value.trim();

        if (municipalityName) {
            fetchMunicipalityCode(municipalityName)
                .then(municipalityCode => {
                    fetchPopulationData(municipalityCode);
                })
                .catch(error => console.error('Error fetching municipality code:', error));
        } else {
            alert("Please enter a municipality name.");
        }
    });
};




