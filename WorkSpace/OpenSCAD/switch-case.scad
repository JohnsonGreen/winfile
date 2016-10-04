thick =1.6;
hh=6.5;
ww=20;
ll=38;
ofo=4;
ofi=4-thick;
cabw=5.5;
cabh=3.5;

module cable_hole(w,h,zth){
    ofx=1.5;
linear_extrude(height = zth, twist = 0, slices = zth*10) {
    offset(r = ofx,$fn=100) {
      square([cabh-2*ofx,cabw-2*ofx], center = true);
    }}
}


//translate([30,0,0])rotate([0,90,0])cable_hole(cabw,cabh,thick);
ww2=ww-2*thick-0.3;
ll2=ll-2*thick-0.3;
x1=ll2/2+thick/2;
y1=ww2/2+thick/2;//-ofo/4+thick/2;



/*
difference() {

linear_extrude(height = hh+thick, twist = 0, slices = hh*10) {
    offset(r = ofo,$fn=100) {
      square([ll,ww], center = true);
    }}

translate([x1,y1,thick/2])cylinder(h=thick,d=2,center=true,$fn=100);
translate([x1,-y1,thick/2])cylinder(h=thick,d=2,center=true,$fn=100);
translate([-x1,y1,thick/2])cylinder(h=thick,d=2,center=true,$fn=100);
translate([-x1,-y1,thick/2])cylinder(h=thick,d=2,center=true,$fn=100);
    
    translate([0,0,thick])
linear_extrude(height = hh+thick, twist = 0, slices = hh*10) {
    offset(r = ofi,$fn=100) {
      square([ll,ww], center = true);
    }
  }
  
  translate([0,0,thick/2])cylinder(h=thick,r=5.2,center=true,$fn=100);
  
//  translate([0,0,hh+thick-cabh/2])
//  cube([ll+2*ofo,cabw,cabh],center=true);
  
 translate([-ll/2-ofo,0,hh+thick-cabh/2])
 rotate([0,90,0])cable_hole(cabw,cabh,ll+2*ofo);

}

*/
