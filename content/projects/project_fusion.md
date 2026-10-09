+++
period = 'Spring 2025'
draft = false
title = 'Plasma Physics: Wave-Particle Interaction Analysis'
category = 'other'
weight = 4
+++
This project explores the non-linear dynamics of a charged particle interacting with counter-propagating electrostatic waves. Developed for the "Introduction to the Science & Technology of Controlled Thermonuclear Fusion" course, this analysis bridges fundamental Hamiltonian mechanics with advanced chaos theory.

The analytical and computational models developed in this study cover:
*   **Hamiltonian Mechanics & Phase Space:** Formulation of the unperturbed single-wave system as a non-linear pendulum. Identification of stable and unstable fixed points, mathematical derivation of the separatrix width, and classification of librational and rotational orbits.
*   **Canonical Perturbation Theory:** Introduction of the second, weaker electrostatic wave as a time-dependent perturbation. Transformation into action-angle variables and application of the KAM (Kolmogorov-Arnold-Moser) theorem to analyze resonance behavior.
*   **Chaos Theory & Stroboscopic Mapping:** Implementation of stroboscopic Poincaré sections using Python to track orbital trajectories over time. 
*   **Transition to Global Chaos:** Visualizing the breakdown of KAM tori into resonance islands, the onset of chaotic scattering near the separatrix, and the eventual transition to global chaos evaluated via the Chirikov resonance overlap criterion.

Below are visual representations of the phase space contours for the unperturbed system, alongside a Poincaré section demonstrating the onset of chaos in the perturbed state:

<!-- Side-by-Side Image Container -->
<div style="display: flex; justify-content: center; align-items: center; gap: 1rem; margin: 2rem 0;">
  <!-- Image 1 -->
  <img src="/images/projects/fusion/1-PhaseSpace.png" alt="Phase Space Contours" style="width: 100%; max-width: 400px; aspect-ratio: 4/3; object-fit: contain; border-radius: 6px; box-shadow: var(--shadow); background-color: white;">
  
  <!-- Image 2 -->
  <img src="/images/projects/fusion/2-ChaosIntro.png" alt="Poincaré Section" style="width: 100%; max-width: 400px; aspect-ratio: 4/3; object-fit: contain; border-radius: 6px; box-shadow: var(--shadow); background-color: white;">
</div>

The complete Python scripts used for the numerical integration and plotting are hosted on my <a href="https://github.com/anbatategas/wave-particle-chaos" target="_blank" rel="noopener noreferrer" class="stealth-link no-favicon">GitHub Repository</a> and are also appended to the final assignment. The detailed mathematical proofs, theoretical frameworks, and extended phase space maps are available in the original coursework assignment below.

<p style="font-size: 0.90rem; opacity: 0.95;">
  <strong>Note</strong>: <em>The detailed assignment is written in Greek, though the embedded mathematics, Python source code, and data plots follow universal scientific notation.</em>
</p>

* [Wave-Particle Interaction & Chaos Analysis (PDF)](/docs/projects/fusion/FusionFinal_Ex18.pdf)