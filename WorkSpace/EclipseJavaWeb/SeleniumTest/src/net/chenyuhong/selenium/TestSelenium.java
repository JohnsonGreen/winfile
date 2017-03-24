package net.chenyuhong.selenium;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

@RunWith(Parameterized.class)
public class TestSelenium {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();
  
  private String stunum;
  private String github;
  

  
  public TestSelenium(String stunum,String github){
		this.stunum = stunum;
		this.github = github;
  }
	
  
	@Parameters
	public static Collection<Object[]> getData(){
		return Arrays.asList(Csv.getStu());
	}
  

  @Before
  public void setUp() throws Exception {
    System.setProperty ( "webdriver.firefox.bin" , "F:/Surfing/Firefox/firefox.exe" );
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
		  String stun = driver.findElement(By.xpath("//tbody/tr[2]/td[2]")).getText();
		  String github = driver.findElement(By.xpath("//tbody/tr[3]/td[2]")).getText();
		  System.out.println(stun);
		  System.out.println(github);
		  assertEquals(this.stunum,stun);
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

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
