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


//如果源图像是8位的，为避免溢出，目标图像深度必须是16S，或32位
void sobel(IplImage *src, IplImage *dst)
{
	//为soble微分图像申请空间，创建图片函数  
	IplImage *pSobelImg_dx = cvCreateImage(cvGetSize(src), 32, 1);
	IplImage *pSobelImg_dy = cvCreateImage(cvGetSize(src), 32, 1);
	IplImage *pSobelImg_dxdy = cvCreateImage(cvGetSize(src), 32, 1);

	//用sobel算子计算两个方向的微分  
	cvSobel(src, pSobelImg_dx, 1, 0, 3);
	cvSobel(src, pSobelImg_dy, 0, 1, 3);

	//total gradient = sqrt(horizontal*horizontal+vertical*vertical)  
	int i, j;
	double v1, v2, v;
	for (i = 0; i < src->height; i++)
	{
		for (j = 0; j < src->width; j++)
		{
			v1 = cvGetReal2D(pSobelImg_dx, i, j);
			v2 = cvGetReal2D(pSobelImg_dy, i, j);
			v = sqrt(v1*v1 + v2*v2);
			/*  if(v>100) v = 255;
			else v = 0;*/
			cvSetReal2D(pSobelImg_dxdy, i, j, v);
		}
	}
	cvConvertScale(pSobelImg_dxdy, dst);   //将图像转化为8位  
	double min_val = 0, max_val = 0;//取图并显示像中的最大最小像素值  
	cvMinMaxLoc(pSobelImg_dxdy, &min_val, &max_val);
	printf("max_val = %f\nmin_val = %f\n", max_val, min_val);

	//归一化  
	cvNormalize(dst, dst, 0, 255, CV_MINMAX, 0);
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
		prewitt(image);
		
	}
	


	


	/*  
	Mat src = imread("misaka.jpg");
	Mat dst;

	//输入图像
	//输出图像
	//输入图像颜色通道数
	//x方向阶数
	//y方向阶数
	Sobel(src, dst, src.depth(), 1, 1);
	imwrite("sobel.jpg", dst);

	//输入图像
	//输出图像
	//输入图像颜色通道数
	Laplacian(src, dst, src.depth());
	imwrite("laplacian.jpg", dst);

	//输入图像
	//输出图像
	//彩色转灰度
	cvtColor(src, src, CV_BGR2GRAY);  //canny只处理灰度图

									  //输入图像
									  //输出图像
									  //低阈值
									  //高阈值，opencv建议是低阈值的3倍
									  //内部sobel滤波器大小
	Canny(src, dst, 50, 150, 3);
	imwrite("canny.jpg", dst);

	imshow("dst", dst);
	waitKey();

	return 0;

	*/










	return 0;
}