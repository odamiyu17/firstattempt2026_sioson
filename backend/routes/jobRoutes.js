const express = require('express');
const router = express.Router();

let jobs = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "TechBiz Global GmbH",
    location: "Davao City",
    type: "Full-time",
    description: "At TechBiz Global, we are providing recruitment service to our TOP clients from our portfolio. We are currently seeking a Oracle ERP/Fusion Technical to join one of our clients' teams. If you're looking for an exciting opportunity to grow in a innovative environment, this could be the perfect fit for you.",
    link: "https://ph.indeed.com/viewjob?jk=dec75be211c89064&tk=1jmutdhjsgmd8874&from=serp&vjs=3"
  },
  {
    id: 2,
    title: "WordPress Developer (Marketing & Integrations)",
    company: "Lago",
    location: "Remote",
    type: "Full-time",
    description: "We are looking for an experienced WordPress Developer to support the development and maintenance of high-performing marketing websites and landing pages. This role focuses on building modular WordPress themes using Advanced Custom Fields (ACF) and supporting marketing systems through integrations, tracking implementation, and conversion-focused landing pages.",
    link: "https://ph.indeed.com/rc/clk?jk=eb2fe64e8135ec8c&bb=CI3o8TFxZ3dpHyEIunJtfeu_TSM0TZBDAuDdfZ138aWK3CDWKCLcw8bPWG73_NzYE5DSGJG-wVG1RscnEjyuO6Y17B6LqfcnR4Z0SDfXV8kpsuQpobYXjWh0XrVjj0Qf&xkcb=SoBi67M3kezPqQS5cB0JbzkdCdPP&fccid=d78447c30f9640f8&vjs=3"
  },
  {
    id: 3,
    title: "Graphic Designer",
    company: "UNIXSurplus, Inc.",
    location: "Davao City",
    type: "Full Time",
    description: "UNIXSURPLUS, INC. is a US based company, Located in Sunnyvale, California. We are an established wholesale distributor who offers high quality servers, storage units, components, and networking equipment to customers worldwide.",
    link: "https://ph.indeed.com/viewjob?jk=e1f80a94a4bca289&q=UI%2FUX+Designer&l=davao+city&tk=1jmuthm17h9f28hn&from=web&advn=5497616209799440&adid=459787093&ad=-6NYlbfkN0C7zsA1IrPJnJDRuHPIMyHWfifK1yc3LLB5cOZ6YK4cv0iizs4wTwH1qMnLQIBQU_nmoZqDevYEFOc8TnP9tHjNUkZupoKgyao_5gnQ2gGrPyOne_sRAuk8_WjMZMghipx1OgWg53l2UTLRJHi0ZhTaqtrP8JhSKdlxdvDt8Psgpkk9ezcmh3Eo9NkEFxHHSUyd7aXsdCxALiW2P6LtlndfNC0s3g-s_ogwpgXqEChZjLQTLDBU-4QYV1Hyu00NHSNVki7d9SFOyFL-AVH_jIIWeYMz-zk6-Xe9Q78g8mhGrA2DETNhuo9nINTbdZFESr-9Q3zpF0KX0ULnjTO8kdfORruD4QNeyfB_u2IEkVF_rfukWnhgF_gjH36wLgjq_2zRYl8so4DsdOoeZTPz1DzOR9aUxX_It35sYa3i3QhfTndtYPZu3ADssbZAbiKs7PCH9mHm2kDJ1-eLP1l_Bezb2uLtzLrH8UEsl8-jgw_URJQzckO1vPOF4uruuA_Xd7S4KAaWS3om_dioAratuZIHO9DLIhg_sZ1XRYeID1Acfw%3D%3D&pub=4a1b367933fd867b19b072952f68dceb&camk=UoKtGZLa3XKJW52NCsrhGA%3D%3D&xkcb=SoB16_M3kezJH-S5cB0KbzkdCdPP&xpse=SoBi6_I3kezDzT2Ebp0NbzkdCdPP&xfps=a110bc5f-a01f-4b26-b9d8-94e921ce55b1&vjs=3"
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Punongbayan & Araullo",
    location: "Davao City",
    type: "Full-time",
    description: "Utilize established development tools, guidelines and conventions including but not limited to ASP.NET, SQL Server, HTML, CSS, JavaScript, and C#/VB.NET.",
    link: "https://ph.indeed.com/viewjob?jk=bd73e75cd57c302d&tk=1jmutjmk5ikmf897&from=serp&vjs=3"
  }
];


// ✅ GET all jobs
router.get('/', (req, res) => {
  res.json(jobs);
});


// ✅ ADD job (Admin)
router.post('/', (req, res) => {
  const { title, company, location, type, description, link } = req.body;

  if (!title || !company || !location) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newJob = {
    id: Date.now(),
    title,
    company,
    location,
    type: type || "Full-time",
    description: description || "No description provided.",
    link: link || "#"
  };

  jobs.unshift(newJob);
  res.json(newJob);
});


// ✅ DELETE job (optional but useful)
router.delete('/:id', (req, res) => {
  jobs = jobs.filter(job => job.id != req.params.id);
  res.json({ message: "Job deleted" });
});


// ✅ GET single job (for future details page)
router.get('/:id', (req, res) => {
  const job = jobs.find(j => j.id == req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job);
});

module.exports = router;