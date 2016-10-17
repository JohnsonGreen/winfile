#include <cv.h>
#include <highgui.h>
#include <sstream>

using namespace std;
using namespace cv;


//prewitt算子，使用模板卷积公式编写，常用方法
void prewitt(Mat src)
{

	//Mat src(sr, 0);            //将IplImage转换为Mat
	cvtColor(src,src, CV_BGR2GRAY);    //将彩色图转换为灰度图，注意是BGR 而不是 RGB

	//定义prewitt算子的模板  
	float prewittx[9] =
	{
		-1,0,1,
		-1,0,1,
		-1,0,1
	};

	float prewitty[9] =
	{
		1,1,1,
		0,0,0,
		-1,-1,-1
	};

	
	Mat px = Mat(3, 3, CV_32F, prewittx);   //构造单通道浮点矩阵，将图像IplImage结构转换为图像数组
	Mat py = Mat(3, 3, CV_32F, prewitty);  


	//创建空灰度图
	Mat dstx = Mat(src.size(), src.type(), src.channels());        //图像像素的位深度（8位无符号整数0-255），单通道图像
	Mat dsty = Mat(src.size(), src.type(), src.channels());
	Mat dst =  Mat(src.size(), src.type(), src.channels());


	//卷积，第四个参数是：卷积核, 单通道浮点矩阵
	            
	filter2D(src, dstx, src.depth(), px);       //对图像使用模板，自动填充边界
	filter2D(src, dsty, src.depth(), py);       //对图像使用模板，自动填充边界  

	int i, j, temp;                           //计算梯度，范数为2，注意学习指针的使用方法  
	float x, y;                      //定义为浮点型是为了避免sqrt函数引起歧义  
	

    //综合X、Y方向上卷积得到的边缘图
	for (int i = 0; i<src.rows; i++)
	{
		for (int j = 0; j<src.cols; j++)
		{
			x = dstx.at<uchar>(i, j);
			y = dsty.at<uchar>(i, j);
			temp = sqrt(x*x + y*y);            //通过开平方和得到该位置像素值
			dst.at<uchar>(i, j) = temp;
		}
	}

	imwrite("prewitt.jpg", dst);   //把图像存入文件  
	imshow("dst", dst);
	waitKey();

}


void mySobel(Mat src)
{
	Mat resultImage = src;
	cvtColor(src, resultImage, CV_BGR2GRAY);
	Mat H = resultImage, V = resultImage, HV = resultImage;
	Sobel(resultImage, H, resultImage.depth(), 0, 1);
	Sobel(resultImage, V, resultImage.depth(), 1, 0);
	for (int i = 0; i<src.rows; i++)
	{
		for (int j = 0; j<src.cols; j++)
		{
			HV.at<uchar>(i, j) = sqrt(H.at<uchar>(i, j)*H.at<uchar>(i, j) + V.at<uchar>(i, j)*V.at<uchar>(i, j));
		}
	}
	normalize(HV, HV, 255, 0, CV_MINMAX);

	imwrite("prewitt.jpg", HV);   //把图像存入文件  
	imshow("dst", HV);
	waitKey();
}


void myCanny(Mat src) {

	Mat dst;
	Canny(src, dst, 150, 200);   //边缘检测
	imwrite("prewitt.jpg", dst);   //把图像存入文件  
	imshow("dst", dst);
	waitKey();
}




int main()
{

	//连续读取三张图片
	for (int i = 0; i < 3; i++) {

		stringstream ss;
		string path;
		ss << "G:\\WorkSpace\\OpenCV\\hw_edgeDetect\\Image\\me" << i << ".jpg";
		ss >> path;


		Mat src = imread(path);
		double scale = 0.5; //设置缩放倍数
		
		//缩放
		Size dsize = Size(src.cols * scale, src.rows * scale);
		Mat image = Mat(dsize, CV_32S);
		resize(src, image, dsize);


		imshow("Source", image);
		//prewitt(image);
		//mySobel(image);
		myCanny(image);
		
	}
	



	return 0;
}