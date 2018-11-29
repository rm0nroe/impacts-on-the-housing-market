

    //We used the following resources as reference to build this visualization:
    //The Google Maps Javascript API documentation https://developers.google.com/maps/documentation/javascript/tutorial
    //A D3 & Google Maps demo from Mike Bostock https://bl.ocks.org/mbostock/899711


    // Create the Google Map
    var map = new google.maps.Map(d3.select("#map").node(), {
      zoom: 12,
      draggableCursor: 'crosshair',
      center: new google.maps.LatLng(33.4484, -112.0740),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapMaker: 'True'
        });

    // Load data

    d3.csv("data_fullset.csv", function(data) {
        //console.log(data);
        data.forEach(function(d) {
            d.Lat = +d.Lat;
            d.Lon = +d.Lon;
            d.Zestimate = +d.Zestimate;
        });
        //Create nested data set to account for houses with exact same Lat, Lon coordinates
        var nested_data = d3.nest()
                            .key(function(d) { return d.Location;})
                            .rollup(function(v) {
                                return {
                                    Lat: d3.max(v, function(d) { return d.Lat }),
                                    Lon: d3.max(v, function(d) { return d.Lon }),
                                    homes: Math.round(v.length),
                                    avg_zestimate: Math.round(d3.mean(v, function(d) { return d.Zestimate;})),
                                    max_zestimate: Math.round(d3.max(v, function(d) { return d.Zestimate;})),
                                    min_zestimate: Math.round(d3.min(v, function(d) { return d.Zestimate;})),
                                    avg_beds: Math.round(d3.mean(v, function(d) { return d.Bedrooms;})),
                                    max_beds: Math.round(d3.max(v, function(d) { return d.Bedrooms;})),
                                    min_beds: Math.round(d3.min(v, function(d) { return d.Bedrooms;})),
                                    avg_baths: Math.round(d3.mean(v, function(d) { return d.Bathrooms;})),
                                    max_baths: Math.round(d3.max(v, function(d) { return d.Bathrooms;})),
                                    min_baths: Math.round(d3.min(v, function(d) { return d.Bathrooms;}))
                                };
                            })
                            .entries(data);

        var overlay = new google.maps.OverlayView();

        overlay.onAdd = function() {
            var layer = d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class", "homes");

        //Create a scale to size the markers
        rScale = d3.scale.linear()
                        .domain([0, 10200901])
                        .range([4, 15]);

        //Define the tooltip
        var tooltip = d3.select("#map-body")
                    .append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

        //Draw each marker
        overlay.draw = function() {
            var projection = this.getProjection(),
            padding = 10;

            var marker = layer.selectAll("svg")
                .data(d3.entries(nested_data))
                .each(transform)
                .enter().append("svg")
                .each(transform)
                .attr("class", "marker");

            marker.append("circle")
                    .attr("r", function(d) {
                        return rScale(d.value.values['avg_zestimate'])})
                    .attr("cx", padding)
                    .attr("cy", padding)
                    .on("mouseover", function(d){
                        d3.select(this).attr("r", (rScale(d.value.values['avg_zestimate']+rScale(d.value.values['avg_zestimate'])))*2)
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", 1);
                        tooltip.html("<h3># of Homes: " + d.value.values['homes'] + "</h3>" + "<br>Avg Beds: "+d.value.values['avg_beds']+ "<br>Max Beds: "+d.value.values['max_beds']+ "<br>Min Beds: "+d.value.values['min_beds']+"<br><br>Avg Baths: "+d.value.values['avg_baths'] +"<br>Max Baths: "+d.value.values['max_baths'] +"<br>Min Baths: "+d.value.values['min_baths'])
                            .style("left", (d3.event.pageX - 50) + "px")
                            .style("top", (d3.event.pageY - 185) + "px");
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).attr("r", rScale(d.value.values['avg_zestimate']))
                        tooltip.transition()
                            .duration(200)
                            .style("opacity", 0);
                    });

            function transform(d) {
                d = new google.maps.LatLng(d.value.values['Lat'], d.value.values['Lon']);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) + "px");
            }
        };
        };
        overlay.setMap(map);
    });

    // KEY: [#schools, #yelp venues, year built, size, #bedrooms, #bathrooms]
    lookupTable =
    {'0,0,1958,1000,2,1.5': 402198.57143025595,
     '0,0,1958,1000,2,2': 367119.75130630546,
     '0,0,1958,1000,2,2.5': 239873.14729063542,
     '0,0,1958,1000,4,1.5': 163050.41780102265,
     '0,0,1958,1000,4,2': 184937.702242833,
     '0,0,1958,1000,4,2.5': 424433.2482377884,
     '0,0,1958,2000,2,1.5': 496505.3618269709,
     '0,0,1958,2000,2,2': 683790.6340603426,
     '0,0,1958,2000,2,2.5': 835781.2204153533,
     '0,0,1958,2000,4,1.5': 313916.511407704,
     '0,0,1958,2000,4,2': 539998.433404107,
     '0,0,1958,2000,4,2.5': 614509.1264226311,
     '0,0,1958,3000,2,1.5': 194621.34304922272,
     '0,0,1958,3000,2,2': 318316.6442765918,
     '0,0,1958,3000,2,2.5': 691363.6114136569,
     '0,0,1958,3000,4,2': 894914.7406890279,
     '0,0,1958,3000,4,2.5': 975494.2332828909,
     '0,0,1958,500,2,1.5': 111707.79361788093,
     '0,0,1958,500,2,2': 297590.0842258261,
     '0,0,1958,500,4,1.5': 142874.77596338012,
     '0,0,1958,500,4,2': 254722.36048122964,
     '0,0,1958,500,4,2.5': 185294.45873770065,
     '0,0,1978,1000,2,1.5': 106153.55542936183,
     '0,0,1978,1000,2,2': 189126.09388716856,
     '0,0,1978,1000,2,2.5': 216080.9857289942,
     '0,0,1978,1000,4,1.5': 141897.70941788598,
     '0,0,1978,1000,4,2': 233892.6860224316,
     '0,0,1978,1000,4,2.5': 288528.69867870613,
     '0,0,1978,2000,2,1.5': 550194.2021326685,
     '0,0,1978,2000,2,2': 432302.92646573414,
     '0,0,1978,2000,2,2.5': 294582.0546392134,
     '0,0,1978,2000,4,1.5': 344922.63891688554,
     '0,0,1978,2000,4,2': 219182.8559699569,
     '0,0,1978,2000,4,2.5': 304545.3581968701,
     '0,0,1978,3000,2,1.5': 199184.94438197996,
     '0,0,1978,3000,2,2': 965338.8451975051,
     '0,0,1978,3000,2,2.5': 526893.300469143,
     '0,0,1978,3000,4,2.5': 990813.0843538604,
     '0,0,1978,500,2,1.5': 115682.12287322809,
     '0,0,1978,500,2,2': 98130.34268515768,
     '0,0,1978,500,4,1.5': 132056.62720382962,
     '0,0,1978,500,4,2': 126224.9659010706,
     '0,0,1988,1000,2,1.5': 162920.00827044292,
     '0,0,1988,1000,2,2': 216120.20675373139,
     '0,0,1988,1000,2,2.5': 365652.567664721,
     '0,0,1988,1000,4,1.5': 96763.17622316822,
     '0,0,1988,1000,4,2': 347411.805237637,
     '0,0,1988,1000,4,2.5': 278530.64633578976,
     '0,0,1988,2000,2,1.5': 270020.9407106239,
     '0,0,1988,2000,2,2': 358993.0521749859,
     '0,0,1988,2000,2,2.5': 442271.0001672947,
     '0,0,1988,2000,4,1.5': 163723.08109046545,
     '0,0,1988,2000,4,2': 239641.21661636478,
     '0,0,1988,2000,4,2.5': 404104.70238238544,
     '0,0,1988,3000,2,1.5': 37225.548488189495,
     '0,0,1988,3000,2,2.5': 677588.6951484516,
     '0,0,1988,3000,4,1.5': 199909.71795706177,
     '0,0,1988,3000,4,2.5': 487935.45055384445,
     '0,0,1988,500,2,1.5': 53821.98260293402,
     '0,0,1988,500,2,2': 285717.7083875239,
     '0,0,1988,500,2,2.5': 200154.4846502253,
     '0,0,1988,500,4,1.5': 148806.9490022386,
     '0,0,1988,500,4,2': 160356.49900156446,
     '0,0,1988,500,4,2.5': 332255.09921150777,
     '0,0,1998,1000,2,1.5': 174014.580950115,
     '0,0,1998,1000,2,2': 162108.4873962401,
     '0,0,1998,1000,2,2.5': 202625.08564365303,
     '0,0,1998,1000,4,1.5': 188327.21047599078,
     '0,0,1998,1000,4,2': 315827.9345872808,
     '0,0,1998,1000,4,2.5': 336476.1205543283,
     '0,0,1998,2000,2,1.5': 221847.72553993014,
     '0,0,1998,2000,2,2': 216416.58959375092,
     '0,0,1998,2000,2,2.5': 464704.3209607495,
     '0,0,1998,2000,4,2': 353176.50944393885,
     '0,0,1998,2000,4,2.5': 548826.736411041,
     '0,0,1998,3000,2,2.5': 1435809.1326837724,
     '0,0,1998,3000,4,2': 499124.36479532137,
     '0,0,1998,3000,4,2.5': 488738.27235320176,
     '0,0,1998,500,2,1.5': 127311.4160313267,
     '0,0,1998,500,2,2': 171650.87289028347,
     '0,0,1998,500,4,2': 270716.00189439853,
     '0,0,1998,500,4,2.5': 83247.24626675661,
     '0,0,2008,1000,2,1.5': 172799.6451459549,
     '0,0,2008,1000,2,2': 203192.84476606845,
     '0,0,2008,1000,2,2.5': 237254.27184431735,
     '0,0,2008,1000,4,1.5': 180739.5544884956,
     '0,0,2008,1000,4,2': 189633.77437973217,
     '0,0,2008,1000,4,2.5': 1067842.674628789,
     '0,0,2008,2000,2,1.5': 207613.44264954043,
     '0,0,2008,2000,2,2': 319304.18070876674,
     '0,0,2008,2000,2,2.5': 563949.3121247848,
     '0,0,2008,2000,4,2': 223890.9663661414,
     '0,0,2008,2000,4,2.5': 363374.97712306684,
     '0,0,2008,3000,2,1.5': 129330.56303387451,
     '0,0,2008,3000,2,2.5': 454973.5541832001,
     '0,0,2008,3000,4,1.5': 548366.2178521277,
     '0,0,2008,3000,4,2': 307901.86594037653,
     '0,0,2008,3000,4,2.5': 461679.5575684701,
     '0,0,2008,500,2,1.5': 154621.80726324613,
     '0,0,2008,500,2,2': 135137.22430555677,
     '0,0,2008,500,4,1.5': 73430.23171664847,
     '0,0,2008,500,4,2': 238975.97992013514,
     '0,0,2008,500,4,2.5': 315550.94428699143,
     '0,0,2018,1000,2,2': 288443.8041426738,
     '0,0,2018,1000,2,2.5': 295177.0198745661,
     '0,0,2018,1000,4,2': 295703.3024378568,
     '0,0,2018,1000,4,2.5': 263653.6583263217,
     '0,0,2018,2000,2,2.5': 443687.94804731436,
     '0,0,2018,2000,4,2': 367784.5598428257,
     '0,0,2018,2000,4,2.5': 406310.5068515487,
     '0,0,2018,3000,2,1.5': 862092.0436207214,
     '0,0,2018,3000,2,2.5': 488206.3301698754,
     '0,0,2018,3000,4,2': 559644.4252863962,
     '0,0,2018,3000,4,2.5': 396742.5494396377,
     '0,0,2018,500,2,1.5': 126827.60443820708,
     '0,0,2018,500,2,2': 130783.86627303969,
     '0,0,2018,500,4,2': 189936.8916660988,
     '0,0,2018,500,4,2.5': 822054.1651491289,
     '0,1,1958,1000,2,1.5': 169024.13067882854,
     '0,1,1958,1000,2,2': 180478.86316929891,
     '0,1,1958,1000,2,2.5': 503260.8507746691,
     '0,1,1958,1000,4,1.5': 129467.3954607264,
     '0,1,1958,1000,4,2': 293591.11395691335,
     '0,1,1958,1000,4,2.5': 435372.9550705955,
     '0,1,1958,2000,2,1.5': 280072.1542344968,
     '0,1,1958,2000,2,2': 279254.688651415,
     '0,1,1958,2000,2,2.5': 557009.0595520023,
     '0,1,1958,2000,4,2': 400003.7331515272,
     '0,1,1958,3000,2,2.5': 517316.6668127958,
     '0,1,1958,3000,4,2.5': 1141896.876270789,
     '0,1,1958,500,2,1.5': 98219.00700138652,
     '0,1,1958,500,4,2': 407950.61351924314,
     '0,1,1978,1000,2,1.5': 225936.08260791394,
     '0,1,1978,1000,2,2': 180975.9288666279,
     '0,1,1978,1000,2,2.5': 331675.3351903831,
     '0,1,1978,1000,4,1.5': 238049.39629793033,
     '0,1,1978,1000,4,2': 162174.1988243708,
     '0,1,1978,1000,4,2.5': 408395.0204925617,
     '0,1,1978,2000,2,1.5': 265497.251367939,
     '0,1,1978,2000,2,2': 247138.8283151856,
     '0,1,1978,2000,2,2.5': 489099.24178369826,
     '0,1,1978,2000,4,2.5': 711183.1956767129,
     '0,1,1978,3000,2,1.5': 77484.85729038143,
     '0,1,1978,3000,4,2': 300947.9158203802,
     '0,1,1978,500,2,1.5': 160174.16631705748,
     '0,1,1978,500,4,1.5': 143776.44006848588,
     '0,1,1988,1000,2,1.5': 72432.15867964791,
     '0,1,1988,1000,2,2': 240394.8585742463,
     '0,1,1988,1000,2,2.5': 317877.0303371258,
     '0,1,1988,1000,4,2': 214547.02759748718,
     '0,1,1988,2000,2,2.5': 343902.2266366621,
     '0,1,1988,2000,4,2': 364277.2105910076,
     '0,1,1988,3000,4,1.5': 335128.2032307814,
     '0,1,1988,500,2,1.5': 109852.35056071455,
     '0,1,1998,1000,2,1.5': 202698.0573677991,
     '0,1,1998,1000,2,2': 167963.99472213158,
     '0,1,1998,1000,2,2.5': 263682.27309001266,
     '0,1,1998,1000,4,2': 285487.0514360009,
     '0,1,1998,2000,2,2.5': 387060.5448461464,
     '0,1,1998,2000,4,2': 421962.26289196487,
     '0,1,1998,3000,4,2.5': 797527.5380190959,
     '0,1,1998,500,2,1.5': 273145.46753858426,
     '0,1,1998,500,2,2': 96028.41264975998,
     '0,1,2008,1000,2,1.5': 344814.70939151704,
     '0,1,2008,1000,2,2': 207455.34621507316,
     '0,1,2008,1000,2,2.5': 244600.81060722138,
     '0,1,2008,1000,4,2': 178395.94696317698,
     '0,1,2008,1000,4,2.5': 217111.1949948229,
     '0,1,2008,2000,2,2.5': 360400.7162876624,
     '0,1,2008,2000,4,2.5': 409048.1740848508,
     '0,1,2008,3000,2,1.5': 441022.5746588119,
     '0,1,2008,3000,2,2.5': 433894.4997055674,
     '0,1,2008,3000,4,2.5': 600877.9757763712,
     '0,1,2008,500,2,1.5': 238020.66627689402,
     '0,1,2008,500,2,2': 145358.84544192435,
     '0,1,2018,1000,2,2': 271062.17158050265,
     '0,1,2018,1000,2,2.5': 311840.23530577,
     '0,1,2018,1000,4,2': 328331.81557138753,
     '0,1,2018,2000,4,2.5': 840852.8242924748,
     '0,1,2018,500,2,1.5': 159147.5424470985,
     '0,3,1958,1000,2,1.5': 322519.50563976634,
     '0,3,1958,1000,2,2': 227142.16867964398,
     '0,3,1958,1000,4,2': 384802.11537446175,
     '0,3,1958,2000,2,2': 571934.0781901047,
     '0,3,1958,2000,4,2.5': 654719.4434239147,
     '0,3,1958,500,4,1.5': 254037.378407787,
     '0,3,1978,1000,2,1.5': 307076.59609587665,
     '0,3,1978,1000,2,2.5': 322277.40616426186,
     '0,3,1978,1000,4,1.5': 405877.39050598885,
     '0,3,1978,1000,4,2': 283299.7312124371,
     '0,3,1978,2000,2,2': 459402.1159113187,
     '0,3,1988,1000,2,2': 148440.93661519742,
     '0,3,1988,500,2,1.5': 66223.02721436582,
     '0,3,2008,2000,2,2': 358749.6563591494,
     '0,3,2008,500,2,2': 494506.5777368022,
     '0,7,1958,1000,2,1.5': 301162.925082151,
     '0,7,1958,1000,2,2': 424713.1799443574,
     '0,7,1958,1000,4,2': 247139.81209258654,
     '0,7,1958,2000,2,1.5': 169489.05621018974,
     '0,7,1958,2000,4,2.5': 380637.98350203526,
     '0,7,1978,1000,2,1.5': 235475.96819731404,
     '0,7,1978,1000,2,2': 187055.134340663,
     '0,7,1988,1000,2,2': 296316.5349460652,
     '0,7,1998,1000,4,2': 348359.27141775464,
     '0,7,1998,2000,4,2.5': 342894.566709006,
     '0,7,1998,3000,4,2.5': 971733.0121000782,
     '0,7,2008,1000,2,2': 246843.58658903284,
     '0,7,2008,1000,2,2.5': 242012.9806024656,
     '0,7,2008,500,2,1.5': 139165.7911447474,
     '1,0,1958,1000,2,1.5': 215463.94280270344,
     '1,0,1958,1000,2,2': 171730.42511146073,
     '1,0,1958,1000,2,2.5': 418421.91430277145,
     '1,0,1958,1000,4,1.5': 245425.90733624247,
     '1,0,1958,1000,4,2': 182035.12261874502,
     '1,0,1958,1000,4,2.5': 266208.63815345004,
     '1,0,1958,2000,2,1.5': 261251.5820281891,
     '1,0,1958,2000,2,2': 490519.7240619436,
     '1,0,1958,2000,2,2.5': 429584.15662254253,
     '1,0,1958,2000,4,1.5': 463936.995309438,
     '1,0,1958,2000,4,2': 209572.40308029327,
     '1,0,1958,2000,4,2.5': 482828.43986893556,
     '1,0,1958,3000,2,1.5': 397120.2177337489,
     '1,0,1958,3000,2,2': 692623.0564584343,
     '1,0,1958,3000,2,2.5': 949019.3793392503,
     '1,0,1958,3000,4,2.5': 625908.7613615596,
     '1,0,1958,500,2,1.5': 202645.2984528487,
     '1,0,1958,500,2,2': 451844.6259131149,
     '1,0,1958,500,4,1.5': 177726.45789605737,
     '1,0,1978,1000,2,1.5': 193290.7466110783,
     '1,0,1978,1000,2,2': 212745.9777951026,
     '1,0,1978,1000,2,2.5': 433857.1097761628,
     '1,0,1978,1000,4,1.5': 192511.60871626847,
     '1,0,1978,1000,4,2': 242572.1767146289,
     '1,0,1978,1000,4,2.5': 206119.06897201765,
     '1,0,1978,2000,2,1.5': 377050.27034285147,
     '1,0,1978,2000,2,2': 445225.2274745517,
     '1,0,1978,2000,2,2.5': 638472.828721665,
     '1,0,1978,2000,4,1.5': 243802.03438070515,
     '1,0,1978,2000,4,2': 343421.5842129552,
     '1,0,1978,2000,4,2.5': 491690.43903881806,
     '1,0,1978,3000,2,1.5': -30859.20259614369,
     '1,0,1978,3000,2,2.5': 732930.1418882607,
     '1,0,1978,3000,4,2.5': 854500.8319457695,
     '1,0,1978,500,2,1.5': 57262.878062343065,
     '1,0,1978,500,2,2': 136346.61770992284,
     '1,0,1978,500,4,2': 223320.72411907304,
     '1,0,1988,1000,2,1.5': 199808.24719950178,
     '1,0,1988,1000,2,2': 117367.34219029256,
     '1,0,1988,1000,2,2.5': 266371.89878263563,
     '1,0,1988,1000,4,1.5': 206084.75463163166,
     '1,0,1988,1000,4,2': 232750.14756066864,
     '1,0,1988,1000,4,2.5': 275397.59420966386,
     '1,0,1988,2000,2,2': 404943.8157998068,
     '1,0,1988,2000,2,2.5': 287350.7187928061,
     '1,0,1988,2000,4,1.5': 263224.6997540384,
     '1,0,1988,2000,4,2': 306429.16473748285,
     '1,0,1988,2000,4,2.5': 360688.8601296487,
     '1,0,1988,3000,2,2.5': 842932.9779424705,
     '1,0,1988,3000,4,2.5': 491057.46108612,
     '1,0,1988,500,2,1.5': 116752.02416733924,
     '1,0,1988,500,2,2': 139185.57313077917,
     '1,0,1998,1000,2,1.5': 189942.11241486497,
     '1,0,1998,1000,2,2.5': 284799.6366984698,
     '1,0,1998,1000,4,2': 219278.0336908703,
     '1,0,1998,1000,4,2.5': 343048.0166002505,
     '1,0,1998,2000,2,2.5': 699535.6436254377,
     '1,0,1998,2000,4,2': 304303.2381517827,
     '1,0,1998,2000,4,2.5': 465760.99158398545,
     '1,0,1998,3000,2,2.5': 484659.04373777466,
     '1,0,1998,3000,4,2.5': 479772.93656847,
     '1,0,1998,500,2,1.5': 105719.7624419286,
     '1,0,2008,1000,2,2': 292956.93373938167,
     '1,0,2008,1000,2,2.5': 248493.63358837366,
     '1,0,2008,1000,4,1.5': 164207.89795068407,
     '1,0,2008,1000,4,2': 283031.80118214077,
     '1,0,2008,1000,4,2.5': 191589.88497438453,
     '1,0,2008,2000,2,2.5': 667202.3373969488,
     '1,0,2008,2000,4,2': 355492.87561483984,
     '1,0,2008,2000,4,2.5': 298366.41321191035,
     '1,0,2008,3000,2,2.5': 579641.1116342585,
     '1,0,2008,3000,4,2.5': 1087003.598739866,
     '1,0,2008,500,2,1.5': 212042.8205871377,
     '1,0,2018,1000,2,2': 245843.1881427726,
     '1,0,2018,1000,2,2.5': 269728.81671373465,
     '1,0,2018,1000,4,2': 250289.538572404,
     '1,0,2018,1000,4,2.5': 244132.6292243206,
     '1,0,2018,2000,2,2': 339501.9530255396,
     '1,0,2018,2000,4,2': 488621.09112016123,
     '1,0,2018,3000,2,1.5': 369830.40261403716,
     '1,0,2018,3000,2,2.5': 931026.7288859986,
     '1,0,2018,3000,4,2.5': 437192.46882234165,
     '1,0,2018,500,2,1.5': 165290.29014864317,
     '1,1,1958,1000,2,1.5': 205359.15684903358,
     '1,1,1958,1000,4,1.5': 233606.3596218371,
     '1,1,1958,1000,4,2': 273887.913736942,
     '1,1,1958,2000,2,2.5': 572543.5075993078,
     '1,1,1958,2000,4,2': 475278.8197267457,
     '1,1,1958,2000,4,2.5': 665530.1722403283,
     '1,1,1958,500,2,1.5': 141809.9229474225,
     '1,1,1978,1000,2,1.5': 186589.10249565137,
     '1,1,1978,1000,2,2': 198749.62661438104,
     '1,1,1978,1000,2,2.5': 230835.595401481,
     '1,1,1978,1000,4,1.5': 201378.4860812927,
     '1,1,1978,1000,4,2': 200917.48746477923,
     '1,1,1978,1000,4,2.5': 216007.20327855428,
     '1,1,1978,3000,4,2.5': 365968.60777541134,
     '1,1,1978,500,2,1.5': 62523.06067453494,
     '1,1,1978,500,4,1.5': 147630.58107251453,
     '1,1,1978,500,4,2': 224951.44941845056,
     '1,1,1988,1000,2,2': 197446.99410899283,
     '1,1,1988,1000,4,2': 252141.60038069013,
     '1,1,1988,2000,2,2.5': 355231.97699063545,
     '1,1,1998,1000,2,2': 299759.3204025751,
     '1,1,1998,1000,4,2': 276159.8671064296,
     '1,1,2008,1000,4,2.5': 170335.93016055026,
     '1,1,2018,1000,2,2': 260135.12475641258,
     '1,1,2018,2000,4,2.5': 597288.4478457514,
     '1,3,1978,2000,4,2': 270584.79168674693,
     '1,3,1998,1000,2,2': 525842.040762251,
     '1,7,1988,3000,2,1.5': 9804948.165495902,
     '2,0,1958,1000,2,1.5': 135114.72649505106,
     '2,0,1958,1000,2,2': 292235.68005622504,
     '2,0,1958,1000,2,2.5': 205535.54243169905,
     '2,0,1958,1000,4,1.5': 220742.51901276875,
     '2,0,1958,1000,4,2': 287439.3072364175,
     '2,0,1958,1000,4,2.5': 408279.60341565416,
     '2,0,1958,2000,2,1.5': 417373.47722166963,
     '2,0,1958,2000,2,2': 440034.6866392064,
     '2,0,1958,2000,2,2.5': 564162.5105715174,
     '2,0,1958,2000,4,2': 372487.768234882,
     '2,0,1958,2000,4,2.5': 505027.7009381885,
     '2,0,1958,3000,2,2.5': 1463046.8738246565,
     '2,0,1958,3000,4,2.5': 576025.9957975937,
     '2,0,1958,500,2,1.5': 126872.22230515725,
     '2,0,1958,500,4,1.5': 148303.739029288,
     '2,0,1978,1000,2,1.5': 230370.71688666323,
     '2,0,1978,1000,2,2': 252049.66437072319,
     '2,0,1978,1000,2,2.5': 327569.1395293143,
     '2,0,1978,1000,4,1.5': 206409.06543914555,
     '2,0,1978,1000,4,2': 421056.03613942425,
     '2,0,1978,1000,4,2.5': 157042.55441527956,
     '2,0,1978,2000,2,1.5': 368587.3905136453,
     '2,0,1978,2000,2,2': 244141.57375275414,
     '2,0,1978,2000,2,2.5': 340259.7766463886,
     '2,0,1978,2000,4,1.5': 487877.2933461923,
     '2,0,1978,2000,4,2': 217322.75878278268,
     '2,0,1978,2000,4,2.5': 454400.9254617881,
     '2,0,1978,3000,4,2.5': 1295225.1580417096,
     '2,0,1978,500,2,1.5': 213563.53280626124,
     '2,0,1978,500,2,2': 219940.35413931462,
     '2,0,1978,500,4,1.5': 144390.5171259052,
     '2,0,1978,500,4,2': 198545.46917066092,
     '2,0,1988,1000,2,1.5': 64758.15417313587,
     '2,0,1988,1000,2,2': 174914.64759106727,
     '2,0,1988,1000,2,2.5': 216698.43026462922,
     '2,0,1988,1000,4,1.5': 173480.01958976654,
     '2,0,1988,1000,4,2': 206023.92414506423,
     '2,0,1988,1000,4,2.5': 175411.8100848148,
     '2,0,1988,2000,2,2.5': 280606.92025935405,
     '2,0,1988,2000,4,2': 584294.6693940831,
     '2,0,1988,2000,4,2.5': 263285.3070440817,
     '2,0,1988,3000,2,1.5': 313712.9318179758,
     '2,0,1988,3000,4,2.5': 465266.50809416815,
     '2,0,1988,500,2,1.5': 102046.54874202808,
     '2,0,1988,500,2,2': 145335.38667882755,
     '2,0,1998,1000,2,1.5': 196516.0419714914,
     '2,0,1998,1000,2,2.5': 287061.3291399622,
     '2,0,1998,1000,4,2': 244459.88237630168,
     '2,0,1998,1000,4,2.5': 366944.8529670154,
     '2,0,1998,2000,2,2.5': 414920.80328224425,
     '2,0,1998,2000,4,2': 593698.0788746091,
     '2,0,1998,3000,4,2.5': 838195.7333717872,
     '2,0,2008,1000,2,2': 153890.7152696033,
     '2,0,2008,1000,2,2.5': 230224.10266882685,
     '2,0,2008,1000,4,2': 251029.8921242198,
     '2,0,2008,2000,2,2.5': 315381.3290957635,
     '2,0,2008,2000,4,2.5': 535868.0083960383,
     '2,0,2008,3000,2,2.5': 641238.1998573793,
     '2,0,2008,500,2,1.5': 436897.61723523587,
     '2,0,2018,1000,2,2.5': 220048.48972832985,
     '2,0,2018,2000,2,2': 314271.1302983125,
     '2,0,2018,3000,4,2.5': 797262.0471387311,
     '2,1,1958,1000,2,1.5': 279540.5656352962,
     '2,1,1958,1000,4,1.5': 133503.2727145283,
     '2,1,1958,1000,4,2': 428200.5049221579,
     '2,1,1958,1000,4,2.5': 210313.6109274662,
     '2,1,1958,2000,4,2': 351436.39594338223,
     '2,1,1978,1000,2,1.5': 251349.44601645428,
     '2,1,1978,1000,2,2': 186918.5478378353,
     '2,1,1978,1000,4,1.5': 167957.70812158295,
     '2,1,1978,1000,4,2': 359359.99208223866,
     '2,1,1978,2000,4,2': 237589.3677409915,
     '2,1,1978,2000,4,2.5': 348435.2543475124,
     '2,1,1988,1000,2,2': 142540.9912713988,
     '2,1,1988,1000,2,2.5': 238948.94707023283,
     '2,1,1988,500,2,1.5': 72998.90846965418,
     '2,1,2008,1000,2,2.5': 225716.08672832156,
     '2,1,2018,500,2,1.5': 158026.3955553639,
     '2,3,1958,1000,2,1.5': 308866.6770343994,
     '2,3,1958,1000,2,2': 349027.5931123474,
     '2,3,1958,1000,4,1.5': 267875.7421325773,
     '2,3,1958,1000,4,2': 335722.4040050225,
     '2,3,1958,2000,2,2': 520253.68941100885,
     '2,3,1978,1000,2,1.5': 173213.69477071028,
     '2,3,1988,1000,2,2.5': 214459.0524321272,
     '3,0,1958,1000,2,1.5': 270798.29362338706,
     '3,0,1958,1000,2,2': 181372.3288068935,
     '3,0,1958,1000,4,1.5': 177283.7783395099,
     '3,0,1958,1000,4,2': 275401.67102323065,
     '3,0,1958,1000,4,2.5': 402485.000131608,
     '3,0,1958,2000,2,1.5': 272607.16758142196,
     '3,0,1958,500,2,1.5': 141288.31865010873,
     '3,0,1978,1000,2,1.5': 149563.29238430894,
     '3,0,1978,1000,2,2': 174874.1089808473,
     '3,0,1978,1000,2,2.5': 173892.78073120557,
     '3,0,1978,1000,4,1.5': 135816.55244065012,
     '3,0,1978,1000,4,2': 172174.28433320238,
     '3,0,1978,1000,4,2.5': 148351.3464831157,
     '3,0,1978,2000,2,2': 359277.0857893475,
     '3,0,1978,2000,2,2.5': 557398.8438492849,
     '3,0,1978,2000,4,2': 476591.7189323003,
     '3,0,1978,2000,4,2.5': 241337.30879552793,
     '3,0,1978,3000,2,1.5': 9502.81146596368,
     '3,0,1978,500,2,1.5': 140216.4308042814,
     '3,0,1988,1000,4,2': 350254.3768062066,
     '3,0,1988,2000,2,2.5': 685869.1600093904,
     '3,0,1998,2000,2,2.5': 491566.3103257546,
     '3,1,1958,1000,4,2': 372845.77991695376,
     '3,1,1978,1000,2,2': 201311.8821619382,
     '3,1,1978,500,2,1.5': 376812.8734137061,
     '3,1,1998,1000,2,1.5': 261826.57670910735,
     '3,1,2008,500,2,1.5': 163858.86338851688,
     '3,3,1988,1000,2,2.5': 193762.8244903864};

    function defaultParam(value, defaultValue) {
      if (typeof value != 'undefined') {
        return value;
      } else {
        return defaultValue;
      }
    }

    function nextNearest(arr, value) {
      if (value <= arr[0]){
        value = arr[0];
      } else if (value <= arr[arr.length - 1]){
        for (var i in arr.slice(1)) {
          if (value <= arr[i] && value > arr[i - 1]) {
            value = arr[i];
            break;
          }
        }
      } else {
        value = arr[arr.length - 1];
      }

      return value;
    }


    function lookup(params){
      var schoolCount = defaultParam(params.schoolCount, 0);
      var yelpCount = defaultParam(params.yelpCount, 0);
      var yearBuilt = defaultParam(params.yearBuilt, 1958);
      var homeSize = defaultParam(params.homeSize, 500);
      var bedrooms = defaultParam(params.bedrooms, 2);
      var bathrooms = defaultParam(params.bathrooms, 1.5)

      if (bedrooms >= 3) {
        bedrooms = 4;
      } else {
        bedrooms = 2;
      }

      if (bathrooms > 2) {
        bathrooms = 2.5;
      }

      yearBuilt = nextNearest([1958, 1978, 1988, 1998, 2008, 2018], yearBuilt);
      homeSize = nextNearest([500, 1000, 2000, 3000], homeSize);

      return lookupTable[[schoolCount, yelpCount, yearBuilt, homeSize, bedrooms, bathrooms]];
    }