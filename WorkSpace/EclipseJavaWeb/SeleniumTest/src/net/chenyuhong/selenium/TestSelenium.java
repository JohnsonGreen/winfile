package net.chenyuhong.selenium;


import java.util.Arrays;
import java.util.Collection;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import static org.junit.Assert.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;


@RunWith(Parameterized.class)
public class TestSelenium {
  private WebDriver driver;
  private String baseUrl;
  private StringBuffer verificationErrors = new StringBuffer();
  
  private String stunum;
  private String github;
  

  
  public TestSelenium(String stunum,String github){
		this.stunum = stunum;
		this.github = github;
  }
	
  
	@Parameters
	public static Collection<Object[]> getData(){
		return Arrays.asList(Csv.getStu());         //获取所有学生的学号和github信息
	}
  

  @Before
  public void setUp() throws Exception {
    System.setProperty ( "webdriver.firefox.bin" , "F:/Surfing/Firefox/firefox.exe" ); //firefox的安装路径
    driver = new FirefoxDriver();
    baseUrl = "http://121.193.130.195:8080/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    
  }
  
  
  @Test
  public void testSelenium() throws Exception {
	  
		  driver.get(baseUrl);                        
		  String str = this.stunum;
		  driver.findElement(By.id("name")).sendKeys(this.stunum); 
		  driver.findElement(By.id("pwd")).sendKeys(str.substring(str.length()-6)); 
		  driver.findElement(By.id("submit")).click();
		  String stun = driver.findElement(By.xpath("//tbody/tr[2]/td[2]")).getText();    //利用xpath找到网页中的学号
		  String github = driver.findElement(By.xpath("//tbody/tr[3]/td[2]")).getText();  
		  System.out.println(stun);
		  System.out.println(github);
		  assertEquals(this.stunum,stun);                  //判断csv中的学号和网页中的学号是否相等
		  assertEquals(this.github, github);
         	  
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

}
