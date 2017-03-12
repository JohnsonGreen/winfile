package net.chenyuhong.junitTest;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.Collection;
import java.util.Scanner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

/**   
 * @Title: PrimeTest.java 
 * @Package net.chenyuhong.junitTest 
 * @Description: 
 * @author cyh tjuchenheng@163.com  
 * @date 2017-3-12 下午8:43:08 
 * @version V1.0   
 */
@RunWith(Parameterized.class)
public class PrimeTest {
	
    private String primeString;
    private int n;
    
    public PrimeTest(String primeString,int n){
    	this.primeString = primeString;
    	this.n = n;
    }
    
    @Parameters
	public static Collection<Object[]> getData(){
		return Arrays.asList(new Object[][]{
//				
//				{"Prime:_2_3_5_7_11_13_17_19_23_29",10},
//				{"Prime:_2_3_5_7_11_13_17_19_23",9},
//				{"Prime:_2_3_5_7_11_13_17_19",8},
//				{"Prime:_2_3_5_7_11_13_17",7},
//				{"Prime:_2_3_5_7_11_13",6},
//				{"Prime:_2_3_5_7_11",5},
//				{"Prime:_2_3_5_7",4},
				{"Prime:_2_3_5",3},
//				{"Prime:_2_3",2},
//				{"Prime:_2",1},

				
				
					
		});
	}


	@Test
	public void testPrintPrimes() {
		    assertEquals(this.primeString,Prime.printPrimes(this.n));
	}

}
