+++
period = 'Spring 2025'
draft = false
title = 'Nuclear Physics & Applications: Bateman Equations'
category = 'other'
weight = 3
+++
This project provides a comprehensive theoretical foundation and analytical resolution of the Bateman equations, which govern the time evolution of nuclide concentrations in radioactive decay chains. Conducted as a bibliographic term paper for the "Nuclear Physics & Applications" course at NTUA, the report bridges classical analytical derivations with modern computational algorithms used to solve extensive nuclear decay networks.

The theoretical analysis and algorithmic evaluations developed in this study cover:
*   **Analytical Solutions:** Derivation of the Bateman equations as a system of coupled first-order linear differential equations. The report presents rigorous analytical solutions using both inductive mathematical proofs and Laplace transforms to determine nuclide populations over time.
*   **Equilibrium States:** Analysis of specific limiting cases in decay chains, mathematically modeling transient and secular (permanent) equilibrium states based on the relative magnitudes of the constituent decay constants ($\lambda$).
*   **Numerical & Algorithmic Methods:** Evaluation of computational challenges in solving Bateman equations for complex networks, particularly addressing catastrophic cancellation caused by nearly identical decay constants ($\lambda_i \approx \lambda_j$) in denominators. The study reviews robust algorithmic alternatives—including matrix exponentials (eigenvalue methods), Cauchy products, and divided differences (Cetnar's solution)—and notes their implementation in industry-standard simulation software like ORIGEN, MCNP6, and Geant4.
*   **Modern Applications:** Exploration of the practical utility of Bateman equations across critical fields. Applications detailed include Nuclear Medicine (optimizing Mo-99/Tc-99m generators for SPECT imaging), Nuclear Reactor Fuel Cycles (managing Xe-135 neutron poisoning), radiometric dating (Pb-U, Pb-Th), and radioactive waste management.

The complete academic review and the accompanying presentation slides are available below.

<p style="font-size: 0.90rem; opacity: 0.95;">
  <strong>Note</strong>: <em>The detailed report and presentation are written in Greek, though the embedded mathematics, schematics, and data plots follow universal scientific notation.</em>
</p>

* [Bateman Equations in Radioactive Series: Report (PDF)](/docs/projects/bateman/Bateman_Equations_Report.pdf)
* [Bateman Equations in Radioactive Series: Presentation (PDF)](/docs/projects/bateman/Bateman_Equations_Presentation.pdf)