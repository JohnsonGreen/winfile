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


//���Դͼ����8λ�ģ�Ϊ���������Ŀ��ͼ����ȱ�����16S����32λ
void sobel(IplImage *src, IplImage *dst)
{
	//Ϊsoble΢��ͼ������ռ䣬����ͼƬ����  
	IplImage *pSobelImg_dx = cvCreateImage(cvGetSize(src), 32, 1);
	IplImage *pSobelImg_dy = cvCreateImage(cvGetSize(src), 32, 1);
	IplImage *pSobelImg_dxdy = cvCreateImage(cvGetSize(src), 32, 1);

	//��sobel���Ӽ������������΢��  
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
	cvConvertScale(pSobelImg_dxdy, dst);   //��ͼ��ת��Ϊ8λ  
	double min_val = 0, max_val = 0;//ȡͼ����ʾ���е������С����ֵ  
	cvMinMaxLoc(pSobelImg_dxdy, &min_val, &max_val);
	printf("max_val = %f\nmin_val = %f\n", max_val, min_val);

	//��һ��  
	cvNormalize(dst, dst, 0, 255, CV_MINMAX, 0);
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
		prewitt(image);
		
	}
	


	


	/*  
	Mat src = imread("misaka.jpg");
	Mat dst;

	//����ͼ��
	//���ͼ��
	//����ͼ����ɫͨ����
	//x�������
	//y�������
	Sobel(src, dst, src.depth(), 1, 1);
	imwrite("sobel.jpg", dst);

	//����ͼ��
	//���ͼ��
	//����ͼ����ɫͨ����
	Laplacian(src, dst, src.depth());
	imwrite("laplacian.jpg", dst);

	//����ͼ��
	//���ͼ��
	//��ɫת�Ҷ�
	cvtColor(src, src, CV_BGR2GRAY);  //cannyֻ����Ҷ�ͼ

									  //����ͼ��
									  //���ͼ��
									  //����ֵ
									  //����ֵ��opencv�����ǵ���ֵ��3��
									  //�ڲ�sobel�˲�����С
	Canny(src, dst, 50, 150, 3);
	imwrite("canny.jpg", dst);

	imshow("dst", dst);
	waitKey();

	return 0;

	*/










	return 0;
}