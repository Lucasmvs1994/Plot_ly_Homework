function buildingPlots(id) {

    //Using the D3 library to read in sample.jason...

    d3.json("samples.json").then (sampledata =>{
        console.log(sampledata)

        var ids = sampledata.samples[0].otu_ids;

        console.log(ids)

        var sample_values =  sampledata.samples[0].sample_values.slice(0,10).reverse();

        console.log(sample_values)

        var labels =  sampledata.samples[0].otu_labels.slice(0,10);
        console.log (labels)
            

        // Selecting the top 10 OTUS + creating the bar plot... 

            var OTU_top10 = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();

            var otu_ids = OTU_top10.map(d => "OTU " + ds);

            var labels =  sampledata.samples[0].otu_labels.slice(0,10);

            var trace = {
                x: sample_values,
                y: otu_ids,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };

            var data = [trace];
    
            var style_1 = {
                title: "Top 10 OTUs",
                yaxis:{
                tickmode:"linear",
                },

                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    



        Plotly.newPlot("bar", data, style_1);



         //Creating yhe bubble plot...


            var trace1 = {

                x: sampledata.samples[0].otu_ids,

                y: sampledata.samples[0].sample_values,

                mode: "markers",

                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },

                text:  sampledata.samples[0].otu_labels
    
            };
    
        
            var style_2 = {

                xaxis:{title: "OTU ID"},

                height: 600,
                width: 1000
            };
    
             
            var data1 = [trace1];
    
        

        Plotly.newPlot("bubble", data1, style_2); 
        
        });
    }  

    
    // Last step... 

    function getData(id) {
        
            d3.json("samples.json").then((data)=> {

                var metadata = data.metadata;
        
        
               var result = metadata.filter(meta => meta.id.toString() === id)[0];

               var Info = d3.select("#sample-metadata");
                
               Info.html("");
        
                Object.entries(result).forEach((key) => {   

                    Info.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
                });
            });

        }
        function js(id) {

            buildingPlots(id);
            getData(id);
        }
        
        function init() {
            var dropdown = d3.select("#selDataset");
        
            d3.json("samples.json").then((data)=> {
                console.log(data)
        
                data.names.forEach(function(name) {
                    dropdown.append("option").text(name).property("value");
                });
        
                buildingPlots(data.names[0]);
                getData(data.names[0]);
            });
        }
        
        init();