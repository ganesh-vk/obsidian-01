# obsidian-01
SIH-2025 PS-25051
Renewable Energy Monitoring System for Microgrids

Members: 
Ashmeet Singh
Devesh Chandra V
Ganesh K
Naman Singh
Ryan Tom Vinoy
Shefali Badgi

⚡ Smart Microgrid Monitoring System
A real-time microgrid monitoring solution built on the ESP32-S3 platform.
This project integrates firmware, PCB design, data dashboards, and a 3D-printed enclosure to create a complete end-to-end system for monitoring batteries, solar panels, and other energy parameters.

📂 Repository Structure
  
  🖼️ design-case-3d/
    3D enclosure design files for the device.
    Includes STEP files for CAD editing.
    Include STL files for direct 3D printing.
    Enables easy reproduction and customization of the case.
  
  📑 datasheets/
    Datasheets for all major components used in the system.
    Microcontrollers, sensors, regulators, and display modules.
    Acts as a technical reference for development and troubleshooting.
  
  🔌 pcb_design/
    Custom KiCad footprints and symbols for the project PCB.
    Verified component footprints used in schematic and layout.
    Useful for replication, modification, and future PCB revisions.
  
  📊 /
    Code and configuration for the monitoring dashboard and data ingestion pipeline.
    Scripts and config files for Telegraf → InfluxDB → Grafana pipeline.
    Dashboard JSON files for quick import into Grafana.
    Provides real-time visualization of microgrid parameters.

👨‍💻 Developed with passion by Team Obsidian-01
