difference(){
    rotate([90,0,0]){
    difference(){
         cylinder(h=40, r1=35, r2=35, center=true,$fn=100);
         cylinder(h=40, r1=31, r2=31, center=true,$fn=100);
           
     }
   }

   translate([0,0,-30]){
            cube([70,70,60],center=true);
  }
}


translate([48,0,2]){
        difference(){
           cube([30,40,4],center=true); 
           translate([0,-10,0]){
              cylinder(h=10, r1=4, r2=4, center=true,$fn=10);  
           }
           translate([0,10,0]){
              cylinder(h=10, r1=4, r2=4, center=true,$fn=10);  
           }
           
        }
     
       
}
translate([-48,0,2]){
           difference(){
           cube([30,40,4],center=true); 
           translate([0,-10,0]){
              cylinder(h=10, r1=4, r2=4, center=true,$fn=10);  
           }
           translate([0,10,0]){
              cylinder(h=10, r1=4, r2=4, center=true,$fn=10);  
           }
           
        }            
}




 
