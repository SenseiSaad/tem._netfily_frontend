/* =========================================================
   GLOBAL DATA (ONE SOURCE OF TRUTH)
========================================================= */

const DATA = {
  /* -------- PROJECTS -------- */
  "proj-portfolio": {
    type: "project",
    title: "Portfolio on AWS",
    category: "AWS SERVERLESS",
    desc: "Serverless static portfolio using AWS S3, CloudFront and CI/CD.",
    hero: "https://placehold.co/1200x600/9a3412/FFF",
    content: `
      <h2>Overview</h2>
      <p>This portfolio is hosted on AWS S3 with CloudFront and GitHub Actions.</p>

      <h3>Problem</h3>
      <p>SSL validation delays caused by DNS propagation.</p>

      <h3>Solution</h3>
      <p>Moved DNS to Route 53.</p>
    `
  },

  "proj-ec2": {
    type: "project",
    title: "EC2 Static Host",
    category: "EC2 / LINUX",
    desc: "Manual Linux EC2 server configuration.",
    hero: "https://placehold.co/1200x600/064e3b/FFF",
    content: `
      <p>Configured Amazon Linux EC2 with SSH, firewall rules and cron jobs.</p>
    `
  },

  "proj-church": {
    type: "project",
    title: "Miracle Parish Website",
    category: "FULL STACK",
    desc: "Church website with scalable content structure.",
    hero: "https://placehold.co/1200x600/1e293b/FFF",
    content: `
      <p>Built a React-based church website with structured JSON-driven data.</p>
    `
  },

  /* -------- EXPERIENCE -------- */
  "exp-game": {
    type: "experience",
    title: "2D Client Game Project",
    category: "UNITY 2D",
    desc: "Remote freelance Unity project.",
    hero: "https://placehold.co/1200x600/be185d/FFF",
    content: `
      <p>Remote team collaboration caused data-sharing challenges.</p>
      <p>Minor script issues occurred due to early integration.</p>
    `
  },

  "exp-church": {
    type: "experience",
    title: "Church Website Developer",
    category: "WEB DEVELOPMENT",
    desc: "Full-stack freelance work.",
    hero: "https://placehold.co/1200x600/1e293b/FFF",
    content: `
      <p>Developed a maintainable website for non-technical church staff.</p>
    `
  },

  /* -------- BLOGS -------- */
  "blog-aws": {
    type: "blog",
    title: "Debugging CloudFront SSL",
    category: "CLOUD ENGINEERING",
    desc: "How DNS affected SSL validation.",
    content: `
      <p>CloudFront SSL validation failed due to DNS propagation delays.</p>
      <p>Switching to Route 53 resolved the issue.</p>
    `
  },

  "blog-ec2": {
    type: "blog",
    title: "EC2 Deployment Strategy",
    category: "LINUX / DEVOPS",
    desc: "Cron jobs and permissions.",
    content: `<p>Explains EC2 hardening and automation.</p>`
  },

  "blog-church": {
    type: "blog",
    title: "Scaling Static Data",
    category: "WEB ARCHITECTURE",
    desc: "Structured data for websites.",
    content: `<p>How JSON-driven data was structured for scalability.</p>`
  }
};

/* =========================================================
   HELPERS
========================================================= */

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* =========================================================
   INDEX PAGE → DRAWER PREVIEW
========================================================= */

function openDrawer(id) {
  const item = DATA[id];
  if (!item) return;

  const drawer = document.getElementById("project-drawer");
  const backdrop = document.getElementById("drawer-backdrop");
  const container = document.getElementById("drawer-content");

  if (!drawer || !container) return;

  container.innerHTML = `
    <span class="text-xs font-mono border px-2 py-1">${item.category}</span>
    <h2 class="text-3xl font-bold mt-4">${item.title}</h2>
    <p class="text-gray-400 mt-2">${item.desc}</p>

    <div class="mt-6">${item.content}</div>

    <a href="${item.type === 'blog'
      ? `Blog_template.html?id=${id}`
      : item.type === 'project'
      ? `Project_template.html?id=${id}`
      : `WorkExp_template.html?id=${id}`}"
      class="inline-block mt-8 px-6 py-3 bg-white text-black font-bold rounded">
      View Full →
    </a>
  `;

  backdrop.classList.remove("hidden");
  drawer.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  document.getElementById("project-drawer")?.classList.remove("open");
  document.getElementById("drawer-backdrop")?.classList.add("hidden");
  document.body.style.overflow = "auto";
}

/* =========================================================
   DETAIL PAGES (BLOG / PROJECT / EXPERIENCE)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const id = getParam("id");
  if (!id || !DATA[id]) return;

  const area = document.getElementById("content-area");
  if (!area) return;

  const item = DATA[id];

  area.innerHTML = `
    <section class="max-w-5xl mx-auto px-6 pt-20 animate-fade-in-up">
      ${item.hero ? `<img src="${item.hero}" class="rounded-xl mb-8">` : ""}
      <span class="text-xs font-mono border px-2 py-1">${item.category}</span>
      <h1 class="text-4xl font-bold mt-4 mb-4">${item.title}</h1>
      <p class="text-gray-400 mb-8">${item.desc}</p>
      <article class="prose prose-invert max-w-none">${item.content}</article>
    </section>
  `;
});
