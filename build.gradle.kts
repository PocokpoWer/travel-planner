plugins {
    id("java")
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    implementation("org.projectlombok:lombok:1.18.42")
    implementation("com.mysql:mysql-connector-j:9.5.0")
    implementation("org.springframework.boot:spring-boot-starter:4.0.1")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:4.0.1")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc:4.0.1")
    implementation("org.springframework.boot:spring-boot-starter-data-rest:4.0.1")
    testImplementation("org.springframework.boot:spring-boot-starter-test:4.0.1")
}

tasks.test {
    useJUnitPlatform()
}