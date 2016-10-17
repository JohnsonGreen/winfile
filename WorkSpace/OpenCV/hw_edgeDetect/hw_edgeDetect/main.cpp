#include <cv.h>
#include <highgui.h>
#include <sstream>

using namespace std;
using namespace cv;


//prewitt���ӣ�ʹ��ģ������ʽ��д�����÷���
void prewitt(Mat src)
{

	//Mat src(sr, 0);            //��IplImageת��ΪMat
	cvtColor(src,src, CV_BGR2GRAY);    //����ɫͼת��Ϊ�Ҷ�ͼ��ע����BGR ������ RGB

	//����prewitt���ӵ�ģ��  
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

	
	Mat px = Mat(3, 3, CV_32F, prewittx);   //���쵥ͨ��������󣬽�ͼ��IplImage�ṹת��Ϊͼ������
	Mat py = Mat(3, 3, CV_32F, prewitty);  


	//�����ջҶ�ͼ
	Mat dstx = Mat(src.size(), src.type(), src.channels());        //ͼ�����ص�λ��ȣ�8λ�޷�������0-255������ͨ��ͼ��
	Mat dsty = Mat(src.size(), src.type(), src.channels());
	Mat dst =  Mat(src.size(), src.type(), src.channels());


	//��������ĸ������ǣ������, ��ͨ���������
	            
	filter2D(src, dstx, src.depth(), px);       //��ͼ��ʹ��ģ�壬�Զ����߽�
	filter2D(src, dsty, src.depth(), py);       //��ͼ��ʹ��ģ�壬�Զ����߽�  

	int i, j, temp;                           //�����ݶȣ�����Ϊ2��ע��ѧϰָ���ʹ�÷���  
	float x, y;                      //����Ϊ��������Ϊ�˱���sqrt������������  
	

    //�ۺ�X��Y�����Ͼ���õ��ı�Եͼ
	for (int i = 0; i<src.rows; i++)
	{
		for (int j = 0; j<src.cols; j++)
		{
			x = dstx.at<uchar>(i, j);
			y = dsty.at<uchar>(i, j);
			temp = sqrt(x*x + y*y);            //ͨ����ƽ���͵õ���λ������ֵ
			dst.at<uchar>(i, j) = temp;
		}
	}

	imwrite("prewitt.jpg", dst);   //��ͼ������ļ�  
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

	imwrite("prewitt.jpg", HV);   //��ͼ������ļ�  
	imshow("dst", HV);
	waitKey();
}


void myCanny(Mat src) {

	Mat dst;
	Canny(src, dst, 150, 200);   //��Ե���
	imwrite("prewitt.jpg", dst);   //��ͼ������ļ�  
	imshow("dst", dst);
	waitKey();
}




int main()
{

	//������ȡ����ͼƬ
	for (int i = 0; i < 3; i++) {

		stringstream ss;
		string path;
		ss << "G:\\WorkSpace\\OpenCV\\hw_edgeDetect\\Image\\me" << i << ".jpg";
		ss >> path;


		Mat src = imread(path);
		double scale = 0.5; //�������ű���
		
		//����
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