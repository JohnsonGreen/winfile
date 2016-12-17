/**
 * Created by cyh on 2016/12/16.
 */
//ajax异步加载
function put(year,month){

    $.get("/problem?year="+parseInt(year)+"&&month="+parseInt(month), function(result){
        historgram(result);
    });

    heatPoint("/date?year="+parseInt(year)+"&&month="+parseInt(month));

}
$('.slider-year').jRange({
    from: 2010,
    to: 2012,
    step: 1.0,
    scale: [2010,2011,2012],
    format: '%s',
    width: 300,
    showLabels: true,
    snap: true,
    onstatechange:function(){
        put($('.slider-year').val(),$('.slider-month').val());

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

        put($('.slider-year').val(),$('.slider-month').val());

        console.log($('.slider-month').val());
        console.log($('.slider-year').val());
    }
});

function heatPoint(dajson){
    //读取要标注的问题点信息
    $('svg > g > g:not(.location)').remove();    //移除事先添加的点
    $('svg > g > path').remove();   //移除所有的块
    $("svg > g > g").remove();
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
                        "<h4>" + "adsjfjds" + "</h4><table>" +
                        "<tr><td>区县</td><td>" + d.properties.name + "</td></tr>" +
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


        });




    });
}
