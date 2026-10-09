+++
period = 'Fall 2025'
draft = false
title = 'CFD: Numerical Methods & Simulations'
category = 'other'
weight = 5
+++
This collection comprises extensive solutions and MATLAB implementations for the Computational Fluid Dynamics (CFD) coursework at NTUA. The project demonstrates a systematic progression from fundamental numerical linear algebra to the simulation of transient and multi-dimensional fluid flows. 

The computational models and scripts developed throughout these problem sets cover:
*   **Linear System Solvers:** Implementation of the Thomas Algorithm for tridiagonal systems, alongside Jacobi, Gauss-Seidel, and Successive Over-Relaxation (SOR) methods.
*   **Initial Value Problems:** Error analysis and order-of-convergence testing for Explicit/Implicit Euler and Runge-Kutta (2nd, 3rd, and 4th order) methods.
*   **Boundary Value Problems:** Finite difference solutions for 1D Poiseuille flow and 2D elliptic equations modeling fully-developed, steady, laminar flow in a square duct.
*   **Transient Diffusion:** Application of Explicit, Simple Implicit, and Crank-Nicolson schemes to 1D heat diffusion, including von Neumann stability analysis.

Below are visual representations of the velocity profile and velocity contours for the fully-developed flow of an incompressible fluid through a square cross-section, solved via the Gauss-Seidel method:

<!-- Side-by-Side Image Container -->
<div style="display: flex; justify-content: center; gap: 1rem; margin: 2rem 0;">
  <!-- Image 1 -->
  <img src="/images/projects/cfd/Ex4_1_Fig1B_GaussSeidel.png" alt="Velocity Profile" style="width: 100%; max-width: 400px; border-radius: 6px; box-shadow: var(--shadow);">
  
  <!-- Image 2 -->
  <img src="/images/projects/cfd/Ex4_1_Fig3B_GaussSeidel.png" alt="Velocity Contours" style="width: 100%; max-width: 400px; border-radius: 6px; box-shadow: var(--shadow);">
</div>

The complete MATLAB scripts are hosted on my <a href="https://github.com/anbatategas/computational-fliud-dynamics" target="_blank" rel="noopener noreferrer" class="stealth-link no-favicon">GitHub Repository</a>, and are also incorporated in the solutions. The detailed mathematical proofs, numerical analysis, and error plots are available in the original coursework solutions below.

<p style="font-size: 0.90rem; opacity: 0.95;">
  <strong>Note</strong>: <em>The detailed solutions are written in Greek, though the embedded mathematics, MATLAB source code, and data plots follow universal scientific notation.</em>
</p>

* [Numerical Methods for Linear Systems (PDF)](/docs/projects/cfd/CFD_1.pdf)
* [Numerical Methods for Initial Value Problems (PDF)](/docs/projects/cfd/CFD_2.pdf)
* [Finite Difference Method: Poiseuille Flow (PDF)](/docs/projects/cfd/CFD_3.pdf)
* [Finite Difference Method: Elliptic B.V.P. (PDF)](/docs/projects/cfd/CFD_4.pdf)
* [Diffusion Equation: 1D Transient Solutions (PDF)](/docs/projects/cfd/CFD_5.pdf)