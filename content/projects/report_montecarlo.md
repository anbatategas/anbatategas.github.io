+++
period = 'Fall 2024'
draft = false
title = 'Elementary Particles: Monte Carlo Applications'
category = 'lab'
weight = 3
+++
This report explores the implementation and statistical properties of various basic Monte Carlo algorithms. Conducted as part of the "Nuclear Physics & Elementary Particles Laboratory" coursework at NTUA, the study demonstrates how pseudo-random sampling can be leveraged for numerical integration and the simulation of stochastic physical processes.

The computational analysis and numerical methods developed in this study cover:
*   **Pseudo-Random Number Generation:** Statistical evaluation of sequences following uniform and Gaussian distributions using Octave. Analysis of how the ratio of generated numbers to histogram bins affects the precision and visual resolution of the simulated distributions.
*   **Numerical Integration (Calculation of $\pi$):** Comparison of three distinct Monte Carlo integration techniques. The initial geometric "hit-or-miss" approach was refined into a functional Riemann sum estimation, and finally optimized using a change of variables (importance sampling) with a specific weight function. The importance sampling method successfully estimated $\pi$ to five significant figures.
*   **Simulation of Radioactive Decay:** Modeling the exponential decay of a free neutron population ($\tau = 886.7$ s). A stochastic algorithm was implemented to simulate individual particle decay based on calculated probability distributions. The simulated data was fitted with an exponential decay curve, yielding results in excellent agreement with the theoretical mean lifetime.

The extensive laboratory method and data analysis is available in the original report below.

<p style="font-size: 0.90rem; opacity: 0.95;">
  <strong>Note</strong>: <em>The detailed laboratory report is written in Greek, though the embedded mathematics, Octave source code, and data plots follow universal scientific notation.</em>
</p>

* [The Monte Carlo Method (PDF)](/docs/labs/particles/montecarlo_report.pdf)