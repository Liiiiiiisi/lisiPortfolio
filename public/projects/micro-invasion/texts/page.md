
**Tools Used:** Lens Studio · Body Tracking · Segmentation · World Mesh · Particle System · Image Tracking  
**Used for:** Real-time AR interaction, environment mapping, and body-surface visualization

---
##  Team

**Chuyue Yu** — Interaction Designer
**Yike Hu** — Visual Designer & Video Editor
**My Role** — Interaction & AR Developer

## 01. Project Overview

**Micro_Invasion** is an AR experience that visualizes how microplastics enter the body through ordinary routines.

Framed around a dining scene, the project uses real-time tracking, segmentation, and particle simulation to reveal invisible contamination on the user’s hands, face, clothing, and surrounding environment.

---

## 02. Concept

### Hidden Contamination
_Layout: 3 Cards Row_

**Skin Contact**  
Degraded plastics leave micro-sized particles that stick to the skin during daily use.  
_Placeholder: [Image: Skin Contact Concept]_

**Food Intake**  
Produce can carry microplastics absorbed from the environment.  
_Placeholder: [Image: Food Intake Concept]_

**Respiration**  
Polyester and nylon fabrics release airborne microfibers that can be inhaled.  
_Placeholder: [Image: Respiration Concept]_

---

## 03. Interaction Design

_Layout: Alternating Left-Right_

### 1 — Skin Exposure
**Trigger:** Hand sanitizer interaction  
**Effect:** Activates hand segmentation and particle attachment

**Interaction Elements:**
- **Object:** Hand Sanitizer
- **Segment:** Hand Segmentation Mask
- _Placeholder: [GIF: Microplastic Spread on Skin]_

### 2 — Food Exposure
**Trigger:** Apple proximity  
**Effect:** Triggers particle accumulation on the face region

**Interaction Elements:**
- **Object:** Apple
- **Segment:** Face Segmentation
- _Placeholder: [GIF: Particles on Face]_

### 3 — Fabric Exposure
**Trigger:** Napkin wipe  
**Effect:** Attaches fibers to the clothing segmentation

**Interaction Elements:**
- **Object:** Napkin
- **Segment:** Clothing Region
- _Placeholder: [GIF: Fiber Attachment]_

### Final Reveal
A room-scale particle reveal expands beyond the user’s body and fills the environment.

> “Welcome to the world of microplastics.”

_Placeholder: [GIF: World Mesh Reveal]_

---

## 04. Technical Implementation

I engineered the interaction system, AR logic, image tracking, segmentation, and world-mesh effects. 

### A. Image Tracking System
- Designed a large QR marker as the central anchor
- Built three collider boxes as event triggers
- Developed the interaction flow: skin → food → fabric → environment
- Created a real-time distance-tracking script to measure hand-to-collider proximity

### B. Body Tracking & Segmentation
- Integrated a hand-detection helper image for segmentation debugging
- Adapted the `example_segmentation` template for particle emission
- Controlled segmentation masks for targeted particle activation
- Linked segmentation output to interaction states

### C. World Mesh Integration
- Extended the simple world mesh template for room-scale particle mapping
- Configured mesh-based particle emission reactive to the environment
- Optimized performance by limiting unnecessary particles

---


