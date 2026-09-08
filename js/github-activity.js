// Pulls a few public stats from the GitHub REST API (no auth) to fill in
// the Github Activity section. Fails quietly to the "—" placeholders if
// the API is unreachable or rate-limited.
(function () {
  const reposEl = document.getElementById("gh-repos");
  const followersEl = document.getElementById("gh-followers");
  const sinceEl = document.getElementById("gh-since");
  if (!reposEl) return;

  fetch("https://api.github.com/users/istamimnaser")
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((data) => {
      reposEl.textContent = data.public_repos ?? "—";
      followersEl.textContent = data.followers ?? "—";
      if (data.created_at) {
        sinceEl.textContent = new Date(data.created_at).getFullYear();
      }
    })
    .catch(() => {
      reposEl.textContent = "—";
      followersEl.textContent = "—";
      sinceEl.textContent = "—";
    });
})();
