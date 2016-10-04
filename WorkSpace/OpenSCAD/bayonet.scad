//resize(newsize=[4,25,25]) sphere(r=30,$fn=100);
//sphere(r=10,$fn=72);
difference(){
    
    cylinder(h=5,r = 9.5 , center=true, $fn=100);
    cylinder(h=5,r = 8.5 , center=true, $fn=100);
    translate([0,4,0]){
      cylinder(h=5,r = 7 , center=true, $fn=100);
    }
    
}

translate([0,-10,0]){
   cube([4,2.5,4],center=true);
   translate([0,-2,0]){
     intersection(){
        cube([15,3,4],center=true); 
        translate([0,1,0]){
         resize(newsize=[16,3,16]) sphere(r=10, $fn=100);
     }    
   } 
 }
}

 