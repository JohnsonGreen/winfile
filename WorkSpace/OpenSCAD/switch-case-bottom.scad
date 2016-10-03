thick =1.6;
hh=2;
hh1=6.5;
ofo=4;
ofi=4-thick;
cabw=5.5;
cabh=3.5;
ww1=20;
ll1=38;
ww=20-2*thick-0.3;
ll=38-2*thick-0.3;

module cable_hole(w,h,zth){
    ofx=1.5;
linear_extrude(height = zth, twist = 0, slices = zth*10) {
    offset(r = ofx,$fn=100) {
      square([cabh-2*ofx,cabw-2*ofx], center = true);
    }}
}


//translate([30,0,0])rotate([0,90,0])cabu_hole(cabw,cabh,thick);
module screw_hole(z1,of1)
{
    difference(){
        cylinder(h=z1,r=of1,center=true,$fn=100);
        cylinder(h=z1,d=1.2,center=true,$fn=100);
    }
}

x1=ll/2+thick/2;
y1=ww/2+thick/2;//-ofo/4+thick/2;
z1=hh1+thick;
of1=3;
translate([x1,y1,z1/2])screw_hole(z1,of1);
translate([-x1,-y1,z1/2])screw_hole(z1,of1);
translate([x1,-y1,z1/2])screw_hole(z1,of1);
translate([-x1,y1,z1/2])screw_hole(z1,of1);




difference() {
union(){
linear_extrude(height = thick, twist = 0, slices = hh*10) {
    offset(r = ofo,$fn=100) {
      square([ll1,ww1], center = true);
    }}


linear_extrude(height = hh+thick, twist = 0, slices = hh*10) {
    offset(r = ofo,$fn=100) {
      square([ll,ww], center = true);
    }}


}
    translate([0,0,thick])
linear_extrude(height = hh1+thick, twist = 0, slices = hh*10) {
    offset(r = ofi,$fn=100) {
      square([ll,ww], center = true);
    }
  }
  
//  translate([0,0,thick/2])cylinder(h=thick,r=5.2,center=true,$fn=100);
  
//  translate([0,0,hh+thick-cabh/2])
//  cube([ll+2*ofo,cabw,cabh],center=true);
  
 translate([-ll/2-ofo,0,thick+cabh/2])
 rotate([0,90,0])cable_hole(cabw,cabh,ll+2*ofo);

}
