

//常量定义
thick = 2;	        //盒壁厚度,盒子外圆角半径
width = 30;	       //内径净宽
hight = 21;	       //内径净高
long = 71;         //内径净长
 
hh = 6.5;          //slices倍数

xlong=thick * 2 + long;   //外径长度＝底厚＋内径长度＋盖子厚度
ylong = width+thick*2;   //外径宽度 = 底厚＋内径宽度＋盖子厚度
zlong = hight + thick*2;


//卡扣中心柱厚度
bathc = 3;

//卡扣底部长方体长度
balon = 15;



//---------------------------------------盒子部分

difference() {
	

    //外盒
    linear_extrude(height = hight + thick * 2, twist = 0, slices = hh*10) {
    offset(r = thick,$fn=100) {
      square([long ,width], center = false);
    }
   }  


	//内盒，挖空。
	translate([0,0,thick])
	{	
		cube([long,width,hight+ thick]);
	}
    

    //卡扣滑道前
    translate([long - bathc * 2, (width - bathc)/2,0])
	{	
		cube([bathc , bathc * 2 ,thick + 1]);
	}
    translate([long - bathc * 4,(width + bathc)/2,0])
	{	
       
		cube([bathc * 2,bathc ,thick + 1]);
	}

    translate([long - bathc * 4, (width + bathc)/2 - (balon - bathc)/2 ,0])
	{	
		cube([bathc,balon ,thick + 1]);
	}
    


    //卡扣滑道后
    translate([bathc, width/2 - 1.5 * bathc,0])
	{	
		cube([bathc, bathc * 2,thick + 1]);
	}
   
    translate([bathc * 2, width/2 - 1.5 * bathc,0])
	{	
		cube([bathc * 2,bathc,thick + 1]);
	}
    
    translate([bathc * 3, width/2 - 1.5 * bathc - (balon - bathc) /2,0])
	{	
		cube([bathc,balon,thick + 1]);
	}
    
    
    
    //盒子底部挖空通风
    translate([long/2, width/2 - 8,0])
	{	
		cube([1,16,thick + 2]);
    }
     
    translate([long/2 - 8,width/2 - 8,0])
	{	
		cube([1,16,thick + 2]);
	}
    
    translate([long/2 + 8,width/2 - 8,0])
	{	
		cube([1,16,thick + 2]);
	}
    

    //盒子侧壁挖空通风
    translate([xlong/2 - 20,-3,zlong/2 - 1 ])
	{	
		cube([40,50,thick]);
	}
    
}




//------------------------------------盖子部分

translate([0,ylong + 4,0]){
difference() {
    
    linear_extrude(thick, twist = 0, slices = hh*10) {
    offset(r = thick,$fn=100) {
      square([long ,width], center = false);
    }
   }  
    
	
    //盖子挖空通风
    translate([long/2,width/2 - 8,0])
	{	
		cube([1,16,thick + 2]);
	}
    
    translate([long/2 - 4,width/2 - 7,0])
	{	
		cube([1,14,thick + 2]);
	}
    translate([long/2 - 8,width/2 - 6,0])
	{	
		cube([1,12,thick + 2]);
	}
    
    translate([long/2 - 12,width/2 - 5,0])
	{	
		cube([1,10,thick + 2]);
	}
    
    translate([long/2 - 16,width/2 - 4,0])
	{	
		cube([1,8,thick + 2]);
	}
    
  }
  
   //形成边角挡格
   translate([0,0,thick])
   {	
		cube([thick,width,thick]);
   }
   
   translate([long - thick,0,thick])
   {	
       
		cube([thick,width,thick]);
   }
   
   
   translate([thick ,0,thick])
   {	
		cube([long - thick * 2,thick,thick]);
   }
   
   
   translate([thick ,width - thick,thick])
   {
       
		cube([long - thick * 2,thick,thick]);
   }

}
