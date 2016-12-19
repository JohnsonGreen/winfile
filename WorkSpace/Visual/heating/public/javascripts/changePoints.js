/**
 * Created by cyh on 2016/12/16.
 */
//ajax异步加载
function put(year,month){


    if(year != null && month != null){
        $.get("/problem?year="+parseInt(year)+"&&month="+parseInt(month), function(result){
            historgram(result);
        });
        heatPoint("/date?year="+parseInt(year)+"&&month="+parseInt(month));
    }else if(year == null && month != null){

        $.get("/problem?month="+parseInt(month), function(result){
            historgram(result);
        });

        heatPoint("/date?month="+parseInt(month));
    }else if(year != null && month == null){
        $.get("/problem?year="+parseInt(year), function(result){
            historgram(result);
        });
        heatPoint("/date?year="+parseInt(year));
    }else{
        $.get("/problem", function(result){
            historgram(result);
        });
        heatPoint("/date");
    }

}

$('#hid-month').hide(600);
$('.slider-choice').jRange({
    from: 0,
    to: 3,
    step: 1,
    scale: ['年份','月份','年月','总体'],
    format: '%s',
    width: 300,
    showLabels: false,
    snap: true,
    onstatechange:function(){

        var choice = $('.slider-choice').val();
        if(choice == '0'){
            $('#hid-year').show(600);
            $('#hid-month').hide(600);
        }else if(choice == '1'){
            $('#hid-month').show(600);
            $('#hid-year').hide(600);
        }else if(choice == '2'){
            $('#hid-month').show(600);
            $('#hid-year').show(600);
        }else{
            $('#hid-month').hide(600);
            $('#hid-year').hide(600);
            put(null,null);
        }

        console.log($('.slider-month').val());
        console.log($('.slider-year').val());
    }
});

$('.slider-year').jRange({
    from: 2010,
    to: 2012,
    step: 1,
    scale: [2010,2011,2012],
    format: '%s',
    width: 300,
    showLabels: true,
    snap: true,
    onstatechange:function(){
        var choice = $('.slider-choice').val();
        if(choice == '0'){
            put($('.slider-year').val(),null);
        }else if(choice == '2'){
            put($('.slider-year').val(),$('.slider-month').val());
        }
        console.log($('.slider-month').val());
        console.log($('.slider-year').val());
    }
});

$('.slider-month').jRange({
    from: 1,
    to: 12,
    step: 1,
    scale: [1,2,3,4,5,6,7,8,9,10,11,12],
    format: '%s',
    width: 300,
    showLabels: true,
    snap: true,
    onstatechange:function(){

        var choice = $('.slider-choice').val();
        if(choice == '1'){
            put(null,$('.slider-month').val());
        }else if(choice == '2'){
            put($('.slider-year').val(),$('.slider-month').val());
        }
        console.log($('.slider-month').val());
        console.log($('.slider-year').val());
    }
});

function heatPoint(dajson){
    //读取要标注的问题点信息
    $('svg:has(#tmap) > g > g:not(.location)').remove();    //移除事先添加的点
    $('svg:not(#lineChart) > g > path').remove();   //移除所有的块
    $("svg:not(#lineChart) > g > g").remove();

    d3.json(dajson,function(error,place)
    {

        // // 设置颜色比例尺
        // var colorA = d3.hsl(60,1.0,0.5);        // 红色
        // var colorB = d3.hsl(60,0.1,0.5);        // 白色

        var colorB = d3.rgb(0,255,0);    //绿色
        var colorA = d3.rgb(255,170,0);    //红色

        var min=0,max=0;
        for(var i =0; i < place[1].length;i++){
           if(min > place[1][i].cnt){
               min = place[1][i].cnt;
           }else if(max < place[1][i].cnt ){
                max=place[1][i].cnt;
           }
        }

        console.log(place[1]);
       // console.log("min "+ min);
        //console.log("max "+ max);

        // computeColor(i)，i为0~1，输出colorA、colorB之间的数
        var computeColor = d3.interpolate(colorB,colorA);
        var compute = d3.scale.linear()
            .domain([min, max])
            .range([0, 1]);

        d3.json("/javascripts/tianjin.json", function(error, root) {
            if (error)
                return console.error(error);
            svg.selectAll("path")
                .data(root.features)
                .enter()
                .append("path")
                .attr("stroke", "#000")
                .attr("stroke-width", 0.1)
                .attr("fill", function (d, i) {

                    console.log("i: " + i);
                    var m = compute(place[1][i].cnt);
                    console.log(place[1][i].cnt);
                    return computeColor(m);
                })
                .attr("d", path)
                .on("mouseover", function (d, i) {
                    d3.select(this)
                        .attr("fill", "steelblue");

                    d3.select("#tooltip").html(
                        "<h4>" + d.properties.name + "</h4><table>" +
                        "<tr><td>问题总数</td><td>" + place[1][i].cnt + "</td></tr>" +
                        "</table>"
                    ).style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity", 1.0);
                })
                .on("mouseout", function (d, i) {
                    d3.select(this)
                        .attr("fill", function(d){
                            var m = compute(place[1][i].cnt);
                            console.log(place[1][i].cnt);
                            return computeColor(m);
                        });
                    d3.select("#tooltip").style("opacity", 0.0);
                });



           // $('.location').css({position: 'absolute',zIndex:9999});

            var location = svg.selectAll("location")
                .data(place[0])
                .enter()
                .append("g")
                .attr("transform",function(d){
                    //计算标注点的位置
                    var coor = projection([d.LNG, d.LAT]); //经纬度的投影
                    return "translate("+ coor[0] + "," + coor[1] +")";
                });

            //画圆作为标注
            location.append("circle")
                .attr("r",2) //半径
                .style("fill",function(d,i)
                {
                    return"gray";
                });


            //插入天津区县地名
            var location = svg.selectAll("location")
                .data(root.features)
                .enter()
                .append("g")
                .attr("class","location")
                .attr("transform",function(d){
                    //计算标注点的位置
                    var coor = projection([d.properties.cp[0], d.properties.cp[1]]); //经纬度的投影
                    return "translate("+ coor[0] + "," + coor[1] +")";
                });

            //画圆作为标注
            location.append("circle")
                .attr("r",5) //半径
                .style("fill",function(d,i)
                {
                    return"gray";
                });

            //添加文字
            location.append("text")
                .text(function(d)
                    {
                        return d.properties.name;
                    }
                )
                .attr("fill",function(d,i)
                {
                    return"black";
                })
                .attr("text-anchor","middle")
                .attr("font-family","sans-setif")
                .attr("font-size","14px")
                .attr("font-weight","bold");


           var gridSize = Math.floor(width / 6);
           var legendElementWidth = gridSize;

           //色条
            var te = [];
            for(var j = 0; j  < 6;j++){
                te[j] = (j + 1)*(max-min);
            }
            var legend = svg.selectAll(".legend")
                .data(te, function(d,i) {
                    return d;
                })    // 由data获得的元素个数为7
                .enter().append("g")
                .attr("class", "legend");

            legend.append("rect")
                .attr("x", function(d, i) { return legendElementWidth * i; })
                .attr("y",370)
                .attr("width", legendElementWidth)
                .attr("height", gridSize / 2)
                .style("fill", function(d, i) {
                    var m = compute(i*(max - min)/6);
                    console.log("m " + m);
                    return computeColor(m);
                });

            legend.append("text")
                .attr("class", "mono")
                .text(function(d,i) { return ">= "+Math.round(i*(max-min)/6); })
                .attr("x", function(d, i) { return legendElementWidth * i; })
                .attr("y", 380);

        });




    });
}
