
/**
 * Created by cyh on 2016/12/17.
 */

function historgram( result ){

    $("svg > g > rect").remove();
    $("svg > g > text:not(.title)").remove();

    var data = [{len:0}].concat(result).concat([{len:0}]);
    // $(".jingwei").html(result[0]['LAT']);

    console.log(data);
   // console.log(data);

    var xAxis = ['','不热','漏水','井盖','其它',''];


    var heights = [];
    for(var i=0;i<data.length;i++){
        heights.push( data[i].len );
    }

    var yScale = d3.scale.linear()
        .domain([d3.min(heights),d3.max(heights)])
        .range([0,max_height]);


    //绘制矩形
    graphics.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x",function(d,i){
            return i * rect_step;
        })
        .attr("y", function(d,i){
            return max_height - yScale(d.len);
        })
        .attr("width", function(d,i){
            return rect_step - 2;
        })
        .attr("height", function(d){
            return yScale(d.len);
        })
        .attr("fill","steelblue");


    var datatext = data.concat(data);


    graphics.selectAll("text")
        .data(datatext)
        .enter()
        .append("text")
        .attr("font-size","10px")
        .attr("x",function(d,i){
            if(i < 6){
                return i * rect_step;

            }else{
                return (i-6) * rect_step;
            }

        })
        .attr("y", function(d,i){
            return max_height;
        })
        .attr("dx",rect_step/2 - 15)
        .attr("dy",function(d,i){
            if(i <= 5){
                return -yScale(d.len)+10;
            }else{
                return  15;
            }
        })
        .text(function(d,i){
            if(i < 6){
                if(i == 0 || i == 5)
                    return null;
                return d.len;
            }else{
                return xAxis[i-6];
            }

        });
}
