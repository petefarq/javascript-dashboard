//Loads json data and creates selection dropdown

d3.json('samples.json').then(function(data) {
    var data = data;
    console.log(data);
    
    // Uses the Names array to create the dropdown options
    var namesList = data.names;     
    var sel = document.getElementById('selDataset');
    for(var i = 0; i < namesList.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = namesList[i];
        opt.value = namesList[i];
        sel.appendChild(opt);
    };
});
// Runs when Subject ID dropdown choice changes on DOM
function optionChanged(choice) {

    d3.json('samples.json').then(function(data) {
        
        // Gets the metadata and puts it into variables
        var data = data;
        
        var subjectID = choice;
        index = data.names.indexOf(subjectID);
        metadata = data.metadata[index];
        id = data.metadata[index].id;
        ethnicity = data.metadata[index].ethnicity;
        gender = data.metadata[index].gender;
        age = data.metadata[index].age;
        locale = data.metadata[index].location;
        bbtype = data.metadata[index].bbtype;
        wfreq = data.metadata[index].wfreq;
       
        // Clears the existing list, if any
        var metaList = d3.select("#metadata")
        metaList.html("")
        
        // Writes values into list
        var li1 = d3.select("#metadata").append("p");
        li1.text("id: "+ id);
        var li2 = d3.select("#metadata").append("p");
        li2.text("ethnicity: " + ethnicity);
        var li3 = d3.select("#metadata").append("p");
        li3.text("gender: " + gender);
        var li4 = d3.select("#metadata").append("p");
        li4.text("age: " + age);
        var li5 = d3.select("#metadata").append("p");
        li5.text("location: " + locale);
        var li6 = d3.select("#metadata").append("p");
        li6.text("bbtype: " + bbtype);
        var li7 = d3.select("#metadata").append("p");
        li7.text("wfreq: " + wfreq);

        sampleValues = data.samples[index].sample_values.slice(0,10)
        console.log(sampleValues)

        otuIds = data.samples[index].otu_ids.slice(0,10)
        otuIdsText = otuIds.map(String)
        console.log(otuIdsText)

        otuLabels = data.samples[index].otu_labels.slice(0,10)
        console.log(otuLabels)

        var trace1 = {
          x: sampleValues,
          y: ['1','2','3','4','5','6','7','8','9','10'],
          text: otuLabels,
          orientation: "h",
          type: "bar"
        };

        var data = [trace1];

        Plotly.newPlot("bar", data);
        
    });
};

