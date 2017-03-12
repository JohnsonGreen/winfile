package net.chenyuhong.junitTest;

import java.awt.datatransfer.StringSelection;
import java.util.Scanner;

/**   
 * @Title: Prime.java 
 * @Package net.chenyuhong.junitTest 
 * @Description: 打印质数
 * @author cyh tjuchenheng@163.com  
 * @date 2017-3-12 下午6:23:11 
 * @version V1.0   
 */
public class Prime {
	
	final static int MAXPRIMES = 50;
	
	 //如果一个数不能被它之前的任何素数整除,那么它自己也是一个素数（反证法，如果不是素数，则一定可以分解为若干素数的乘积，而这些素数一定比本身小）
	public static String printPrimes(int n){
		int curPrime;    //当前被考虑的数
		int numPrimes;   //至今为止找到的质数个数
		boolean isPrime;  //curPrime 是否为质数
		int [] primes = new int [MAXPRIMES];  // 质数列表	
		primes[0] = 2;
		numPrimes = 1;
		curPrime = 2;
		while(numPrimes < n){
			curPrime++;
			isPrime = true;
			for(int i = 0;i <= numPrimes-1;i++){
				if(isDivisible(primes[i],curPrime)){
					isPrime = false;
					break;    
				}
			}		
			if(isPrime){
				primes[numPrimes] = curPrime;
				numPrimes++;
			}
		}
		String str = "Prime:";
		for(int i = 0;i <= numPrimes-1;i++){                //打印所有的质数		
			 str += "_"+primes[i];
		}
		System.out.println(str);
		return str;
	}
	
	private static boolean isDivisible(int i, int curPrime) {	
		return  curPrime%i == 0;
	}


	
//	public static void main(String[] args) {
////		
////        Scanner in=new Scanner(System.in); //使用Scanner类定义对象  
////        System.out.println("please input a integer number");  
////        int n=in.nextInt(); //接收整型数据  
//		int i = 10;
//		while(i >= 0){
//			printPrimes(i);
//			i--;
//		}
//		   
//	
//	}

}
