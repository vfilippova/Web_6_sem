const serverTime = parseInt(
  document.querySelector('meta[name="server-time"]').content,
);
const browserTime = performance.now();
const pageGenerationTime = serverTime + browserTime;
document.getElementById('page-generation-time').textContent =
  pageGenerationTime.toFixed(2);
