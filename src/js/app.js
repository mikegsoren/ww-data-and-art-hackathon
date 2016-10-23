document.addEventListener("DOMContentLoaded", function() {

  //code largely based on http://stackoverflow.com/questions/18425440/displaying-map-using-d3-js-and-geojson/38552478#38552478

  //---DECLARATIONS---

  //Width and height
  var w = 960;
  var h = 500;

  //CSV file list
  var county_list_2010 = ['/data/county/2010/total_population.csv', '/data/county/2010/race.csv'];

  //CSV file list
  var tract_list_2010 = ['/data/tracts/2010/total_population.csv', '/data/tracts/2010/race.csv'];

  function plotData(filepath, year) {

    //Define map projection
    var projection = d3.geo.mercator()
                           .translate([0, 0])
                           .scale(1);

    //Define path generator
    var path = d3.geo.path()
                     .projection(projection);
    
    //Load in GeoJSON data
    d3.json("/data/county/geojson/west_windsor_shape.json", function(json) {

      //Create SVG element
      var svg = d3.select(`section.year-${year}`)
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h)
                  .attr('viewBox', '0 0 960 500')
                  .attr('preserveAspectRatio', 'xMidYMid meet');

      // Calculate bounding box transforms for entire collection
      var b = path.bounds(json),
      s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
      t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];

      // Update the projection    
      projection
        .scale(s)
        .translate(t);

      //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
         .data(json.features)
         .enter()
         .append("path")
         .attr("d", path)
         .style("fill", "steelblue");
      });

    loadCSVData(filepath);
  };

  function loadCSVData(filepath) {

    var result = [];

    //Load the actual data onto the shape
    d3.csv(filepath, function(data) {

      for(var index in data) {
        var entry = data[index];

        if(entry.NAME.toLowerCase() === 'west windsor township') {
          // console.log('filepath is: ' + filepath);

          if (typeof entry !== "undefined") {
            // console.log('ENTRY: ' + entry.P003002);

            console.log(entry);
            result.push(entry);
          }
 
        }
      }
    });

    return result;
  };

  //---FUNCTION CALLS---

  for(var i = 0; i < county_list_2010.length; i++) {

    plotData(county_list_2010[i], "2010");
  }





  // BAR CHART

  var westWindsorBarChart = function() {

    // westWindsorData = loadCSVData(county_list_2010[1]);  // have to use 1 because 0 doesnt have race info

    westWindsorData = {
      CBSA: "45940",
      CNECTA: "999",
      COUNTY: "021",
      CSA:"408",
      GEOID:"3402180240",
      'HU100': "9810",
      'HU100.2000': "7450",
      NAME: "West Windsor township",
      NECTA: "99999",
      'P001001': "27165",
      'P001001.2000': "21907",
      'POP100': "27165",
      'POP100.2000': "21907",
      'P003001': "27165",
      'P003001.2000':"21907",
      'P003002':"14924",
      'P003002.2000':"15670",
      'P003003':"998",
      'P003003.2000':"605",
      'P003004':"25",
      'P003004.2000':"17",
      'P003005':"10245",
      'P003005.2000':"4986",
      'P003006':"10",
      'P003006.2000':"2",
      'P003007': "263",
      'P003007.2000': "236",
      'P003008': "700",
      'P003008.2000': "391",
      'POP100': "27165",
      'POP100.2000': "21907",
      STATE: "34",
      SUMLEV: "060"
    };

    // for(var i = 0; i < county_list_2010.length; i++) {

    //   // console.log(loadCSVData(county_list_2010[i]));

    //   westWindsorData.push(loadCSVData(county_list_2010[i]));      
    // }








    //  P003001 - total population
    document.getElementById('population').innerHTML = westWindsorData.P003001;
    population = westWindsorData.P003001;

    // P003002 - white
    whitePopulation = westWindsorData.P003002.toString() / population * 100;
    // white2000Population = westWindsorData.P003003.toString() / population * 100;
    console.log(whitePopulation);


    // P003003 - black/african american
    blackPopulation = westWindsorData.P003003.toString() / population * 100;
    console.log(blackPopulation);


    // P003004 - american indian or alaska native
    americanIndianPopulation = westWindsorData.P003004.toString() / population * 100;
    console.log(americanIndianPopulation);

    // P003005 - asian
    asianPopulation = westWindsorData.P003005.toString() / population * 100;
    console.log(asianPopulation);

    // P003006 - native hawaiian & other pacific islander
    pacificIslanderPopulation = westWindsorData.P003006.toString() / population * 100;
    console.log(pacificIslanderPopulation);

    // P003007 - other
    otherPopulation = westWindsorData.P003007.toString() / population * 100;

    // P003008 - two or more
    twoOrMorePopulation = westWindsorData.P003008.toString() / population * 100;


    // P003009 - three or more

    console.log(otherPopulation);
  };


  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  google.charts.setOnLoadCallback(drawCharts);

  // Set a callback to run when the Google Visualization API is loaded.
  // google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawCharts() {

    // Create the data table.
    var data1 = new google.visualization.DataTable();
    data1.addColumn('string', 'Race/Ethnicity');
    data1.addColumn('number', 'Population');
    // console.log(data.getColumnType(1));


    data1.addRows([
      ['White', whitePopulation],
      ['Black/African American', blackPopulation],
      ['American Indian and Native Alaskan', americanIndianPopulation],
      ['Asian', asianPopulation],
      ['Native Hawaiian and other Pacific Islanders', pacificIslanderPopulation],
      ['Other', otherPopulation],
      ['Two or More', twoOrMorePopulation]
    ]);

    // Set chart options
    var options1 = {'title': 'Race and Ethnicity Statistics of West Windsor (People who Identify as Only One Race/Ethnicity)',
                   'width': 1200,
                   'height': 600};

    // Instantiate and draw our chart, passing in some options.
    var chart1 = new google.visualization.BarChart(document.getElementById('bar-chart'));
    chart1.draw(data1, options1);


    //     // Create the data table.
    // var data2 = new google.visualization.DataTable();
    // data2.addColumn('string', 'Race/Ethnicity');
    // data2.addColumn('number', 'Population');
    // // console.log(data.getColumnType(1));


    // data2.addRows([
    //   ['White', whitePopulation],
    //   ['Black/African American', blackPopulation],
    //   ['American Indian and Native Alaskan', americanIndianPopulation],
    //   ['Asian', asianPopulation],
    //   ['Native Hawaiian and other Pacific Islanders', pacificIslanderPopulation],
    //   ['Other', otherPopulation]
    // ]);

    // // Set chart options
    // var options2 = {'title': 'Percentages of people who identify as only one race',
    //                'width': 1200,
    //                'height': 600};

    // // Instantiate and draw our chart, passing in some options.
    // var chart2 = new google.visualization.BarChart(document.getElementById('bar-chart'));
    // chart2.draw(data2, options2);
  };




  westWindsorBarChart();

});