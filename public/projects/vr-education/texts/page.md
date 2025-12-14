<!-- placeholder: video_hero -->

# VR Education Expanding ASD Caregiver Pool

---

## 1. Overview

**Guardian's Guide** is a VR learning experience designed to help new caregivers understand and support a non-verbal autistic child. The experience focuses on approachable, practice-based learning and teaches essential caregiving skills through realistic sensory and communication challenges.

---

## 2. My Role

- Designed VR interaction and onboarding systems  
- Implemented scoring logic, triggers, and task flow in Unity  
- Built anti-cheating and progression mechanics  
- Structured scene flow and overall user experience architecture  
- Designed interactions aligned with autistic sensory needs  

---

## 3. Core Contributions

### 3.1 Interaction System Design

Inspired by *The Escape Artist* controller tutorial, I designed an onboarding flow that makes VR controls intuitive even for first-time users.

![Contrast Adjustment](/projects/vr-education/images/contrast.gif)

This system reduces onboarding friction by providing an interactive, visual understanding of core VR controls.

---

### 3.2 System Logic & Gameplay Mechanics

I designed the underlying logic that drives tasks, feedback, and progression throughout the experience.

- Implemented visual state changes (red → yellow) to mark completed interactions  
  ![Visual State Change](/projects/vr-education/images/change-color.gif)

- Built a collision-based scoring system to detect and validate object placement  
  ![Unity Screen](/projects/vr-education/images/unity-screen.gif)

- Created a two-option choice mechanic that teaches correct caregiving decisions through paired item comparisons  
  ![Choice Demo](/projects/vr-education/images/choice-demo.gif)

These mechanics structure the learning process and support clear, consistent feedback.

---

### 3.3 Anti-Cheating Mechanics

To ensure meaningful learning rather than trial-and-error, I implemented:

- Automatic removal of unselected options when a choice is made  
  ![Option Removal](/projects/vr-education/images/removal.gif)

- Deactivation of UI trigger sockets after interaction to prevent repeated scoring  
  ![Socket Deactivation](/projects/vr-education/images/socket.gif)

These systems preserve learning integrity and maintain authentic decision-making.

---

### 3.4 Scene Architecture & Flow

The experience progresses through four core scenes:

- **Tutorial** — Users learn VR controls  
- **White Room** — Users review Kid X's profile through object-based interactions  
- **Kitchen (Guided Task)** — Users complete caregiving tasks with hints and instant UI feedback  
- **Living Room (Independent Task)** — Users apply their learning without hints  

---

## 4. Technical Breakdown

### 4.1 Interaction Systems

- VR controller mapping using OpenXR  
- Dynamic UI feedback  
- Object state switching via scripted events  

### 4.2 Gameplay Logic

- Collision-based scoring  
- Trigger activation/deactivation  
- TextMesh-linked scoring events  

---

## 5. Outcomes & Learnings

- **Impact**: Improved usability for first-time VR users through simplified VR onboarding  
- **Learning**: Validated behavior-based training design for neurodivergent learning  
- **Future**: Built a scalable framework for rule-based VR learning systems with opportunities for adaptive difficulty and richer behavioral states  