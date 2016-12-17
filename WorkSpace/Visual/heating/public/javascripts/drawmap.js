/**
 * Created by cyh on 2016/12/16.
 */

//绘制直方图
var wid = 250;
var hei = 300;

//添加SVG绘制区域
var svg1 = d3.select("body").append("svg")
    .attr("width",wid)
    .attr("height",hei)
    .attr("id","historgram");

//绘制图形
var graphics = svg1.append("g")
    .attr("transform","translate(20,20)");

//定义比例尺
var max_height = 250;
var rect_step = 30;

//绘制坐标轴的直线
graphics.append("line")
    .attr("stroke","black")
    .attr("stroke-width","1px")
    .attr("x1",0)
    .attr("y1",max_height)
    .attr("x2",6 * rect_step)
    .attr("y2",max_height);

var data1 = [{},{},{},{},{},{}];
//绘制坐标轴的分隔符直线
graphics.selectAll(".linetick")
    .data(data1)
    .enter()
    .append("line")
    .attr("stroke","black")
    .attr("stroke-width","1px")
    .attr("x1",function(d,i){
        return i * rect_step + rect_step/2;
    })
    .attr("y1",max_height)
    .attr("x2",function(d,i){
        return i * rect_step + rect_step/2;
    })
    .attr("y2",max_height + 5);




var width  = 400;
var height = 380;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,0)");

var projection = d3.geo.mercator()
    .center([117.2008, 39.1189])
    .scale(110000)
    .translate([width/2, height/2]);

var path = d3.geo.path()
    .projection(projection);

var color = d3.scale.category20();
d3.json("/javascripts/tianjin.json", function(error, root) {

    if (error)
        return console.error(error);
    //  console.log(root.features);
    svg.selectAll("path")
        .data( root.features )
        .enter()
        .append("path")
        .attr("stroke","#000")
        .attr("stroke-width",0.1)
        .attr("fill", function(d,i){
            return color(i);
        })
        .attr("d", path )
        .on("mouseover",function(d,i){
            d3.select(this)
                .attr("fill","steelblue");

            d3.select("#tooltip").html(
                "<h4>"+"adsjfjds"+"</h4><table>"+
                "<tr><td>区</td><td>"+ d.properties.name+"</td></tr>"+
                "<tr><td>Average</td><td>"+"hasdjf"+"</td></tr>"+
                "<tr><td>High</td><td>"+"dshjs"+"</td></tr>"+
                "</table>"
            ).style("left",(d3.event.pageX)+"px")
                .style("top",(d3.event.pageY+20)+"px")
                .style("opacity",1.0);
        })
        .on("mouseout",function(d,i){
            d3.select(this)
                .attr("fill",color(i));
            d3.select("#tooltip").style("opacity",0.0);
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