export const projects = [
  {
    title: "Chicago Bikeability Map",
    image: "/images/projects/biking.png",
    link: "https://chicago-bike-dashboard.onrender.com",
    external: true,
    summary: {
      problem: "Chicago neighborhoods lack a shared fact base on where bike crashes, infrastructure gaps, and traffic stress converge.",
      method: "Built a Plotly Dash pipeline that fuses bike crash records with infrastructure layers to rank bikeability for every community area.",
      findings: "The dashboard surfaces corridor-level crash clusters, missing protection, and seasonal patterns that explain neighborhood disparities.",
      impact: "Gives aldermanic offices and community coalitions ready-to-use evidence when prioritizing Vision Zero investments."
    }
  },
  {
    title: "City Scaling Laws",
    image: "/images/projects/urban-scaling.jpg",
    link: "/urban-scaling",
    summary: {
      problem: "Large urban crime datasets are incomplete and statistically inconsistent, obscuring equity questions in policing.",
      method: "Hierarchical Bayesian scaling models with city-level priors to jointly estimate missing arrests over time and across regions.",
      findings: "Identified systematic under-reporting patterns tied to city size and demographics while quantifying the uncertainty of each correction.",
      impact: "Delivers corrected arrest series that researchers and agencies can plug directly into justice equity analyses."
    }
  },
  {
    title: "Global Research Equality",
    image: "/images/projects/demography-map.png",
    link: "/demographics",
    summary: {
      problem: "Policy makers lack longitudinal, global evidence on who participates in science and how opportunities differ across countries.",
      method: "Linked 45M+ publication records to 30M anonymized researchers to reconstruct careers, migration flows, and demographic parity metrics.",
      findings: "Revealed stalled gains for women in several disciplines and uneven migration networks that concentrate prestige in a handful of countries.",
      impact: "Equips ministries and funders with baselines for mobility and representation targets ahead of upcoming diversity mandates."
    }
  }
];
