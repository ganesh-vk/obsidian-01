# src/data_sim.py

import time
import json
import random
import paho.mqtt.client as mqtt

MQTT_BROKER_HOST = "localhost"
MQTT_BROKER_PORT = 1883

def on_connect(client, userdata, flags, rc, properties=None):
    if rc == 0:
        print("Connected to MQTT Broker successfully!")
    else:
        print(f"Failed to connect, return code {rc}\n")

def get_bms_payload():
    return {
        "measurement": "bms",
        "gridId": "grid_A",
        "voltageSeriesOne": round(12.1 + random.uniform(-0.2, 0.2), 2),
        "voltageSeriesTwo": round(12.2 + random.uniform(-0.2, 0.2), 2),
        "voltageSeriesThree": round(12.0 + random.uniform(-0.2, 0.2), 2),
        "currentRating": 100.0,
        "soc": round(85.5 + random.uniform(-1.0, 1.0), 1),
        "soh": 98.7,
        "cycleCount": 152,
        "balancingStatus": random.choice([True, False]),
        "temperature": round(35.5 + random.uniform(-2.0, 2.0), 1)
    }

def get_solar_payload():
    return {
        "measurement": "solar",
        "panelId": "pv_array_01",
        "voltage": round(60.0 + random.uniform(-2.0, 2.0), 2),
        "current": round(8.0 + random.uniform(-1.0, 1.0), 2),
        "temperature": round(45.0 + random.uniform(-5.0, 5.0), 1),
        "averagePowerGeneration": round(480.0 + random.uniform(-50, 50), 0)
    }

def get_load_payload():
    return {
        "measurement": "load",
        "loadId": "load_01",
        "powerConsumption": round(300.0 + random.uniform(-30.0, 30.0), 2),
        "currentDraw": round(15.0 + random.uniform(-2.0, 2.0), 2),
        "voltageLevel": round(230.0 + random.uniform(-10.0, 10.0), 2)
    }

def run_simulator():
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.on_connect = on_connect
    client.connect(MQTT_BROKER_HOST, MQTT_BROKER_PORT)
    client.loop_start()

    while not client.is_connected():
        print("Waiting for connection...")
        time.sleep(1)

    while True:
        try:
            payloads = [get_bms_payload(), get_solar_payload(), get_load_payload()]
            for payload in payloads:
                topic = f"microgrid/{payload['measurement']}"
                client.publish(topic, json.dumps(payload))
                print(f"Published to {topic}: {payload}")
            
            print("-" * 20)
            time.sleep(10)

        except KeyboardInterrupt:
            print("Simulation stopped.")
            break
            
    client.loop_stop()
    client.disconnect()

if __name__ == '__main__':
    run_simulator()