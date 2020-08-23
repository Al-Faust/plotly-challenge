function graphs(names) {
    d3.json("samples.json").then ((loadData) => {
        var metaData = loadData.metadata
        //check data is pulling correctly
        //console.log(metaData);

        var filteredB = metaData.filter((b) =>
            b.id == names);
        //check names
        //console.log(filteredB)

        var samples = loadData.samples.filter((b) =>
            b.id == names);
            samples = samples[0]
        //console.log(samples);

        var drop = d3.select("#sample-metadata")
        drop.html("");
        Object.entries(filteredB[0]).forEach(([key, value]) => {
            drop.append("h6")
                .text(`${key}, ${value}`)});
        
        //bar chart
        var trace1 = {
            x: samples.sample_values.slice(0, 10).reverse(), //sorting and slicing
            y: samples.otu_ids.slice(0, 10).map(o => `OTU ${o}`).reverse(), //map the individual labels to the bars
            text: samples.otu_labels.slice(0,10).reverse(), //hover text
            type: "bar",
            orientation: "h"
        };
        
        var data = [trace1];

        var layout = {
            title: "Top 10"
        };
        //display bar chart
        Plotly.newPlot("bar", data, layout)

        // https://plotly.com/javascript/bubble-charts/
        //bubble chart
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            text: samples.otu_labels,
            mode: "markers",
            type: "bubble",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            }
        };

        var data2 = [trace2];

        var layout2 = {
            title: "Bacteria per Sample",
            xaxis: {title: "OTU IDs"}
        };
        //display bubble chart
        Plotly.newPlot("bubble", data2, layout2);
    });
};
//dropdown menu
function parseData() {
    var dropDown = d3.select("#selDataset")
    d3.json("samples.json").then ((loadData) =>{
        var names = loadData.names
        console.log(names);
        names.forEach((bacteria) =>{
            dropDown.append("option").text(bacteria).property("value", bacteria);
        });
    });

};
function optionChanged(newName) {
    graphs(newName)
};

//first load in
graphs(940)
parseData()