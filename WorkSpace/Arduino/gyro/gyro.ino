#include <Wire.h>  //调用arduino自带的I2C库

 
#define Register_ID 0
#define Register_2D 0x2D
#define Register_X0 0x32
#define Register_X1 0x33
#define Register_Y0 0x34
#define Register_Y1 0x35
#define Register_Z0 0x36
#define Register_Z1 0x37
 

 
int ADXAddress = 0xA7>>1;  //转换为7位地址


short X0,X1,X_out;
short Y0,Y1,Y_out;
short Z1,Z0,Z_out;
double Xg,Yg,Zg;
 
void single_write(unsigned char reg, unsigned char data){

  Wire.beginTransmission(ADXAddress);
  Wire.write(reg);
  Wire.write(data);
  Wire.endTransmission();

}


void setup()
{
  Wire.begin();  //初始化I2C
  Serial.begin(9600);
  delay(100);
  single_write(Register_2D,8);   //开启adxl345
  single_write(0X31,0X0B);     //低电平中断输出,13位全分辨率,输出数据右对齐,16g量程
  single_write(0x2C,0x1A);  //数据输出速度为100Hz，低功耗模式

 
 /*
  single_write(0X24,0x10);   //活动检测阈值为1.0g=62.5mg*16
  single_write(0X27,0xF0);   //X、Y、Z轴检测运动，交流耦合
  single_write(0X2F,0x10);   //运动中断引脚为INT2，其他中断引脚INT1
  single_write(0X2E,0x10);  //使能运动中断
*/




   single_write(0x31,0x0b);     //测量范围,正负16g，13位模式 高电平有效
   single_write(0x2D, 0x08);    //选择电源模式   参考pdf24页
   single_write(0x1E, 0x00);    //X 偏移量 根据测试传感器的状态写入pdf29页
   single_write(0x1F,0x00);    //Y 偏移量 根据测试传感器的状态写入pdf29页
   single_write(0x20, 0x05);    //Z 偏移量 根据测试传感器的状态写入pdf29页
    
 
   single_write(0x1D, 0x30);        //设置THRESH_TAP(敲击门限) 62.5mg/LSB   0xff=16g  此时试取3g  
   single_write(0x21, 0x11);        //设置DUR（敲击持续时间） 625us/LSB  此时试取10ms
   single_write(0x2A, 0x07);        //设置各轴方向是否参加敲击检测  xyz全参与检测
   single_write(0x2E, 0x00);   //设置中断前应先禁用中断
   single_write(0x2E, 0x40);        //使能 SINGLE_TAP 中断
  
   single_write(0x2F, 0x40);        //设置中断引脚映射 将单击时间映射到INT2上

}
 
void loop()
{
  Wire.beginTransmission(ADXAddress);
  Wire.write(Register_X0);
  //Wire.write(Register_X1);
  Wire.endTransmission();
  Wire.requestFrom(ADXAddress,6);
  if(Wire.available()<=6);
  {
    X0 = Wire.read();
    X1 = Wire.read();
    X1 = X1<<8;
    X_out = X0+X1;
    

    Y0 = Wire.read();
    Y1 = Wire.read();
    Y1 = Y1<<8;
    Y_out = Y0+Y1;


    Z0 = Wire.read();
    Z1 = Wire.read();
    Z1 = Z1<<8;
    Z_out = Z0+Z1;
    
  }
 
  
  Xg = X_out/256.00;//把输出结果转换为重力加速度g,精确到小数点后2位。
  Yg = Y_out/256.00;
  Zg = Z_out/256.00;



  Serial.print(Xg);
  Serial.print(","); 

  Serial.print(Yg);
  Serial.print(","); 

  Serial.println(Zg); 


  delay(100);  //延时5ms，刷新频率这里进行调整
 
}
