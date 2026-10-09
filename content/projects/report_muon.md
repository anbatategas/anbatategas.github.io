+++
period = 'Fall 2024'
draft = false
title = 'Elementary Particles: Muon Lifetime Measurement'
category = 'lab'
weight = 1
+++
This report details the experimental procedure and computational data analysis for measuring the spontaneous decay lifetime of cosmic-ray muons. The experiment was conducted as part of the "Nuclear Physics & Elementary Particles Laboratory" coursework at NTUA.

The physical analysis and data processing methods developed in this report cover:
*   **Particle Detection:** Operation of a plastic scintillator coupled with a photomultiplier tube (PMT) to capture the ionization and subsequent photon emission caused by incoming muons.
*   **Signal Processing:** Use of a two-stage amplifier, a discriminator with adjustable voltage thresholds for noise reduction, and an FPGA timing circuit to record the time interval between a muon's entry and its decay.
*   **Statistical Data Fitting:** Processing raw timing data using Python to generate decay histograms. The mean lifetime was extracted through least-squares exponential fitting, incorporating background signal modeling.
*   **Theoretical Implications:** Calculation of the Fermi coupling constant ($G_F$) from the experimentally determined mean lifetime, reflecting the strength of the weak interaction. Furthermore, the survival of atmospheric muons to sea level is analyzed as a direct verification of relativistic time dilation and length contraction.

The extensive laboratory method and data analysis is available in the original report below.

<p style="font-size: 0.90rem; opacity: 0.95;">
  <strong>Note</strong>: <em>The detailed laboratory report is written in Greek, though the embedded mathematics, Python source code, and data plots follow universal scientific notation.</em>
</p>

* [Measurement of the Muon Lifetime (PDF)](/docs/labs/particles/muon_report.pdf)