

//常量定义
athick=2;	//盖子厚度
bthick=2;	//盒壁厚度
bwidth=30;	//内径净宽
bhight=21;	//内径净高

blong_inter=71;//内径净长
//外径长度＝底厚＋内径＋挡格＋盖子厚度
blong=bthick * 2 + blong_inter;

ylong = bwidth+bthick*2;

//======================================
//盒子体，采用挖空切割方式造型。
difference() {
	//外盒
	translate([0,0,0])
	{	color([0.8,0.8,0.8])
		cube([blong,bwidth+bthick*2,
			bhight+bthick*2]);
	}
    
	//内盒，挖空。
	translate([bthick,bthick,bthick])
	{	color([0.2,0.8,0.8])
		cube([blong - bthick * 2,bwidth,bhight+ bthick]);
	}
    
    //盒子挖空通风
    translate([blong/2,ylong/2 - 8,0])
	{	color([0.6,0.3,0.8])
		cube([1,15,bthick + 2]);
	}
     
    translate([blong/2 - 8,ylong/2 - 8,0])
	{	color([0.6,0.3,0.8])
		cube([1,15,bthick + 2]);
	}
    
    translate([blong/2 + 8,ylong/2 - 8,0])
	{	color([0.6,0.3,0.8])
		cube([1,15,bthick + 2]);
	}
    
    
    //盒子侧壁挖空通风
    
    translate([blong/2 - 20,0,bhight/2 + 1 ])
	{	color([0.6,0.3,0.8])
		cube([40,50,bthick]);
	}
    
    
}

translate([0,ylong + 4,35]){
difference() {
    //
	translate([0,0,0])
	{	color([0.5,0.5,0.5])
		cube([blong, ylong ,athick]);
	}
    
	
    //盖子挖空通风
    translate([blong/2,ylong/2 - 8,0])
	{	color([0.6,0.3,0.8])
		cube([1,15,bthick + 2]);
	}
    
    translate([blong/2 - 4,ylong/2 - 7,0])
	{	color([0.6,0.3,0.8])
		cube([1,13,bthick + 2]);
	}
    translate([blong/2 - 8,ylong/2 - 6,0])
	{	color([0.6,0.3,0.8])
		cube([1,11,bthick + 2]);
	}
    
    translate([blong/2 - 12,ylong/2 - 5,0])
	{	color([0.6,0.3,0.8])
		cube([1,9,bthick + 2]);
	}
    
    translate([blong/2 - 16,ylong/2 - 4,0])
	{	color([0.6,0.3,0.8])
		cube([1,7,bthick + 2]);
	}
    
  }
  
   //形成边角挡格
   translate([bthick,bthick,bthick])
   {	color([0.2,0.5,0.2])
		cube([bthick,bwidth,bthick]);
   }
   
   translate([blong - bthick * 2,bthick,bthick])
   {	
        color([0.2,0.5,0.2])
		cube([bthick,bwidth,bthick]);
   }
   
   translate([bthick * 2,bthick,bthick])
   {	color([0.2,0.5,0.2])
		cube([blong_inter - bthick * 2,bthick,bthick]);
   }
   
   translate([bthick * 2,bwidth,bthick])
   {	color([0.2,0.5,0.2])
		cube([blong_inter - bthick * 2,bthick,bthick]);
   }

   
}
