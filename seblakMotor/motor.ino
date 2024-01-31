
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

#define RPWM 14
#define LPWM 12

const char* ssid = "wifi_name";
const char* password = "wifi_password";

ESP8266WebServer server(80);

void turnOn() {
  analogWrite(LPWM, 70);
}
void turnOff() {
  analogWrite(LPWM, 0);
}

void setup() {
Serial.begin(115200);
pinMode(RPWM, OUTPUT);
pinMode(LPWM, OUTPUT);
WiFi.begin(ssid, password);

while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print("no");
}

Serial.print("connected");
Serial.println(WiFi.localIP());

server.on("/on", turnOn);
server.on("/off", turnOff);

server.begin();

}

void loop() {
  server.handleClient();
}
