package net.chenyuhong.junitTest;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.Collection;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

/**   
 * @Title: TriangleTest.java 
 * @Package net.chenyuhong.junitTest 
 * @Description: 三角形测试类
 * @author cyh tjuchenheng@163.com  
 * @date 2017-3-10 下午8:14:09 
 * @version V1.0   
 */
//参数化运行器
@RunWith(Parameterized.class)
public class TriangleTest {
	private int a,b,c;
	private String classification;
	

	@Before
	public void setUp() throws Exception {
	}
	
	public TriangleTest(int a,int b,int c, String classification){
		this.a = a;
		this.b = b;
		this.c = c;
		this.classification = classification;
	}
	
	@Parameters
	public static Collection<Object[]> getData(){
		return Arrays.asList(new Object[][]{
				{1,2,3,"非三角形"},
				{2,2,2,"等边三角形"},
				{0,0,0,"非三角形"},
				{4,3,5,"不等边三角形"},
				{3,3,4,"等腰三角形"},
				{4,4,5,"等腰三角形"},
				{1,0,0,"非三角形"},
				{1,1,1,"等边三角形"},
				
		});
	}

	@Test
	public void testClassify() {
		assertEquals(this.classification, Triangle.classify(a, b, c));
	}

}
