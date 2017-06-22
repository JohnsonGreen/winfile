package com.ppx.config;

import com.ppx.component.CustomMultipartResolver;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.*;
import org.springframework.core.type.AnnotationMetadata;

/**
 * Created by cyh on 2017/6/13.
 */

/*
@Configuration
@Import(Registrar.class)
public class TestConfig {

}

*/

@Configuration
@Import(Registrar.class)
public class TestConfig {


}

class Registrar  implements ImportBeanDefinitionRegistrar {
    private static final String BEAN_NAME = "customMultipartResolver";
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        if (!registry.containsBeanDefinition(BEAN_NAME)) {
            GenericBeanDefinition beanDefinition = new GenericBeanDefinition();
            beanDefinition.setBeanClass(CustomMultipartResolver.class);
            beanDefinition.setSynthetic(true);
            registry.registerBeanDefinition(BEAN_NAME, beanDefinition);
        }
    }
}
